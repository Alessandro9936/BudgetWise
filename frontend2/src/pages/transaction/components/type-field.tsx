import { UseFormSetValue } from "react-hook-form";
import { ITransactionForm } from "../types/types";

interface ITransactionType {
  activeType: "income" | "expense";
  setValue: UseFormSetValue<ITransactionForm>;
  value: "income" | "expense";
  disabled: boolean;
}
const TransactionType = ({
  activeType,
  setValue,
  value,
  disabled,
}: ITransactionType) => {
  const isActive = activeType === value;
  return (
    <p
      className={`cursor-pointer rounded-lg px-2 py-1 text-lg ${
        isActive ? "bg-purple-500 font-semibold text-white transition-all" : ""
      } ${disabled ? "bg-gray-300 text-white" : ""}`}
      onClick={() => setValue("type", value, { shouldValidate: true })}
    >
      {value[0].toUpperCase() + value.slice(1)}
    </p>
  );
};

export default TransactionType;
