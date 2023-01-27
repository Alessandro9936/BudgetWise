import { Control, useController } from "react-hook-form";
import FieldError from "../../../components/Error/field-error";
import { getCurrency } from "../../../context/user-context";
import { ITransactionForm } from "../types/types";

import { motion } from "framer-motion";

const childrenVariants = {
  initial: { opacity: 0, y: 20 },
  ending: { opacity: 1, y: 0, transition: { type: "tween" } },
};

interface IAmountField {
  control: Control<ITransactionForm>;
  name: "amount";
  disabled: boolean;
}
const AmountField = ({ control, name, disabled }: IAmountField) => {
  const { field, formState } = useController({ name, control });

  const currency = getCurrency();
  const currencySymbol = {
    EUR: "€",
    USD: "$",
    GBP: "£",
  }[currency!];

  return (
    <>
      <motion.div
        variants={childrenVariants}
        className="rounder-lg relative shadow-sm"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span
            className={`text-sm ${
              disabled
                ? "text-neutral-400 dark:text-slate-500"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {currencySymbol}
          </span>
        </div>
        <input
          disabled={disabled}
          type="number"
          placeholder="0.00"
          {...field}
          className={"input-form w-full appearance-none pl-7"}
        />
        <div className="absolute inset-y-0 right-0 z-10 flex cursor-pointer items-center rounded-r-lg  border border-neutral-300 bg-white px-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800">
          <span
            className={`mr-2 text-sm ${
              disabled
                ? "text-neutral-400 dark:text-slate-500"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {currency}
          </span>
        </div>
      </motion.div>
      {formState.errors.amount && (
        <FieldError message={formState.errors.amount.message!} />
      )}
    </>
  );
};

export default AmountField;
