import { z } from "zod";
import { BudgetSchema } from "../utils/validation-schema";

export type IBudgetForm = z.infer<typeof BudgetSchema>;
