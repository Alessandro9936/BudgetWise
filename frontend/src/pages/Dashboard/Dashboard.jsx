import { DataLoader } from "./../../components/UI/DataLoader";
import { Outlet } from "react-router-dom";
import { ContentGrid } from "../../components/UI/ContentGrid";
import { Activity } from "./components/Activity";
import { CalendarDashboard } from "./components/Calendar";
import { Graph } from "./components/Graph";
import { Summary } from "./components/Summary";

import classes from "./Dashboard.module.css";
import { useTranctions } from "../../context/transactionsContext";

export default function Dashboard() {
  const { transactionState } = useTranctions();

  const transactionIsEmpty = transactionState.length === 0;

  return (
    <ContentGrid gridAreas={classes["dashboard-areas"]}>
      {transactionIsEmpty && <DataLoader />}
      {!transactionIsEmpty && (
        <>
          <Summary transactionMapped={transactionState} />
          <CalendarDashboard transactionMapped={transactionState} />
          <Activity transactionMapped={transactionState} />
          <Graph transactionMapped={transactionState} />
          <Outlet />
        </>
      )}
    </ContentGrid>
  );
}
