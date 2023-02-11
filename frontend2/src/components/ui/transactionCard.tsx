import { BiDotsHorizontalRounded, BiMoney } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getCurrency } from "@/context/userContext";
import {
  TransactionResponse,
  usePrefetchTransactionDetails,
} from "@/services/transaction-services";
import { motion } from "framer-motion";
import { getBudgetUI } from "@/utils/getBudgetUI";
import { formatDate } from "@/services/format/date";

const childVariants = {
  initial: { opacity: 0, y: 20 },
  ending: { opacity: 1, y: 0, transition: { type: "tween" } },
};

interface TransactionCardProps {
  transaction: TransactionResponse;
  disabled?: boolean;
}

const TransactionCard = ({ transaction, disabled }: TransactionCardProps) => {
  const currency = getCurrency();
  const { prefetchTransactionDetails } = usePrefetchTransactionDetails();

  return (
    <motion.div
      variants={childVariants}
      className="flex items-center gap-4 rounded-lg p-4 shadow-[0_0_6px_rgba(0,0,0,0.1)] dark:bg-slate-700"
    >
      <TransactionIcon transaction={transaction} />
      <div className="flex-1">
        <div className="mb-1 flex items-center justify-between">
          <p className="font-semibold">{transaction.description}</p>

          {/* Display icon that redirect to update transaction if disable props is false */}
          {!disabled && (
            <Link to={`transaction/${transaction._id}`}>
              <BiDotsHorizontalRounded
                size={24}
                onMouseEnter={() => prefetchTransactionDetails(transaction._id)}
              />
            </Link>
          )}
        </div>

        <div className="flex flex-col justify-between text-sm font-semibold text-neutral-400 midsm:flex-row midsm:items-center">
          <p>{formatDate(transaction.date)}</p>
          <p
            className={`text-sm font-semibold ${
              transaction.type === "income" ? "text-green-400" : "text-red-400"
            }`}
          >
            {transaction.amount} {currency}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const TransactionIcon = ({
  transaction,
}: {
  transaction: TransactionResponse;
}) => {
  if (transaction.type === "expense" && transaction.budget) {
    return getBudgetUI(transaction.budget.name)!.icon;
  }

  return (
    <div className="flex h-fit items-center justify-center rounded-full bg-[rgba(74,222,128,0.25)] p-2">
      <BiMoney size={24} color={"rgba(74,222,128,0.7)"} />
    </div>
  );
};

export default TransactionCard;
