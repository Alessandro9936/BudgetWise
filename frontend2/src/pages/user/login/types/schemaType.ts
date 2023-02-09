import { z } from "zod";
import { LoginSchema } from "../utils/validation-schema";

export type LoginFormType = z.infer<typeof LoginSchema>;
