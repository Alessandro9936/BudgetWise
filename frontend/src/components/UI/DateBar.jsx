import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import classes from "../styles/DateBar.module.css";

export function DateBar({ updateActiveDate, activeDate }) {
  return (
    <div className={classes["value-container"]}>
      <ChevronLeft
        size={20}
        color={"white"}
        strokeWidth={3}
        onClick={() => updateActiveDate("sub")}
      />
      <p>{activeDate}</p>
      <ChevronRight
        size={20}
        color={"white"}
        strokeWidth={3}
        onClick={() => updateActiveDate("add")}
      />
    </div>
  );
}
