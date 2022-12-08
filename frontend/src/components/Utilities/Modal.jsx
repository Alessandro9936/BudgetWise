import Card from "../UI/Card";
import classes from "../styles/Modal.module.css";

import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

export default function Modal({ children }) {
  const navigate = useNavigate();
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div className={classes.overlay} onClick={() => navigate("..")} />
          <div className={classes.modal}>
            <Card>{children}</Card>
          </div>
        </>,
        document.getElementById("portal")
      )}
    </>
  );
}
