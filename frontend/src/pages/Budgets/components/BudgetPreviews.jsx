import { UpdateIcon } from "./../../../components/UI/UpdateIcon";
import { DeleteIcon } from "./../../../components/UI/DeleteIcon";
import { Button } from "./../../../components/UI/Button";
import React from "react";
import Card from "../../../components/UI/Card";
import classes from "./BudgetPreviews.module.css";
import { Link } from "react-router-dom";
import {
  endOfMonth,
  isAfter,
  isBefore,
  isFuture,
  isPast,
  startOfMonth,
} from "date-fns";

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
    <section className={classes["preview-section"]}>
      <h3>Budget previews</h3>
      <ul className={classes["previews-grid"]}>
        {budgetsInActiveDate.map((budget) => (
          <li key={budget.id} className={classes.preview}>
            <Card>
              <div className={classes["budget-header"]}>
                <p className={classes["budget-header__title"]}>{budget.name}</p>
                <div className={classes["budget-header__handlers"]}>
                  <UpdateIcon id={budget.id} />
                  <DeleteIcon id={budget.id} />
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

      {activeTimeSpan === "Monthly" &&
      isFuture(new Date(endOfMonth(activeDate))) ? (
        <Link to={"new"}>
          <Button>Create new budget</Button>
        </Link>
      ) : (
        <Button disabled={true}>Create new budget</Button>
      )}
    </section>
  );
}
