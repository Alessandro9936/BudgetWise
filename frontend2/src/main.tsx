import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import SignUpForm from "./pages/user/signup/sign-up";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import LoginForm from "./pages/user/login/login";
import Layout from "./layouts/layout";
import Dashboard from "./pages/dashboard/dashboard";
import { ReactQueryDevtools } from "react-query/devtools";
import Invoices from "./pages/invoices/invoices";
import Budgets from "./pages/budgets/budgets";
import BudgetForm from "./pages/budget/budget-form";
import BudgetDetails from "./pages/budget/budget-detail";
import UserContextProvider from "./context/user-context";
import TransactionForm from "./pages/transaction/transaction-form";
import TransactionDetail from "./pages/transaction/transaction-detail";
import DeleteModal from "./components/Utilities/delete-modal";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello</div>,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <SignUpForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "transaction/new",
            element: <TransactionForm />,
          },
          {
            path: "transaction/:id",
            element: <TransactionDetail />,
          },
          {
            path: "transaction/:id/update",
            element: <TransactionForm />,
          },
          {
            path: "transaction/:id/delete",
            element: <DeleteModal toDelete="transaction" />,
          },
        ],
      },
      {
        path: "invoices",
        element: <Invoices />,
        children: [
          {
            path: "transaction/:id",
            element: <TransactionDetail />,
          },
          {
            path: "transaction/:id/update",
            element: <TransactionForm />,
          },
          {
            path: "transaction/:id/delete",
            element: <DeleteModal toDelete="transaction" />,
          },
        ],
      },
      {
        path: "budgets",
        element: <Budgets />,
        children: [
          {
            path: "new",
            element: <BudgetForm />,
          },
          {
            path: ":id",
            element: <BudgetDetails />,
          },
          {
            path: ":id/update",
            element: <BudgetForm />,
          },
          {
            path: ":id/delete",
            element: <DeleteModal toDelete="budget" />,
          },
        ],
      },

      {
        path: "profile",
        //  element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
