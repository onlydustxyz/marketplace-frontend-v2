import { Payment } from "src/types";
import PaymentLine from "./PaymentLine";

type PropsType = {
  payments: Payment[];
};

const PaymentTable: React.FC<PropsType> = ({ payments }) => (
  <table className="table-auto">
    <thead>
      <tr className="gap-3">
        <th>Project</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {payments.map(payment => (
        <PaymentLine payment={payment} key={payment.id} />
      ))}
    </tbody>
  </table>
);

export default PaymentTable;
