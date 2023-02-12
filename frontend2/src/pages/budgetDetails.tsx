import { endOfMonth, isFuture } from "date-fns";
import ButtonRedirect from "@/components/buttons/redirectButton";
import Modal from "@/components/modal/modal";
import ProgressBar from "@/components/ui/progressBar";
import { useCloseModal } from "@/hooks/useCloseWindow";
import { useGetBudgetDetails } from "@/services/budget-services";
import { motion } from "framer-motion";
import { formatDate } from "@/services/format/date";
import ModalHeader from "@/components/modal/modalHeader";

import { TransactionsInBudget, BudgetName } from "@/features/budgetDetails";
import {
  parentVariants,
  transitionFadeInVariants,
} from "@/utils/reusableVariants";

const BudgetDetails = () => {
  useCloseModal();

  const queryBudgetDetail = useGetBudgetDetails();
  const budgetDetails = queryBudgetDetail?.data;

  return (
    <Modal>
      <motion.section
        variants={parentVariants}
        initial="initial"
        animate="ending"
        custom={0.15}
        className="flex flex-col gap-6 p-6"
      >
        <ModalHeader label="Budget details" />

        {budgetDetails ? (
          <>
            <BudgetName budget={budgetDetails} />
            <motion.div
              variants={transitionFadeInVariants}
              transition={{ type: "tween" }}
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
          </>
        ) : (
          <h3>Loading@.</h3>
        )}
      </motion.section>
    </Modal>
  );
};

export default BudgetDetails;
