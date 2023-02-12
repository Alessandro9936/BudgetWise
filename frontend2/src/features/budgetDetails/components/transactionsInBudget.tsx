import { BudgetResponse } from "@/services/budget-services";
import { useGetTransactionsInBudget } from "@/services/transaction-services";
import { cardVariants } from "../utils/variants";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ToggleIcon from "@/components/icons/toggleIcon";
import TransactionCard from "@/components/ui/transactionCard";
import {
  parentVariants,
  transitionFadeInVariants,
} from "@/utils/reusableVariants";

const TransactionsInBudget = ({ budget }: { budget: BudgetResponse }) => {
  const [showTransactions, setShowTransactions] = useState(false);

  // This query has the job to retrieve all the expenses that are inside previewed budget
  const queryTransactionsInBudget = useGetTransactionsInBudget(budget);
  const transactionsInBudget = queryTransactionsInBudget?.data ?? [];

  return (
    <motion.div
      variants={transitionFadeInVariants}
      transition={{ type: "tween" }}
    >
      <div
        className="flex cursor-pointer items-center"
        onClick={() => setShowTransactions(!showTransactions)}
      >
        <p>Show recent transactions</p>
        <ToggleIcon trigger={showTransactions} />
      </div>

      <AnimatePresence>
        {transactionsInBudget.length > 0 && showTransactions && (
          <motion.div
            variants={parentVariants}
            initial="initial"
            animate="ending"
            custom={0.15}
            exit="exit"
          >
            {transactionsInBudget.map((transaction) => (
              <motion.div key={transaction._id} variants={cardVariants}>
                <TransactionCard
                  key={transaction._id}
                  transaction={transaction}
                  disabled={true}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TransactionsInBudget;
