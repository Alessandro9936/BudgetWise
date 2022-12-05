import React from "react";
import classes from "./Bar.module.css";

export function Bar({ children }) {
  return <section className={classes["datebar-section"]}>{children}</section>;
}
