import { BudgetChart } from "./components/BudgetChart";
import { BudgetPreviews } from "./components/BudgetPreviews";
import { Bar } from "./components/Bar";
import { ContentGrid } from "../../components/UI/ContentGrid";
import classes from "./Budgets.module.css";

import { useActiveDates } from "../hooks/useActiveDates";
import { TimeSpanSelector } from "../../components/UI/TimeSpanSelector";
import { DateBar } from "../../components/UI/DateBar";

import { budgets } from "../../../data/data";
import { isSameMonth, isSameYear } from "date-fns";

export default function Budgets() {
  const {
    updateActiveDate,
    updateActiveTimeSpan,
    activeDate,
    activeTimeSpan,
    activeDateFormatted,
  } = useActiveDates();

  const activeBudgets =
    activeTimeSpan === "Yearly"
      ? budgets.filter((budget) => isSameYear(budget.month, activeDate))
      : budgets.filter((budget) => isSameMonth(budget.month, activeDate));

  return (
    <ContentGrid gridAreas={classes["budget-areas"]}>
      <Bar>
        <TimeSpanSelector
          timeSpans={["Yearly", "Monthly"]}
          updateActiveTimeSpan={updateActiveTimeSpan}
          activeTimeSpan={activeTimeSpan}
        />
        <DateBar
          updateActiveDate={updateActiveDate}
          activeDate={activeDateFormatted}
        />
      </Bar>
      <BudgetPreviews />
      <BudgetChart
        activeBudgets={activeBudgets}
        activeTimeSpan={activeTimeSpan}
      />
    </ContentGrid>
  );
}
