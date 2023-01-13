import { z } from "zod";

const TransactionSchema = z
  .object({
    type: z.enum(["income", "expense"]),
    date: z.date({ required_error: "Transaction date is required" }),
    amount: z.coerce
      .number()
      .gt(0, { message: "Transaction amount must be higher than zero" }),
    description: z.string().optional(),
    state: z.enum(["paid", "topay", "upcoming"]).optional(),
    budget: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.type === "expense" && !val.state) {
      ctx.addIssue({
        code: "custom",
        message: "Transaction state is required",
        path: ["state"],
      });
    }

    if (val.type === "expense" && !val.budget) {
      ctx.addIssue({
        code: "custom",
        message: "Transaction budget is required",
        path: ["budget"],
      });
    }
  });

export default TransactionSchema;
