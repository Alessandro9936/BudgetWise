import { BiSortAlt2 } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import ClearFilterButton from "./components/clearFilterButton";

import { AnimatePresence, motion } from "framer-motion";
import { FilterProps } from "./types/types";
import FilterWrapper from "./components/filterWrapper";
import FilterCard from "./components/filterCard";
import { filterCardVariants } from "./utils/variants";
import useContextParams from "./hooks/useContextParams";
import useOutsideClick from "@/hooks/useOnClickOutside";
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

const SortFilter = ({ isOpen, setActiveDropdown }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSort = searchParams.get("sort") || "";

  useContextParams({ paramName: "sort", activeValues: activeSort });

  const onSortChange = (value: string) => {
    searchParams.set("sort", value);
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
                <SortOption
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  activeSort={activeSort}
                  onSortChange={onSortChange}
                  fieldName="date"
                />
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <p className="font-semibold">Amount</p>

              {amountOptions.map((option) => (
                <SortOption
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  activeSort={activeSort}
                  onSortChange={onSortChange}
                  fieldName="amount"
                />
              ))}
            </div>

            <ClearFilterButton disabled={!activeSort} paramName="sort" />
          </motion.div>
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
};

type SortOptionProps = {
  label: string;
  value: string;
  fieldName: "amount" | "date";
  activeSort: string;
  onSortChange: (value: string) => void;
};

const SortOption = ({
  label,
  value,
  fieldName,
  activeSort,
  onSortChange,
}: SortOptionProps) => {
  return (
    <div key={value} className="flex items-center gap-2">
      <input
        onChange={() => onSortChange(value)}
        type="radio"
        name={fieldName}
        value={value}
        checked={value === activeSort}
        className="0 h-4 w-4 cursor-pointer border-gray-300  accent-indigo-500 dark:accent-indigo-600"
      />
      <label>{label}</label>
    </div>
  );
};

export default SortFilter;
