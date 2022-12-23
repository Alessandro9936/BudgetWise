import { useController } from "react-hook-form";
import classes from "./customRadio-input.module.css";

export default function OneChoiceInput({
  setValue,
  value,
  label,
  disabled,
  isActive,
  ...props
}) {
  const { field } = useController(props);

  return (
    <>
      {!disabled ? (
        <li
          onClick={() =>
            setValue(field.name, value, {
              shouldValidate: true,
            })
          }
          className={`${classes["value-option"]} ${
            isActive ? classes.active : ""
          }`}
        >
          {label ?? value}
        </li>
      ) : (
        <div className={classes["overlay-disable"]}>
          <li
            className={`${classes["value-option"]} ${
              isActive ? classes.active : ""
            }`}
          >
            {label ?? value}
          </li>
        </div>
      )}
    </>
  );
}
