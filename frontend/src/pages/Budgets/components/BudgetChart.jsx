import React from "react";
import Card from "../../../components/UI/Card";

import classes from "./BudgetChart.module.css";

import { Tooltip, Cell, Pie, PieChart } from "recharts";

const colorsPerBudgetLabel = {
  Rent: "#ff595e",
  Groceries: "#ff924c",
  Bills: "#ffca3a",
  Education: "#c5ca30",
  "Health & Fitness": "#8ac926",
  "Personal care": "#238d00",
  Shopping: "#36949d",
  Entertainment: "#1982c4",
  Travelling: "#4267ac",
  Others: "#565aa0",
  Transport: "#6a4c93",
};

export function BudgetChart({ budgetsInActiveDate, activeDateFormatted }) {
  const totalAmounts = budgetsInActiveDate.reduce(
    (acc, cur) => {
      acc.maxAmount += cur.maxAmount;
      acc.usedAmount += cur.usedAmount;
      return acc;
    },
    { usedAmount: 0, maxAmount: 0 }
  );

  const budgetLabels = budgetsInActiveDate.map((budget) => budget.name);

  const percentage = Math.ceil(
    (totalAmounts.usedAmount / totalAmounts.maxAmount) * 100
  );

  const percentageMessageDetails = `In ${activeDateFormatted} you spent ${totalAmounts.usedAmount} (
    ${percentage}%) of your total budget (${totalAmounts.maxAmount})`;

  return (
    <section className={classes["chart-section"]}>
      <h3>Budgets distribution</h3>
      <Card>
        <PieChart width={800} height={200}>
          <Pie
            data={budgetsInActiveDate}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="usedAmount"
          >
            {budgetsInActiveDate.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorsPerBudgetLabel[entry.name]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <div className={classes["amount-used"]}>
          <p className={classes["amount-used__percentage"]}>{percentage}%</p>
          <p className={classes["amount-used__details"]}>
            {percentageMessageDetails}
          </p>
        </div>
        <div className={classes["budgets-legend"]}>
          {budgetLabels.map((budgetLabel) => (
            <div className={classes.budget} key={budgetLabel}>
              <span
                className={classes["budget-color"]}
                style={{ backgroundColor: colorsPerBudgetLabel[budgetLabel] }}
              ></span>
              <span className={classes["budget-name"]}>{budgetLabel}</span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
