import { useParams } from "react-router-dom";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { IBudgetForm } from "../pages/budget/types/types";

const budgetKeys = {
  listByDate: (date: number | string) => ["budgets", date] as const,
  detail: (id: string) => ["budgets", id] as const,
};

export interface IBudgetResponse {
  name: string;
  user?: string;
  _id: string;
  date: Date;
  maxAmount: number;
  usedAmount: number;
}

const useGetBudgetsByDate = (date: Date, timeSpan: string) => {
  const axiosPrivate = useAxiosPrivate();

  const formatDate =
    timeSpan === "Yearly"
      ? date.getFullYear()
      : date.toLocaleDateString(navigator.language, {
          year: "numeric",
          month: "long",
        });

  return useQuery(
    budgetKeys.listByDate(formatDate),
    () =>
      axiosPrivate
        .get<IBudgetResponse[]>("/api/budgets", {
          params: { date: formatDate },
        })
        .then((res) => res.data),
    {
      staleTime: Infinity,
      keepPreviousData: true,
      // When the activeSpan is equal to year, all the budgets in each month are returned.
      // This allow to sum budgets with same name in a single object.
      select: (budgets) => {
        if (timeSpan === "Yearly" && budgets.length > 0) {
          return budgets.reduce((previousValue: IBudgetResponse[], budget) => {
            const budgetByName = previousValue.find(
              (_budget) => _budget.name === budget.name
            );
            if (!budgetByName) {
              previousValue = [
                ...previousValue,
                {
                  name: budget.name,
                  date: new Date(budget.date),
                  usedAmount: budget.usedAmount,
                  maxAmount: budget.maxAmount,
                  _id: budget._id,
                },
              ];
            } else {
              budgetByName.usedAmount += budget.usedAmount;
              budgetByName.maxAmount += budget.maxAmount;
            }
            return previousValue;
          }, []);
        } else {
          return budgets.map((budget) => ({
            ...budget,
            date: new Date(budget.date),
          }));
        }
      },
    }
  );
};

const useGetBudgetDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  if (!id) return;

  return useQuery(
    budgetKeys.detail(id),
    () =>
      axiosPrivate
        .get<IBudgetResponse>(`/api/budgets/${id}`)
        .then((res) => res.data),
    {
      enabled: !!id,
      staleTime: Infinity,
      select: (budget) => ({ ...budget, date: new Date(budget.date) }),
    }
  );
};

const invalidateQueries = (
  budget: IBudgetResponse,
  queryClient: QueryClient
) => {
  const budgetYear = new Date(budget?.date).getFullYear();
  const budgetMonth = new Date(budget?.date).toLocaleDateString(
    navigator.language,
    { month: "long", year: "numeric" }
  );

  Promise.all([
    queryClient.invalidateQueries(budgetKeys.listByDate(budgetMonth)),
    queryClient.invalidateQueries(budgetKeys.listByDate(budgetYear)),
    queryClient.invalidateQueries(budgetKeys.detail(budget._id)),
  ]);
};

const useCreateNewBudget = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (formData: IBudgetForm) =>
      axiosPrivate
        .post<IBudgetResponse>("/api/budgets", formData)
        .then((res) => res.data)
  );

  const createNewBudget = (formData: IBudgetForm) => {
    return mutate(formData, {
      onSuccess: (budget) => invalidateQueries(budget, queryClient),
    });
  };

  return { createNewBudget, isLoading, isError, error, isSuccess };
};

const useUpdateBudget = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (formData: IBudgetForm) =>
      axiosPrivate
        .put<IBudgetResponse>(`/api/budgets/${id}`, formData)
        .then((res) => res.data)
  );

  const updateBudget = (formData: IBudgetForm) => {
    return mutate(formData, {
      onSuccess: (budget) => invalidateQueries(budget, queryClient),
    });
  };

  return { updateBudget, isLoading, isError, error, isSuccess };
};

const useDeleteBudget = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate: deleteBudget } = useMutation(
    () => axiosPrivate.delete(`/api/budgets/${id}`).then((res) => res.data),
    {
      onSuccess: (budget) => {
        invalidateQueries(budget, queryClient);
        queryClient.invalidateQueries(["transactions"]);
      },
    }
  );

  return { deleteBudget };
};

export {
  useGetBudgetsByDate,
  useCreateNewBudget,
  useGetBudgetDetails,
  useUpdateBudget,
  useDeleteBudget,
};
