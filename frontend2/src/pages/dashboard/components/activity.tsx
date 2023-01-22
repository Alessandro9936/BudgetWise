import { useMemo } from "react";
import ButtonRedirect from "../../../components/Buttons/ButtonRedirect";

import Card from "../../../components/Utilities/card";
import TransactionCard from "../../../components/UI/TransactionCard";
import { useGetTransactionsByDate } from "../../../services/transaction-services";

const Activity = ({ gridDisposition }: { gridDisposition: string }) => {
  const querytransactions = useGetTransactionsByDate(new Date(), "Monthly");
  const transactions = querytransactions?.data ?? [];
  const sortTransactions = useMemo(
    () => transactions.sort((a, b) => b.date.getTime() - a.date.getTime()),
    [transactions]
  );

  return (
    <section className={`${gridDisposition} flex flex-col gap-y-4`}>
      <h3>Recent activity</h3>
      <Card classNames="flex-1 flex flex-col gap-4 lg:overflow-hidden relative dark:bg-slate-800">
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pt-4 pb-1 md:grid-cols-autoFill">
          {sortTransactions.map((transaction) => (
            <TransactionCard transaction={transaction} key={transaction._id} />
          ))}
        </div>
        <div className="grid gap-x-6 gap-y-4 px-4 pb-4 md:grid-cols-autoFill">
          <ButtonRedirect
            redirect="transaction/new"
            styles="flex-1 button-primary"
            label="New transaction"
          />
          <ButtonRedirect
            redirect="../invoices"
            styles="flex-1 button-secondary"
            label="All transactions"
          />
        </div>
      </Card>
    </section>
  );
};
export default Activity;
