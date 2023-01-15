import { Control, useController } from "react-hook-form";
import FieldError from "../../../components/Error/field-error";
import { getCurrency } from "../../../context/user-context";
import { ITransactionForm } from "../types/types";

const AmountField = ({
  control,
  name,
  disabled,
}: {
  control: Control<ITransactionForm>;
  name: "amount";
  disabled: boolean;
}) => {
  const { field, formState } = useController({ name, control });

  const currency = getCurrency();
  const currencySymbol = {
    EUR: "€",
    USD: "$",
    GBP: "£",
  }[currency!];

  return (
    <>
      <div className="rounder-lg relative shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-sm text-neutral-400">{currencySymbol}</span>
        </div>
        <input
          disabled={disabled}
          type="number"
          placeholder="0.00"
          {...field}
          className={`w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-7 text-base shadow-sm placeholder:text-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-slate-900 ${
            disabled ? "pointer-events-none" : ""
          }`}
        />
        <div className="absolute inset-y-0 right-0 z-10 flex cursor-pointer items-center rounded-r-lg  border border-gray-300 bg-white px-2">
          <span className="mr-2 text-sm text-gray-500">{currency}</span>
        </div>
      </div>
      {formState.errors.amount && (
        <FieldError message={formState.errors.amount.message!} />
      )}
    </>
  );
};

export default AmountField;
