import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import SignUpForm from "./pages/signUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import LoginForm from "./pages/login";
import BudgetForm from "./pages/budgetForm";
import BudgetDetails from "./pages/budgetDetails";
import UserContextProvider from "./context/userContext";
import TransactionForm from "./pages/transactionForm";
import TransactionDetail from "./pages/transactionDetails";
import DeleteModal from "./components/modal/deleteModal";
import DeleteUserModal from "./pages/userDelete";
import ErrorPage from "./pages/errorPage";
import Home from "./pages/homePage";
import { ParamsProvider } from "./features/invoices/filters/context/paramsContext";

import Dashboard from "./pages/dashboard";
import Invoices from "./pages/invoices";
import Budgets from "./pages/budgets";
import UserForm from "./pages/userForm";
import Layout from "./layouts/layout";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();
/* 
  403: Refresh token expired, user need to login again
  500: Error server
  With these two states the error is thrown directly to the errorBoundary element without retrying
*/
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: (error: any) =>
        error.response.status === 403 || error.response.status >= 500,
      retry: (_, error: any) =>
        error.response.status !== 403 && error.response.status > 500,
    },
    mutations: {
      useErrorBoundary: (error: any) =>
        error.response.status === 403 || error.response.status >= 500,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <SignUpForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
    errorElement: <ErrorPage />,
  },
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
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
        element: <UserForm />,
        children: [
          {
            path: "delete",
            element: <DeleteUserModal />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <ParamsProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ParamsProvider>
    </UserContextProvider>
  </React.StrictMode>
);
