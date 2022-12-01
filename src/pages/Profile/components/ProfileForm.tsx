import { gql, useMutation } from "@apollo/client";
import { PaymentReceiverType, User } from "src/types";
import { useForm, SubmitHandler } from "react-hook-form";
// import { useHasuraQuery } from "src/hooks/useHasuraQuery";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
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
  const [updateUser, { data, loading }] = useMutation(UPDATE_USER_MUTATION);

  console.log(user);
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
        <label html-for="firstName" className="flex flex-col">
          FirstName
          <input
            id="firstName"
            placeholder="firstName"
            {...register("firstName", { required: true })}
            className={errors.firstName ? "border-2 border-rose-600" : ""}
          />
        </label>
        <label html-for="lastName" className="flex flex-col">
          LastName
          <input
            id="lastName"
            placeholder="lastName"
            {...register("lastName", { required: true })}
            className={errors.lastName ? "border-2 border-rose-600" : ""}
          />
        </label>
      </div>
      <label html-for="email" className="flex flex-col">
        Email
        <input
          id="email"
          placeholder="email"
          {...register("email", { required: true })}
          className={errors.email ? "border-2 border-rose-600" : ""}
        />
      </label>
      <label html-for="address" className="flex flex-col">
        Location
        <input
          id="address"
          placeholder="address"
          {...register("address", { required: true })}
          className={errors.address ? "border-2 border-rose-600" : ""}
        />
      </label>
      <div className="flex flex-row gap-2">
        <input
          placeholder="zipcode"
          {...register("zipcode", { required: true })}
          className={errors.zipcode ? "border-2 border-rose-600" : ""}
        />
        <input
          placeholder="city"
          {...register("city", { required: true })}
          className={errors.city ? "border-2 border-rose-600" : ""}
        />
        <input
          placeholder="country"
          {...register("country", { required: true })}
          className={errors.country ? "border-2 border-rose-600" : ""}
        />
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
