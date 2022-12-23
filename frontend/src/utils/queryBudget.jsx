import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

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
export const useUpdateBudget = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate } = useMutation((values) =>
    axiosPrivate
      .put(`/api/budgets/${id}`, values)
      .then((response) => response.data)
  );

  const updateBudget = (defaultValues, maxAmount) => {
    const formData = { ...defaultValues, maxAmount };
    mutate(formData, {
      onSuccess: (budget) => {
        const yearOfBudget = new Date(budget.date).getFullYear();
        const monthOfBudget = new Date(budget.date).toLocaleDateString(
          "en-GB",
          {
            month: "long",
            year: "numeric",
          }
        );

        Promise.all([
          queryClient.invalidateQueries(["budgets", budget._id]),
          queryClient.invalidateQueries(["budgets", yearOfBudget]),
          queryClient.invalidateQueries(["budgets", monthOfBudget]),
        ]);
      },
    });
  };

  return { updateBudget };
};

export const useDeleteBudget = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutate: deleteBudget, isSuccess } = useMutation(
    () =>
      axiosPrivate
        .delete(`/api/budgets/${id}`)
        .then((response) => response.data),
    {
      onSuccess: (budget) => {
        const yearOfBudget = new Date(budget.date).getFullYear();
        const monthOfBudget = new Date(budget.date).toLocaleDateString(
          "en-GB",
          {
            month: "long",
            year: "numeric",
          }
        );

        Promise.all([
          queryClient.invalidateQueries(["budgets", budget._id]),
          queryClient.invalidateQueries(["budgets", yearOfBudget]),
          queryClient.invalidateQueries(["budgets", monthOfBudget]),
        ]);
      },
    }
  );

  return { isSuccess, deleteBudget };
};

export const useGetBudgetDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  if (!id) return;

  return useQuery(
    ["budgets", id],
    () => axiosPrivate.get(`/api/budgets/${id}`),
    {
      staleTime: Infinity,
      select: (data) => ({ ...data.data, date: new Date(data.data.date) }),
    }
  );
};
