import { useState } from "react";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import FieldError from "@/components/error/fieldError";
import ShowPassword from "@/components/wrapper/passwordPreview";

type PasswordInputProps = {
  label: string;
  disabled?: boolean;
};

function PasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  disabled,
  ...props
}: UseControllerProps<TFieldValues, TName> & PasswordInputProps) {
  const { fieldState, field } = useController(props);

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <ShowPassword
      passwordVisible={passwordVisible}
      setPasswordVisible={setPasswordVisible}
    >
      <div className="flex w-full flex-col gap-2">
        <label htmlFor={field.name} className="font-medium">
          {label} <span className="text-red-400">*</span>
        </label>
        <input
          type={passwordVisible ? "text" : "password"}
          disabled={disabled}
          {...field}
          className={`input-form ${
            fieldState.error?.message
              ? "border-red-400 transition-colors duration-200 dark:border-red-400"
              : ""
          } `}
        />
        {fieldState.error?.message && (
          <FieldError message={fieldState.error?.message} />
        )}
      </div>
    </ShowPassword>
  );
}

export default PasswordInput;
