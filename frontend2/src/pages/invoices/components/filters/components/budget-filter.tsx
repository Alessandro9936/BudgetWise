import { useState } from "react";
import { Database } from "react-feather";
import { useSearchParams } from "react-router-dom";
import Card from "../../../../../components/card";
import allBudgets from "../../../../budgets/utils/all-budgets";
import ClearFilterButton from "./clearFilter-button";

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
      <Card classNames="cursor-pointer justify-between md:justify-start flex items-center gap-x-6 font-semibold px-4 py-2">
        <p>Expense budget</p>
        <Database color="#0f172a" size={18} />
      </Card>

      {isOpen && (
        <ul className="absolute top-12 z-10 grid w-full origin-top-left animate-fadeIn grid-cols-autoFillBudgetOptions gap-2 rounded-lg bg-white p-4 shadow-lg md:w-[360px] lg:right-0 lg:origin-top-right">
          {allBudgets.map((budget) => (
            <li key={budget.name} className="flex items-center gap-2">
              <input
                onChange={() => onStateChange(budget.name)}
                type="checkbox"
                name="state"
                value={budget.name}
                checked={checkedValues.includes(budget.name)}
                className="h-4 w-4 cursor-pointer rounded accent-purple-500"
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
        </ul>
      )}
    </>
  );
};

export default BudgetFilter;
