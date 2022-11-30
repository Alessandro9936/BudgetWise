import React from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../../../components/UI/Card";
import classes from "./Activity.module.css";

export function Activity({ transactionMapped }) {
  /*
   * NEW TRANSACTION MUST BE ADDED AT [0] NOT END
   */

  return (
    <section className={classes.activity}>
      <h3>Recent activity</h3>

      <Card>
        <ul className={classes["transactions-list"]}>
          {transactionMapped.map((transaction) => (
            <li
              className={classes["transaction-container"]}
              key={transaction.id}
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
        </ul>
      </Card>
    </section>
  );
}
