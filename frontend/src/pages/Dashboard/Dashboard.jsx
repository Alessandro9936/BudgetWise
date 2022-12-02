import { ContentGrid } from "../../components/UI/ContentGrid";
import { Activity } from "./components/Activity";
import { CalendarDashboard } from "./components/Calendar";
import { Graph } from "./components/Graph";
import { Summary } from "./components/Summary";
import classes from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <ContentGrid gridAreas={classes["dashboard-areas"]}>
      <Summary />
      <CalendarDashboard />
      <Activity />
      <Graph />
    </ContentGrid>
  );
}
