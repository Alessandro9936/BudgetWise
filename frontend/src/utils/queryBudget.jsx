import { useQuery } from "react-query";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const budgetKeys = {
  all: ["budgets"],
  detail: (id) => ["budgets", id],
};

export const useGetBudgets = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery(budgetKeys.all, () => axiosPrivate.get("/api/budgets"), {
    select: (data) =>
      data.data.map((transaction) => ({
        ...transaction,
        date: new Date(transaction.date),
      })),
  });
};
