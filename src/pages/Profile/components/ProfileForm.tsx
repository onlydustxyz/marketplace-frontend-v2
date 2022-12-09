import { gql } from "@apollo/client";
import { HasuraUserRole, PaymentReceiverType, PayoutSettingsType, User } from "src/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Input from "src/components/FormInput";
import { useHasuraMutation } from "src/hooks/useHasuraQuery";
import Radio from "./Radio";
import { useT } from "talkr";

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
  const { T } = useT();

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <>
          <div className="flex flex-col">
            {T("typeOfProfile")}
            <div className="flex flex-row gap-3">
              <Radio
                name="paymentReceiverType"
                options={[
                  {
                    value: PaymentReceiverType.INDIVIDUAL,
                    label: T("individualProfile"),
                  },
                  {
                    value: PaymentReceiverType.COMPANY,
                    label: T("companyProfile"),
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <Input
              label={T("firstname")}
              name="firstName"
              placeholder={T("firstname")}
              options={{ required: T("required") }}
            />
            <Input
              label={T("lastname")}
              name="lastName"
              placeholder={T("lastname")}
              options={{ required: T("required") }}
            />
          </div>
          <Input label={T("email")} name="email" placeholder={T("email")} options={{ required: T("required") }} />
          <Input
            label={T("location")}
            name="address"
            placeholder={T("location")}
            options={{ required: T("required") }}
          />
          <div className="flex flex-row gap-5">
            <Input name="zipcode" placeholder={T("zipCode")} options={{ required: T("required") }} />
            <Input name="city" placeholder={T("city")} options={{ required: T("required") }} />
            <Input name="country" placeholder={T("country")} options={{ required: T("required") }} />
          </div>
          <div className="flex flex-col">
            {T("payoutSettings")}
            <div className="flex flex-row gap-3">
              <Radio
                name="payoutSettingsType"
                options={[
                  {
                    value: PayoutSettingsType.ETH,
                    label: T("ethereum"),
                  },
                  {
                    value: PayoutSettingsType.IBAN,
                    label: T("bankWire"),
                  },
                ]}
              />
            </div>
          </div>
          {payoutSettingsType === PayoutSettingsType.ETH && (
            <Input
              name="ethWalletAddress"
              placeholder={T("ethereumWalletAddress")}
              options={{ required: T("required") }}
            />
          )}
          {payoutSettingsType === PayoutSettingsType.IBAN && (
            <div className="flex flex-row gap-5">
              <Input name="iban" placeholder={T("iban")} options={{ required: T("required") }} />
              <Input name="bic" placeholder={T("bic")} options={{ required: T("required") }} />
            </div>
          )}
          <button type="submit" className="self-start border-white border-2 px-3 py-2 rounded-md">
            {loading ? T("loading") : T("send")}
          </button>
          {success && <p>{T("dataSaved")}</p>}
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
