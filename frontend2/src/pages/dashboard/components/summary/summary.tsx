import { useMemo } from "react";
import TimeSpanButton from "../../../../components/buttons/timespanButton";
import DateBar from "../../../../components/ui/dateBar";
import useActiveDates from "../../../../hooks/useActiveDates";
import { useGetTransactionsByDate } from "../../../../services/transaction-services";
import { motion } from "framer-motion";
import { childVariants, parentVariants } from "../../utils/variants";
import { TimeSpanType } from "../../../../types/timeSpanType";

import AmountWrapper from "./amountWrapper";

const Summary = ({ gridDisposition }: { gridDisposition: string }) => {
  const {
    updateActiveDate,
    updateActiveTimeSpan,
    activeDateFormatted,
    activeTimeSpan,
    activeDate,
  } = useActiveDates();

  const queryTransactions = useGetTransactionsByDate(
    activeDate,
    activeTimeSpan
  );
  const transactions = queryTransactions.data ?? [];

  const amounts = useMemo(
    () =>
      transactions.reduce(
        (acc, cur) => {
          cur.type === "income"
            ? (acc.income += cur.amount)
            : (acc.expenses += cur.amount);
          return acc;
        },
        { income: 0, expenses: 0 }
      ),
    [transactions]
  );

  const totalIncome = amounts ? amounts.income : 0;
  const totalExpenses = amounts ? amounts.expenses : 0;
  const totalBalance = amounts ? amounts.income - amounts.expenses : 0;

  return (
    <motion.section
      variants={parentVariants}
      initial="initial"
      animate="ending"
      className={`${gridDisposition} flex flex-col gap-y-4`}
    >
      <motion.div
        variants={childVariants}
        className="flex items-center justify-between"
      >
        <h3>Summary</h3>
        <div className="flex gap-2">
          {["Yearly", "Monthly"].map((timeSpan) => (
            <TimeSpanButton
              key={timeSpan}
              timeSpan={timeSpan as TimeSpanType}
              activeTimeSpan={activeTimeSpan}
              updateActiveTimeSpan={updateActiveTimeSpan}
            />
          ))}
        </div>
      </motion.div>
      <DateBar
        updateActiveDate={updateActiveDate}
        activeDateFormatted={activeDateFormatted}
        activeDate={activeDate}
        activeTimeSpan={activeTimeSpan}
        toPrefetch="transactions"
      />
      <AmountWrapper label="Income" amount={totalIncome} />
      <AmountWrapper label="Expenses" amount={totalExpenses} />
      <AmountWrapper label="Total" amount={totalBalance} />
    </motion.section>
  );
};
export default Summary;
