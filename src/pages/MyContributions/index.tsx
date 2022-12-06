import { gql } from "@apollo/client";
import PaymentTable from "src/components/Payments";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { Currency, HasuraUserRole, Payment, PaymentStatus } from "src/types";

const MyContributions = () => {
  const { user } = useAuth();
  const query = useHasuraQuery(GET_MY_CONTRIBUTIONS_QUERY, HasuraUserRole.User, {
    variables: { userId: user?.id },
  });
  const { data } = query;
  const payments = data?.payment_requests?.map(mapApiPaymentsToProps) ?? null;
  const hasPayments = payments && payments.length > 0;

  return (
    <QueryWrapper query={query}>
      {hasPayments ? <PaymentTable payments={payments} /> : <p>No contributions yet</p>}
    </QueryWrapper>
  );
};

const mapApiPaymentsToProps = (apiPayment: any): Payment => {
  const amount = { value: apiPayment.amount_in_usd, currency: Currency.USD };
  const project = apiPayment.budget.project;
  const getPaidAmount = (payments: { amount: number }[]) =>
    payments.reduce((total: number, payment: { amount: number }) => total + payment.amount, 0);

  return {
    id: apiPayment.id,
    amount,
    project: {
      id: project.id,
      title: project.name,
      description: project.project_details.description,
    },
    status:
      getPaidAmount(apiPayment.payments) === apiPayment.amount_in_usd
        ? PaymentStatus.ACCEPTED
        : PaymentStatus.WAITING_PAYMENT,
  };
};

export const GET_MY_CONTRIBUTIONS_QUERY = gql`
  query GetPaymentRequests($userId: uuid!) {
    payment_requests(where: { recipient_id: { _eq: $userId } }) {
      id
      payments {
        amount
        currency_code
      }
      amount_in_usd
      budget {
        project {
          id
          name
          project_details {
            description
          }
        }
      }
    }
  }
`;

export default MyContributions;
