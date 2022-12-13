import { DataLoader } from "./../../components/UI/DataLoader";
import { Outlet } from "react-router-dom";
import { ContentGrid } from "../../components/UI/ContentGrid";
import { Activity } from "./components/Activity";
import { CalendarDashboard } from "./components/Calendar";
import { Graph } from "./components/Graph";
import { Summary } from "./components/Summary";

import classes from "./Dashboard.module.css";
import { useGetTransactions } from "../../utils/queryTransactions";

export default function Dashboard() {
  const { data, isLoading } = useGetTransactions();

  return (
    <ContentGrid gridAreas={classes["dashboard-areas"]}>
      {isLoading && <DataLoader />}
      {!isLoading && data.length > 0 && (
        <>
          <Summary transactionMapped={data} />
          <CalendarDashboard transactionMapped={data} />
          <Activity transactionMapped={data} />
          <Graph transactionMapped={data} />
          <Outlet />
        </>
      )}
    </ContentGrid>
  );
}
