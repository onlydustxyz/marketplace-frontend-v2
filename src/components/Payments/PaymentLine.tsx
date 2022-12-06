import { Payment, PaymentStatus } from "src/types";

type PropsType = {
  payment: Payment;
};

const renderPaymentStatus = (paymentStatus: PaymentStatus): React.ReactElement => (
  <>
    {paymentStatus === PaymentStatus.ACCEPTED && <span className="text-green-500">Completed</span>}
    {paymentStatus === PaymentStatus.WAITING_PAYMENT && <span className="text-blue-600">Processing</span>}
  </>
);

const PaymentLine: React.FC<PropsType> = ({ payment }) => (
  <tr className="border-b">
    <td className="px-6 py-4 whitespace-nowrap">
      <div>{payment.project.title}</div>
      <div>{payment.project.description}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">{`${payment.amount.value} ${payment.amount.currency}`} </td>
    <td className="px-6 py-4 whitespace-nowrap">{renderPaymentStatus(payment.status)}</td>
  </tr>
);

export default PaymentLine;
