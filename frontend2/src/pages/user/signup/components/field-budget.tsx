import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "react-feather";

import {
  useController,
  UseControllerProps,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

import FieldError from "../../../../components/Error/field-error";
import { SignUpFormType } from "../types/types";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";

interface ICurrencyPicker {
  activeCurrency: string;
  setCurrencyValue: React.Dispatch<React.SetStateAction<string>>;
}

interface IFieldBudget {
  setValue: UseFormSetValue<SignUpFormType>;
  getValues: UseFormGetValues<SignUpFormType>;
}

const CurrencyPicker = ({
  activeCurrency,
  setCurrencyValue,
}: ICurrencyPicker) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside({
    ref,
    handler: useCallback(() => setIsModalOpen(false), []),
  });

  return (
    <div ref={ref}>
      <div
        className="focus absolute inset-y-0 right-0 z-10 flex cursor-pointer items-center rounded-r-lg  border border-neutral-300 bg-white px-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <span className="mr-2 text-sm text-neutral-500 dark:text-neutral-400">
          {activeCurrency}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className="stroke-neutral-500 dark:stroke-neutral-400"
        />
      </div>
      {isModalOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-800">
          <div className="py-2">
            {["USD", "GBP", "EUR"].map((currency) => (
              <span
                key={currency}
                className="block cursor-pointer px-4 py-2 text-neutral-500 hover:bg-neutral-100 hover:text-slate-800 dark:text-neutral-300 dark:hover:bg-slate-700 dark:hover:text-white"
                onClick={() => {
                  setCurrencyValue(currency);
                  setIsModalOpen(false);
                }}
              >
                <span>{currency}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const FieldBudget = ({
  setValue,
  getValues,
  ...props
}: IFieldBudget & UseControllerProps<SignUpFormType>) => {
  const { fieldState, field } = useController(props);

  const [activeCurrency, setActiveCurrency] = useState(getValues("currency"));

  useEffect(() => {
    setValue("currency", activeCurrency);
  }, [activeCurrency]);

  const currencySymbol = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  }[activeCurrency];

  useEffect(() => setValue("currency", activeCurrency), [activeCurrency]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="userBudget" className="font-medium dark:text-neutral-300">
        Your starting budget <span className="text-red-400">*</span>
      </label>
      <div className="rounder-lg relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {currencySymbol}
          </span>
        </div>
        <input
          type="number"
          placeholder="0.00"
          {...field}
          className={`input-form w-full appearance-none pr-4 pl-7 ${
            fieldState.error?.message
              ? "border-red-400 dark:border-red-400"
              : ""
          }`}
        />
        <CurrencyPicker
          activeCurrency={activeCurrency}
          setCurrencyValue={setActiveCurrency}
        />
      </div>
      {fieldState.error?.message && (
        <FieldError message={fieldState.error.message} />
      )}
    </div>
  );
};

export default FieldBudget;
