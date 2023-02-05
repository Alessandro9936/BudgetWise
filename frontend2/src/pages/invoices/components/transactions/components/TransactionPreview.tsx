import { getCurrency } from "../../../../../context/user-context";
import {
  ITransactionResponse,
  usePrefetchTransactionDetails,
} from "../../../../../services/transaction-services";
import { getBudgetUI } from "../../../../../utils/getBudgetUI";

import { motion } from "framer-motion";
import UpdateIcon from "../../../../../components/Icons/UpdateIcon";

interface ITransactionPreview {
  transaction: ITransactionResponse;
}

const TransactionPreview = ({ transaction }: ITransactionPreview) => {
  const { prefetchTransactionDetails } = usePrefetchTransactionDetails();
  const currency = getCurrency();

  const budgetLabel =
    transaction.type === "expense" && transaction.budget
      ? getBudgetUI(transaction.budget.name)?.label
      : "";

  const transactionTypeLabel =
    transaction.type[0].toUpperCase() + transaction.type.slice(1);

  const transactionAmountLabel = `${
    transaction.type === "expense" ? "- " : "+ "
  } ${transaction.amount} ${currency}`;

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-1 items-center border-b border-neutral-200 last-of-type:border-none  dark:border-slate-600"
    >
      <p className="flex-1 grow-[2]">{transaction.description}</p>
      <p className="flex-1">{transactionTypeLabel}</p>
      <p className="flex-1">
        {transaction.date.toLocaleDateString(navigator.language)}
      </p>
      <p
        className={`flex-1 font-semibold ${
          transaction.type === "income" ? "text-green-400" : "text-red-400"
        }`}
      >
        {transactionAmountLabel}
      </p>
      <p className="flex-1 grow-[1.5]">{budgetLabel}</p>
      <div className="flex-1">
        <p
          className={`w-fit rounded-full py-1 px-3 text-sm font-semibold text-white
            ${
              transaction.state === "paid"
                ? "bg-green-400"
                : transaction.state === "upcoming"
                ? "bg-yellow-400"
                : transaction.state === "topay"
                ? "bg-red-400"
                : ""
            }`}
        >
          {transaction.state || ""}
        </p>
      </div>
      <p
        className="ml-auto"
        onMouseEnter={() => prefetchTransactionDetails(transaction._id)}
      >
        <UpdateIcon id={`transaction/${transaction._id}`} />
      </p>
    </motion.li>
  );
};

export default TransactionPreview;
