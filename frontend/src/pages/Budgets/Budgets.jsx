import { BudgetChart } from "./components/BudgetChart";
import { BudgetPreviews } from "./components/BudgetPreviews";
import { ContentGrid } from "../../components/UI/ContentGrid";
import classes from "./Budgets.module.css";

import { useActiveDates } from "../hooks/useActiveDates";
import { TimeSpanSelector } from "../../components/UI/TimeSpanSelector";
import { DateBar } from "../../components/UI/DateBar";

import { Outlet } from "react-router-dom";
import { useGetBudgetsByDate } from "../../utils/queryBudget";

import { useMemo } from "react";

export default function Budgets() {
  const {
    updateActiveDate,
    updateActiveTimeSpan,
    activeDate,
    activeTimeSpan,
    activeDateFormatted,
  } = useActiveDates();

  const query = useGetBudgetsByDate(activeDateFormatted);

  const budgets = query?.data ?? [];

  const reducedBudgets = useMemo(() => {
    if (activeTimeSpan === "Yearly" && budgets.length > 0) {
      return budgets?.reduce((acc, curBudget) => {
        const budgetByName = acc.find((bud) => bud.name === curBudget.name);
        if (!budgetByName) {
          acc = [
            ...acc,
            {
              name: curBudget.name,
              usedAmount: curBudget.usedAmount,
              maxAmount: curBudget.maxAmount,
              id: curBudget._id,
            },
          ];
        } else {
          budgetByName.usedAmount += curBudget.usedAmount;
          budgetByName.maxAmount += curBudget.maxAmount;
        }
        return acc;
      }, []);
    } else {
      return budgets;
    }
  }, [budgets]);

  return (
    <ContentGrid gridAreas={classes["budget-areas"]}>
      <section className={classes["datebar-section"]}>
        <TimeSpanSelector
          timeSpans={["Yearly", "Monthly"]}
          updateActiveTimeSpan={updateActiveTimeSpan}
          activeTimeSpan={activeTimeSpan}
        />
        <DateBar
          updateActiveDate={updateActiveDate}
          activeDate={activeDateFormatted}
        />
      </section>
      ;
      <BudgetPreviews
        budgetsInActiveDate={reducedBudgets}
        activeTimeSpan={activeTimeSpan}
        activeDate={activeDate}
      />
      <BudgetChart
        budgetsInActiveDate={reducedBudgets}
        activeDateFormatted={activeDateFormatted}
      />
      <Outlet />
    </ContentGrid>
  );
}
