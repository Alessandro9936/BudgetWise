import { Calendar } from "react-calendar";
import { useController } from "react-hook-form";
import { Error } from "../Error";

import classes from "./calendar-input.module.css";

export default function CalendarInput({
  calendarProps,
  setValue,
  setActiveDate,
  disabled,
  ...props
}) {
  const { field } = useController(props);

  const onDateChange = (date) => {
    setValue(field.name, date, { shouldValidate: true });
    setActiveDate(date);
  };

  return (
    <>
      {!disabled ? (
        <Calendar {...calendarProps} onChange={onDateChange} />
      ) : (
        <>
          <Error message="Can't update budget date" />
          <div className={classes["overlay-disable"]}>
            <Calendar {...calendarProps} />
          </div>
        </>
      )}
    </>
  );
}
