import { ErrorMessage, Field } from "formik";

export function Textarea({ label, name, ...props }) {
  return (
    <>
      <Field as="textarea" name={name} {...props} />
      <ErrorMessage
        name={name}
        render={(msg) => <InputError message={msg} />}
      />
    </>
  );
}
