import React from "react";
import Card from "../../../components/UI/Card";
import { transactionByDate } from "../../../utils/queryTransactions";
import classes from "./Summary.module.css";

export function Summary({ activeDate }) {
  const year = activeDate.getFullYear();

  const query = transactionByDate(activeDate);

  const transactions = query.transactions;

  const amounts = transactions.reduce(
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
      <div className={classes["summary-header"]}>
        <h3>Overview</h3>
        <span className={classes["summary-header__time"]}> ({year})</span>
      </div>
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
