import { Outlet } from "react-router-dom";
import TimeSpanButton from "@/components/buttons/timespanButton";
import DateBar from "@/components/ui/dateBar";
import useActiveDates from "@/hooks/useActiveDates";
import { useGetBudgetsByDate } from "@/services/budget-services";
import { motion } from "framer-motion";

import { BudgetPreviews, BudgetsChart } from "@/features/budgets";
import {
  parentVariants,
  transitionFadeInVariants,
} from "@/utils/reusableVariants";

const Budgets = () => {
  const {
    updateActiveDate,
    updateActiveTimeSpan,
    activeDate,
    activeTimeSpan,
    activeDateFormatted,
  } = useActiveDates();

  const { isLoading } = useGetBudgetsByDate(new Date(), "Monthly");

  return (
    <section className="flex w-full flex-1 flex-col gap-6 bg-neutral-100 p-6 dark:bg-slate-900 md:h-screen md:flex-row">
      {!isLoading ? (
        <>
          <motion.section
            variants={parentVariants}
            initial="initial"
            animate="ending"
            transition={{ type: "tween" }}
            className="flex min-w-[320px] basis-3/12 flex-col gap-y-4"
          >
            <motion.div
              variants={transitionFadeInVariants}
              transition={{ type: "tween" }}
              className="mx-auto flex gap-x-6"
            >
              {["Yearly", "Monthly"].map((timeSpan) => (
                <TimeSpanButton
                  key={timeSpan}
                  timeSpan={timeSpan as "Yearly" | "Monthly"}
                  activeTimeSpan={activeTimeSpan}
                  updateActiveTimeSpan={updateActiveTimeSpan}
                />
              ))}
            </motion.div>

            <DateBar
              updateActiveDate={updateActiveDate}
              activeDate={activeDate}
              activeTimeSpan={activeTimeSpan}
              activeDateFormatted={activeDateFormatted}
              toPrefetch="budget"
            />

            <BudgetsChart
              activeDate={activeDate}
              timeSpan={activeTimeSpan}
              activeDateFormatted={activeDateFormatted}
            />
          </motion.section>

          <BudgetPreviews activeDate={activeDate} timeSpan={activeTimeSpan} />
          <Outlet />
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </section>
  );
};

export default Budgets;
