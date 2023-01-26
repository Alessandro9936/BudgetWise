import { useState } from "react";
import { Database } from "react-feather";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../../components/Utilities/card";
import allBudgets from "../../../../../constants/all-budgets";
import ClearFilterButton from "./clearFilter-button";

import { motion } from "framer-motion";
import { BiPieChartAlt2 } from "react-icons/bi";

const BudgetFilter = ({ isOpen }: { isOpen: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedValues, setCheckedValues] = useState(
    searchParams.get("budget")?.split(",") || []
  );

  const onStateChange = (value: string) => {
    let budgets = checkedValues;

    if (budgets.includes(value)) {
      budgets = budgets.filter((budget) => budget !== value);
    } else {
      budgets = [...budgets, value];
    }

    searchParams.set("budget", budgets.join(","));
    setSearchParams(searchParams);
    setCheckedValues(budgets);

    if (budgets.length === 0) {
      searchParams.delete("budget");
      setSearchParams(searchParams);
    }
  };

  const onReset = () => {
    searchParams.delete("budget");
    setSearchParams(searchParams);
    setCheckedValues([]);
  };

  return (
    <>
      <Card
        classNames={`dark:bg-slate-800 cursor-pointer justify-between md:justify-start flex items-center gap-x-6 font-semibold px-4 py-2 ${
          checkedValues.length > 0
            ? "ring ring-inset ring-indigo-500 text-indigo-500"
            : ""
        }`}
      >
        <p>Expense budget</p>
        <BiPieChartAlt2 size={24} />
      </Card>

      {isOpen && (
        <motion.ul
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.25 } }}
          className="absolute top-12 z-10 grid w-full origin-top-left grid-cols-autoFillBudgetOptions gap-2 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800 md:w-[360px]"
        >
          {allBudgets.map((budget) => (
            <li key={budget.name} className="flex items-center gap-2">
              <input
                onChange={() => onStateChange(budget.name)}
                type="checkbox"
                name="state"
                value={budget.name}
                checked={checkedValues.includes(budget.name)}
                className="h-4 w-4 cursor-pointer rounded  accent-indigo-500 dark:accent-indigo-600"
              />
              <label className="inline-flex items-center">{budget.label}</label>
            </li>
          ))}
          <div className="col-span-full">
            <ClearFilterButton
              disabled={checkedValues.length === 0}
              reset={onReset}
            />
          </div>
        </motion.ul>
      )}
    </>
  );
};

export default BudgetFilter;
