import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export const useGetTransactions = () => {
  const axiosPrivate = useAxiosPrivate();
  const [search] = useSearchParams();

  return useQuery(
    ["transactions", search.toString()],
    () => axiosPrivate.get("/api/transactions", { params: search }),
    {
      staleTime: 12000,
      select: (data) =>
        data.data.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        })),
    }
  );
};

/* export const useItems = () => {
  const axiosPrivate = useAxiosPrivate();
  const [search] = useSearchParams();

  return useQuery(
    ["transactions", search.toString()],
    axiosPrivate
      .get("/api/transactions", { params: search })
      .then((res) => res.data),
    { staleTime: 12000 }
  );
};
 */
