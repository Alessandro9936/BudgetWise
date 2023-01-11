import { useState } from "react";
import { AlignLeft } from "react-feather";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../../components/Utilities/card";
import ClearFilterButton from "./clearFilter-button";

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
      <Card classNames="cursor-pointer flex justify-between md:justify-start items-center gap-x-6 font-semibold px-3 py-2">
        <p>Sort</p>
        <AlignLeft color="#0f172a" size={18} />
      </Card>

      {isOpen && (
        <div className="absolute top-12 z-10 h-fit w-full origin-top-left animate-fadeIn rounded-lg bg-white p-4 shadow-lg md:w-max">
          <div className="flex flex-col gap-2 border-b border-gray-300 pb-2">
            <p>Date</p>
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
                    className="h-4 w-4 cursor-pointer border-gray-300 text-purple-500 accent-purple-500"
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <p>Amount</p>
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
                    className="h-4 w-4 cursor-pointer border-gray-300 text-purple-500 accent-purple-500"
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
        </div>
      )}
    </>
  );
};

export default SortFilter;
