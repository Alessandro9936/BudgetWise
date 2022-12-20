import React from "react";
import { AlertTriangle } from "react-feather";
import classes from "../styles/Error.module.css";

export function Error({ message }) {
  return (
    <div className={classes["error-message"]}>
      <AlertTriangle size={14} />
      <p>{message}</p>
    </div>
  );
}
