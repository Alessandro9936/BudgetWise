import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { getBudgetUI } from "@/utils/getBudgetUI";

type RadioBudgetInputProps = {
  value: string;
  budgetName: string;
  disabled?: boolean;
  inputName: string;
};

const RadioBudgetInput = ({
  value,
  budgetName,
  disabled,
  inputName,
}: RadioBudgetInputProps) => {
  const {
    formState: { isSubmitSuccessful },
    setValue,
    getValues,
  } = useFormContext();

  const budgetUI = getBudgetUI(budgetName);
  const [isHover, setIsHover] = useState(false);

  const isActive = getValues(inputName) === value;

  return (
    <li
      className={`relative flex w-full cursor-pointer items-center justify-between rounded-xl border-2 border-neutral-200 p-2 font-semibold shadow transition-all dark:border-slate-700 ${
        (isSubmitSuccessful || disabled) && !isActive
          ? "pointer-events-none text-neutral-200 dark:text-slate-700"
          : ""
      }`}
      style={{ borderColor: isActive || isHover ? budgetUI?.color : "" }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={() => {
        setValue(inputName, value, { shouldValidate: true });
      }}
    >
      <p>{budgetUI?.label}</p>
      {budgetUI?.icon}
    </li>
  );
};
export default RadioBudgetInput;
