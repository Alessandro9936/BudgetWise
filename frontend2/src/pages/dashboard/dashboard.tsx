import Card from "../../components/card";

import Summary from "./components/summary";

const Dashboard = () => {
  return (
    <section className="grid flex-1 grid-cols-1 gap-6 bg-slate-100 p-6 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2">
      {/* Graph */}
      <Card classNames="order-2 md:col-span-full lg:order-1 lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-4 " />

      {/* Summary */}
      <Summary gridDisposition="order-1 md:order-3" />

      {/* Calendar */}
      <Card classNames="order-3 md:order-4 " />

      {/* Activity */}
      <Card classNames="order-4 md:order-2 md:row-start-2 md:row-end-4 lg:col-start-3 lg:col-end-5 lg:row-start-1" />
    </section>
  );
};

export default Dashboard;
