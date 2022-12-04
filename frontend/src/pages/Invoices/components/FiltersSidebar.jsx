import React from "react";
import classes from "./FiltersSidebar.module.css";

import Card from "../../../components/UI/Card";
import { BarChart } from "react-feather";
import { Button } from "../../../components/UI/Button";

const InputField = ({ id, label, ...attributes }) => {
  return (
    <>
      {attributes.type !== "text" && (
        <li className={classes.field}>
          <input className={classes["radio-btn"]} {...attributes} />
          <label htmlFor={id}>{id[0].toUpperCase() + id.slice(1)}</label>
        </li>
      )}

      {attributes.type === "text" && (
        <li className={classes.field}>
          <label htmlFor={id}>{id[0].toUpperCase() + id.slice(1)}</label>
          <input className={classes["radio-btn"]} {...attributes} />
        </li>
      )}
    </>
  );
};

const IconField = ({ icon, label }) => {
  return (
    <li className={classes.field}>
      {icon}
      <span>{label}</span>
    </li>
  );
};

const FilterBlock = ({ children, label }) => {
  return (
    <ul className={classes.block}>
      <p className={classes["block-title"]}>{label}</p>
      {children}
    </ul>
  );
};

const budgets = [
  "Rent",
  "Groceries",
  "Bills",
  "Education",
  "Health & Fitness",
  "Personal care",
  "Shopping",
  "Entertaiment",
  "Travelling",
  "Others",
];

const transactionStatus = ["Paid", "Not paid", "Upcoming"];
const transactionTimeSpans = [
  "This week",
  "This month",
  "Last 90 days",
  new Date().getFullYear().toString(),
  (new Date().getFullYear() - 1).toString(),
  (new Date().getFullYear() - 2).toString(),
];

export function FiltersSidebar() {
  return (
    <section className={classes["sidebar-filters"]}>
      <h3>Filters</h3>
      <Card>
        <div className={classes.scroll}>
          <FilterBlock label="Transaction type">
            <InputField type="radio" name="transaction-type" id="expense" />
            <InputField type="radio" name="transaction-type" id="income" />
          </FilterBlock>
          <FilterBlock label="Date range">
            {transactionTimeSpans.map((timeSpan) => {
              return (
                <InputField
                  key={timeSpan}
                  type="checkbox"
                  name={timeSpan.replaceAll(" ", "-").toLowerCase()}
                  value={timeSpan.toLocaleLowerCase()}
                  id={timeSpan}
                />
              );
            })}
          </FilterBlock>
          <FilterBlock label="Amount">
            <IconField
              icon={<BarChart style={{ rotate: "90deg" }} />}
              label="Lower to higher"
            />
            <IconField
              icon={
                <BarChart
                  style={{ rotate: "90deg", transform: "scaleX(-1)" }}
                />
              }
              label="Higher to lower"
            />
          </FilterBlock>
          <FilterBlock label="Invoice date">
            <IconField
              icon={<BarChart style={{ rotate: "90deg" }} />}
              label="Lower to higher"
            />
            <IconField
              icon={
                <BarChart
                  style={{ rotate: "90deg", transform: "scaleX(-1)" }}
                />
              }
              label="Higher to lower"
            />
          </FilterBlock>
          <FilterBlock label="Transaction state">
            {transactionStatus.map((status) => {
              return (
                <InputField
                  key={status}
                  type="checkbox"
                  name={status.replaceAll(" ", "-").toLowerCase()}
                  value={status}
                  id={status}
                />
              );
            })}
          </FilterBlock>
          <FilterBlock label="Budget">
            {budgets.map((budget) => {
              return (
                <InputField
                  key={budget}
                  type="checkbox"
                  name={budget.replaceAll(" ", "-").toLowerCase()}
                  value={budget}
                  id={budget}
                />
              );
            })}
          </FilterBlock>
          <Button>Clear filters</Button>
        </div>
      </Card>
    </section>
  );
}
