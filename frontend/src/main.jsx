import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { SignUp } from "./pages/SignUp/SignUp";
import { Login } from "./pages/Login/Login";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
