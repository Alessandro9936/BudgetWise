import { useParams } from "react-router-dom";
import axios from "axios";
import { UseFormSetError } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

const useCreateNewBudget = (setError: UseFormSetError<IBudgetForm>) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation((formData: IBudgetForm) =>
    axiosPrivate.post<IBudgetResponse>("/api/budgets", formData)
  );

  const createNewBudget = (formData: IBudgetForm) => {
    return mutate(formData, {
      onSuccess: (data) => {
        if (data.status === 201) {
          const budgetMonth = new Date(data.data?.date).toLocaleDateString(
            navigator.language,
            { month: "long", year: "numeric" }
          );
          const budgetYear = new Date(data.data?.date).getFullYear();
          Promise.all([
            queryClient.invalidateQueries(budgetKeys.listByDate(budgetMonth)),
            queryClient.invalidateQueries(budgetKeys.listByDate(budgetYear)),
          ]);
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const {
            param: field,
            msg: message,
          }: {
            param: "name" | "date" | "maxAmount" | "usedAmount";
            msg: string;
          } = error?.response?.data[0];
          setError(field, { message: message }, { shouldFocus: true });
        } else {
          throw error;
        }
      },
    });
  };

  return { createNewBudget, isLoading };
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
      staleTime: Infinity,
      select: (budget) => ({ ...budget, date: new Date(budget.date) }),
    }
  );
};

const useUpdateBudget = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate, isLoading } = useMutation((formData: IBudgetForm) =>
    axiosPrivate
      .put<IBudgetResponse>(`/api/budgets/${id}`, formData)
      .then((res) => res.data)
  );

  const updateBudget = (formData: IBudgetForm) => {
    return mutate(formData, {
      onSuccess: (budget) => {
        const budgetYear = new Date(budget.date).getFullYear();
        const budgetMonth = new Date(budget.date).toLocaleDateString(
          navigator.language,
          {
            month: "long",
            year: "numeric",
          }
        );

        Promise.all([
          queryClient.invalidateQueries(["budgets", budget._id]),
          queryClient.invalidateQueries(["budgets", budgetYear]),
          queryClient.invalidateQueries(["budgets", budgetMonth]),
        ]);
      },
    });
  };

  return { updateBudget, isLoading };
};

export {
  useGetBudgetsByDate,
  useCreateNewBudget,
  useGetBudgetDetails,
  useUpdateBudget,
};
