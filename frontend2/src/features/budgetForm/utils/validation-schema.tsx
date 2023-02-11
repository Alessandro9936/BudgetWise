import { startOfMonth } from "date-fns";
import { z } from "zod";
import { useGetBudgetDetails } from "../../../services/budget-services";

const BudgetSchema = z.object({
  name: z.string().min(1, { message: "Budget name must be defined" }),
  date: z.date().min(startOfMonth(new Date()), {
    message: "Budget must be set in a future date",
  }),
  maxAmount: z.coerce
    .number()
    .gt(0, { message: "Maximum amount must be greater than zero" }),
  usedAmount: z.coerce.number().optional().default(0),
});

const formInitialValues = () => {
  const queryTransactionDetail = useGetBudgetDetails();
  const budgetDetail = queryTransactionDetail?.data;

  return {
    name: budgetDetail?.name ?? "",
    date: budgetDetail?.date ?? new Date(),
    maxAmount: budgetDetail?.maxAmount ?? 0,
    usedAmount: budgetDetail?.usedAmount ?? 0,
  };
};

export { BudgetSchema, formInitialValues };
