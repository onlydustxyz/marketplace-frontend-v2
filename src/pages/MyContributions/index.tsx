import { gql } from "@apollo/client";
import PaymentTable from "src/components/Payments";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useFormatMessage } from "src/hooks/useIntl";
import { Currency, HasuraUserRole, Payment, PaymentStatus } from "src/types";
import { GetMyContributionsQuery, GetMyContributionsQueryVariables } from "src/__generated/graphql";

const MyContributions = () => {
  const { user } = useAuth();
  const query = useHasuraQuery<GetMyContributionsQuery, GetMyContributionsQueryVariables>(
    GET_MY_CONTRIBUTIONS_QUERY,
    HasuraUserRole.User,
    {
      variables: { userId: user?.id },
    }
  );
  const { data } = query;
  const payments = data?.paymentRequests?.map(mapApiPaymentsToProps) ?? null;
  const hasPayments = payments && payments.length > 0;
  const formatMessage = useFormatMessage();

  return (
    <QueryWrapper query={query}>
      {hasPayments ? <PaymentTable payments={payments} /> : <p>{formatMessage("noContributionsYet")}</p>}
    </QueryWrapper>
  );
};

// TODO: replace this any with GraphQL-generated ts types
const mapApiPaymentsToProps = (apiPayment: any): Payment => {
  const amount = { value: apiPayment.amountInUsd, currency: Currency.USD };
  const project = apiPayment.budget.project;
  const getPaidAmount = (payments: { amount: number }[]) =>
    payments.reduce((total: number, payment: { amount: number }) => total + payment.amount, 0);

  return {
    id: apiPayment.id,
    amount,
    project: {
      id: project.id,
      title: project.name,
      description: project.projectDetails.description,
    },
    status:
      getPaidAmount(apiPayment.payments) === apiPayment.amountInUsd
        ? PaymentStatus.ACCEPTED
        : PaymentStatus.WAITING_PAYMENT,
  };
};

export const GET_MY_CONTRIBUTIONS_QUERY = gql`
  query GetMyContributions($userId: uuid!) {
    paymentRequests(where: { recipientId: { _eq: $userId } }) {
      id
      payments {
        amount
        currencyCode
      }
      amountInUsd
      budget {
        project {
          id
          name
          projectDetails {
            description
          }
        }
      }
    }
  }
`;

export default MyContributions;
