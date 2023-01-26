import { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../../components/Utilities/card";
import ClearFilterButton from "./clearFilter-button";

import { motion } from "framer-motion";

const dateOptions = [
  {
    label: "Newest to oldest",
    value: "-date",
  },
  {
    label: "Oldest to newest",
    value: "date",
  },
];
const amountOptions = [
  {
    label: "Largest to smallest",
    value: "-amount",
  },
  {
    label: "Smallest to largest",
    value: "amount",
  },
];

const SortFilter = ({ isOpen }: { isOpen: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedValue, setCheckedValue] = useState(
    searchParams.get("sort") || ""
  );

  const onSortChange = (value: string) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
    setCheckedValue(value);
  };

  const onReset = () => {
    searchParams.delete("sort");
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
        <p>Sort</p>
        <BiSortAlt2 size={24} />
      </Card>

      {isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.25 } }}
          className="absolute top-12 z-10 h-fit w-full origin-top-left rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800 md:w-max"
        >
          <div className="flex flex-col gap-2 border-b border-gray-300 pb-2">
            <p className="font-semibold">Date</p>
            <div>
              {dateOptions.map((option) => (
                <div
                  key={option.value}
                  className="mb-2 flex items-center gap-2"
                >
                  <input
                    onChange={() => onSortChange(option.value)}
                    type="radio"
                    name="date"
                    value={option.value}
                    checked={option.value === checkedValue}
                    className="0 h-4 w-4 cursor-pointer border-gray-300  accent-indigo-500 dark:accent-indigo-600"
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <p className="font-semibold">Amount</p>
            <div>
              {amountOptions.map((option) => (
                <div
                  key={option.value}
                  className="mb-2 flex items-center gap-2"
                >
                  <input
                    onChange={() => onSortChange(option.value)}
                    type="radio"
                    name="amount"
                    value={option.value}
                    checked={option.value === checkedValue}
                    className="h-4 w-4 cursor-pointer border-gray-300  accent-indigo-500 dark:accent-indigo-600"
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          <ClearFilterButton
            disabled={!searchParams.get("sort")}
            reset={onReset}
          />
        </motion.div>
      )}
    </>
  );
};

export default SortFilter;
