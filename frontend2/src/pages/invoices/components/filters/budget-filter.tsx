import { useSearchParams } from "react-router-dom";
import { budgets as allBudgets } from "../../../../utils/getBudgetUI";
import ClearFilterButton from "./components/clearFilter-button";

import { AnimatePresence, motion } from "framer-motion";
import { BiPieChartAlt2 } from "react-icons/bi";
import { IFilter } from "./types/types";
import FilterWrapper from "./components/FilterWrapper";
import FilterCard from "./components/FilterCard";
import { filterCardVariants } from "./utils/variants";
import useContextParams from "./hooks/useContextParams";

const BudgetFilter = ({ isOpen, setActiveDropdown }: IFilter) => {
  const [searchParams, setSearchParams] = useSearchParams();
  let activeBudgets = searchParams.get("budget")?.split(",") || [];

  useContextParams({ paramName: "budget", activeValues: activeBudgets });

  const onStateChange = (value: string) => {
    if (activeBudgets.includes(value)) {
      activeBudgets = activeBudgets.filter((budget) => budget !== value);
    } else {
      activeBudgets = [...activeBudgets, value];
    }

    searchParams.set("budget", activeBudgets.join(","));
    setSearchParams(searchParams);

    if (activeBudgets.length === 0) {
      searchParams.delete("budget");
      setSearchParams(searchParams);
    }
  };

  const onReset = () => {
    searchParams.delete("budget");
    setSearchParams(searchParams);
  };

  return (
    <FilterWrapper>
      <FilterCard
        filterName="budget"
        setActiveDropdown={setActiveDropdown}
        hasParams={!!searchParams.get("budget")}
      >
        <p>Expense budget</p>
        <BiPieChartAlt2 size={24} />
      </FilterCard>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={filterCardVariants}
            initial="initial"
            animate="ending"
            exit="exit"
            className="absolute top-12 z-10 grid w-full origin-top-left grid-cols-autoFillBudgetOptions gap-2 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800 md:w-[360px]"
          >
            {allBudgets.map((budget) => (
              <li key={budget.name} className="flex items-center gap-2">
                <input
                  onChange={() => onStateChange(budget.name)}
                  type="checkbox"
                  name="state"
                  value={budget.name}
                  checked={activeBudgets.includes(budget.name)}
                  className="h-4 w-4 cursor-pointer rounded accent-indigo-500 dark:accent-indigo-600"
                />
                <label>{budget.label}</label>
              </li>
            ))}
            <div className="col-span-full">
              <ClearFilterButton
                disabled={activeBudgets.length === 0}
                reset={onReset}
              />
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
};

export default BudgetFilter;