import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonRedirect } from "./ButtonRedirect";

import classes from "../styles/SuccessRedirect.module.css";

export const SuccessRedirect = (isSubmitted) => {
  const navigate = useNavigate();
  const [secondsRedirect, setSecondsRedirect] = useState(5);

  useEffect(() => {
    if (isSubmitted) {
      const interval = setInterval(() => {
        setSecondsRedirect((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isSubmitted]);

  return (
    <div className={classes["form-success"]}>
      <div className={classes["redirect-container"]}>
        <p>Transaction successfully created!</p>
        <p>You'll be redirected in {secondsRedirect} seconds</p>
        {secondsRedirect === 0 && navigate("..")}
      </div>
      <ButtonRedirect redirectLink={".."}>Go back</ButtonRedirect>
    </div>
  );
};
