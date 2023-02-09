import { useFormContext } from "react-hook-form";

type TransactionTypeForm = {
  value: "income" | "expense";
  disabled: boolean;
}

const TransactionType = ({ value, disabled }: TransactionTypeForm) => {
  const { getValues, setValue } = useFormContext();

  const isActive = getValues("type") === value;

  return (
    <p
      className={`cursor-pointer rounded-lg px-2 py-1 text-lg font-semibold ${
        isActive && !disabled
          ? "bg-indigo-500 text-white transition-all dark:bg-indigo-600"
          : isActive && disabled
          ? "border-2 border-indigo-500 bg-transparent text-indigo-500"
          : ""
      } `}
      onClick={() => setValue("type", value, { shouldValidate: true })}
    >
      {value[0].toUpperCase() + value.slice(1)}
    </p>
  );
};

export default TransactionType;
