import React from "react";
import { Link } from "react-router-dom";
import classes from "../styles/ButtonRedirect.module.css";

export function ButtonRedirect({ children, redirectLink }) {
  return (
    <Link to={redirectLink}>
      <button className={classes.button}>{children}</button>
    </Link>
  );
}
