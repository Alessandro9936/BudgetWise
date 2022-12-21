import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export const useGetTransactionsFiltered = () => {
  const axiosPrivate = useAxiosPrivate();
  const [search] = useSearchParams();

  return useQuery(
    ["transactions", search.toString()],
    () => axiosPrivate.get("/api/transactions", { params: search }),
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

export const useGetTransactionsByDate = (date) => {
  const axiosPrivate = useAxiosPrivate();

  const year = date.getFullYear();

  return useQuery(
    ["transactions", year],
    () => axiosPrivate.get("/api/transactions", { params: { date: year } }),
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

export const transactionByDate = (date) => {
  const query = useGetTransactionsByDate(date);

  const transactions = query.data ?? [];
  const isLoading = query.isLoading;
  const isFetching = query.isFetching;

  return { transactions, isFetching, isLoading };
};

export const useNewTransaction = (formState, setError) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation((values) =>
    axiosPrivate.post("/api/transactions", values)
  );

  const newTransaction = (formData) => {
    mutate(formData, {
      onSuccess: (data) => {
        if (data.status === 201) {
          const transactionYear = new Date(data.data?.date).getFullYear();
          queryClient.invalidateQueries(["transactions", transactionYear]);
        }
      },
      onError: () => {
        const { param: field, msg: message } = error.response.data[0];
        setError(field, { message: message }, { shouldFocus: true });
        formState.isSubmitSuccessful(false);
      },
    });
  };

  return { newTransaction };
};
