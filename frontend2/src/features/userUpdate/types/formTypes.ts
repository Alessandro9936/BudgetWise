import { z } from "zod";
import { noPasswordSchema, passwordSchema } from "../utils/validation-schema";

export type UserFormNoPassword = z.infer<typeof noPasswordSchema>;
export type UserFormPassword = z.infer<typeof passwordSchema>;
