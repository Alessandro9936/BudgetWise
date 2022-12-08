import { ErrorMessage, Field } from "formik";

import classes from "../styles/RangeInput.module.css";
import { InputError } from "./InputError";

export function RangeInput({ name, label, ...props }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field, meta }) => {
          const { value } = meta;
          return (
            <div className={classes["range-container"]}>
              <p>{value || 0}</p>
              <input type="range" {...field} {...props} value={value || 0} />
            </div>
          );
        }}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <InputError message={msg} />}
      />
    </>
  );
}
