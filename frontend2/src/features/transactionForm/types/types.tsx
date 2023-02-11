import { z } from "zod";
import { TransactionSchema } from "../utils/validation-schema";

export type TransactionFormProps = z.infer<typeof TransactionSchema>;

export type DropdownTypes = "Amount" | "Budget" | "State" | null;
