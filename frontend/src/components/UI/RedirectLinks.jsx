import React from "react";
import { Link } from "react-router-dom";
import classes from "../styles/RedirectLink.module.css";

export function RedirectLink({ label, action }) {
  return (
    <p className={classes["sign-in"]}>
      {label + " "}
      <Link
        to={`/${action.toLowerCase()}`}
        className={classes["sign-in__link"]}
      >
        {action}
      </Link>
    </p>
  );
}
