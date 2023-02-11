import { z } from "zod";
import validator from "validator";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  userBudget: "",
  password: "",
  currency: "USD",
  confirmPassword: "",
};

const SignUpSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .refine((val) => validator.isAlpha(val), {
        message: "Only letters allowed",
      }),
    lastName: z.string().optional(),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email adress" }),
    userBudget: z
      .string()
      .min(1, { message: "Your initial budget is required" })
      .refine((val) => Number(val), {
        message: "This field can include only numbers",
      }),
    currency: z.string(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
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

export { SignUpSchema, initialValues };
