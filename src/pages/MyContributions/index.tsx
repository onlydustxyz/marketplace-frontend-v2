import { gql } from "@apollo/client";
import PaymentTable, { mapApiPaymentsToProps } from "src/components/PaymentTable";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useT } from "talkr";
import { HasuraUserRole } from "src/types";

const MyContributions = () => {
  const { user } = useAuth();
  const query = useHasuraQuery(GET_MY_CONTRIBUTIONS_QUERY, HasuraUserRole.User, {
    variables: { userId: user?.id },
  });
  const { data } = query;
  const payments = data?.paymentRequests?.map(mapApiPaymentsToProps) ?? null;
  const hasPayments = payments && payments.length > 0;
  const { T } = useT();

  return (
    <QueryWrapper query={query}>
      {hasPayments ? <PaymentTable payments={payments} /> : <p>{T("noContributionsYet")}</p>}
    </QueryWrapper>
  );
};

export const GET_MY_CONTRIBUTIONS_QUERY = gql`
  query GetPaymentRequests($userId: uuid!) {
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
