import { useQuery } from "react-query";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const transactionKeys = {
  all: ["transactions"],
  list: (filters) => ["transactions", { filters }],
  detail: (id) => ["transactions", id],
};

export const useGetTransactions = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery(
    transactionKeys.all,
    () => axiosPrivate.get("/api/transactions"),
    {
      select: (data) =>
        data.data.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        })),
    }
  );
};

export const useGetTransactionDetail = (id) => {
  const axiosPrivate = useAxiosPrivate();
  useQuery(transactionKeys.detail(id), () =>
    axiosPrivate.get(`/api/transactions/${id}`)
  );
};
