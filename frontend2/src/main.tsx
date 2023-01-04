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

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

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
            // element: <TransactionModal />,
          },
          {
            path: "transaction/:id",
            // element: <TransactionDetail />,
          },
          {
            path: "transaction/:id/update",
            //  element: <TransactionModal />,
          },
          {
            path: "transaction/:id/delete",
            // element: <ModalDelete toDelete="transaction" />,
          },
        ],
      },
      {
        path: "invoices",
        element: <Invoices />,
        children: [
          {
            path: "transaction/:id",
            //element: <TransactionDetail />,
          },
          {
            path: "transaction/:id/update",
            //  element: <TransactionModal />,
          },
          {
            path: "transaction/:id/delete",
            // element: <ModalDelete toDelete="transaction" />,
          },
        ],
      },
      {
        path: "budgets",
        // element: <Budgets />,
        children: [
          {
            path: "new",
            //  element: <BudgetModal />,
          },
          {
            path: ":id",
            // element: <BudgetDetails />,
          },
          {
            path: ":id/update",
            // element: <BudgetModal />,
          },
          {
            path: ":id/delete",
            // element: <ModalDelete toDelete="budget" />,
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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
