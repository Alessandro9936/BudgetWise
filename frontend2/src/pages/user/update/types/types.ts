import { z } from "zod";
import { noPasswordSchema, passwordSchema } from "../utils/validation-schema";

export type userFormNoPassword = z.infer<typeof noPasswordSchema>;
export type userFormPassword = z.infer<typeof passwordSchema>;
