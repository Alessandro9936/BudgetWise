import { z } from "zod";
import { SignUpSchema } from "../utils/validation-schema";

export type SignUpFormType = z.infer<typeof SignUpSchema>;
