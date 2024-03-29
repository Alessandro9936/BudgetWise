import { useMemo } from "react";
import ButtonRedirect from "@/components/buttons/redirectButton";
import Card from "@/components/wrapper/card";
import TransactionCard from "@/components/ui/transactionCard";
import { useGetTransactionsByDate } from "@/services/transaction-services";
import { activityParentVariants } from "../../utils/variants";
import { motion } from "framer-motion";
import ContentHeader from "@/components/ui/contentHeader";

const Activity = ({ gridDisposition }: { gridDisposition: string }) => {
  const queryTransactions = useGetTransactionsByDate(new Date(), "Monthly");
  const transactions = queryTransactions.data ?? [];
  const isFetching = queryTransactions.isFetching;

  const sortTransactions = useMemo(
    () => [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime()),
    [transactions]
  );

  return (
    <motion.section
      variants={activityParentVariants}
      initial="initial"
      animate="ending"
      className={`${gridDisposition} flex flex-col gap-y-4`}
    >
      <ContentHeader isFetching={isFetching} sectionTitle="Recent activity" />
      <Card classNames="flex-1 flex flex-col gap-4 lg:overflow-hidden relative dark:bg-slate-800 mb-16 midsm:mb-0">
        <div className="scrollbar-vertical flex h-[500px] flex-col gap-4 overflow-y-auto px-4 pt-4 pb-1 md:grid  md:grid-cols-2 xl:flex xl:flex-1">
          {sortTransactions.map((transaction) => (
            <TransactionCard transaction={transaction} key={transaction._id} />
          ))}
        </div>
        <div className="grid gap-4 px-4 pb-4 md:ml-auto md:grid-cols-2 xl:ml-0 xl:grid-cols-autoFill">
          <ButtonRedirect
            redirect="transaction/new"
            styles="flex-1 button-primary md:px-6"
            label="New transaction"
          />
          <ButtonRedirect
            redirect="../invoices"
            styles="flex-1 button-secondary md:px-6"
            label="All transactions"
          />
        </div>
      </Card>
    </motion.section>
  );
};
export default Activity;
