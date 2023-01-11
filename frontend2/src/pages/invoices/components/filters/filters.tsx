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

  return (
    <div className="flex flex-wrap gap-7">
      <div className="relative w-full midsm:min-w-[230px] midsm:flex-1  md:w-max md:min-w-max md:flex-initial ">
        <div
          className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
          onClick={() =>
            setActiveDropdown((prev) => (prev === "date" ? null : "date"))
          }
        />
        <DateFilter isOpen={activeDropdown === "date"} />
      </div>
      <div className="relative w-full midsm:min-w-[230px] midsm:flex-1 md:w-max md:min-w-max md:flex-initial">
        <div
          className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
          onClick={() =>
            setActiveDropdown((prev) => (prev === "type" ? null : "type"))
          }
        />
        <TypeFilter isOpen={activeDropdown === "type"} />
      </div>
      <div className="relative w-full midsm:min-w-[230px] midsm:flex-1 md:w-max md:min-w-max md:flex-initial">
        <div
          className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
          onClick={() =>
            setActiveDropdown((prev) => (prev === "sort" ? null : "sort"))
          }
        />
        <SortFilter isOpen={activeDropdown === "sort"} />
      </div>
      {transactionType === "expense" && (
        <>
          <div className="relative w-full midsm:min-w-[230px] midsm:flex-1 md:w-max md:min-w-max md:flex-initial">
            <div
              className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
              onClick={() =>
                setActiveDropdown((prev) => (prev === "state" ? null : "state"))
              }
            />
            <StateFilter isOpen={activeDropdown === "state"} />
          </div>
          <div className="relative w-full midsm:min-w-[230px] midsm:flex-1 md:w-max md:min-w-max md:flex-initial">
            <div
              className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
              onClick={() =>
                setActiveDropdown((prev) =>
                  prev === "budget" ? null : "budget"
                )
              }
            />
            <BudgetFilter isOpen={activeDropdown === "budget"} />
          </div>
        </>
      )}
    </div>
  );
};
export default Filters;
