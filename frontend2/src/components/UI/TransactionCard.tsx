import { MoreHorizontal } from "react-feather";
import { BiMoney } from "react-icons/bi";
import { Link } from "react-router-dom";
import budgets from "../../constants/all-budgets";
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
    <div className="flex flex-col items-start gap-4 rounded-lg p-4 shadow-[0_0_6px_rgba(0,0,0,0.1)] dark:bg-slate-700 midsm:flex-row midsm:items-center ">
      {transaction.type === "expense" ? (
        budgets.find((_budget) => _budget.name === transaction.budget?.name)
          ?.icon
      ) : (
        <div className="flex h-fit items-center justify-center rounded-full  bg-[rgba(74,222,128,0.25)] p-2">
          <BiMoney size={24} color={"rgba(74,222,128,0.7)"} />
        </div>
      )}
      <div className="w-full flex-1">
        <div className="mb-1 flex items-center justify-between">
          <p className="font-semibold">{transaction.description}</p>
          {!disabled && (
            <Link to={`transaction/${transaction._id}`}>
              <MoreHorizontal className="cursor-pointer" />
            </Link>
          )}
        </div>
        <div className="flex flex-col justify-between text-sm font-semibold text-neutral-400 midsm:flex-row midsm:items-center">
          <p>
            {transaction.date.toLocaleDateString(navigator.language, {
              dateStyle: "long",
            })}
          </p>
          <p
            className={`text-sm font-semibold ${
              transaction.type === "income" ? "text-green-400" : "text-red-400"
            }`}
          >
            {transaction.amount} {currency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
