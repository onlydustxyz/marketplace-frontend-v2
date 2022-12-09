import { useT } from "talkr";
import { Payment, PaymentStatus } from "src/types";

type PropsType = {
  payment: Payment;
};

const renderPaymentStatus = (paymentStatus: PaymentStatus): React.ReactElement => {
  const { T } = useT();

  return (
    <>
      {paymentStatus === PaymentStatus.ACCEPTED && <span className="text-green-500">{T("paymentCompleted")}</span>}
      {paymentStatus === PaymentStatus.WAITING_PAYMENT && (
        <span className="text-blue-600">{T("paymentProcessing")}</span>
      )}
    </>
  );
};

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
