import { MoreHorizontal } from "react-feather";
import { ITransaction } from "../../services/transaction-services";

const TransactionCard = ({
  transaction,
  disabled,
}: {
  transaction: ITransaction;
  disabled?: boolean;
}) => {
  return (
    <div className="relative flex animate-appear flex-col gap-1 rounded-lg p-4 shadow-[0_0_8px_rgba(0,0,0,0.1)]">
      <p className="font-semibold">{transaction.description}</p>
      <p>{transaction.date.toDateString()}</p>
      <p
        className={`${
          transaction.type === "income" ? "text-green-500" : "text-red-500"
        } font-semibold`}
      >
        {transaction.amount} {transaction.currency}
      </p>
      {!disabled && (
        <MoreHorizontal className="absolute right-3 top-1 cursor-pointer" />
      )}
    </div>
  );
};

export default TransactionCard;
