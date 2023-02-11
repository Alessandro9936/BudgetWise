import { useParams } from "react-router-dom";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { IBudgetForm } from "@/features/budgetForm";
import { AxiosInstance } from "axios";
import { formatMonth } from "./format/date";

const budgetKeys = {
  listByDate: (date: number | string) => ["budgets", date] as const,
  detail: (id: string) => ["budgets", id] as const,
};

export type BudgetResponse = {
  name: string;
  user?: string;
  _id: string;
  date: Date;
  maxAmount: number;
  usedAmount: number;
};

const getBudgetsByDateFn = async (
  instance: AxiosInstance,
  date: string | number
) => {
  const result = await instance.get<BudgetResponse[]>("/api/budgets", {
    params: { date },
  });

  return result.data;
};

const getBudgetDetailsFn = async (instance: AxiosInstance, id: string) => {
  const result = await instance.get<BudgetResponse>(`/api/budgets/${id}`);
  return result.data;
};

const createNewBudgetFn = async (
  instance: AxiosInstance,
  formData: IBudgetForm
) => {
  const result = await instance.post<BudgetResponse>("/api/budgets", formData);
  return result.data;
};

const updateBudgetFn = async (
  instance: AxiosInstance,
  formData: IBudgetForm,
  id: string
) => {
  const result = await instance.put<BudgetResponse>(
    `/api/budgets/${id}`,
    formData
  );
  return result.data;
};

const deleteBudgetFn = async (instance: AxiosInstance, id: string) => {
  const result = await instance.delete(`/api/budgets/${id}`);
  return result.data;
};

/* ------------- */

const invalidateQueriesOnMutation = (
  budget: BudgetResponse,
  queryClient: QueryClient
) => {
  const budgetMonth = formatMonth(new Date(budget.date));
  queryClient.invalidateQueries(budgetKeys.listByDate(budgetMonth));
};

const useGetBudgetsByDate = (date: Date, timeSpan: string) => {
  const axiosPrivate = useAxiosPrivate();

  const formatDate =
    timeSpan === "Yearly" ? date.getFullYear() : formatMonth(date);

  return useQuery(
    budgetKeys.listByDate(formatDate),
    () => getBudgetsByDateFn(axiosPrivate, formatDate),
    {
      keepPreviousData: true,
      select: (budgets) =>
        budgets.map((budget) => ({
          ...budget,
          date: new Date(budget.date),
        })),
    }
  );
};

const useGetBudgetDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  if (!id) return;

  return useQuery(
    budgetKeys.detail(id),
    () => getBudgetDetailsFn(axiosPrivate, id),
    {
      enabled: !!id,

      select: (budget) => ({ ...budget, date: new Date(budget.date) }),
    }
  );
};

const useCreateNewBudget = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation(
    (formData: IBudgetForm) => createNewBudgetFn(axiosPrivate, formData),
    {
      onSuccess: (budget) => invalidateQueriesOnMutation(budget, queryClient),
    }
  );
};

const useUpdateBudget = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { id } = useParams();

  return useMutation(
    (formData: IBudgetForm) => updateBudgetFn(axiosPrivate, formData, id!),
    {
      onSuccess: (budget) => invalidateQueriesOnMutation(budget, queryClient),
    }
  );
};

const useDeleteBudget = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { id } = useParams();

  return useMutation(() => deleteBudgetFn(axiosPrivate, id!), {
    onSuccess: (budget) => {
      invalidateQueriesOnMutation(budget, queryClient);

      // If the month of the deleted budget is equal to current month, invalidate query that fetch current month's transactions as they are displayed by default when dashboard route is active. If the query is not invalitated the UI will not display changes
      if (new Date().getUTCMonth() === new Date(budget.date).getUTCMonth()) {
        queryClient.invalidateQueries([
          "transactions",
          formatMonth(new Date(budget.date)),
        ]);
      }
    },
  });
};

const usePrefetchBudgetsByDate = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const prefetchBudgets = async (dateToPrefetch: string | number) => {
    return await queryClient.prefetchQuery({
      queryKey: budgetKeys.listByDate(dateToPrefetch),
      queryFn: () => getBudgetsByDateFn(axiosPrivate, dateToPrefetch),
      staleTime: 5000,
    });
  };

  return { prefetchBudgets };
};

const usePrefetchBudgetDetail = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const prefetchBudgetDetails = async (id: string) => {
    return await queryClient.prefetchQuery({
      queryKey: budgetKeys.detail(id),
      queryFn: () => getBudgetDetailsFn(axiosPrivate, id),
      staleTime: 5000,
    });
  };

  return { prefetchBudgetDetails };
};
export {
  useGetBudgetsByDate,
  useCreateNewBudget,
  useGetBudgetDetails,
  useUpdateBudget,
  useDeleteBudget,
  usePrefetchBudgetsByDate,
  usePrefetchBudgetDetail,
};
