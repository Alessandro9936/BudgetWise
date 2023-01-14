import { MoreHorizontal } from "react-feather";
import { Link } from "react-router-dom";
import { getCurrency } from "../../context/user-context";
import { ITransactionResponse } from "../../services/transaction-services";

const TransactionCard = ({
  transaction,
  disabled,
}: {
  transaction: ITransactionResponse;
  disabled?: boolean;
}) => {
  const currency = getCurrency();
  return (
    <div className="relative flex flex-col gap-1 rounded-lg p-4 shadow-[0_0_8px_rgba(0,0,0,0.1)]">
      <p className="font-semibold">{transaction.description}</p>
      <p>{transaction.date.toDateString()}</p>
      <p
        className={`${
          transaction.type === "income" ? "text-green-500" : "text-red-500"
        } font-semibold`}
      >
        {transaction.amount} {currency}
      </p>
      {!disabled && (
        <Link to={`transaction/${transaction._id}`}>
          <MoreHorizontal className="absolute right-3 top-1 cursor-pointer" />
        </Link>
      )}
    </div>
  );
};

export default TransactionCard;
