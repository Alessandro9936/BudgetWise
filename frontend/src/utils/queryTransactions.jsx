import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export const useGetTransactions = () => {
  const axiosPrivate = useAxiosPrivate();
  const [search] = useSearchParams();

  return useQuery(
    ["transactions", search.toString()],
    () => axiosPrivate.get("/api/transactions", { params: search }),
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
          queryClient.invalidateQueries([
            "transactions",
            `date=${transactionYear}`,
          ]);
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
