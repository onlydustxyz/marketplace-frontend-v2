import { gql } from "@apollo/client";
import { HasuraUserRole } from "src/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import Input from "src/components/FormInput";
import ProjectCard from "src/components/ProjectCard";
import RemainingBudget from "src/components/RemainingBudget";
import { INITIAL_AMOUNT_KEY, REMAINING_AMOUNT_KEY } from "src/components/ProjectInformation";
import Slider from "./Slider";
import Select from "./Select";
import { Inputs } from "./types";
import { useAuth } from "src/hooks/useAuth";

const SENIORITY = ["Junior", "Mid-Senior", "Senior"];
const SATISFACTION = ["Fair", "Good", "Excellent"];

type PropsType = {
  budget: {
    [REMAINING_AMOUNT_KEY]: number;
    [INITIAL_AMOUNT_KEY]: number;
    id: string;
  };
};

const PaymentForm: React.FC<PropsType> = ({ budget }) => {
  const formMethods = useForm<Inputs>({
    defaultValues: {
      linkToIssue: "",
      contributor: "",
      memo: "",
      remainingBudget: budget?.[REMAINING_AMOUNT_KEY],
      seniority: 1,
      workingDays: 10,
      satisfaction: 1,
      amountToWire: 0,
    },
  });
  const { handleSubmit, control } = formMethods;

  const { user } = useAuth();
  const [insertPayment, requestPaymentMutation] = useHasuraMutation(REQUEST_PAYMENT_MUTATION, HasuraUserRole.User, {
    variables: { budgetId: budget.id, requestorId: user?.id },
  });
  const getUserGithubIdsQuery = useHasuraQuery(GET_USER_GITHUB_IDS_QUERY, HasuraUserRole.User);
  const success = !!requestPaymentMutation.data;

  const onSubmit: SubmitHandler<Inputs> = async formData => {
    await insertPayment(mapFormDataToSchema(formData));
  };

  return (
    <>
      {getUserGithubIdsQuery.data && (
        <ProjectCard>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 justify-between">
              <div className="flex flex-row justify-between flex-grow gap-10">
                <div className="flex flex-col gap-5 w-2/3">
                  <Input label="Link to Issue" name="linkToIssue" placeholder="" options={{ required: "Required" }} />
                  <Select label="Contributor" name="contributor" options={{ required: "Required" }} control={control}>
                    {getUserGithubIdsQuery.data.users.map((user: any) => (
                      <option key={user.id} value={user.id}>
                        {user.displayName}
                      </option>
                    ))}
                  </Select>
                  <Input label="Memo" name="memo" placeholder="" />
                </div>
                <div className="flex flex-col gap-5 w-1/3">
                  <div className="border-solid border-2 rounded-md border-white p-5">
                    <RemainingBudget
                      remainingAmount={budget[REMAINING_AMOUNT_KEY]}
                      initialAmount={budget[INITIAL_AMOUNT_KEY]}
                    />
                  </div>
                  <div>
                    Seniority
                    <Slider
                      control={control}
                      name="seniority"
                      minValue={0}
                      maxValue={2}
                      defaultValue={1}
                      displayValue={(value: number) => SENIORITY[value]}
                    />
                  </div>
                  <div>
                    Working days
                    <Slider
                      control={control}
                      name="workingDays"
                      minValue={1}
                      maxValue={20}
                      defaultValue={10}
                      displayValue={(value: number) => `${value} days`}
                    />
                  </div>
                  <div>
                    Overall satisfaction
                    <Slider
                      control={control}
                      name="satisfaction"
                      minValue={0}
                      maxValue={2}
                      defaultValue={1}
                      displayValue={(value: number) => SATISFACTION[value]}
                    />
                  </div>
                  <div className="border-solid border-2 rounded-md border-white p-5">
                    Amount to wire
                    <Input
                      label="Amount to Wire"
                      name="amountToWire"
                      type="number"
                      placeholder={"0"}
                      options={{
                        valueAsNumber: true,
                        validate: value => value > 0,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <button type="submit" className="self-start border-white border-2 px-3 py-2 rounded-md">
                  {requestPaymentMutation.loading ? "Loading..." : "Send"}
                </button>
                {success && <p>Payment request sent !</p>}
              </div>
            </form>
          </FormProvider>
        </ProjectCard>
      )}
    </>
  );
};

export const GET_USER_GITHUB_IDS_QUERY = gql`
  query {
    users {
      id
      displayName
      avatarUrl
      userProviders(where: { providerId: { _eq: "github" } }) {
        providerId
        providerUserId
      }
    }
  }
`;

export const REQUEST_PAYMENT_MUTATION = gql`
  mutation ($amount: Int!, $contributorId: Uuid!, $budgetId: Uuid!, $requestorId: Uuid!) {
    requestPayment(
      amountInUsd: $amount
      budgetId: $budgetId
      reason: "{}"
      recipientId: $contributorId
      requestorId: $requestorId
    )
  }
`;

const mapFormDataToSchema = ({ amountToWire, contributor }: Inputs) => {
  return {
    variables: {
      amount: amountToWire,
      contributorId: contributor,
    },
  };
};

export default PaymentForm;
