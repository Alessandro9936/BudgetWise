import React from "react";
import classes from "./FiltersSidebar.module.css";

import Card from "../../../components/UI/Card";
import { BarChart } from "react-feather";

const InputField = ({ id, label, ...attributes }) => {
  return (
    <div className={classes.field}>
      <input className={classes["radio-btn"]} {...attributes} />
      <label htmlFor={id}>{id[0].toUpperCase() + id.slice(1)}</label>
    </div>
  );
};

const IconField = ({ icon, label }) => {
  return (
    <div className={classes.field}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

const budgets = [
  "Rent",
  "Groceries",
  "Bills",
  "Education",
  "Health",
  "Personal care",
  "Shopping",
  "Entertaiment",
  "Travelling",
  "Gifts",
];

const transactionStatus = ["Paid", "Not paid", "Upcoming"];
export function FiltersSidebar() {
  return (
    <section className={classes["sidebar-filters"]}>
      <Card>
        <div className={classes.block}>
          <p className={classes["block-title"]}>Transaction type</p>
          <InputField type="radio" name="transaction-type" id="expense" />
          <InputField type="radio" name="transaction-type" id="income" />
        </div>
        <div className={classes.block}>
          <p className={classes["block-title"]}>Amount</p>
          <IconField
            icon={<BarChart style={{ rotate: "90deg" }} />}
            label="Lower to higher"
          />
          <IconField
            icon={
              <BarChart style={{ rotate: "90deg", transform: "scaleX(-1)" }} />
            }
            label="Higher to lower"
          />
        </div>
        <div className={classes.block}>
          <p className={classes["block-title"]}>Invoice date</p>
          <IconField
            icon={<BarChart style={{ rotate: "90deg" }} />}
            label="Oldest to newest"
          />
          <IconField
            icon={
              <BarChart style={{ rotate: "90deg", transform: "scaleX(-1)" }} />
            }
            label="Newest to oldest"
          />
        </div>
        <div className={classes.block}>
          <p className={classes["block-title"]}>Transaction state</p>
          {transactionStatus.map((status) => {
            return (
              <InputField
                key={status}
                type="checkbox"
                name={status}
                value={status}
                id={status}
              />
            );
          })}
        </div>
        <div className={classes.block}>
          <p className={classes["block-title"]}>Budget</p>
          {budgets.map((budget) => {
            return (
              <InputField
                key={budget}
                type="checkbox"
                name={budget}
                value={budget}
                id={budget}
              />
            );
          })}
        </div>
      </Card>
    </section>
  );
}
