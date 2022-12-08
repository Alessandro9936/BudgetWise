import { Calendar } from "react-calendar";
import { ErrorMessage, Field } from "formik";

export function DatePicker({ name, calendarProps, ...props }) {
  return (
    <>
      <Field name={name}>
        {({ form }) => {
          const { setFieldValue } = form;
          return (
            <Calendar
              {...calendarProps}
              onChange={(date) => setFieldValue(name, date)}
            />
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