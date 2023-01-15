import {
  getWeek,
  getWeekOfMonth,
  getWeeksInMonth,
  isSameMonth,
  isSameWeek,
  isSameYear,
} from "date-fns";
import { ITransactionResponse } from "../../../services/transaction-services";

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

import _ from "lodash";

const incomeExpenseCalc = (
  transactions: ITransactionResponse[],
  timeSpan: string
) => {
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

const getGraphYearData = (
  transactions: ITransactionResponse[],
  activeDate: Date
) => {
  const activeYear = activeDate.getFullYear();
  const groupedTransactions = _.groupBy(transactions, (transaction) =>
    transaction.date.getFullYear() === activeYear
      ? transaction.date.getMonth()
      : null
  );

  return Object.keys(groupedTransactions).map((month, index) => {
    const monthTransactions = groupedTransactions[month];
    return incomeExpenseCalc(monthTransactions, monthNames[index].slice(0, 3));
  });
};

const getGraphMonthData = (
  transactions: ITransactionResponse[],
  activeDate: Date
) => {
  const groupedTransactions = _.groupBy(transactions, (transaction) => {
    if (isSameMonth(transaction.date, activeDate)) {
      return getWeekOfMonth(transaction.date, { weekStartsOn: 1 });
    }
    return null;
  });

  let numOfWeeksInMonth: string[] = [];
  for (let i = 0; i < getWeeksInMonth(activeDate); i++) {
    numOfWeeksInMonth = [...numOfWeeksInMonth, `Week ${i + 1}`];
  }

  return numOfWeeksInMonth.map((week, i) => {
    const weekTransactions = groupedTransactions[i + 1];
    if (weekTransactions) return incomeExpenseCalc(weekTransactions, week);
    else return incomeExpenseCalc([], week);
  });
};

const getGraphWeekData = (
  transactions: ITransactionResponse[],
  activeDate: Date
) => {
  const groupedTransactions = _.groupBy(transactions, (transaction) => {
    if (isSameWeek(transaction.date, activeDate)) {
      return transaction.date.getDay();
    }
    return null;
  });

  return dayNames.map((day, i) => {
    const dayTransactions = groupedTransactions[i];
    if (dayTransactions) {
      return incomeExpenseCalc(dayTransactions, day.slice(0, 3));
    } else {
      return incomeExpenseCalc([], day.slice(0, 3));
    }
  });
};

export { getGraphYearData, getGraphMonthData, getGraphWeekData };
