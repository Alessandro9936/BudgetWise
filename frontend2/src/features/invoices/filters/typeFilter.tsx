import { useCallback, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ClearFilterButton from "./components/clearFilterButton";

import { AnimatePresence, motion } from "framer-motion";
import { BiCreditCardFront } from "react-icons/bi";
import { ParamsContext } from "./context/paramsContext";
import { FilterProps } from "./types/types";
import FilterWrapper from "./components/filterWrapper";
import FilterCard from "./components/filterCard";
import { filterCardVariants } from "./utils/variants";
import useContextParams from "./hooks/useContextParams";
import useOutsideClick from "@/hooks/useOnClickOutside";

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

const TypeFilter = ({ isOpen, setActiveDropdown }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeType = searchParams.get("type") || "";

  // Anytime activeType change check value. State and budget parameters should be active only when activeType is equal to expense, if it is not delete them from url
  useEffect(() => {
    if (activeType !== "expense") {
      setParams((prev) => ({ ...prev, state: [], budget: [] }));
      searchParams.delete("state");
      searchParams.delete("budget");
      setSearchParams(searchParams);
    }
  }, [activeType]);

  const { setParams } = useContext(ParamsContext);
  useContextParams({ paramName: "type", activeValues: activeType });

  const onTypeChange = (value: string) => {
    searchParams.set("type", value);
    setSearchParams(searchParams);
  };

  const ref = useOutsideClick<HTMLUListElement>(
    useCallback(() => setActiveDropdown(null), [])
  );

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
            ref={ref}
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
            <ClearFilterButton disabled={!activeType} paramName="type" />
          </motion.ul>
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
};

export default TypeFilter;
