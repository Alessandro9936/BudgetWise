import React from "react";
import TimeSpanButton from "../../../components/Buttons/TimeSpanButton";
import Card from "../../../components/card";
import DateBar from "../../../components/date-bar";
import useActiveDates from "../../../hooks/useActiveDates";
import { useGetTransactionsByDate } from "../../../services/transaction-services";

const DateSelectorsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-fit text-xs font-semibold text-neutral-500">
      <div className="flex cursor-pointer items-center gap-1 rounded-full bg-white px-2 py-1 shadow md:px-3 md:py-1">
        <button>Sync dates</button>
        <span>o</span>
      </div>
      <div className="ml-auto flex gap-2 md:gap-4">{children}</div>
    </div>
  );
};

const AmountContainer = ({
  children,
  label,
  currency,
}: {
  children: React.ReactNode;
  label: string;
  currency: string;
}) => {
  return (
    <div className="flex-1 lg:flex-initial">
      <Card classNames="px-4 py-3">
        <p className=" mb-2 font-semibold">{label}</p>
        <div className="flex items-center justify-between">
          {children}
          <span>{currency}</span>
        </div>
      </Card>
    </div>
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
  const currency = transactions[0]?.currency;

  const amounts = transactions.reduce(
    (acc, cur) => {
      cur.type === "income"
        ? (acc.income += cur.amount)
        : (acc.expenses += cur.amount);
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const totalBalance = amounts ? amounts.income - amounts.expenses : 0;

  return (
    <section className={`${gridDisposition} flex flex-col gap-y-3`}>
      <DateSelectorsContainer>
        {["Yearly", "Monthly"].map((timeSpan) => (
          <TimeSpanButton
            key={timeSpan}
            timeSpan={timeSpan as "Yearly" | "Monthly"}
            activeTimeSpan={activeTimeSpan}
            updateActiveTimeSpan={updateActiveTimeSpan}
          />
        ))}
      </DateSelectorsContainer>
      <DateBar
        updateActiveDate={updateActiveDate}
        activeDateFormatted={activeDateFormatted}
      />
      <div className="flex flex-1 flex-col md:gap-y-4">
        <AmountContainer label="Income" currency={currency}>
          <p className="text-lg font-semibold md:text-2xl ">
            {amounts ? amounts.income : 0}
          </p>
        </AmountContainer>
        <AmountContainer label="Expenses" currency={currency}>
          <p className="text-lg font-semibold md:text-2xl">
            {amounts ? amounts.expenses : 0}
          </p>
        </AmountContainer>
        <AmountContainer label="Total" currency={currency}>
          <p
            className={`text-lg font-semibold md:text-2xl ${
              totalBalance > 0 ? "text-green-500" : "text-red-500"
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
