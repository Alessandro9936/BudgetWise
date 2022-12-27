import { useState } from "react";
import { ChevronDown } from "react-feather";

import currencies from "../utils/currencies";
import { useController, UseControllerProps } from "react-hook-form";
import { SignUpFormType } from "../types/types";

import FieldError from "../../../../components/field-error";

type currencyType = {
  code: string;
  symbol: string;
};

const CurrencyPicker = ({
  setActiveCurrency,
  activeCurrency,
}: {
  setActiveCurrency: (currency: currencyType) => void;
  activeCurrency: currencyType;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="absolute inset-y-0 right-0 flex cursor-pointer items-center rounded-r-lg border-l-[1px] px-2"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <span className="mr-2 text-sm text-gray-500">
          {activeCurrency.code}
        </span>
        <ChevronDown color="#6b7280" size={18} />
      </div>
      {isModalOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
          <div
            className="py-2 "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {currencies.map((currency) => (
              <span
                key={currency.code}
                className="text-md block cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                onClick={() => setActiveCurrency(currency)}
              >
                <span>{currency.code}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const FieldBudget = ({ ...props }: UseControllerProps<SignUpFormType>) => {
  const {
    formState: { errors },
    fieldState,
    field,
  } = useController(props);

  const [activeCurrency, setActiveCurrency] = useState<currencyType>({
    code: "USD",
    symbol: "$",
  });

  const onActiveCurrencyChange = (currency: currencyType) => {
    setActiveCurrency(currency);
    localStorage.setItem("currency", JSON.stringify(currency));
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="userBudget" className="font-medium">
        Your starting budget <span className="text-red-500">*</span>
      </label>
      <div className="rounder-lg relative shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-sm text-gray-500">{activeCurrency.symbol}</span>
        </div>
        <input
          type="text"
          placeholder="0.00"
          {...field}
          className={`w-full rounded-lg border border-transparent border-gray-300 bg-white py-2 pr-4 pl-7 text-base shadow-sm placeholder:text-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-slate-900  ${
            fieldState.error?.message ? "border-red-500" : ""
          }`}
        />
        <CurrencyPicker
          setActiveCurrency={onActiveCurrencyChange}
          activeCurrency={activeCurrency}
        />
      </div>
      {errors[field.name] && (
        <FieldError message={errors[field.name]?.message as string} />
      )}
    </div>
  );
};

export default FieldBudget;
