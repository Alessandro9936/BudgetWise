import { FiltersSidebar } from "./components/FiltersSidebar";
import { Transactions } from "./components/Transactions";
import { HeaderStates } from "./components/HeaderStates";
import { ContentGrid } from "../../components/UI/ContentGrid";
import classes from "./Invoices.module.css";

export default function Invoices() {
  return (
    <ContentGrid gridAreas={classes["invoice-areas__expense"]}>
      <HeaderStates />
      <Transactions />
      <FiltersSidebar />
    </ContentGrid>
  );
}
