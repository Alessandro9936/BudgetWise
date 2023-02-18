import { z } from "zod";
import validator from "validator";
import { SignUpFormType } from "../types/formType";

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
    currency: z.enum(["EUR", "USD", "GBP"]).default("USD"),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .refine((val) => validator.isStrongPassword(val), {
        message: "Password doesn't meet criteria",
      }),
    confirmPassword: z.string().optional(),
  })
  .superRefine(({ confirmPassword, password, currency }, ctx) => {
    if (!currency) {
      ctx.addIssue({
        code: "custom",
        message: "Select your currenct",
        path: ["currency"],
      });
    }
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

const initialValues: SignUpFormType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  currency: "USD",
  confirmPassword: "",
};

export { SignUpSchema, initialValues };
