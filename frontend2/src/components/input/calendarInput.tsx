import { Calendar, CalendarProps } from "react-calendar";
import { useFormContext } from "react-hook-form";
import "../../styles/calendar.css";

type CalendarInputProps = {
  disabled: boolean;
  setActiveDate: React.Dispatch<React.SetStateAction<Date>>;
};

const CalendarInput = ({
  disabled,
  setActiveDate,
  ...calendarProps
}: CalendarInputProps & CalendarProps) => {
  const {
    formState: { isSubmitSuccessful, defaultValues },
    setValue,
    getValues,
  } = useFormContext();

  const onDateChange = (date: Date) => {
    setValue("date", date, {
      shouldValidate: true,
    });
    setActiveDate(date);
  };

  return (
    <Calendar
      {...calendarProps}
      onChange={onDateChange}
      defaultValue={getValues("date") ?? defaultValues?.date}
      className={isSubmitSuccessful || disabled ? "pointer-events-none" : ""}
    />
  );
};
export default CalendarInput;
