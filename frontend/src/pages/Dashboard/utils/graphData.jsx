import {
  getWeekOfMonth,
  getWeeksInMonth,
  isSameMonth,
  isSameWeek,
  isSameYear,
} from "date-fns";

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const reduceTransaction = (transactions, time) => {
  return transactions.reduce(
    (acc, transaction) => {
      {
        transaction.type === "income"
          ? (acc.income += transaction.amount)
          : (acc.expenses += transaction.amount);
        return acc;
      }
    },
    {
      name: time,
      income: 0,
      expenses: 0,
    }
  );
};

export const getDataYears = (transactionMapped, activeDate) => {
  const transactionsInActiveYear = transactionMapped.filter((transaction) =>
    isSameYear(transaction.date, activeDate)
  );

  if (transactionsInActiveYear.length === 0) return;

  const reducedMonthTransactions = monthNames.map((curMonth) => {
    const eachMonthTransactions = transactionsInActiveYear.filter(
      (transaction) =>
        transaction.date.toLocaleDateString("en-GB", { month: "long" }) ===
        curMonth
    );

    return reduceTransaction(eachMonthTransactions, curMonth.slice(0, 3));
  });

  return reducedMonthTransactions;
};

export const getDataMonths = (transactionMapped, activeDate) => {
  const transactionsInActiveMonth = transactionMapped.filter((transaction) =>
    isSameMonth(transaction.date, activeDate)
  );

  if (transactionsInActiveMonth.length === 0) return;

  let weekArray = [];
  for (let i = 0; i < getWeeksInMonth(activeDate); i++) {
    weekArray = [...weekArray, `Week ${i + 1}`];
  }

  const reducedWeekTransactions = weekArray.map((week, i) => {
    const eachTransactionInweek = transactionsInActiveMonth.filter(
      (transaction) =>
        getWeekOfMonth(transaction.date, { weekStartsOn: 1 }) === i + 1
    );

    return reduceTransaction(eachTransactionInweek, week);
  });

  return reducedWeekTransactions;
};

export const getDataWeeks = (transactionMapped, activeDate) => {
  const transactionsInActiveWeek = transactionMapped.filter((transaction) =>
    isSameWeek(transaction.date, activeDate)
  );

  if (transactionsInActiveWeek.length === 0) return;

  const reducedDayTransactions = dayNames.map((curDay) => {
    const eachDayTransactions = transactionsInActiveWeek.filter(
      (transaction) =>
        transaction.date.toLocaleDateString("en-GB", { weekday: "long" }) ===
        curDay
    );

    return reduceTransaction(eachDayTransactions, curDay.slice(0, 3));
  });

  return reducedDayTransactions;
};
