import { useState } from "react";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
  UseFormSetValue,
} from "react-hook-form";
import { IBudgetForm } from "../../pages/budget-modal/types/types";

interface ICustomRadio {
  setValue: UseFormSetValue<IBudgetForm>;
  value: string;
  label: string;
  color: string;
  isActive: boolean;
  setActiveBudget: React.Dispatch<React.SetStateAction<string | null>>;
}

function CustomRadio<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  setValue,
  value,
  label,
  color,
  isActive,
  setActiveBudget,
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
      {!isSubmitSuccessful ? (
        <li
          className={`w-max cursor-pointer rounded-lg border py-[2px] px-2 text-center transition-all`}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
          style={{
            borderColor: color,
            color: isActive || isHover ? "#fff" : color,
            backgroundColor: isActive || isHover ? color : "transparent",
          }}
          onClick={() => {
            setValue(
              field.name as "name" | "date" | "maxAmount" | "usedAmount",
              value,
              { shouldValidate: true }
            );
            setActiveBudget(value);
          }}
        >
          {label ?? value}
        </li>
      ) : (
        <div className="pointer-events-none select-none">
          <li
            className={`w-max cursor-pointer rounded-lg border border-gray-300 py-[2px] px-2 text-center transition-all`}
            style={{
              color: isActive ? "#fff" : "#d1d5db",
              backgroundColor: isActive ? "#d1d5db" : "transparent",
            }}
          >
            {label ?? value}
          </li>
        </div>
      )}
    </>
  );
}
export default CustomRadio;
