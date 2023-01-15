import { z } from "zod";
import { TransactionSchema } from "../utils/validation-schema";

export type ITransactionForm = z.infer<typeof TransactionSchema>;
