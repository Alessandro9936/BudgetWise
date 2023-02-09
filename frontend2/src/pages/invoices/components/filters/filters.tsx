import BudgetFilter from "./budgetFilter";
import StateFilter from "./stateFilter";
import SortFilter from "./sortFilter";
import TypeFilter from "./typeFilter";
import DateFilter from "./dateFilter";
import { useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { ParamsContext } from "../../../../context/paramsContext";
import { ParamNames } from "./types/types";

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeDropdown, setActiveDropdown] = useState<null | ParamNames>(null);

  /**
   * Every time /invoices route is rendered run this useEffect to automatically set in the url all the filter parameters that are active in the ParamsContext.
   * ! TO  FIX - If click two times on route the parameters are deleted, useEffect doesn't run since the pathname doesn't change
   */

  const { pathname } = useLocation();
  const { params } = useContext(ParamsContext);
  useEffect(() => {
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        // parameters that accepts multiple values like state, budget, ...
        if (Array.isArray(value)) {
          if (value.length > 0) {
            searchParams.set(key, value.join(","));
            setSearchParams(searchParams);
          }
        }
        // parameters that accepts only one value like type and sort
        else if (value) {
          searchParams.set(key, value);
          setSearchParams(searchParams);
        }
      }
    }
  }, [pathname]);

  const transactionType = searchParams.get("type");

  return (
    <div className="flex flex-wrap gap-4">
      <DateFilter
        isOpen={activeDropdown === "range"}
        setActiveDropdown={setActiveDropdown}
      />

      <TypeFilter
        isOpen={activeDropdown === "type"}
        setActiveDropdown={setActiveDropdown}
      />

      <SortFilter
        isOpen={activeDropdown === "sort"}
        setActiveDropdown={setActiveDropdown}
      />

      {transactionType === "expense" && (
        <>
          <StateFilter
            isOpen={activeDropdown === "state"}
            setActiveDropdown={setActiveDropdown}
          />

          <BudgetFilter
            isOpen={activeDropdown === "budget"}
            setActiveDropdown={setActiveDropdown}
          />
        </>
      )}
    </div>
  );
};
export default Filters;
