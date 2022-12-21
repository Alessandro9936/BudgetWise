import { useController } from "react-hook-form";
import classes from "./customRadio-input.module.css";

export default function OneChoiceInput({
  setValue,
  value,
  label,
  isActive,
  ...props
}) {
  const { field } = useController(props);

  return (
    <li
      onClick={() => setValue(field.name, value, { shouldValidate: true })}
      className={`${classes["value-option"]} ${isActive ? classes.active : ""}`}
    >
      {label ?? value}
    </li>
  );
}
