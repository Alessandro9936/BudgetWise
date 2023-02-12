import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { getStateUI } from "@/utils/getStateUI";

type RadioStateInputProps = {
  value: string;
  stateName: string;
  disabled?: boolean;
};

const RadioStateInput = ({
  value,
  stateName,
  disabled,
}: RadioStateInputProps) => {
  const {
    formState: { isSubmitSuccessful },
    setValue,
    getValues,
  } = useFormContext();

  const stateUI = getStateUI(stateName);
  const [isHover, setIsHover] = useState(false);

  const isActive = getValues("state") === value;

  return (
    <li
      className={`w-max cursor-pointer rounded-xl border-2 border-neutral-200 py-2 px-4 font-semibold shadow transition-all dark:border-slate-700 ${
        (isSubmitSuccessful || disabled) && !isActive
          ? "pointer-events-none text-neutral-200 dark:text-slate-700"
          : ""
      }`}
      style={{ borderColor: isActive || isHover ? stateUI?.color : "" }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={() => {
        setValue("state", value, { shouldValidate: true });
      }}
    >
      <p>{stateUI?.label}</p>
    </li>
  );
};
export default RadioStateInput;
