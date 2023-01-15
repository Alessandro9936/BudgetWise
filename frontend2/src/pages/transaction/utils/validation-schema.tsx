import { useParams } from "react-router-dom";
import { z } from "zod";
import { useGetTransactionDetail } from "../../../services/transaction-services";

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

const formInitialValues = () => {
  const queryTransactionDetail = useGetTransactionDetail();
  const transactionDetail = queryTransactionDetail?.data;

  return {
    type: transactionDetail?.type ?? "income",
    amount: transactionDetail?.amount ?? 0,
    budget: transactionDetail?.budget?._id,
    state: transactionDetail?.state,
    date: transactionDetail?.date ?? new Date(),
    description: transactionDetail?.description ?? "",
  };
};

export { TransactionSchema, formInitialValues };
