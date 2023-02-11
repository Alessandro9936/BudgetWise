import { AxiosInstance } from "axios";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { TransactionFormProps } from "@/features/transactionForm";
import { BudgetResponse } from "./budget-services";
import { formatMonth } from "./format/date";

const transactionKeys = {
  listByDate: (date: string | number) => ["transactions", date] as const,
  listByFilters: (filters: string, page?: number) =>
    ["transactions", page, { filters }] as const,
  detail: (id: string) => ["transaction", id] as const,
};

export type TransactionResponse = {
  type: "income" | "expense";
  amount: number;
  date: Date;
  description?: string;
  _id: string;
  user: string;
  state?: "paid" | "topay" | "upcoming";
  budget?: { name: string; _id: string };
};

const getTransactionsByDateFn = async (
  instance: AxiosInstance,
  date: string | number
) => {
  const result = await instance.get<TransactionResponse[]>(
    "/api/transactions",
    {
      params: { date },
    }
  );

  return result.data;
};

const getFilteredTransactionFn = async (
  instance: AxiosInstance,
  searchString: string,
  currentPage: number
) => {
  const result = await instance.get<TransactionResponse[]>(
    `/api/transactions?${searchString}`,
    {
      params: {
        page: currentPage,
        limit: 10,
      },
    }
  );

  return result.data;
};

const getTransactionsInBudgetFn = async (
  instance: AxiosInstance,
  searchString: string
) => {
  const result = await instance.get<TransactionResponse[]>(
    `/api/transactions?${searchString}`
  );

  return result.data;
};

const getTransactioDetailFn = async (instance: AxiosInstance, id: string) => {
  const result = await instance.get<TransactionResponse>(
    `/api/transactions/${id}`
  );
  return result.data;
};

const createTransactionFn = async (
  instance: AxiosInstance,
  formData: TransactionFormProps
) => {
  const result = await instance.post<TransactionResponse>(
    "/api/transactions",
    formData
  );

  return result.data;
};

const updateTransactionFn = async (
  instance: AxiosInstance,
  formData: TransactionFormProps,
  id: string
) => {
  const result = await instance.put<TransactionResponse>(
    `/api/transactions/${id}`,
    formData
  );

  return result.data;
};

const deleteTransactionFn = async (instance: AxiosInstance, id: string) => {
  const result = await instance.delete(`/api/transactions/${id}`);
  return result.data;
};

const useGetTransactionsByDate = (date: Date, timeSpan: string) => {
  const axiosPrivate = useAxiosPrivate();

  const formatDate =
    timeSpan === "Yearly" ? date.getFullYear() : formatMonth(date);

  return useQuery(
    transactionKeys.listByDate(formatDate),
    () => getTransactionsByDateFn(axiosPrivate, formatDate),
    {
      // Increase staleTime to make UI more smooth
      staleTime: 20000,
      keepPreviousData: true,
      select: (transactions) =>
        transactions.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        })),
    }
  );
};

const useGetTransactionsInBudget = (budget: BudgetResponse) => {
  const axiosPrivate = useAxiosPrivate();

  // Format query string to get only expenses that are inside of budget and occured in the same month
  const searchString = budget
    ? `type=expense&date=${formatMonth(budget.date)}&budget=${
        budget.name
      }&sort=-date`
    : "";

  return useQuery(
    transactionKeys.listByFilters(searchString),
    () => getTransactionsInBudgetFn(axiosPrivate, searchString),
    {
      enabled: budget && Object.keys(budget).length > 0,
      select: (transactions) =>
        transactions.map((transaction) => ({
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
    () => getFilteredTransactionFn(axiosPrivate, searchString, currentPage),
    {
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
    () => getTransactioDetailFn(axiosPrivate, id),
    {
      enabled: !!id,
      staleTime: Infinity,
      select: (transaction) => ({
        ...transaction,
        date: new Date(transaction.date),
      }),
    }
  );
};

const invalidateQueriesOnMutation = (
  transaction: TransactionResponse,
  queryClient: QueryClient
) => {
  const transactionYear = new Date(transaction.date).getFullYear();
  const transactionMonth = formatMonth(new Date(transaction.date));

  Promise.all([
    queryClient.invalidateQueries(transactionKeys.listByDate(transactionYear)),
    queryClient.invalidateQueries(transactionKeys.listByDate(transactionMonth)),
    queryClient.invalidateQueries(transactionKeys.detail(transaction._id)),
  ]);
};

const useCreateNewTransaction = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation(
    (formData: TransactionFormProps) =>
      createTransactionFn(axiosPrivate, formData),
    {
      onSuccess: (transaction) =>
        invalidateQueriesOnMutation(transaction, queryClient),
    }
  );
};

const useUpdateTransaction = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  return useMutation(
    (formData: TransactionFormProps) =>
      updateTransactionFn(axiosPrivate, formData, id!),
    {
      onSuccess: (transaction) =>
        invalidateQueriesOnMutation(transaction, queryClient),
    }
  );
};

const useDeleteTransaction = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  return useMutation(() => deleteTransactionFn(axiosPrivate, id!), {
    onSuccess: (transaction) =>
      invalidateQueriesOnMutation(transaction, queryClient),
  });
};

const usePrefetchTransactionsByDate = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const prefetchTransactions = async (dateToPrefetch: string | number) => {
    return await queryClient.prefetchQuery({
      queryKey: transactionKeys.listByDate(dateToPrefetch),
      queryFn: () => getTransactionsByDateFn(axiosPrivate, dateToPrefetch),
      staleTime: 5000,
    });
  };

  return { prefetchTransactions };
};

const usePrefetchTransactionsByFilters = () => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParams, _] = useSearchParams();
  const searchString = searchParams.toString();
  const queryClient = useQueryClient();

  const prefetchTransactions = async (pageToPrefetch: number) => {
    return await queryClient.prefetchQuery({
      queryKey: transactionKeys.listByFilters(searchString, pageToPrefetch),
      queryFn: () =>
        getFilteredTransactionFn(axiosPrivate, searchString, pageToPrefetch),
      staleTime: 5000,
    });
  };

  return { prefetchTransactions };
};

const usePrefetchTransactionDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const prefetchTransactionDetails = async (id: string) => {
    return await queryClient.prefetchQuery({
      queryKey: transactionKeys.detail(id),
      queryFn: () => getTransactioDetailFn(axiosPrivate, id),
      staleTime: 5000,
    });
  };

  return { prefetchTransactionDetails };
};

export {
  useGetTransactionsByDate,
  useGetFilteredTransactions,
  useGetTransactionsInBudget,
  useGetTransactionDetail,
  useCreateNewTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
  usePrefetchTransactionsByDate,
  usePrefetchTransactionsByFilters,
  usePrefetchTransactionDetails,
};
