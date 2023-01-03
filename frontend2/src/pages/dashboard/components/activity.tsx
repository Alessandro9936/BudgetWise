import { useMemo } from "react";
import { MoreHorizontal } from "react-feather";
import CustomBarLoader from "../../../components/bar-loader";
import ButtonRedirect from "../../../components/Buttons/ButtoinRedirect";

import Card from "../../../components/card";
import {
  ITransaction,
  useGetTransactionsByDate,
} from "../../../services/transaction-services";

const ActivityCard = ({ transaction }: { transaction: ITransaction }) => {
  return (
    <div className="relative flex animate-appear flex-col gap-1 rounded-lg p-4 shadow-[0_0_8px_rgba(0,0,0,0.1)]">
      <p className="font-semibold">{transaction.description}</p>
      <p>{transaction.date.toDateString()}</p>
      <p
        className={`${
          transaction.type === "income" ? "text-green-500" : "text-red-500"
        } font-semibold`}
      >
        {transaction.amount} {transaction.currency}
      </p>
      <MoreHorizontal className="absolute right-3 top-1 cursor-pointer" />
    </div>
  );
};

const Activity = ({ gridDisposition }: { gridDisposition: string }) => {
  const query = useGetTransactionsByDate(new Date(), "Monthly");
  const transactions = query?.data ?? [];
  const loading = query?.isLoading;

  const sortTransactions = useMemo(
    () => transactions.sort((a, b) => b.date.getTime() - a.date.getTime()),
    [transactions]
  );

  return (
    <section className={`${gridDisposition} flex flex-col gap-y-3`}>
      <h3 className="text-base font-semibold">Recent activity</h3>
      <Card classNames="flex-1 p-2 flex flex-col gap-6 lg:overflow-hidden relative">
        {!loading ? (
          <>
            <div className="grid flex-1 auto-rows-min gap-6 overflow-y-auto px-4 pt-4 pb-1 md:grid-cols-autoFill">
              {sortTransactions.map((transaction) => (
                <ActivityCard transaction={transaction} key={transaction._id} />
              ))}
            </div>
            <div className="grid gap-x-6 gap-y-4 px-4 pb-4 md:grid-cols-autoFill">
              <ButtonRedirect
                redirect="somewhere"
                styles="flex-1 bg-slate-900 text-white hover:bg-purple-500"
                label="New transaction"
              />
              <ButtonRedirect
                redirect="somewhere"
                styles="flex-1 bg-white text-purple-500 ring-1 ring-purple-500"
                label="All transactions"
              />
            </div>
          </>
        ) : (
          <CustomBarLoader />
        )}
      </Card>
    </section>
  );
};
export default Activity;
