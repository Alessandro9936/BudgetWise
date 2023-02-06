import { endOfMonth, isFuture } from "date-fns";
import ButtonRedirect from "../../components/Buttons/ButtonRedirect";
import CloseIcon from "../../components/Icons/CloseIcon";
import Modal from "../../components/Utilities/modal";
import ProgressBar from "../../components/UI/progress-bar";
import TransactionCard from "../../components/UI/TransactionCard";
import { useCloseModal } from "../../hooks/useCloseWindow";
import {
  IBudgetResponse,
  useGetBudgetDetails,
} from "../../services/budget-services";
import { useGetTransactionsInBudget } from "../../services/transaction-services";
import { getBudgetUI } from "../../utils/getBudgetUI";

import { AnimatePresence, motion } from "framer-motion";
import ToggleMenu from "../../components/Icons/ToggleMenu";
import { useState } from "react";
import {
  cardVariants,
  childrenVariants,
  parentVariants,
} from "./utils/variants";
import { formatDate } from "../../services/format/date";

const BudgetDetails = () => {
  useCloseModal();

  const queryBudgetDetail = useGetBudgetDetails();
  const budgetDetails = queryBudgetDetail?.data;

  return (
    budgetDetails && (
      <Modal>
        <motion.section
          variants={parentVariants}
          initial="initial"
          animate="ending"
          className="flex flex-col gap-6 p-6"
        >
          <motion.div
            variants={childrenVariants}
            className="flex items-center justify-between"
          >
            <h1 className="text-2xl font-semibold">Budget details</h1>
            <CloseIcon />
          </motion.div>
          <BudgetType budget={budgetDetails} />
          <motion.div
            variants={childrenVariants}
            className="flex items-center justify-between"
          >
            <p className="font-semibold">Budget month</p>
            <p>{formatDate(budgetDetails.date)}</p>
          </motion.div>
          <TransactionsInBudget budget={budgetDetails} />
          <ProgressBar budget={budgetDetails} />

          {/* Allow to update budget only if it's not in the past */}
          {isFuture(new Date(endOfMonth(budgetDetails.date))) && (
            <ButtonRedirect
              redirect="update"
              label="Update maximum amount of budget"
              styles="button-primary"
            />
          )}
        </motion.section>
      </Modal>
    )
  );
};

const BudgetType = ({ budget }: { budget: IBudgetResponse }) => {
  const BudgetUI = getBudgetUI(budget.name);

  return (
    <motion.div
      variants={childrenVariants}
      className="flex items-center justify-between"
    >
      <p className="font-semibold">Budget type</p>
      <p
        className="rounded-lg border-2 px-2 py-[2px] font-semibold"
        style={{
          borderColor: BudgetUI?.color,
          color: BudgetUI?.color,
        }}
      >
        {BudgetUI?.label}
      </p>
    </motion.div>
  );
};

const TransactionsInBudget = ({ budget }: { budget: IBudgetResponse }) => {
  const [showTransactions, setShowTransactions] = useState(false);

  // This query has the job to retrieve all the expenses that are inside previewed budget
  const queryTransactionsInBudget = useGetTransactionsInBudget(budget);
  const transactionsInBudget = queryTransactionsInBudget?.data ?? [];

  return (
    <motion.div variants={childrenVariants}>
      <div
        className="flex cursor-pointer items-center"
        onClick={() => setShowTransactions(!showTransactions)}
      >
        <p>Show recent transactions</p>
        <ToggleMenu trigger={showTransactions} />
      </div>

      <AnimatePresence>
        {transactionsInBudget.length > 0 && showTransactions && (
          <motion.div
            variants={parentVariants}
            initial="initial"
            animate="ending"
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

export default BudgetDetails;
