import Card from "../UI/Card";
import classes from "../styles/TransactionModal.module.css";

import React from "react";
import ReactDOM from "react-dom";

export default function Modal({ children }) {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div className={classes.overlay} />
          <div className={classes.modal}>
            <Card>{children}</Card>
          </div>
        </>,
        document.getElementById("portal")
      )}
    </>
  );
}
