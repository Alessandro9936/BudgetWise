import React from "react";

import { ErrorMessage, Field } from "formik";

import { InputError } from "./InputError";
import classes from "../styles/Input.module.css";

export function Input({ label, name, ...props }) {
  return (
    <div className={classes["input-field"]}>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <Field name={name} {...props} />
      <ErrorMessage
        name={name}
        render={(msg) => <InputError message={msg} />}
      />
    </div>
  );
}
