import { Form } from "formik";
import React from "react";
import { Button } from "../UI/Button";
import { Loader } from "../UI/Loader";
import { RedirectLink } from "../UI/RedirectLinks";
import classes from "../styles/UserForm.module.css";

export function UserForm({
  children,
  isSubmitting,
  handleSubmit,
  title,
  action,
  redirectLabel,
  redirectAction,
}) {
  return (
    <Form onSubmit={handleSubmit} className={classes["form-container"]}>
      <h1>{title}</h1>

      {children}

      <Button type="submit" disabled={isSubmitting ? true : false}>
        {!isSubmitting ? action : <Loader />}
      </Button>

      <RedirectLink label={redirectLabel} action={redirectAction} />
    </Form>
  );
}
