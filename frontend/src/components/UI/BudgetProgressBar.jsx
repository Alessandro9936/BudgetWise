import React from "react";
import classes from "../styles/BudgetProgressBar.module.css";

const colorsPerBudgetLabel = {
  rent: "#ff595e",
  groceries: "#ff924c",
  bills: "#ffca3a",
  education: "#c5ca30",
  "health&fitness": "#8ac926",
  personalcare: "#238d00",
  shopping: "#36949d",
  entertainment: "#1982c4",
  travelling: "#4267ac",
  others: "#565aa0",
  transport: "#6a4c93",
};

const ProgressBar = ({ progress, budgetName }) => {
  const roundProgressPercentage = Math.ceil(progress);

  return (
    <div className={classes["progress-bar_container"]}>
      <div
        style={{
          backgroundColor: colorsPerBudgetLabel[budgetName],
          width: `${roundProgressPercentage}%`,
        }}
        className={classes["progress-bar"]}
      >
        <span
          className={classes["bar-text"]}
        >{`${roundProgressPercentage}%`}</span>
      </div>
    </div>
  );
};

export function BudgetProgressBar({ budget }) {
  return (
    <>
      <p className={classes["budget-amount"]}>
        <span
          style={{
            fontWeight: 600,
            color:
              budget.maxAmount >= budget.usedAmount ? "#95cba0" : "#ee7172",
          }}
        >
          {budget.maxAmount - budget.usedAmount} $
        </span>{" "}
        left from {budget.maxAmount} $
      </p>
      <ProgressBar
        progress={(budget.usedAmount / budget.maxAmount) * 100}
        budgetName={budget.name}
      />
    </>
  );
}
