import React from "react";
import classes from "../styles/Button.module.css";

export function Button({ children, ...buttonAttributes }) {
  const isSubmitting = buttonAttributes.disabled
    ? classes.isSubmitting + classes.button
    : classes.button;

  return (
    <button className={isSubmitting} {...buttonAttributes}>
      {children}
    </button>
  );
}
