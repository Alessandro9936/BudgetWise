import { FiltersSidebar } from "./components/FiltersSidebar";
import { Transactions } from "./components/Transactions";
import { HeaderStates } from "./components/HeaderStates";
import { ContentGrid } from "../../components/UI/ContentGrid";
import classes from "./Invoices.module.css";
import { useGetTransactions } from "../../utils/queryTransactions";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

const custom = (filters) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let searchUrl = {};

  return useMemo(() => {
    for (const [key, value] of Object.entries(filters)) {
      if (value.length === 0 && searchParams.has(key)) {
        searchParams.delete(key);
        setSearchParams(searchParams);
        return;
      } else if (value.length === 0) continue;

      searchUrl = {
        ...searchUrl,
        [key]: key === "type" || key === "sort" ? value : value.join(","),
      };

      setSearchParams(searchUrl);
    }
  }, [filters]);
};

export default function Invoices() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    type: "",
    date: [],
    state: [],
    budget: [],
    // sorters: [],
  });

  custom(filters);

  return (
    <ContentGrid gridAreas={classes["invoice-areas__expense"]}>
      <>
        {console.log(filters)}
        <HeaderStates />
        <Transactions />
        <FiltersSidebar setFilters={setFilters} />
      </>
    </ContentGrid>
  );
}
