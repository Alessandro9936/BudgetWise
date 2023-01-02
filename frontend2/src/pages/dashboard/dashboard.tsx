import Activity from "./components/activity";
import Calendar from "./components/calendar";
import Graph from "./components/graph";

import Summary from "./components/summary";

const Dashboard = () => {
  return (
    <section className="grid flex-1 grid-cols-1 gap-6 bg-slate-100 p-6 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1.25fr] lg:grid-rows-[auto_1fr]">
      {/* Graph */}
      <Graph gridDisposition="order-2 md:col-span-full lg:order-1 lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-4 " />

      {/* Summary */}
      <Summary gridDisposition="order-1 md:order-3" />

      {/* Calendar */}
      <Calendar gridDisposition="order-3 md:order-4 " />

      {/* Activity */}
      <Activity gridDisposition="order-4 col-span-full lg:order-2 lg:row-start-2 lg:row-end-4 lg:col-start-3 lg:col-end-5 lg:row-start-1" />
    </section>
  );
};

export default Dashboard;
