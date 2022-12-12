import React from "react";
import classes from "./TransactionPopup.module.css";

export function TransactionPopup({ coords, transactions }) {
  return (
    <ul
      className={classes.popup}
      style={{
        top: coords.top,
        left: coords.left,
      }}
    >
      {transactions.map((transaction) => (
        <li className={classes.transaction} key={transaction._id}>
          <p>{transaction.description}</p>
          <p>
            Type: <span className={classes.property}>{transaction.type}</span>
          </p>
          <p>
            Amount:{" "}
            <span className={classes.property}>{transaction.amount}</span>
          </p>
          {transaction?.type === "expense" && (
            <p>
              Budget:{" "}
              <span className={classes.property}>
                {transaction.budget.name}
              </span>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
