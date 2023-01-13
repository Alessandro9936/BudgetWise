import { useState } from "react";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

interface ICustomRadio {
  setValue: any;
  value: string;
  view: { name: string; color: string; label: string };
  isActive: boolean;
  disabled: boolean;
}

function CustomRadio<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  setValue,
  value,
  view,
  isActive,
  disabled,
  name,
  control,
}: UseControllerProps<TFieldValues, TName> & ICustomRadio) {
  const {
    field,
    formState: { isSubmitSuccessful },
  } = useController({ name, control });
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      {isSubmitSuccessful || disabled ? (
        <div className="pointer-events-none select-none">
          <li
            className={`w-max cursor-pointer rounded-lg border border-gray-300 py-[2px] px-2 text-center transition-all`}
            style={{
              color: isActive ? "#fff" : "#d1d5db",
              backgroundColor: isActive ? "#d1d5db" : "transparent",
            }}
          >
            {view.label ?? value}
          </li>
        </div>
      ) : (
        <>
          <li
            className={`w-max cursor-pointer rounded-lg border py-[2px] px-2 text-center transition-all`}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
            style={{
              borderColor: view.color,
              color: isActive || isHover ? "#fff" : view.color,
              backgroundColor: isActive || isHover ? view.color : "transparent",
            }}
            onClick={() => {
              setValue(field.name, value, { shouldValidate: true });
            }}
          >
            {view.label ?? value}
          </li>
        </>
      )}
    </>
  );
}
export default CustomRadio;
