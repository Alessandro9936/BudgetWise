import { z } from "zod";
import validator from "validator";

const noPasswordSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email adress" }),
});
const passwordSchema = noPasswordSchema
  .extend({
    oldPassword: z
      .string()
      .min(1, { message: "Required if you want to change your password" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .refine((val) => validator.isStrongPassword(val), {
        message: "Invalid password format",
      }),
    confirmPassword: z.string().optional(),
  })
  .superRefine(({ confirmPassword, password, oldPassword }, ctx) => {
    if (password === oldPassword) {
      ctx.addIssue({
        code: "custom",
        message:
          "Your new password cannot be the same as your current password",
        path: ["password"],
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

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

export { noPasswordSchema, passwordSchema, initialValues };
