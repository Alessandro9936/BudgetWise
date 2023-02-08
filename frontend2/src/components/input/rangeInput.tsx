import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

function RangeInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  disable,
}: UseControllerProps<TFieldValues, TName> & { disable?: boolean }) {
  const {
    field,
    formState: { isSubmitSuccessful },
  } = useController({ name, control });

  return (
    <div className="mt-4 flex items-center justify-between gap-6 pl-2">
      <p className="w-[35px]">{field.value}</p>
      <input
        type="range"
        {...field}
        max={1000}
        step={10}
        disabled={isSubmitSuccessful || disable}
        className="flex-1 cursor-pointer accent-indigo-500"
      />
    </div>
  );
}
export default RangeInput;
