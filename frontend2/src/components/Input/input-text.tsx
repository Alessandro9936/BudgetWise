import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import FieldError from "../field-error";

type inputTextType = {
  label?: string;
  type: string;
  placeholder?: string;
  isRequired?: boolean;
};

function InputText<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  type,
  isRequired,
  placeholder,
  name,
  control,
}: UseControllerProps<TFieldValues, TName> & inputTextType) {
  const {
    formState: { errors },
    fieldState,
    field,
  } = useController({ name, control });

  return (
    <div className="flex  w-full flex-col gap-2">
      <label htmlFor={field.name} className="font-medium">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...field}
        className={`flex-1 rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base shadow-sm placeholder:text-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-slate-900 ${
          fieldState.error?.message ? "border-red-500" : ""
        } `}
      />
      {errors[field.name] && (
        <FieldError message={errors[field.name]?.message as string} />
      )}
    </div>
  );
}

export default InputText;
