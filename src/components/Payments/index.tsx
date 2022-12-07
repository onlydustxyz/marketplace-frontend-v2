import { useFormatMessage } from "src/hooks/useIntl";
import { Payment } from "src/types";
import PaymentLine from "./PaymentLine";

type PropsType = {
  payments: Payment[];
};

const PaymentTable: React.FC<PropsType> = ({ payments }) => {
  const formatMessage = useFormatMessage();
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-white text-sm font-medium">
              <thead className="border-b">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left">
                    {formatMessage("paymentProject")}
                  </th>
                  <th scope="col" className="px-6 py-4 text-left">
                    {formatMessage("paymentAmount")}
                  </th>
                  <th scope="col" className="px-6 py-4 text-left">
                    {formatMessage("paymentStatus")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <PaymentLine payment={payment} key={payment.id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentTable;
