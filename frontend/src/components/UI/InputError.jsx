import React from "react";
import { AlertTriangle } from "react-feather";
import classes from "../styles/InputError.module.css";

export function InputError({ message }) {
  return (
    <div className={classes["error-message"]}>
      <AlertTriangle size={14} />
      <p>{message}</p>
    </div>
  );
}
