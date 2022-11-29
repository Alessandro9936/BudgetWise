import React from "react";
import Card from "../../../components/UI/Card";
import classes from "./Summary.module.css";

export function Summary({ transactionMapped }) {
  const amounts = transactionMapped.reduce((acc, cur) => {
    if (cur.type === "income" && !acc.income) {
      acc.income = cur.amount;
    } else {
      acc.income += cur.amount;
    }

    if (cur.type === "expense" && !acc.expenses) {
      acc.expenses = cur.amount;
    } else {
      acc.expenses += cur.amount;
    }

    return acc;
  }, {});

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
