import { AxiosInstance } from "axios";
import { useQuery } from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const transactionKeys = {
  listByDate: (date: string | number) => ["transactions", date] as const,
  listByFilters: (filters: string) => ["transactions", { filters }] as const,
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

const useGetTransactionsByDateFn = async (
  instance: AxiosInstance,
  date: string | number
) => {
  const response = await instance.get<ITransaction[]>("/api/transactions", {
    params: { date: date },
  });

  return response.data;
};

const useGetTransactionsByDate = (date: Date, timeSpan: string) => {
  const axiosPrivate = useAxiosPrivate();

  const formatDate =
    timeSpan === "Yearly"
      ? date.getFullYear()
      : date.toLocaleDateString("en-US", { year: "numeric", month: "long" });

  return useQuery(
    transactionKeys.listByDate(formatDate),
    () => useGetTransactionsByDateFn(axiosPrivate, formatDate),
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

export { useGetTransactionsByDate };
