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
import UserForm from "./pages/user/update/user-form";
import DeleteUserModal from "./pages/user/delete/user-delete";
import Profile from "./pages/user/profile/profile";
import ErrorPage from "./pages/error/error-page";
import Home from "./pages/home/home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: (error: any) =>
        error.response.status === 403 || error.response.status >= 500,
      retry: (_, error: any) => error.response.status !== 403,
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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
