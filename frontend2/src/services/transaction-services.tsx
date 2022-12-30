import { AxiosInstance } from "axios";
import { useQuery } from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const transactionKeys = {
  listByDate: (date: string | number) => ["transactions", date] as const,
  listByFilters: (filters: string) => ["transactions", { filters }] as const,
  detail: (id: string) => ["transaction", id] as const,
};

interface ITransaction {
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

const useGetTransactionsByDate = (date: string | number) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery(
    transactionKeys.listByDate(date),
    () => useGetTransactionsByDateFn(axiosPrivate, date),
    {
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );
};

export { useGetTransactionsByDate };
