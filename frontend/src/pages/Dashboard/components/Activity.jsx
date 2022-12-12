import React from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../../../components/UI/Card";
import classes from "./Activity.module.css";
import { Link } from "react-router-dom";

import { Button } from "../../../components/UI/Button";
import { ButtonRedirect } from "../../../components/UI/ButtonRedirect";

export function Activity({ transactionMapped }) {
  const last9Transactions = transactionMapped
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 9);

  return (
    <section className={classes.activity}>
      <h3>Recent activity</h3>

      <Card>
        <ul className={classes["transactions-list"]}>
          {last9Transactions.map((transaction) => (
            <li
              key={transaction._id}
              className={classes["transaction-container"]}
            >
              <div className={classes["transaction-top"]}>
                <p className={classes.description}>{transaction.description}</p>
                <MoreHorizontal
                  style={{
                    color: "var(--primary)",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div className={classes["transaction-bot"]}>
                <p className={classes.date}>
                  {transaction.date.toLocaleString("en-GB", {
                    timeZone: "UTC",
                  })}
                </p>
                <p
                  className={`${classes.amount}  ${
                    transaction.type === "income"
                      ? classes.positive
                      : classes.negative
                  }`}
                >
                  {transaction.type === "expense"
                    ? `- ${transaction.amount} USD`
                    : `+ ${transaction.amount} USD`}
                </p>
              </div>
            </li>
          ))}
          <div className={classes["action-buttons"]}>
            <Link to={"transaction"}>
              <Button>New transaction</Button>
            </Link>
            <ButtonRedirect redirectLink="../invoices">
              All transactions
            </ButtonRedirect>
          </div>
        </ul>
      </Card>
    </section>
  );
}
