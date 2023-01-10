import { Calendar, Detail } from "react-calendar";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
  UseFormSetValue,
} from "react-hook-form";
import { IBudgetForm } from "../../pages/budget-modal/types/types";
import "../../styles/calendar.css";

interface ICalendarInput {
  minDetail: Detail;
  maxDetail: Detail;
  minDate: Date;
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
      {!isSubmitSuccessful ? (
        <Calendar {...calendarProps} onChange={onDateChange} />
      ) : (
        <>
          <div className="pointer-events-none mt-1 select-none rounded-lg">
            <Calendar {...calendarProps} />
          </div>
        </>
      )}
    </>
  );
}
export default CalendarInput;
