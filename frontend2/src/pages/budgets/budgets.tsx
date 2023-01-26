import { Outlet } from "react-router-dom";
import TimeSpanButton from "../../components/Buttons/TimeSpanButton";
import DateBar from "../../components/UI/date-bar";
import useActiveDates from "../../hooks/useActiveDates";
import { useGetBudgetsByDate } from "../../services/budget-services";
import BudgetPreviews from "./components/budget-preview";
import BudgetsChart from "./components/budgets-chart";
import { motion } from "framer-motion";

const parentVariants = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.25,
      staggerChildren: 0.15,
    },
  },
};

const childVariants = {
  initial: { opacity: 0, y: 20 },
  ending: { opacity: 1, y: 0, transition: { type: "tween" } },
};

const Budgets = () => {
  const {
    updateActiveDate,
    updateActiveTimeSpan,
    activeDate,
    activeTimeSpan,
    activeDateFormatted,
  } = useActiveDates();

  const query = useGetBudgetsByDate(new Date(), "Monthly");
  const isLoading = query.isLoading;

  return (
    <section className="flex w-full flex-1 flex-col gap-6 bg-gray-100 p-6 dark:bg-slate-900 md:h-screen md:flex-row">
      {!isLoading ? (
        <>
          <motion.div
            variants={parentVariants}
            initial="initial"
            animate="ending"
            className="flex min-w-[320px] basis-3/12 flex-col gap-y-4 "
          >
            <motion.div
              variants={childVariants}
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
            <motion.div variants={parentVariants}>
              <DateBar
                updateActiveDate={updateActiveDate}
                activeDateFormatted={activeDateFormatted}
              />
            </motion.div>
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
