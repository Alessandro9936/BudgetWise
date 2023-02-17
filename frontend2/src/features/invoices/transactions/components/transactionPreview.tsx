import { getCurrency } from "@/context/userContext";
import {
  TransactionResponse,
  usePrefetchTransactionDetails,
} from "@/services/transaction-services";
import { getBudgetUI } from "@/utils/getBudgetUI";
import { motion } from "framer-motion";
import UpdateIcon from "@/components/icons/updateIcon";
import StateTag from "@/components/ui/stateTag";
import { fadeInVariants } from "@/utils/reusableVariants";

const TransactionPreview = ({
  transaction,
}: {
  transaction: TransactionResponse;
}) => {
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
      variants={fadeInVariants}
      initial="initial"
      animate="ending"
      className="flex min-h-[50px] flex-1 items-center border-b border-neutral-200 last-of-type:border-none  dark:border-slate-600"
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
        {transaction.state && <StateTag state={transaction.state} />}
      </div>
      <span
        className="ml-auto"
        onMouseEnter={() => prefetchTransactionDetails(transaction._id)}
      >
        <UpdateIcon id={`transaction/${transaction._id}`} />
      </span>
    </motion.li>
  );
};

export default TransactionPreview;
