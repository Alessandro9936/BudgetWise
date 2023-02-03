import { useMemo } from "react";

import TimeSpanButton from "../../../components/Buttons/TimeSpanButton";
import Card from "../../../components/Utilities/card";
import DateBar from "../../../components/UI/date-bar";
import useActiveDates from "../../../hooks/useActiveDates";
import { useGetTransactionsByDate } from "../../../services/transaction-services";
import { getCurrency } from "../../../context/user-context";

import { motion } from "framer-motion";

import { childVariants, parentVariants } from "../utils/variants";

interface IAmountContainer {
  amount: number;
  label: string;
}
const AmountContainer = ({ amount, label }: IAmountContainer) => {
  const currency = getCurrency();
  const color = {
    Income: "bg-green-400",
    Expenses: "bg-red-400",
    Total: amount > 0 ? "bg-green-400" : "bg-red-400",
  }[label];

  return (
    <motion.div variants={childVariants}>
      <Card classNames="dark:bg-slate-800 flex-1 flex overflow-hidden">
        <span className={`mr-3 w-2 transition-colors ${color}`} />
        <div className="mr-5 flex-1 py-3">
          <p className="mb-2 font-semibold">{label}</p>
          <div className="my-auto flex h-fit items-center justify-between">
            <p className="text-lg font-semibold md:text-2xl">{amount}</p>
            <span>{currency}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

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
              timeSpan={timeSpan as "Yearly" | "Monthly"}
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
      <AmountContainer label="Income" amount={totalIncome} />
      <AmountContainer label="Expenses" amount={totalExpenses} />
      <AmountContainer label="Total" amount={totalBalance} />
    </motion.section>
  );
};
export default Summary;
