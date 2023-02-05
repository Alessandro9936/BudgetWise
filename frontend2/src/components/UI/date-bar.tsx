import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import { motion } from "framer-motion";
import { addMonths, addYears, subMonths, subYears } from "date-fns";
import { childVariants } from "../../pages/dashboard/utils/variants";
import { usePrefetchTransactionsByDate } from "../../services/transaction-services";
import { formatMonth } from "../../services/format/date";
import { usePrefetchBudgetsByDate } from "../../services/budget-services";

interface IDateBar {
  updateActiveDate: (action: "sub" | "add") => void;
  activeDate: Date;
  activeTimeSpan: "Yearly" | "Monthly" | "Weekly";
  activeDateFormatted: string | number;
  toPrefetch: "transactions" | "budgets";
}

const DateBar = ({
  updateActiveDate,
  activeDate,
  activeDateFormatted,
  activeTimeSpan,
  toPrefetch,
}: IDateBar) => {
  const { prefetchTransactions } = usePrefetchTransactionsByDate();
  const { prefetchBudgets } = usePrefetchBudgetsByDate();

  const prefetchOnHover = (dateToPrefetch: Date) => {
    const formatDate =
      activeTimeSpan === "Yearly"
        ? dateToPrefetch.getFullYear()
        : formatMonth(dateToPrefetch);

    toPrefetch === "transactions"
      ? prefetchTransactions(formatDate)
      : prefetchBudgets(formatDate);
  };

  return (
    <motion.div
      variants={childVariants}
      className="flex items-center justify-between rounded-full bg-white py-1 px-[6px] text-sm font-semibold shadow dark:bg-slate-800"
    >
      <button
        onMouseOver={() =>
          prefetchOnHover(
            activeTimeSpan === "Yearly"
              ? subYears(activeDate, 1)
              : subMonths(activeDate, 1)
          )
        }
        className="cursor-pointer rounded-full bg-slate-700 p-1 text-white transition hover:bg-indigo-500 dark:bg-slate-600"
        onClick={() => updateActiveDate("sub")}
      >
        <BiChevronLeft size={18} className="stroke-white" />
      </button>
      <p>{activeDateFormatted}</p>
      <button
        onMouseOver={() =>
          prefetchOnHover(
            activeTimeSpan === "Yearly"
              ? addYears(activeDate, 1)
              : addMonths(activeDate, 1)
          )
        }
        className="cursor-pointer rounded-full bg-slate-700 p-1 text-white transition hover:bg-indigo-500 dark:bg-slate-600"
        onClick={() => updateActiveDate("add")}
      >
        <BiChevronRight size={18} className="stroke-white" />
      </button>
    </motion.div>
  );
};

export default DateBar;
