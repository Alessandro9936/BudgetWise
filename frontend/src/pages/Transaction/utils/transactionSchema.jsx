import * as yup from "yup";

export const transactionSchema = yup.object().shape({
  type: yup.string().oneOf(["expense", "income"]).required("Type is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
  date: yup.date().required("Date is required"),
  budget: yup.string().when("type", {
    is: (type) => type === "expense",
    then: yup.string().required("Insert budget of this expense"),
  }),
  state: yup.string().when("type", {
    is: (type) => type === "expense",
    then: yup
      .string()
      .oneOf(["paid", "topay", "upcoming"])
      .required("Insert state to this transaction"),
  }),
});

export const initialValues = {
  type: "",
  amount: "",
  budget: "",
  state: "",
  date: new Date(),
  description: "",
};
