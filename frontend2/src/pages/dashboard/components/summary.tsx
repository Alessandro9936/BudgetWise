import React, { useMemo } from "react";

import TimeSpanButton from "../../../components/Buttons/TimeSpanButton";
import Card from "../../../components/Utilities/card";
import DateBar from "../../../components/UI/date-bar";
import useActiveDates from "../../../hooks/useActiveDates";
import { useGetTransactionsByDate } from "../../../services/transaction-services";
import { getCurrency } from "../../../context/user-context";

import { motion } from "framer-motion";

const parentVariants = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.25,
      staggerChildren: 0.15,
    },
  },
};

const childVariants = {
  initial: { opacity: 0, y: 20 },
  ending: { opacity: 1, y: 0, transition: { type: "tween" } },
};

const AmountContainer = ({
  children,
  label,
  color,
}: {
  children: React.ReactNode;
  label: string;
  color: "red" | "green";
}) => {
  const currency = getCurrency();
  return (
    <motion.div variants={childVariants}>
      <Card classNames="dark:bg-slate-800 flex-1 flex overflow-hidden">
        <span
          className={`mr-3 w-2 transition-colors ${
            color === "red" ? "bg-red-400" : "bg-green-400"
          }`}
        />
        <div className="mr-5 flex-1 py-3">
          <p className="mb-2 font-semibold">{label}</p>
          <div className="my-auto flex h-fit items-center justify-between">
            {children}
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

      <motion.div variants={childVariants}>
        <DateBar
          updateActiveDate={updateActiveDate}
          activeDateFormatted={activeDateFormatted}
        />
      </motion.div>

      <AmountContainer label="Income" color="green">
        <p className="text-lg font-semibold md:text-2xl ">
          {amounts ? amounts.income : 0}
        </p>
      </AmountContainer>
      <AmountContainer label="Expenses" color="red">
        <p className="text-lg font-semibold md:text-2xl">
          {amounts ? amounts.expenses : 0}
        </p>
      </AmountContainer>
      <AmountContainer label="Total" color={totalBalance > 0 ? "green" : "red"}>
        <p className={`text-lg font-semibold md:text-2xl`}>{totalBalance}</p>
      </AmountContainer>
    </motion.section>
  );
};
export default Summary;
