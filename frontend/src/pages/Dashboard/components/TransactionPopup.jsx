import React from "react";
import classes from "./TransactionPopup.module.css";

export function TransactionPopup({ coords, transaction }) {
  return (
    <ul
      className={classes.popup}
      style={{
        top: coords.top,
        left: coords.left,
      }}
    >
      <li>{transaction.description}</li>
      <li>
        Type: <span className={classes.property}>{transaction.type}</span>
      </li>
      <li>
        Amount: <span className={classes.property}>{transaction.amount}</span>
      </li>
      {transaction?.type === "expense" && (
        <li>
          Budget: <span className={classes.property}>{transaction.budget}</span>
        </li>
      )}
    </ul>
  );
}
