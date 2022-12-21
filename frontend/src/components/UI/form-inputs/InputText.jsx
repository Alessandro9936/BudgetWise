import { useController } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Error } from "../Error";
import classes from "./InputText.module.css";

export default function Input({ label, type, ...props }) {
  const {
    fieldState,
    field,
    formState: { errors },
  } = useController(props);

  return (
    <>
      <label htmlFor={label} className={classes.label}>
        {label}
      </label>
      <input
        type={type}
        {...field}
        className={`${classes.input} ${
          fieldState.error?.message ? classes["input-invalid"] : ""
        }`}
      />
      <ErrorMessage
        errors={errors}
        name={field.name}
        render={({ message }) => <Error message={message} />}
      />
    </>
  );
}
