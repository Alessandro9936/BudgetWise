import { useMemo } from "react";
import ButtonRedirect from "@/components/buttons/redirectButton";
import Card from "@/components/wrapper/card";
import TransactionCard from "@/components/ui/transactionCard";
import { useGetTransactionsByDate } from "@/services/transaction-services";
import { activityParentVariants } from "../../utils/variants";
import { motion } from "framer-motion";

const Activity = ({ gridDisposition }: { gridDisposition: string }) => {
  const queryTransactions = useGetTransactionsByDate(new Date(), "Monthly");
  const transactions = queryTransactions?.data ?? [];

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
      <h3>Recent activity</h3>
      <Card classNames="flex-1 flex flex-col gap-4 lg:overflow-hidden relative dark:bg-slate-800 mb-16 midsm:mb-0">
        <div className="flex h-[500px] flex-col gap-4 overflow-y-auto px-4 pt-4 pb-1 md:grid-cols-autoFill lg:flex-1">
          {sortTransactions.map((transaction) => (
            <TransactionCard transaction={transaction} key={transaction._id} />
          ))}
        </div>
        <div className="grid gap-x-6 gap-y-4 px-4 pb-4 md:grid-cols-2 lg:grid-cols-autoFill">
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
    </motion.section>
  );
};
export default Activity;
