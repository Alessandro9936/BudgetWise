import React from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../../../components/UI/Card";
import classes from "./Activity.module.css";

import { transactionMapped } from "../../../../data/data";
import { Button } from "../../../components/UI/Button";
import { ButtonRedirect } from "../../../components/UI/ButtonRedirect";

export function Activity() {
  const last8Transactions = transactionMapped
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 8);

  return (
    <section className={classes.activity}>
      <h3>Recent activity</h3>

      <Card>
        <ul className={classes["transactions-list"]}>
          {last8Transactions.map((transaction) => (
            <li
              key={transaction.id}
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
            <Button>New transaction</Button>
            <ButtonRedirect redirectLink="/app/invoices">
              All transactions
            </ButtonRedirect>
          </div>
        </ul>
      </Card>
    </section>
  );
}
