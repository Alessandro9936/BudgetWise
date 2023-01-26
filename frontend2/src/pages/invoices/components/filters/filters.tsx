import BudgetFilter from "./components/budget-filter";
import StateFilter from "./components/state-filter";
import SortFilter from "./components/sort-filter";
import TypeFilter from "./components/type-filter";
import DateFilter from "./components/date-filter";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Filters = () => {
  const [searchParams, _] = useSearchParams();
  const [activeDropdown, setActiveDropdown] = useState<
    null | "date" | "type" | "sort" | "state" | "budget"
  >(null);

  const transactionType = searchParams.get("type");

  const handleActiveDropdown = (dropdown: typeof activeDropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div className="relative w-full midsm:min-w-[230px] midsm:flex-1  md:w-max md:min-w-max md:flex-initial ">
        <div
          className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
          onClick={() => handleActiveDropdown("date")}
        />
        <DateFilter isOpen={activeDropdown === "date"} />
      </div>
      <div className="relative w-full midsm:min-w-[230px] midsm:flex-1 md:w-max md:min-w-max md:flex-initial">
        <div
          className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
          onClick={() => handleActiveDropdown("type")}
        />
        <TypeFilter isOpen={activeDropdown === "type"} />
      </div>
      <div className="relative w-full midsm:min-w-[230px] midsm:flex-1 md:w-max md:min-w-max md:flex-initial">
        <div
          className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
          onClick={() => handleActiveDropdown("sort")}
        />
        <SortFilter isOpen={activeDropdown === "sort"} />
      </div>
      {transactionType === "expense" && (
        <>
          <div className="relative w-full midsm:min-w-[230px] midsm:flex-1 md:w-max md:min-w-max md:flex-initial">
            <div
              className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
              onClick={() => handleActiveDropdown("state")}
            />
            <StateFilter isOpen={activeDropdown === "state"} />
          </div>
          <div className="relative w-full midsm:min-w-[230px] midsm:flex-1 md:w-max md:min-w-max md:flex-initial">
            <div
              className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
              onClick={() => handleActiveDropdown("budget")}
            />
            <BudgetFilter isOpen={activeDropdown === "budget"} />
          </div>
        </>
      )}
    </div>
  );
};
export default Filters;
