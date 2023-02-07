import { BiSortAlt2 } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import ClearFilterButton from "./components/ClearFilter";

import { AnimatePresence, motion } from "framer-motion";
import { IFilter } from "./types/types";
import FilterWrapper from "./components/FilterWrapper";
import FilterCard from "./components/FilterCard";
import { filterCardVariants } from "./utils/variants";
import useContextParams from "./hooks/useContextParams";
import useOutsideClick from "../../../../hooks/useOnClickOutside";
import { useCallback } from "react";

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

const SortFilter = ({ isOpen, setActiveDropdown }: IFilter) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSort = searchParams.get("sort") || "";

  useContextParams({ paramName: "sort", activeValues: activeSort });

  const onSortChange = (value: string) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  const onReset = () => {
    searchParams.delete("sort");
    setSearchParams(searchParams);
  };

  const ref = useOutsideClick<HTMLDivElement>(
    useCallback(() => setActiveDropdown(null), [])
  );

  return (
    <FilterWrapper>
      <FilterCard
        filterName="sort"
        setActiveDropdown={setActiveDropdown}
        hasParams={!!searchParams.get("sort")}
      >
        <p>Sort</p>
        <BiSortAlt2 size={24} />
      </FilterCard>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            variants={filterCardVariants}
            initial="initial"
            animate="ending"
            exit="exit"
            className="absolute top-12 z-10 h-fit w-full origin-top-left rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800 md:w-max"
          >
            <div className="flex flex-col gap-2 border-b border-gray-300 pb-4">
              <p className="font-semibold">Date</p>

              {dateOptions.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <input
                    onChange={() => onSortChange(option.value)}
                    type="radio"
                    name="date"
                    value={option.value}
                    checked={option.value === activeSort}
                    className="0 h-4 w-4 cursor-pointer border-gray-300  accent-indigo-500 dark:accent-indigo-600"
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <p className="font-semibold">Amount</p>

              {amountOptions.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <input
                    onChange={() => onSortChange(option.value)}
                    type="radio"
                    name="amount"
                    value={option.value}
                    checked={option.value === activeSort}
                    className="h-4 w-4 cursor-pointer border-gray-300 accent-indigo-500 dark:accent-indigo-600"
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>

            <ClearFilterButton disabled={!activeSort} reset={onReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
};

export default SortFilter;
