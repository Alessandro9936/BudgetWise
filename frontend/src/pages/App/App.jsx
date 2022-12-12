import classes from "./App.module.css";

import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import { Outlet } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { useTranctions } from "../../context/transactionsContext";
import { useBudgets } from "../../context/budgetsContenxt";

export default function App() {
  const axiosPrivate = useAxiosPrivate();
  const { dispatch: transactionDispatch } = useTranctions();
  const { dispatch: budgetDispatch } = useBudgets();

  const { isError: transactionError } = useQuery(
    ["user-transactions"],
    () => axiosPrivate.get("/api/transactions"),
    {
      onSuccess: (data) =>
        transactionDispatch({
          type: "set-transactions",
          payload: data.data.map((transaction) => ({
            ...transaction,
            date: new Date(transaction.date),
          })),
        }),
    }
  );
  const { isError: budgetError } = useQuery(
    ["user-budgets"],
    () => axiosPrivate.get("/api/budgets"),
    {
      onSuccess: (data) =>
        budgetDispatch({
          type: "set-budgets",
          payload: data.data.map((budget) => ({
            ...budget,
            date: new Date(budget.date),
          })),
        }),
    }
  );

  console.log("refetch everything");

  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}
