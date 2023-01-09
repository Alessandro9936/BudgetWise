import { Outlet } from "react-router-dom";
import TimeSpanButton from "../../components/Buttons/TimeSpanButton";
import DateBar from "../../components/date-bar";
import useActiveDates from "../../hooks/useActiveDates";
import BudgetPreviews from "./components/budget-preview";
import BudgetsChart from "./components/budgets-chart";
const Budgets = () => {
  const {
    updateActiveDate,
    updateActiveTimeSpan,
    activeDate,
    activeTimeSpan,
    activeDateFormatted,
  } = useActiveDates();

  return (
    <section className="flex w-full flex-1 flex-col gap-6 overflow-hidden overflow-x-hidden bg-gray-100 p-6 md:h-screen md:flex-row">
      <div className="flex min-w-[320px] basis-3/12 flex-col gap-y-6 ">
        <div className="mx-auto flex gap-x-6">
          {["Yearly", "Monthly"].map((timeSpan) => (
            <TimeSpanButton
              key={timeSpan}
              timeSpan={timeSpan as "Yearly" | "Monthly"}
              activeTimeSpan={activeTimeSpan}
              updateActiveTimeSpan={updateActiveTimeSpan}
            />
          ))}
        </div>
        <DateBar
          updateActiveDate={updateActiveDate}
          activeDateFormatted={activeDateFormatted}
        />
        <BudgetsChart
          activeDate={activeDate}
          timeSpan={activeTimeSpan}
          activeDateFormatted={activeDateFormatted}
        />
      </div>

      <BudgetPreviews
        activeDate={activeDate}
        timeSpan={activeTimeSpan}
        activeDateFormatted={activeDateFormatted}
      />
      <Outlet />
    </section>
  );
};

export default Budgets;
