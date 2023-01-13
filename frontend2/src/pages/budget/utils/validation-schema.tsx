import { startOfMonth } from "date-fns";
import { z } from "zod";

const BudgetSchema = z.object({
  name: z.string().min(1, { message: "Budget name must be defined" }),
  date: z
    .date()
    .min(startOfMonth(new Date()), {
      message: "Budget must be set in a future date",
    }),
  maxAmount: z.coerce
    .number()
    .gt(0, { message: "Maximum amount must be greater than zero" }),
  usedAmount: z.coerce.number(),
});

export default BudgetSchema;
