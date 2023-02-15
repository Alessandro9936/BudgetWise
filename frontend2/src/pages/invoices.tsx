import { Outlet } from "react-router-dom";

import { Filters, Transactions } from "@/features/invoices";

const Invoices = () => {
  return (
    <section className="flex w-full flex-1 flex-col gap-6 overflow-auto overflow-x-hidden bg-neutral-100 p-6 dark:bg-slate-900">
      <Filters />
      <Transactions />
      <Outlet />
    </section>
  );
};

export default Invoices;
