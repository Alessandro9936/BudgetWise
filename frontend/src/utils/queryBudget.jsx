import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export const useGetBudgets = (defaultDate) => {
  const axiosPrivate = useAxiosPrivate();
  const [search] = useSearchParams();

  const searchValue = search.get("date") || defaultDate;

  return useQuery(
    ["budgets", searchValue],
    () => axiosPrivate.get("/api/budgets", { params: { date: searchValue } }),
    {
      staleTime: 120000,
      keepPreviousData: true,
      select: (data) =>
        data.data.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        })),
    }
  );
};

export const useGetBudgetsByDate = (date) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery(
    ["budgets", date],
    () => axiosPrivate.get("/api/budgets", { params: { date } }),
    {
      staleTime: 120000,
      keepPreviousData: true,
      select: (data) =>
        data.data.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        })),
    }
  );
};

export const budgetsByDate = (date) => {
  const query = useGetBudgetsByDate(date);

  const budgets = query.data ?? [];
  const isLoading = query.isLoading;
  const isFetching = query.isFetching;

  return { budgets, isFetching, isLoading };
};

export const useNewBudget = (formState, setError) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation((values) =>
    axiosPrivate.post("/api/budgets", values)
  );

  const newBudget = (formData) => {
    mutate(formData, {
      onSuccess: (data) => {
        if (data.status === 201) {
          const budgetMonth = new Date(data.data?.date).toLocaleDateString(
            "en-GB",
            { month: "long", year: "numeric" }
          );
          const budgetYear = new Date(data.data?.date).getFullYear();
          Promise.all(
            queryClient.invalidateQueries(["budgets", budgetMonth]),
            queryClient.invalidateQueries(["budgets", budgetYear])
          );
        }
      },
      onError: (error) => {
        const { param: field, msg: message } = error.response.data[0];
        setError(field, { message: message }, { shouldFocus: true });
        formState.isSubmitSuccessful(false);
      },
    });
  };
  return { newBudget };
};
