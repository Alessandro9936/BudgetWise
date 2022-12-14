import classes from "./App.module.css";

import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import { Outlet } from "react-router-dom";
import { useGetTransactions } from "../../utils/queryTransactions";
import { useGetBudgets } from "../../utils/queryBudget";

export default function App() {
  useGetTransactions();
  useGetBudgets();
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}
