import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { IBudgetResponse } from "./budget-services";

const transactionKeys = {
  listByDate: (date: string | number) => ["transactions", date] as const,
  listByFilters: (filters: string, page?: number) =>
    ["transactions", page, { filters }] as const,
  detail: (id: string) => ["transaction", id] as const,
};

export interface ITransaction {
  type: "income" | "expense";
  amount: number;
  date: Date;
  description?: string;
  _id: string;
  user: string;
  __v: number;
  state?: "paid" | "topay" | "upcoming";
  budget?: { name: string; _id: string };
  currency: string;
}

const useGetTransactionsByDate = (date: Date, timeSpan: string) => {
  const axiosPrivate = useAxiosPrivate();

  const formatDate =
    timeSpan === "Yearly"
      ? date.getFullYear()
      : date.toLocaleDateString(navigator.language, {
          year: "numeric",
          month: "long",
        });

  return useQuery(
    transactionKeys.listByDate(formatDate),
    () =>
      axiosPrivate
        .get<ITransaction[]>("/api/transactions", {
          params: { date: formatDate },
        })
        .then((res) => res.data),
    {
      staleTime: Infinity,
      keepPreviousData: true,
      select: (transactions) =>
        transactions.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        })),
    }
  );
};

const useGetTransactionsBudgetPreview = (budget?: IBudgetResponse) => {
  const axiosPrivate = useAxiosPrivate();

  const searchString = budget
    ? `type=expense&date=${budget.date.getFullYear()}&budget=${budget.name}`
    : "";

  return useQuery(
    transactionKeys.listByFilters(searchString),
    () =>
      axiosPrivate
        .get<ITransaction[]>(`/api/transactions?${searchString}`)
        .then((res) => res.data),
    {
      enabled: budget && Object.keys(budget).length > 0,
      staleTime: Infinity,
      select: (transactions) =>
        transactions
          .filter((transaction) => transaction.budget?._id === budget?._id)
          .map((transaction) => ({
            ...transaction,
            date: new Date(transaction.date),
          })),
    }
  );
};

const useGetFilteredTransactions = (currentPage: number) => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParams, _] = useSearchParams();

  const searchString = searchParams.toString();

  return useQuery(
    transactionKeys.listByFilters(searchString, currentPage),
    () =>
      axiosPrivate
        .get<ITransaction[]>(`/api/transactions?${searchString}`, {
          params: {
            page: currentPage,
            limit: 10,
          },
        })
        .then((res) => res.data),
    {
      staleTime: Infinity,
      keepPreviousData: true,
      select: (transactions) =>
        transactions.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        })),
    }
  );
};

export {
  useGetTransactionsByDate,
  useGetFilteredTransactions,
  useGetTransactionsBudgetPreview,
};
