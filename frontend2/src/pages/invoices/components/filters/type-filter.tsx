import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ClearFilterButton from "./components/clearFilter-button";

import { AnimatePresence, motion } from "framer-motion";
import { BiCreditCardFront } from "react-icons/bi";
import { ParamsContext } from "../../../../context/params-content";
import { IFilter } from "./types/types";
import FilterWrapper from "./components/FilterWrapper";
import FilterCard from "./components/FilterCard";
import { filterCardVariants } from "./utils/variants";
import useContextParams from "./hooks/useContextParams";

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

const TypeFilter = ({ isOpen, setActiveDropdown }: IFilter) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeType = searchParams.get("type") || "";

  const { setParams } = useContext(ParamsContext);
  useContextParams({ paramName: "type", activeValues: activeType });

  const onTypeChange = (value: string) => {
    searchParams.set("type", value);
    setSearchParams(searchParams);

    if (value === "income") {
      setParams((prev) => ({ ...prev, state: [], budget: [] }));
      searchParams.delete("state");
      searchParams.delete("budget");
      setSearchParams(searchParams);
    }
  };

  const onReset = () => {
    searchParams.delete("type");
    setSearchParams(searchParams);
  };

  return (
    <FilterWrapper>
      <FilterCard
        filterName="type"
        setActiveDropdown={setActiveDropdown}
        hasParams={!!searchParams.get("type")}
      >
        <p>Transaction type</p>
        <BiCreditCardFront size={24} />
      </FilterCard>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={filterCardVariants}
            initial="initial"
            animate="ending"
            exit="exit"
            className="absolute top-12 z-10 flex h-fit w-full origin-top-left flex-col gap-2 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800"
          >
            {options.map((option) => (
              <li key={option.value} className="flex items-center gap-2">
                <input
                  onChange={() => onTypeChange(option.value)}
                  type="radio"
                  name="type"
                  value={option.value}
                  checked={option.value === activeType}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-transparent accent-indigo-500 dark:accent-indigo-600"
                />
                <label>{option.label}</label>
              </li>
            ))}
            <ClearFilterButton disabled={!activeType} reset={onReset} />
          </motion.ul>
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
};

export default TypeFilter;
