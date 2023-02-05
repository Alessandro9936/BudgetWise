import { Outlet } from "react-router-dom";
import TimeSpanButton from "../../components/Buttons/TimeSpanButton";
import DateBar from "../../components/UI/date-bar";
import useActiveDates from "../../hooks/useActiveDates";
import { useGetBudgetsByDate } from "../../services/budget-services";
import BudgetPreviews from "./components/budget-preview";
import BudgetsChart from "./components/budgets-chart";
import { motion } from "framer-motion";
import { childVariants, parentVariants } from "./utils/variants";

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
          <motion.div
            variants={parentVariants}
            initial="initial"
            animate="ending"
            transition={{ type: "tween" }}
            className="flex min-w-[320px] basis-3/12 flex-col gap-y-4 "
          >
            <motion.div
              variants={childVariants}
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
              toPrefetch="budgets"
            />

            <BudgetsChart
              activeDate={activeDate}
              timeSpan={activeTimeSpan}
              activeDateFormatted={activeDateFormatted}
            />
          </motion.div>

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
