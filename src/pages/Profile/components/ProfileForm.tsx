import { gql, useMutation } from "@apollo/client";
import { PaymentReceiverType, User } from "src/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Input from "./Input";

type Inputs = {
  paymentReceiverType: PaymentReceiverType;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
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
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const [updateUser, { data, loading }] = useMutation(UPDATE_USER_MUTATION);

  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    lastName,
    firstName,
    address,
    city,
    country,
    paymentReceiverType,
    zipcode,
  }) => {
    await updateUser({
      variables: {
        userId: user.id,
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
        },
      },
    });

    // const result = useHasuraQuery(query, HasuraUserRole.User);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col">
          Type of Profile
          <div className="flex flex-row gap-3">
            <label html-for={PaymentReceiverType.INDIVIDUAL}>
              <input
                type="radio"
                {...register("paymentReceiverType")}
                id={PaymentReceiverType.INDIVIDUAL}
                value={PaymentReceiverType.INDIVIDUAL}
                className="mr-2"
              />
              Individual
            </label>
            <label html-for={PaymentReceiverType.COMPANY}>
              <input
                type="radio"
                {...register("paymentReceiverType")}
                id={PaymentReceiverType.COMPANY}
                value={PaymentReceiverType.COMPANY}
                className="mr-2"
              />
              Company
            </label>
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
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="self-start border-white border-2 px-3 py-2 rounded-md"
        >
          {loading ? "Loading..." : "Send"}
        </button>
        {data && <p>Your data has been saved!</p>}
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

export default ProfileForm;
