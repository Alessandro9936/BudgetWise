import React from "react";
import Card from "../../../components/UI/Card";
import classes from "./Summary.module.css";

export function Summary({ transactionMapped }) {
  const amounts = transactionMapped.reduce(
    (acc, cur) => {
      cur.type === "income"
        ? (acc.income += cur.amount)
        : (acc.expenses += cur.amount);
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const totalBalance = amounts.income - amounts.expenses;

  return (
    <section className={classes.summary}>
      <h3>Overview</h3>
      <Card>
        <p className={classes["summary-field__text"]}>Income</p>
        <p className={classes["summary-amount"]}>$ {amounts?.income}</p>
      </Card>
      <Card>
        <p className={classes["summary-field__text"]}>Expenses</p>
        <p className={classes["summary-amount"]}>$ {amounts?.expenses}</p>
      </Card>
      <Card>
        <p className={classes["summary-field__text"]}>Total Balance</p>
        <p
          className={`${classes["summary-amount"]} ${
            totalBalance > 0 ? classes.positive : classes.negative
          }`}
        >
          $ {totalBalance}
        </p>
      </Card>
    </section>
  );
}
