import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email adress" }),
  password: z.string({ required_error: "Password is required" }),
});

export default LoginSchema;
