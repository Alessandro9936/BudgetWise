import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ITransactionForm } from "../pages/transaction/types/types";
import { IBudgetResponse } from "./budget-services";

const transactionKeys = {
  listByDate: (date: string | number) => ["transactions", date] as const,
  listByFilters: (filters: string, page?: number) =>
    ["transactions", page, { filters }] as const,
  detail: (id: string) => ["transaction", id] as const,
};

export interface ITransactionResponse {
  type: "income" | "expense";
  amount: number;
  date: Date;
  description?: string;
  _id: string;
  user: string;
  state?: "paid" | "topay" | "upcoming";
  budget?: { name: string; _id: string };
}

const useGetTransactionsByDate = (date: Date, timeSpan: string) => {
  const axiosPrivate = useAxiosPrivate();

  const formatDate =
    timeSpan === "Yearly"
      ? date.getFullYear()
      : date.toLocaleDateString(navigator.language, {
          year: "numeric",
          month: "long",
        });

  return useQuery(
    transactionKeys.listByDate(formatDate),
    () =>
      axiosPrivate
        .get<ITransactionResponse[]>("/api/transactions", {
          params: { date: formatDate },
        })
        .then((res) => res.data),
    {
      staleTime: Infinity,
      keepPreviousData: true,
      select: (transactions) =>
        transactions.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        })),
    }
  );
};

const useGetTransactionsBudgetPreview = (budget?: IBudgetResponse) => {
  const axiosPrivate = useAxiosPrivate();

  const searchString = budget
    ? `type=expense&date=${budget.date.getFullYear()}&budget=${budget.name}`
    : "";

  return useQuery(
    transactionKeys.listByFilters(searchString),
    () =>
      axiosPrivate
        .get<ITransactionResponse[]>(`/api/transactions?${searchString}`)
        .then((res) => res.data),
    {
      enabled: budget && Object.keys(budget).length > 0,
      staleTime: Infinity,
      select: (transactions) =>
        transactions
          .filter((transaction) => transaction.budget?._id === budget?._id)
          .map((transaction) => ({
            ...transaction,
            date: new Date(transaction.date),
          })),
    }
  );
};

const useGetFilteredTransactions = (currentPage: number) => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParams, _] = useSearchParams();

  const searchString = searchParams.toString();

  return useQuery(
    transactionKeys.listByFilters(searchString, currentPage),
    () =>
      axiosPrivate
        .get<ITransactionResponse[]>(`/api/transactions?${searchString}`, {
          params: {
            page: currentPage,
            limit: 10,
          },
        })
        .then((res) => res.data),
    {
      staleTime: Infinity,
      keepPreviousData: true,
      select: (transactions) =>
        transactions.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        })),
    }
  );
};

const useGetTransactionDetail = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  if (!id) return;

  return useQuery(
    transactionKeys.detail(id),
    () =>
      axiosPrivate
        .get<ITransactionResponse>(`/api/transactions/${id}`)
        .then((res) => res.data),
    {
      staleTime: Infinity,
      select: (transaction) => ({
        ...transaction,
        date: new Date(transaction.date),
      }),
    }
  );
};

const invalidateQueries = (
  transaction: ITransactionResponse,
  queryClient: QueryClient
) => {
  const transactionYear = new Date(transaction.date).getFullYear();
  const transactionMonth = new Date(transaction.date).toLocaleDateString(
    navigator.language,
    { month: "long", year: "numeric" }
  );

  Promise.all([
    queryClient.invalidateQueries(transactionKeys.listByDate(transactionYear)),
    queryClient.invalidateQueries(transactionKeys.listByDate(transactionMonth)),
    queryClient.invalidateQueries(transactionKeys.detail(transaction._id)),
  ]);
  if ((transaction.type = "expense")) {
    Promise.all([
      queryClient.invalidateQueries(
        transactionKeys.listByFilters(
          `type=expense&date=${transactionYear}&budget=${transaction.budget?.name}`
        )
      ),
      queryClient.invalidateQueries(["budgets", transactionYear]),
      queryClient.invalidateQueries(["budgets", transactionMonth]),
      queryClient.invalidateQueries(["budgets", transaction.budget?._id]),
    ]);
  }
};

const useCreateNewTransaction = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (formData: ITransactionForm) =>
      axiosPrivate
        .post<ITransactionResponse>("/api/transactions", formData)
        .then((res) => res.data)
  );

  const createNewTransaction = (formData: ITransactionForm) => {
    return mutate(formData, {
      onSuccess: (transaction) => invalidateQueries(transaction, queryClient),
    });
  };

  return { createNewTransaction, isLoading, isError, error, isSuccess };
};

const useUpdateTransaction = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (formData: ITransactionForm) =>
      axiosPrivate
        .put<ITransactionResponse>(`/api/transactions/${id}`, formData)
        .then((res) => res.data)
  );

  const updateTransaction = (formData: ITransactionForm) => {
    return mutate(formData, {
      onSuccess: (transaction) => invalidateQueries(transaction, queryClient),
    });
  };

  return { updateTransaction, isLoading, isError, isSuccess, error };
};

const useDeleteTransaction = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate: deleteTransaction } = useMutation(
    () =>
      axiosPrivate.delete(`/api/transactions/${id}`).then((res) => res.data),
    {
      onSuccess: (transaction) => invalidateQueries(transaction, queryClient),
    }
  );

  return { deleteTransaction };
};

export {
  useGetTransactionsByDate,
  useGetFilteredTransactions,
  useGetTransactionsBudgetPreview,
  useGetTransactionDetail,
  useCreateNewTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
};
