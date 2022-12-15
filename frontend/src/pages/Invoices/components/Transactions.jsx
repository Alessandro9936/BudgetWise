import React from "react";
import classes from "./Transactions.module.css";

import Card from "../../../components/UI/Card";
import { DeleteIcon } from "../../../components/UI/DeleteIcon";
import { UpdateIcon } from "../../../components/UI/UpdateIcon";
import { Search } from "react-feather";
import { useGetTransactions } from "../../../utils/queryTransactions";

const transactionMarkup = (transaction) => {
  const { type } = transaction;
  let statusBackground = {
    topay: classes.red,
    upcoming: classes.orange,
    paid: classes.green,
    received: classes.green,
  }[transaction?.state];

  return (
    <li className={classes.transaction} key={transaction._id}>
      <p>
        {type === "expense"
          ? transaction.budget.name
          : type[0].toUpperCase() + type.slice(1)}
      </p>
      <p>{transaction.description}</p>
      <p>{transaction.date.toLocaleDateString()}</p>
      <p>
        {type === "expense" ? "- " : "+ "} {transaction.amount} USD
      </p>
      <p>
        <span className={[`${statusBackground} ${classes.state}`]}>
          {transaction.state || "Received"}
        </span>
      </p>
      <div className={classes["transaction-handlers"]}>
        <UpdateIcon />
        <DeleteIcon />
      </div>
    </li>
  );
};

export function Transactions() {
  const transactions = useGetTransactions();
  const transactionMapped = transactions.data ?? [];

  const transSliced = transactionMapped.slice(0, 20);
  return (
    <section className={classes["transactions"]}>
      <h3>Transactions</h3>
      <Card>
        <div className={classes["list-header"]}>
          <p>Budget</p>
          <p>Description</p>
          <p>Invoice date</p>
          <p>Amount</p>
          <p>Status</p>
        </div>
        <ul className={classes["transactions-list"]}>
          {transSliced.map((transaction) => transactionMarkup(transaction))}
        </ul>
      </Card>
    </section>
  );
}
