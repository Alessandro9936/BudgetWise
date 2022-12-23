import { FiltersSidebar } from "./components/FiltersSidebar";
import { Transactions } from "./components/Transactions";
import { HeaderStates } from "./components/HeaderStates";
import { ContentGrid } from "../../components/UI/ContentGrid";
import classes from "./Invoices.module.css";
import { useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Invoices() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    sort: "date",
    type: "",
    date: "2022",
    state: [],
    budget: [],
  });

  useEffect(() => {
    let searchUrl = {};

    for (const [key, value] of Object.entries(filters)) {
      if (value.length === 0 && searchParams.has(key)) {
        searchParams.delete(key);
        setSearchParams(searchParams);
        return;
      } else if (value.length === 0) continue;

      searchUrl = {
        ...searchUrl,
        [key]: key === "state" || key === "budget" ? value.join(",") : value,
      };

      setSearchParams(searchUrl);
    }
  }, [filters]);

  return (
    <ContentGrid gridAreas={classes["invoice-areas__expense"]}>
      <>
        <HeaderStates />
        <Transactions />
        <FiltersSidebar setFilters={setFilters} />
      </>
      <Outlet />
    </ContentGrid>
  );
}
