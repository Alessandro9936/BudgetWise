import z from "zod";
import DeleteUserSchema from "../utils/validation-schema";

export type DeleteUserType = z.infer<typeof DeleteUserSchema>;
