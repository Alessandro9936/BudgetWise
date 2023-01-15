import { Outlet } from "react-router-dom";
import Filters from "./components/filters/filters";
import Transactions from "./components/transactions";

const Invoices = () => {
  return (
    <section className="flex w-full flex-1 flex-col gap-6 overflow-x-hidden bg-gray-100 p-6">
      <Filters />
      <Transactions />
      <Outlet />
    </section>
  );
};

export default Invoices;
