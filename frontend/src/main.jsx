import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import "./index.css";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { SignUp } from "./pages/SignUp/SignUp";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
