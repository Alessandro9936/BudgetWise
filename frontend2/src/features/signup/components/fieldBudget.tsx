import FieldError from "@/components/error/fieldError";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

import { motion } from "framer-motion";

import { SignUpFormType } from "../types/formType";

type FieldBudgetProps = {
  setValue: UseFormSetValue<SignUpFormType>;
  getValues: UseFormGetValues<SignUpFormType>;
  error?: string;
};

const FieldBudget = ({ setValue, getValues, error }: FieldBudgetProps) => {
  const currencies: { symbol: string; code: SignUpFormType["currency"] }[] = [
    { symbol: "$", code: "USD" },
    { symbol: "€", code: "EUR" },
    { symbol: "£", code: "GBP" },
  ];

  const activeCurrency = getValues("currency");

  const setActiveCurrency = (currency: SignUpFormType["currency"]) => {
    setValue("currency", currency, { shouldValidate: true });
  };

  return (
    <div>
      <label htmlFor="currency" className="font-medium dark:text-neutral-300">
        Select your currency <span className="text-red-400">*</span>
      </label>
      <div className="my-2 flex w-full items-center justify-between gap-6">
        {currencies.map((currency) => (
          <div
            key={currency.code}
            className="relative flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-lg py-2 ring-1 ring-slate-300 dark:bg-slate-700 dark:ring-slate-600"
            onClick={() => setActiveCurrency(currency.code)}
          >
            <p className="relative z-10">{currency.symbol}</p>
            <p className="relative z-10">{currency.code}</p>
            {activeCurrency === currency.code ? (
              <motion.span
                layoutId="selected"
                className="absolute top-0 bottom-0 left-0 right-0 rounded-lg bg-indigo-300/25 ring-1 ring-indigo-600 dark:bg-indigo-900/25 dark:ring-indigo-300"
              />
            ) : null}
          </div>
        ))}
      </div>
      {error && <FieldError message={error} />}
    </div>
  );
};

export default FieldBudget;

//#3730a3
