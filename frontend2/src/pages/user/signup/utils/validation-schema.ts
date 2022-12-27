import { z } from "zod";
import validator from "validator";

const SignUpSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required" })
      .refine((val) => validator.isAlpha(val), {
        message: "Only letters allowed",
      }),
    lastName: z
      .string()
      .refine((val) => validator.isAlpha(val), {
        message: "Only letters allowed",
      })
      .optional(),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email adress" }),
    userBudget: z
      .string({ required_error: "Your initial budget is required" })
      .refine((val) => Number(val), {
        message: "This field can include only numbers",
      }),
    password: z
      .string({ required_error: "Password is required" })
      .refine((val) => validator.isStrongPassword(val), {
        message: "Password doesn't meet criteria",
      }),
    confirmPassword: z.string().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

export default SignUpSchema;
