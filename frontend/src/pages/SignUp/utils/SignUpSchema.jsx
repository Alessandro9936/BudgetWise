import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, {
      excludeEmptyString: true,
      message: "Only letters allowed.",
    })
    .required("First name is required."),
  lastName: yup
    .string()
    .matches(/^[A-Za-z]+$/, {
      excludeEmptyString: true,
      message: "Only letters allowed.",
    })
    .required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  userBudget: yup
    .number()
    .integer()
    .required("Please inserting your starting budget"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
});
