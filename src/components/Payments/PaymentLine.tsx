import { Payment } from "src/types";

type PropsType = {
  payment: Payment;
};

const PaymentLine: React.FC<PropsType> = ({ payment }) => (
  <tr>
    <td className="flex flex-col">
      <div>{payment.project.title}</div>
      <div>{payment.project.description}</div>
    </td>
    <td>{payment.amount}</td>
    <td>{payment.status}</td>
  </tr>
);

export default PaymentLine;
