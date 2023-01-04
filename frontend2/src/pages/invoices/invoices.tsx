import Filters from "./components/filters/filters";
import Transactions from "./components/transactions";

const Invoices = () => {
  return (
    <section className="flex flex-1 flex-col gap-6 bg-gray-100 p-6">
      <Filters />
      <Transactions />
    </section>
  );
};

export default Invoices;
