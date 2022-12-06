import { UpdateIcon } from "./../../../components/UI/UpdateIcon";
import { DeleteIcon } from "./../../../components/UI/DeleteIcon";
import React from "react";
import Card from "../../../components/UI/Card";
import classes from "./BudgetPreviews.module.css";

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

export function BudgetPreviews({
  budgetsInActiveDate,
  activeTimeSpan,
  activeDate,
}) {
  const formatBudgetDate =
    activeTimeSpan === "Yearly"
      ? activeDate.getFullYear()
      : `${activeDate.toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })} `;

  return (
    <section>
      <h3>Budget previews</h3>
      <ul className={classes["previews-grid"]}>
        {budgetsInActiveDate.map((budget) => (
          <li key={budget.id} className={classes.preview}>
            <Card>
              <div className={classes["budget-header"]}>
                <p className={classes["budget-header__title"]}>{budget.name}</p>
                <div className={classes["budget-header__handlers"]}>
                  <UpdateIcon />
                  <DeleteIcon />
                </div>
              </div>
              <p className={classes["budget-date"]}>{formatBudgetDate}</p>
              <p className={classes["budget-amount"]}>
                <span
                  style={{
                    fontWeight: 600,
                    color:
                      budget.maxAmount >= budget.usedAmount
                        ? "#95cba0"
                        : "#ee7172",
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
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
