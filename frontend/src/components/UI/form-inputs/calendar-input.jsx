import { Calendar } from "react-calendar";
import { useController } from "react-hook-form";

export default function CalendarInput({
  calendarProps,
  setValue,
  setActiveDate,
  ...props
}) {
  const { field } = useController(props);

  const onDateChange = (date) => {
    setValue(field.name, date, { shouldValidate: true });
    setActiveDate(date);
  };

  return <Calendar {...calendarProps} onChange={onDateChange} />;
}
