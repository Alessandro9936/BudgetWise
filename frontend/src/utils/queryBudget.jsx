import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export const useGetBudgets = () => {
  const axiosPrivate = useAxiosPrivate();
  const [search] = useSearchParams();

  return useQuery(
    ["budgets", search.toString()],
    () => axiosPrivate.get("/api/budgets", { params: search }),
    {
      staleTime: 12000,
      keepPreviousData: true,
      select: (data) =>
        data.data.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        })),
    }
  );
};
