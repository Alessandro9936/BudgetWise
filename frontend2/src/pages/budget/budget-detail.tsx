import { endOfMonth, isFuture } from "date-fns";
import ButtonRedirect from "../../components/Buttons/ButtonRedirect";
import CloseIcon from "../../components/Icons/CloseIcon";
import Modal from "../../components/Utilities/modal";
import ProgressBar from "../../components/UI/progress-bar";
import TransactionCard from "../../components/UI/TransactionCard";
import { useCloseModal } from "../../hooks/useCloseWindow";
import { useGetBudgetDetails } from "../../services/budget-services";
import { useGetTransactionsBudgetPreview } from "../../services/transaction-services";
import budgets from "../../constants/all-budgets";

import { motion } from "framer-motion";

const parentVariants = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.25,
      staggerChildren: 0.15,
    },
  },
};

const childrenVariants = {
  initial: { opacity: 0, y: 20 },
  ending: { opacity: 1, y: 0, transition: { type: "tween" } },
};

const BudgetDetails = () => {
  useCloseModal();

  const queryBudgetDetail = useGetBudgetDetails();
  const budgetDetails = queryBudgetDetail?.data;

  const queryTransactionsInBudget =
    useGetTransactionsBudgetPreview(budgetDetails);
  const transactionsInBudget = queryTransactionsInBudget?.data;

  const budgetView = budgets.find(
    (_budget) => _budget.name === budgetDetails?.name
  );

  return (
    <>
      {transactionsInBudget && budgetDetails && (
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
            <motion.div
              variants={childrenVariants}
              className="flex items-center justify-between"
            >
              <p className="font-semibold">Budget type</p>
              <p
                className="rounded-lg border-2 px-2 py-[2px] font-semibold"
                style={{
                  borderColor: budgetView?.color,
                  color: budgetView?.color,
                }}
              >
                {budgetView?.label}
              </p>
            </motion.div>
            <motion.div
              variants={childrenVariants}
              className="flex items-center justify-between"
            >
              <p className="font-semibold">Budget month</p>
              <p>
                {budgetDetails.date.toLocaleDateString(navigator.language, {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </motion.div>
            {transactionsInBudget.length > 0 && (
              <div className="flex max-h-[300px] flex-col gap-y-2 overflow-y-auto p-1">
                {transactionsInBudget.map((transaction) => (
                  <motion.div variants={childrenVariants}>
                    <TransactionCard
                      key={transaction._id}
                      transaction={transaction}
                      disabled={true}
                    />
                  </motion.div>
                ))}
              </div>
            )}
            <motion.div variants={childrenVariants}>
              <ProgressBar budget={budgetDetails} />
            </motion.div>
            {isFuture(new Date(endOfMonth(budgetDetails.date))) && (
              <ButtonRedirect
                redirect="update"
                label="Update maximum amount of budget"
                styles="button-primary"
              />
            )}
          </motion.section>
        </Modal>
      )}
    </>
  );
};
export default BudgetDetails;
