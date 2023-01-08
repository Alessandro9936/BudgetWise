import { useState } from "react";
import { CreditCard } from "react-feather";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../../components/card";
import ClearFilterButton from "./clearFilter-button";

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
      <Card classNames="cursor-pointer flex justify-between md:justify-start items-center gap-x-6 font-semibold px-3 py-2">
        <p>Transaction type</p>
        <CreditCard color="#0f172a" size={18} />
      </Card>

      {isOpen && (
        <ul className="absolute top-12 z-10 flex h-fit w-full origin-top-left animate-fadeIn flex-col gap-2 rounded-lg bg-white p-4 shadow-lg">
          {options.map((option) => (
            <li key={option.value} className="flex items-center gap-2">
              <input
                onChange={() => onTypeChange(option.value)}
                type="radio"
                name="type"
                value={option.value}
                checked={option.value === checkedValue}
                className="h-4 w-4 cursor-pointer border-gray-300 text-purple-500 accent-purple-500"
              />
              <label>{option.label}</label>
            </li>
          ))}
          <ClearFilterButton
            disabled={!searchParams.get("type")}
            reset={onReset}
          />
        </ul>
      )}
    </>
  );
};

export default TypeFilter;
