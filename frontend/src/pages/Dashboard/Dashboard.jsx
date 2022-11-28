import { Activity } from "./components/Activity";
import { CalendarDashboard } from "./components/Calendar";
import { Graph } from "./components/Graph";
import { Summary } from "./components/Summary";
import classes from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <section className={classes["dashboard-grid"]}>
      <Summary />
      <CalendarDashboard />
      <Activity />
      <Graph />
    </section>
  );
}
