import { Link, useRouteError } from "react-router-dom";
import classes from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className={classes["error-page"]}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p className={classes["error-type"]}>
        {error.statusText || error.message}
      </p>
      <div className={classes["redirect-links"]}>
        <p>Here are some helpful link instead:</p>
        <Link to="">Somewhere</Link>
        <Link to="">Somewhere</Link>
        <Link to="">Somewhere</Link>
      </div>
    </div>
  );
}
