import { useMemo } from "react";
import CustomBarLoader from "../../../components/UI/bar-loader";
import ButtonRedirect from "../../../components/Buttons/ButtonRedirect";

import Card from "../../../components/Utilities/card";
import TransactionCard from "../../../components/UI/TransactionCard";
import { useGetTransactionsByDate } from "../../../services/transaction-services";

const Activity = ({ gridDisposition }: { gridDisposition: string }) => {
  const query = useGetTransactionsByDate(new Date(), "Monthly");
  const transactions = query?.data ?? [];
  
  const sortTransactions = useMemo(
    () => transactions.sort((a, b) => b.date.getTime() - a.date.getTime()),
    [transactions]
  );

  return (
    <section className={`${gridDisposition} flex flex-col gap-y-3`}>
      <h3 className="text-base font-semibold">Recent activity</h3>
      <Card classNames="flex-1 p-2 flex flex-col gap-6 lg:overflow-hidden relative">
        <div className="grid flex-1 auto-rows-min gap-6 overflow-y-auto px-4 pt-4 pb-1 md:grid-cols-autoFill">
          {sortTransactions.map((transaction) => (
            <TransactionCard transaction={transaction} key={transaction._id} />
          ))}
        </div>
        <div className="grid gap-x-6 gap-y-4 px-4 pb-4 md:grid-cols-autoFill">
          <ButtonRedirect
            redirect="somewhere"
            styles="flex-1 bg-slate-900 text-white hover:bg-purple-500"
            label="New transaction"
          />
          <ButtonRedirect
            redirect="../invoices"
            styles="flex-1 bg-white text-purple-500 ring-1 ring-purple-500"
            label="All transactions"
          />
        </div>
      </Card>
    </section>
  );
};
export default Activity;
