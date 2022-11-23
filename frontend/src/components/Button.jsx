import React from "react";
import classes from "./styles/Button.module.css";

export function Button({ children, ...others }) {
  return <button {...others}>{children}</button>;
}
