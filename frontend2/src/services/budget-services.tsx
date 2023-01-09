import { AxiosInstance } from "axios";
import { useQuery } from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const budgetKeys = {
  listByDate: (date: number | string) => ["budgets", date] as const,
};

export interface IBudget {
  name: string;
  user?: string;
  _id: string;
  date: Date;
  maxAmount: number;
  usedAmount: number;
}

const getBudgetsByDateFn = async (
  instance: AxiosInstance,
  date: string | number
) => {
  const response = await instance.get<IBudget[]>("/api/budgets", {
    params: { date: date },
  });

  return response.data;
};

const useGetBudgetsByDate = (date: Date, timeSpan: string) => {
  const axiosPrivate = useAxiosPrivate();

  const formatDate =
    timeSpan === "Yearly"
      ? date.getFullYear()
      : date.toLocaleDateString(navigator.language, {
          year: "numeric",
          month: "long",
        });

  return useQuery<IBudget[]>(
    budgetKeys.listByDate(formatDate),
    () => getBudgetsByDateFn(axiosPrivate, formatDate),
    {
      staleTime: Infinity,
      keepPreviousData: true,
      // When the activeSpan is equal to year, all the budgets in each month are returned.
      // This allow to sum budgets with same name in a single object.
      select: (budgets) => {
        if (timeSpan === "Yearly" && budgets.length > 0) {
          return budgets.reduce((previousValue: IBudget[], budget) => {
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

export { useGetBudgetsByDate };
