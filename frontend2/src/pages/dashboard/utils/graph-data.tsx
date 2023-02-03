import {
  getWeekOfMonth,
  getWeeksInMonth,
  isSameMonth,
  isSameWeek,
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

/*
The following functions are used to group transactions depending on the active timespan ('Weekly', 'Monthly', 'Yearly') and reduce into two values (income and expenses) in order to be in the right format to be displayed from the graph.

The groupBy method in lodash is used to group an array of objects by a specific property or key. It takes two arguments: the array of objects, and the key or property by which you want to group the objects. The method then returns an object, where each key is a unique value of the specified property, and the value is an array of objects that have that property value.
*/

// Active timespan is 'Yearly', all the transactions in activeYear must be extracted and collocated inside their corresponding month, it returns the sum of all incomes and expenses in each month of active year.
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

  return monthNames.map((month, i) => {
    const monthTransactions = groupedTransactions[i];
    return monthTransactions
      ? incomeExpenseCalc(monthTransactions, month.slice(0, 3))
      : incomeExpenseCalc([], month.slice(0, 3));
  });
};

// Active timespan is 'Monthly', all the transactions inside activeMonth must be extracted and collocated inside their corresponding week, it returns the sum of all incomes and expenses in each week of active month.
const getGraphMonthData = (
  transactions: ITransactionResponse[],
  activeDate: Date
) => {
  const groupedTransactions = _.groupBy(transactions, (transaction) =>
    isSameMonth(transaction.date, activeDate)
      ? getWeekOfMonth(transaction.date, { weekStartsOn: 1 })
      : null
  );

  // While extracting by month and day takes always the same values, weeks inside a month are not always the same. This loop allow to format the week number that will be sent with the sum of incomes and expenses in tht week
  let weeksInMonth: string[] = [];
  for (let i = 0; i < getWeeksInMonth(activeDate); i++) {
    weeksInMonth = [...weeksInMonth, `Week ${i + 1}`];
  }

  return weeksInMonth.map((week, i) => {
    const weekTransactions = groupedTransactions[i + 1];
    return weekTransactions
      ? incomeExpenseCalc(weekTransactions, week)
      : incomeExpenseCalc([], week);
  });
};

// Active timespan is 'Weekly', all the transactions that happened on the same week of activeDate must be extracted and collocated inside their corresponding day in week, it returns the sum of all incomes and expenses in each day of active week.
const getGraphWeekData = (
  transactions: ITransactionResponse[],
  activeDate: Date
) => {
  // getUTCDay allows to group transactions by day of the month (from 1 to 31) in the specified date according to universal time, using getDay often doesn't distribute transactions correctly across specific time zones.
  const groupedTransactions = _.groupBy(transactions, (transaction) =>
    isSameWeek(transaction.date, activeDate, { weekStartsOn: 1 })
      ? transaction.date.getUTCDay()
      : null
  );

  return dayNames.map((day, i) => {
    const dayTransactions = groupedTransactions[i];
    return dayTransactions
      ? incomeExpenseCalc(dayTransactions, day.slice(0, 3))
      : incomeExpenseCalc([], day.slice(0, 3));
  });
};

export { getGraphYearData, getGraphMonthData, getGraphWeekData };
