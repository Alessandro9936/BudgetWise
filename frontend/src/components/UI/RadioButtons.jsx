import React from "react";

import { ErrorMessage, Field } from "formik";

import { InputError } from "./InputError";
import classes from "../styles/RadioButtons.module.css";

export function RadioButtons({ name, options, ...props }) {
  return (
    <>
      <Field name={name} {...props}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <div className={classes["radio-field"]} key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  name={name}
                  value={option.value}
                  {...props}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <InputError message={msg} />}
      />
    </>
  );
}
