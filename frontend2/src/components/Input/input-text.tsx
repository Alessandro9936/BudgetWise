import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import FieldError from "../Error/field-error";

interface IinputText {
  label?: string;
  type: string;
  placeholder?: string;
  isRequired?: boolean;
  disabled?: boolean;
}

function InputText<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  type,
  isRequired,
  placeholder,
  disabled,
  ...props
}: UseControllerProps<TFieldValues, TName> & IinputText) {
  const { fieldState, field } = useController(props);

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={field.name} className="font-medium">
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...field}
        className={`input-form ${
          fieldState.error?.message ? "border-red-400 dark:border-red-400" : ""
        } `}
      />
      {fieldState.error?.message && (
        <FieldError message={fieldState.error?.message} />
      )}
    </div>
  );
}

export default InputText;
