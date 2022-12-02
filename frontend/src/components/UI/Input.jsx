import React from "react";

import { useField } from "formik";

import { AlertTriangle } from "react-feather";
import classes from "../styles/Input.module.css";

export function Input({ label, ...props }) {
  /*
  useField is custom React Hook that returns a 3-tuple (an array with three elements) containing FieldProps, FieldMetaProps and FieldHelperProps. It accepts either a string of a field name or an object as an argument. The object must at least contain a name key.

  FieldProps will inject onChange, onBlur, name, and value props of the field designated by the name attribute.

  FieldMetaProps contains computed values (error, touched, ...) about the field which can be used to style the field
  */

  const [field, meta] = useField(props);

  let inputClasses;

  if (field.value && !meta.error && meta.touched) {
    inputClasses = classes["input-valid"];
  }

  if (meta.touched && meta.error) {
    inputClasses = classes["input-error"];
  }

  return (
    <div>
      <label className={classes.label} htmlFor={props.name}>
        {label}
      </label>
      <input {...field} {...props} className={inputClasses + classes.input} />
      {meta.touched && meta.error ? (
        <div className={classes["error-message"]}>
          <AlertTriangle size={14} />
          <p>{meta.error}</p>
        </div>
      ) : null}
    </div>
  );
}
