import { gql } from "@apollo/client";
import { HasuraUserRole, PaymentReceiverType, PayoutSettingsType, User } from "src/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Input from "src/components/FormInput";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import Radio from "./Radio";

type Inputs = {
  paymentReceiverType: PaymentReceiverType;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  payoutSettingsType: PayoutSettingsType;
  ethWalletAddress?: string;
  iban?: string;
  bic?: string;
};

type PropsType = {
  user: User;
};

const ProfileForm: React.FC<PropsType> = ({ user }) => {
  const formMethods = useForm<Inputs>({
    defaultValues: {
      paymentReceiverType: user.metadata.paymentReceiverType ?? PaymentReceiverType.INDIVIDUAL,
      firstName: user.metadata?.firstName ?? "",
      lastName: user.metadata?.lastName ?? "",
      email: user.email ?? "",
      address: user.metadata?.location?.address ?? "",
      zipcode: user.metadata?.location?.zipcode ?? "",
      city: user.metadata?.location?.city ?? "",
      country: user.metadata?.location?.country ?? "",
      payoutSettingsType: user.metadata?.payoutSettings?.type,
      ethWalletAddress: user.metadata?.payoutSettings?.settings?.ethWalletAddress,
      iban: user.metadata?.payoutSettings?.settings?.iban,
      bic: user.metadata?.payoutSettings?.settings?.bic,
    },
  });
  const { handleSubmit } = formMethods;
  const [updateUser, { data, loading }] = useHasuraMutation(UPDATE_USER_MUTATION, HasuraUserRole.User, {
    variables: { userId: user.id },
  });
  const success = !!data;

  const onSubmit: SubmitHandler<Inputs> = async formData => {
    await updateUser(mapFormDataToSchema(formData));
  };

  const payoutSettingsType = formMethods.watch("payoutSettingsType");

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <>
          <div className="flex flex-col">
            Type of Profile
            <div className="flex flex-row gap-3">
              <Radio
                name="paymentReceiverType"
                options={[
                  {
                    value: PaymentReceiverType.INDIVIDUAL,
                    label: "Individual",
                  },
                  {
                    value: PaymentReceiverType.COMPANY,
                    label: "Company",
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <Input label="FirstName" name="firstName" placeholder="firstName" options={{ required: "Required" }} />
            <Input label="LastName" name="lastName" placeholder="lastName" options={{ required: "Required" }} />
          </div>
          <Input label="Email" name="email" placeholder="email" options={{ required: "Required" }} />
          <Input label="Location" name="address" placeholder="address" options={{ required: "Required" }} />
          <div className="flex flex-row gap-5">
            <Input name="zipcode" placeholder="zipcode" options={{ required: "Required" }} />
            <Input name="city" placeholder="city" options={{ required: "Required" }} />
            <Input name="country" placeholder="country" options={{ required: "Required" }} />
          </div>
          <div className="flex flex-col">
            Payout settings
            <div className="flex flex-row gap-3">
              <Radio
                name="payoutSettingsType"
                options={[
                  {
                    value: PayoutSettingsType.ETH,
                    label: "Ethereum",
                  },
                  {
                    value: PayoutSettingsType.IBAN,
                    label: "Bank wire",
                  },
                ]}
              />
            </div>
          </div>
          {payoutSettingsType === PayoutSettingsType.ETH && (
            <Input name="ethWalletAddress" placeholder="Ethereum address" options={{ required: "Required" }} />
          )}
          {payoutSettingsType === PayoutSettingsType.IBAN && (
            <div className="flex flex-row gap-5">
              <Input name="iban" placeholder="IBAN" options={{ required: "Required" }} />
              <Input name="bic" placeholder="BIC" options={{ required: "Required" }} />
            </div>
          )}
          <button type="submit" className="self-start border-white border-2 px-3 py-2 rounded-md">
            {loading ? "Loading..." : "Send"}
          </button>
          {success && <p>Your data has been saved!</p>}
        </>
      </form>
    </FormProvider>
  );
};

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserProfile($userId: uuid!, $email: citext!, $metadata: jsonb!) {
    updateUser(pk_columns: { id: $userId }, _set: { email: $email, metadata: $metadata }) {
      metadata
      email
    }
  }
`;

const mapFormDataToSchema = ({
  email,
  lastName,
  firstName,
  address,
  city,
  country,
  paymentReceiverType,
  zipcode,
  payoutSettingsType,
  ethWalletAddress,
  iban,
  bic,
}: Inputs) => {
  const settings = payoutSettingsType === PayoutSettingsType.ETH ? { ethWalletAddress } : { iban, bic };
  return {
    variables: {
      email,
      metadata: {
        paymentReceiverType,
        firstName,
        lastName,
        location: {
          address,
          city,
          country,
          zipcode,
        },
        payoutSettings: {
          type: payoutSettingsType,
          settings,
        },
      },
    },
  };
};

export default ProfileForm;
