import { useGetBudgetsByDate } from "@/services/budget-services";
import { motion } from "framer-motion";
import BudgetCardPreview from "./budgetCardPreview";
import { TimeSpanType } from "@/types/timeSpanType";
import { fadeInVariants } from "@/utils/reusableVariants";
import ContentHeader from "@/components/ui/contentHeader";

type BudgetPreviewsProps = {
  activeDate: Date;
  timeSpan: TimeSpanType;
};

const BudgetPreviews = ({ activeDate, timeSpan }: BudgetPreviewsProps) => {
  const queryBudgets = useGetBudgetsByDate(activeDate, timeSpan);
  const budgets = queryBudgets.data ?? [];
  const isFetching = queryBudgets.isFetching;

  return (
    <motion.div
      variants={fadeInVariants}
      transition={{
        type: "tween",
        duration: 0.25,
        when: "beforeChildren",
        staggerChildren: 0.15,
        delay: 0.6,
      }}
      initial="initial"
      animate="ending"
      className="relative flex-1 overflow-auto"
    >
      <ContentHeader isFetching={isFetching} sectionTitle="Budget previews" />
      <ul className="scrollbar-vertical mt-4 mb-16 grid grid-cols-autoFillBudgets gap-8 overflow-y-auto midsm:mb-0">
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
