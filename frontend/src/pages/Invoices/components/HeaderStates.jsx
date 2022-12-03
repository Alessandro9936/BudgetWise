import React from "react";
import classes from "./HeaderStates.module.css";

import Card from "../../../components/UI/Card";
import { FileText } from "react-feather";

import { transactionMapped } from "../../../../data/data";

export function HeaderStates() {
  const statesNumber = transactionMapped
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (acc, cur) => {
        acc[cur.state]++;
        return acc;
      },
      { Paid: 0, "To pay": 0, Upcoming: 0 }
    );
  return (
    <section className={classes["header-states"]}>
      <h3>Expense states</h3>
      <Card>
        <div className={classes["state-container"]}>
          <FileText
            size={50}
            style={{
              backgroundColor: "#95cba0",
              padding: "5px",
              borderRadius: "10px",
            }}
          />
          <div className={classes["state-info"]}>
            <p>{statesNumber.Paid}</p>
            <p>Paid</p>
          </div>
        </div>
        <div className={classes["state-container"]}>
          <FileText
            size={50}
            style={{
              backgroundColor: "#ee7172",
              padding: "5px",
              borderRadius: "10px",
            }}
          />
          <div className={classes["state-info"]}>
            <p>{statesNumber["To pay"]}</p>
            <p>To pay</p>
          </div>
        </div>
        <div className={classes["state-container"]}>
          <FileText
            size={50}
            style={{
              backgroundColor: "#faaa4c",
              padding: "5px",
              borderRadius: "10px",
            }}
          />
          <div className={classes["state-info"]}>
            <p>{statesNumber.Upcoming}</p>
            <p>Upcoming</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
