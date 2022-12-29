import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email adress" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default LoginSchema;
