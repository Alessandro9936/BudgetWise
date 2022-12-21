import { DataLoader } from "./../../components/UI/DataLoader";
import { Outlet, useLoaderData } from "react-router-dom";
import { ContentGrid } from "../../components/UI/ContentGrid";
import { Activity } from "./components/Activity";
import { CalendarDashboard } from "./components/Calendar";
import { Graph } from "./components/Graph";
import { Summary } from "./components/Summary";

import classes from "./Dashboard.module.css";
import { useGetTransactionsByDate } from "../../utils/queryTransactions";
import { useState } from "react";

export default function Dashboard() {
  const { data: initialData, isLoading } = useGetTransactionsByDate(new Date());
  const [graphDate, setGraphDate] = useState(new Date());

  return (
    <ContentGrid gridAreas={classes["dashboard-areas"]}>
      {isLoading && <DataLoader />}
      {!isLoading && (
        <>
          <Summary activeDate={graphDate} />
          <CalendarDashboard transactionMapped={initialData} />
          <Activity transactionMapped={initialData} />
          <Graph setGraphDate={setGraphDate} />
          <Outlet />
        </>
      )}
    </ContentGrid>
  );
}
