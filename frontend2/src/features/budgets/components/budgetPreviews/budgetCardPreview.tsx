import {
  BudgetResponse,
  usePrefetchBudgetDetail,
} from "@/services/budget-services";
import { formatMonth } from "@/services/format/date";
import { TimeSpanType } from "@/types/timeSpanType";
import { motion } from "framer-motion";
import UpdateIcon from "@/components/icons/updateIcon";
import DeleteIcon from "@/components/icons/deleteIcon";
import ProgressBar from "@/components/ui/progressBar";
import Card from "@/components/wrapper/card";
import { getBudgetUI } from "@/utils/getBudgetUI";
import { fadeInVariants } from "@/utils/reusableVariants";

type BudgetCardPreviewProps = {
  budget: BudgetResponse;
  timeSpan: TimeSpanType;
};

const BudgetCardPreview = ({ budget, timeSpan }: BudgetCardPreviewProps) => {
  const { prefetchBudgetDetails } = usePrefetchBudgetDetail();

  const formatBudgetDate = (budgetDate: Date) => {
    return timeSpan === "Yearly"
      ? budgetDate.getFullYear()
      : formatMonth(budgetDate);
  };
  const budgetUI = getBudgetUI(budget.name);

  return (
    <motion.li variants={fadeInVariants}>
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
};

export default BudgetCardPreview;
