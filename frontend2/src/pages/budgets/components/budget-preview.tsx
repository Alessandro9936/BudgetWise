import Card from "../../../components/Utilities/card";
import {
  useGetBudgetsByDate,
  usePrefetchBudgetDetail,
} from "../../../services/budget-services";

import ProgressBar from "../../../components/UI/progress-bar";
import { getBudgetUI } from "../../../utils/getBudgetUI";

import { motion } from "framer-motion";
import { formatMonth } from "../../../services/format/date";

import UpdateIcon from "../../../components/Icons/UpdateIcon";
import DeleteIcon from "../../../components/Icons/DeleteIcon";
import {
  budgetPreviewChildrenVariants,
  budgetPreviewParentVariants,
} from "../utils/variants";

interface IBudgetPreviews {
  activeDate: Date;
  timeSpan: string;
}

const BudgetPreviews = ({ activeDate, timeSpan }: IBudgetPreviews) => {
  const query = useGetBudgetsByDate(activeDate, timeSpan);
  const budgets = query?.data ?? [];
  const { prefetchBudgetDetails } = usePrefetchBudgetDetail();

  const formatBudgetDate = (budgetDate: Date) => {
    return timeSpan === "Yearly"
      ? budgetDate.getFullYear()
      : formatMonth(budgetDate);
  };

  return (
    <motion.div
      variants={budgetPreviewParentVariants}
      initial="initial"
      animate="ending"
      className="relative flex-1 overflow-auto"
    >
      <h3 className="mb-4">Budget Previews</h3>
      <ul className="mb-16 grid grid-cols-autoFillBudgets gap-8 overflow-y-auto midsm:mb-0">
        {budgets.map((budget) => {
          const budgetUI = getBudgetUI(budget.name);

          return (
            <motion.li
              variants={budgetPreviewChildrenVariants}
              key={budget._id}
            >
              <Card classNames="dark:bg-slate-800 py-4 px-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold">{budgetUI?.label}</p>
                  {timeSpan === "Monthly" && (
                    <div
                      className="flex items-center gap-2"
                      onMouseOver={() => prefetchBudgetDetails(budget._id)}
                    >
                      <UpdateIcon id={budget._id} />
                      <DeleteIcon id={budget._id} />
                    </div>
                  )}
                </div>
                <p className="mb-4 mt-1 text-xs font-semibold text-neutral-400">
                  {formatBudgetDate(budget.date)}
                </p>
                <ProgressBar budget={budget} />
              </Card>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default BudgetPreviews;
