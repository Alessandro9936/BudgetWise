import React from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../../../components/UI/Card";
import classes from "./Activity.module.css";

export function Activity({}) {
  return (
    <section className={classes.activity}>
      <h3>Recent activity</h3>
      <Card>
        <div className={classes["transaction-container"]}>
          <div className={classes["transaction-top"]}>
            <p className={classes.description}>Monthly Home Rent</p>
            <MoreHorizontal
              style={{
                color: "var(--primary)",
                cursor: "pointer",
              }}
            />
          </div>
          <div className={classes["transaction-bot"]}>
            <p className={classes.date}>11 Jul 2022</p>
            <p className={classes.amount}>- 500 USD</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
