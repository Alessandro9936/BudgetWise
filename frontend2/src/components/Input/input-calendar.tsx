import { Calendar, Detail } from "react-calendar";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
  UseFormSetValue,
} from "react-hook-form";
import { IBudgetForm } from "../../pages/budget/types/types";
import "../../styles/calendar.css";
import FieldError from "../Error/field-error";

interface ICalendarInput {
  minDetail: Detail;
  maxDetail: Detail;
  minDate: Date;
  disabled: boolean;
  defaultValue?: Date;
  setValue: UseFormSetValue<IBudgetForm>;
  setActiveDate: React.Dispatch<React.SetStateAction<Date>>;
}

function CalendarInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  setValue,
  disabled,
  setActiveDate,
  ...calendarProps
}: UseControllerProps<TFieldValues, TName> & ICalendarInput) {
  const {
    field,
    formState: { isSubmitSuccessful },
  } = useController({ name, control });

  const onDateChange = (date: Date) => {
    setValue(field.name as "name" | "date" | "maxAmount" | "usedAmount", date, {
      shouldValidate: true,
    });
    setActiveDate(date);
  };

  return (
    <>
      {isSubmitSuccessful || disabled ? (
        <>
          {disabled && <FieldError message="Can't update date" />}
          <div className="pointer-events-none mt-1 select-none rounded-lg">
            <Calendar {...calendarProps} />
          </div>
        </>
      ) : (
        <Calendar {...calendarProps} onChange={onDateChange} />
      )}
    </>
  );
}
export default CalendarInput;
