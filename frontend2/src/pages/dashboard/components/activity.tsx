import { useMemo } from "react";
import ButtonRedirect from "../../../components/Buttons/ButtonRedirect";

import { motion } from "framer-motion";

const parentVariants = {
  initial: { y: 20, opacity: 0 },
  ending: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      type: "tween",
      duration: 0.25,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const childVariants = {
  initial: { opacity: 0, y: 20 },
  ending: { opacity: 1, y: 0, transition: { type: "tween" } },
};

import Card from "../../../components/Utilities/card";
import TransactionCard from "../../../components/UI/TransactionCard";
import { useGetTransactionsByDate } from "../../../services/transaction-services";

const Activity = ({ gridDisposition }: { gridDisposition: string }) => {
  const queryTransactions = useGetTransactionsByDate(new Date(), "Monthly");
  const transactions = queryTransactions?.data ?? [];

  const sortTransactions = useMemo(
    () => [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime()),
    [transactions]
  );

  return (
    <motion.section
      variants={parentVariants}
      initial="initial"
      animate="ending"
      className={`${gridDisposition} flex flex-col gap-y-4`}
    >
      <h3>Recent activity</h3>
      <Card classNames="flex-1 flex flex-col gap-4 lg:overflow-hidden relative dark:bg-slate-800">
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pt-4 pb-1 md:grid-cols-autoFill">
          {sortTransactions.map((transaction) => (
            <motion.div variants={childVariants} key={transaction._id}>
              <TransactionCard
                transaction={transaction}
                key={transaction._id}
              />
            </motion.div>
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
    </motion.section>
  );
};
export default Activity;
