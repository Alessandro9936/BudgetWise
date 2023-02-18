import { Outlet } from "react-router-dom";
import { useGetTransactionsByDate } from "@/services/transaction-services";
import {
  Activity,
  Calendar,
  Summary,
  TransactionsGraph,
} from "@/features/dashboard";

const Dashboard = () => {
  const { isLoading } = useGetTransactionsByDate(new Date(), "Monthly");

  if (isLoading) {
    return <h3 className="p-6">Loading...</h3>;
  }

  return (
    <>
      <section className="grid flex-1 gap-6 bg-neutral-100 p-6 dark:bg-slate-900 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1.25fr] lg:grid-rows-[auto_1fr]">
        <Summary gridDisposition="md:order-0" />
        <TransactionsGraph gridDisposition="md:order-3 md:col-span-full lg:order-3 lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3" />

        <Calendar gridDisposition="md:order-1" />

        <Activity gridDisposition="md:order-3 md:col-span-full lg:order-2 lg:row-span-full lg:col-start-3 lg:col-end-5 lg:row-start-1" />
      </section>
      <Outlet />
    </>
  );
};

export default Dashboard;
