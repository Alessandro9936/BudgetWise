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
import { Outlet } from "react-router-dom";

export default function Budgets() {
  const {
    updateActiveDate,
    updateActiveTimeSpan,
    activeDate,
    activeTimeSpan,
    activeDateFormatted,
  } = useActiveDates();

  const budgetsInActiveDate =
    activeTimeSpan !== "Yearly"
      ? budgets.filter((budget) => isSameMonth(budget.month, activeDate))
      : budgets
          .filter((budget) => isSameYear(budget.month, activeDate))
          .reduce((acc, curBudget) => {
            const budgetByName = acc.find((bud) => bud.name === curBudget.name);
            if (!budgetByName) {
              acc = [
                ...acc,
                {
                  name: curBudget.name,
                  usedAmount: curBudget.usedAmount,
                  maxAmount: curBudget.maxAmount,
                  id: curBudget.id,
                },
              ];
            } else {
              budgetByName.usedAmount += curBudget.usedAmount;
              budgetByName.maxAmount += curBudget.maxAmount;
            }
            return acc;
          }, []);

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
      <BudgetPreviews
        budgetsInActiveDate={budgetsInActiveDate}
        activeTimeSpan={activeTimeSpan}
        activeDate={activeDate}
      />
      <BudgetChart
        budgetsInActiveDate={budgetsInActiveDate}
        activeDateFormatted={activeDateFormatted}
      />
      <Outlet />
    </ContentGrid>
  );
}
