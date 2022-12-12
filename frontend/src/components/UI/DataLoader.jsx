import React from "react";
import classes from "../styles/DataLoader.module.css";
export function DataLoader() {
  return (
    <div className={classes["loading-container"]}>
      <p className={classes["loading-text"]}>Loading your data...</p>
    </div>
  );
}
