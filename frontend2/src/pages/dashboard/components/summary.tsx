import React, { useMemo } from "react";

import TimeSpanButton from "../../../components/Buttons/TimeSpanButton";
import Card from "../../../components/Utilities/card";
import DateBar from "../../../components/UI/date-bar";
import useActiveDates from "../../../hooks/useActiveDates";
import { useGetTransactionsByDate } from "../../../services/transaction-services";
import { getCurrency } from "../../../context/user-context";

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
    <Card classNames="dark:bg-slate-800 flex-1 flex overflow-hidden">
      <span
        className={`mr-3 h-full w-2 transition-colors ${
          color === "red" ? "bg-red-400" : "bg-green-400"
        }`}
      />
      <div className="mr-5 flex-1 py-3">
        <p className=" mb-2 font-semibold">{label}</p>
        <div className="my-auto flex h-fit items-center justify-between">
          {children}
          <span>{currency}</span>
        </div>
      </div>
    </Card>
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

  const query = useGetTransactionsByDate(activeDate, activeTimeSpan);

  const transactions = query.data ?? [];

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
    <section className={`${gridDisposition} flex flex-col gap-y-4`}>
      <div className="flex items-center justify-between">
        <h3>Summary</h3>
        <div className="ml-auto flex gap-2">
          {["Yearly", "Monthly"].map((timeSpan) => (
            <TimeSpanButton
              key={timeSpan}
              timeSpan={timeSpan as "Yearly" | "Monthly"}
              activeTimeSpan={activeTimeSpan}
              updateActiveTimeSpan={updateActiveTimeSpan}
            />
          ))}
        </div>
      </div>

      <DateBar
        updateActiveDate={updateActiveDate}
        activeDateFormatted={activeDateFormatted}
      />
      <div className="flex flex-1 flex-col gap-y-4">
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
        <AmountContainer
          label="Total"
          color={totalBalance > 0 ? "green" : "red"}
        >
          <p
            className={`text-lg font-semibold md:text-2xl ${
              totalBalance > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {totalBalance}
          </p>
        </AmountContainer>
      </div>
    </section>
  );
};
export default Summary;
