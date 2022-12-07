import { Form, Formik } from "formik";
import Modal from "../../components/Utilities/Modal";

import classes from "./TransactionModal.module.css";

import * as yup from "yup";
import { useState } from "react";
import FormikControl from "../../components/Utilities/FormikControl";

const transactionSchema = yup.object().shape({
  type: yup.string().oneOf(["Expense", "Income"]).required("Type is required"),
  amount: yup.number().required("Amount is required"),
  date: yup.date().required("Date is required"),
  budget: yup.string().when("type", {
    is: (type) => type === "Expense",
    then: yup
      .string()
      .required("Insert this expense inside on of your budgets"),
  }),
  state: yup.string().when("type", {
    is: (type) => type === "Expense",
    then: yup
      .string()
      .oneOf(["Paid", "To pay", "Upcoming"])
      .required("Insert state fo this transaction"),
  }),
});

export default function TransactionModal() {
  const [initialValues, setInitialValues] = useState({});

  const handleSetInitialValues = (type) => {};

  return (
    <Modal>
      <Formik
        initialValues={initialValues}
        validationSchema={transactionSchema}
        onSubmit={(values, { setSubmitting, setFieldErrors }) => {
          console.log(values);
        }}
      ></Formik>
    </Modal>
  );
}
