import { useGetBudgetsByDate } from "@/services/budget-services";
import { motion } from "framer-motion";
import { budgetPreviewParentVariants } from "../../utils/variants";
import BudgetCardPreview from "./budgetCardPreview";
import { TimeSpanType } from "@/types/timeSpanType";

type BudgetPreviewsProps = {
  activeDate: Date;
  timeSpan: TimeSpanType;
};

const BudgetPreviews = ({ activeDate, timeSpan }: BudgetPreviewsProps) => {
  const query = useGetBudgetsByDate(activeDate, timeSpan);
  const budgets = query?.data ?? [];

  return (
    <motion.div
      variants={budgetPreviewParentVariants}
      initial="initial"
      animate="ending"
      className="relative flex-1 overflow-auto"
    >
      <h3 className="mb-4">Budget Previews</h3>
      <ul className="mb-16 grid grid-cols-autoFillBudgets gap-8 overflow-y-auto midsm:mb-0">
        {budgets.map((budget) => (
          <BudgetCardPreview
            key={budget._id}
            budget={budget}
            timeSpan={timeSpan}
          />
        ))}
      </ul>
    </motion.div>
  );
};

export default BudgetPreviews;
