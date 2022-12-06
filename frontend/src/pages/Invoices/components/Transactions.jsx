import React from "react";
import classes from "./Transactions.module.css";

import { transactionMapped } from "../../../../data/data";
import Card from "../../../components/UI/Card";
import { DeleteIcon } from "../../../components/UI/DeleteIcon";
import { UpdateIcon } from "../../../components/UI/UpdateIcon";
import { Search } from "react-feather";

const transactionMarkup = (transaction) => {
  const { type } = transaction;
  let statusBackground = {
    "To pay": classes.red,
    Upcoming: classes.orange,
    Paid: classes.green,
    Received: classes.green,
  }[transaction?.state];

  return (
    <li className={classes.transaction} key={transaction.id}>
      <p>
        {type === "expense"
          ? transaction.budget
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
  const transSliced = transactionMapped.slice(0, 20);
  return (
    <section className={classes["transactions"]}>
      <h3>Transactions</h3>
      <Card>
        <div className={classes["search-container"]}>
          <Search
            size={18}
            strokeWidth={2}
            color={"#929292"}
            style={{
              position: "absolute",
              top: "50%",
              left: "10",
              transform: "translateY(-50%)",
            }}
          />
          <input
            type="text"
            placeholder="Search..."
            className={classes["search-input"]}
          />
        </div>
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
