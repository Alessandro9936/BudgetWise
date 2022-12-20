import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export const useGetBudgets = (defaultDate) => {
  const axiosPrivate = useAxiosPrivate();
  const [search] = useSearchParams();

  const searchString = search.get("date") || defaultDate;

  return useQuery(
    ["budgets", searchString],
    () => axiosPrivate.get("/api/budgets", { params: { date: searchString } }),
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
