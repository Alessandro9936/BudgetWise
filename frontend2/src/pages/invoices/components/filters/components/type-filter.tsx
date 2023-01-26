import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../../components/Utilities/card";
import ClearFilterButton from "./clearFilter-button";

import { motion } from "framer-motion";
import { BiCreditCardFront } from "react-icons/bi";

const options = [
  {
    label: "Income",
    value: "income",
  },
  {
    label: "Expense",
    value: "expense",
  },
];

const TypeFilter = ({ isOpen }: { isOpen: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedValue, setCheckedValue] = useState(
    searchParams.get("type") || ""
  );

  const onTypeChange = (value: string) => {
    searchParams.set("type", value);
    setSearchParams(searchParams);
    setCheckedValue(value);

    if (value === "income") {
      searchParams.delete("state");
      searchParams.delete("budget");
      setSearchParams(searchParams);
    }
  };

  const onReset = () => {
    searchParams.delete("type");
    setSearchParams(searchParams);
    setCheckedValue("");
  };

  return (
    <>
      <Card
        classNames={`dark:bg-slate-800 cursor-pointer flex justify-between md:justify-start items-center gap-x-6 font-semibold px-3 py-2 ${
          checkedValue ? "ring ring-inset ring-indigo-500 text-indigo-500" : ""
        }`}
      >
        <p>Transaction type</p>
        <BiCreditCardFront size={24} />
      </Card>

      {isOpen && (
        <motion.ul
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.25 } }}
          className="absolute top-12 z-10 flex h-fit w-full origin-top-left flex-col gap-2 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800"
        >
          {options.map((option) => (
            <li key={option.value} className="flex items-center gap-2">
              <input
                onChange={() => onTypeChange(option.value)}
                type="radio"
                name="type"
                value={option.value}
                checked={option.value === checkedValue}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-transparent accent-indigo-500 dark:accent-indigo-600"
              />
              <label>{option.label}</label>
            </li>
          ))}
          <ClearFilterButton
            disabled={!searchParams.get("type")}
            reset={onReset}
          />
        </motion.ul>
      )}
    </>
  );
};

export default TypeFilter;
