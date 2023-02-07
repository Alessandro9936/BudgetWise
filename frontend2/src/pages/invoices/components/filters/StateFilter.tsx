import { useSearchParams } from "react-router-dom";
import ClearFilterButton from "./components/ClearFilter";
import { AnimatePresence, motion } from "framer-motion";
import { BiRepost } from "react-icons/bi";
import { IFilter } from "./types/types";
import FilterWrapper from "./components/FilterWrapper";
import FilterCard from "./components/FilterCard";
import { filterCardVariants } from "./utils/variants";
import useContextParams from "./hooks/useContextParams";
import useOutsideClick from "../../../../hooks/useOnClickOutside";
import { useCallback } from "react";

const options = [
  {
    label: "Paid",
    value: "paid",
  },
  {
    label: "To pay",
    value: "topay",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
];

const StateFilter = ({ isOpen, setActiveDropdown }: IFilter) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let activeStates = searchParams.get("state")?.split(",") || [];

  useContextParams({ paramName: "state", activeValues: activeStates });

  const onStateChange = (value: string) => {
    if (activeStates.includes(value)) {
      activeStates = activeStates.filter((state) => state !== value);
    } else {
      activeStates = [...activeStates, value];
    }

    searchParams.set("state", activeStates.join(","));
    setSearchParams(searchParams);

    if (activeStates.length === 0) {
      searchParams.delete("state");
      setSearchParams(searchParams);
    }
  };

  const onReset = () => {
    searchParams.delete("state");
    setSearchParams(searchParams);
  };

  const ref = useOutsideClick<HTMLUListElement>(
    useCallback(() => setActiveDropdown(null), [])
  );

  return (
    <FilterWrapper>
      <FilterCard
        filterName="state"
        setActiveDropdown={setActiveDropdown}
        hasParams={!!searchParams.get("state")}
      >
        <p>Expense state</p>
        <BiRepost size={24} />
      </FilterCard>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            ref={ref}
            variants={filterCardVariants}
            initial="initial"
            animate="ending"
            exit="exit"
            className="mid-sm:w-max absolute top-12 z-10 flex h-fit w-full min-w-[167px] origin-top-left flex-col gap-2 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800"
          >
            {options.map((option) => (
              <li key={option.value} className="flex items-center gap-2">
                <input
                  onChange={() => onStateChange(option.value)}
                  type="checkbox"
                  name="state"
                  value={option.value}
                  checked={activeStates.includes(option.value)}
                  className="h-4 w-4 cursor-pointer rounded accent-indigo-500 dark:accent-indigo-600"
                />
                <label>{option.label}</label>
              </li>
            ))}
            <ClearFilterButton
              disabled={activeStates.length === 0}
              reset={onReset}
            />
          </motion.ul>
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
};

export default StateFilter;
