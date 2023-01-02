import {
  getWeekOfMonth,
  getWeeksInMonth,
  isSameMonth,
  isSameWeek,
  isSameYear,
} from "date-fns";
import { ITransaction } from "../../../services/transaction-services";

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

const incomeExpenseCalc = (transactions: ITransaction[], timeSpan: string) => {
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
      name: timeSpan,
      income: 0,
      expenses: 0,
    }
  );
};

const getGraphYearData = (transactions: ITransaction[], activeDate: Date) => {
  const transactionsInActiveYear = transactions.filter((transaction) =>
    isSameYear(transaction.date, activeDate)
  );

  const incomeExpensePerMonth = monthNames.map((month) => {
    const transactionsPerMonth = transactionsInActiveYear.filter(
      (transaction) =>
        transaction.date.toLocaleDateString("en-US", { month: "long" }) ===
        month
    );

    return incomeExpenseCalc(transactionsPerMonth, month.slice(0, 3));
  });

  return incomeExpensePerMonth;
};

const getGraphMonthData = (transactions: ITransaction[], activeDate: Date) => {
  const transactionsInActiveMonth = transactions.filter((transaction) =>
    isSameMonth(transaction.date, activeDate)
  );

  let numOfWeeksInMonth: string[] = [];
  for (let i = 0; i < getWeeksInMonth(activeDate); i++) {
    numOfWeeksInMonth = [...numOfWeeksInMonth, `Week ${i + 1}`];
  }

  const incomeExpensePerWeek = numOfWeeksInMonth.map((week, i) => {
    const transactionsPerWeek = transactionsInActiveMonth.filter(
      (transaction) =>
        getWeekOfMonth(transaction.date, { weekStartsOn: 1 }) === i + 1
    );

    return incomeExpenseCalc(transactionsPerWeek, week);
  });

  return incomeExpensePerWeek;
};

const getGraphWeekData = (transactions: ITransaction[], activeDate: Date) => {
  const transactionsInActiveWeek = transactions.filter((transaction) =>
    isSameWeek(transaction.date, activeDate)
  );

  const incomeExpensePerDay = dayNames.map((day, i) => {
    const transactionsPerDay = transactionsInActiveWeek.filter(
      (transaction) =>
        transaction.date.toLocaleDateString("en-US", { weekday: "long" }) ===
        day
    );

    return incomeExpenseCalc(transactionsPerDay, day.slice(0, 3));
  });

  return incomeExpensePerDay;
};

export { getGraphYearData, getGraphMonthData, getGraphWeekData };
