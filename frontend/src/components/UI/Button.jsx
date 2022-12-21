import React from "react";
import classes from "../styles/Button.module.css";

export function Button({ children, disabled, ...buttonAttributes }) {
  return (
    <button
      disabled={disabled}
      className={`${classes.button} ${disabled ? classes.disabled : ""}`}
      {...buttonAttributes}
    >
      {children}
    </button>
  );
}
