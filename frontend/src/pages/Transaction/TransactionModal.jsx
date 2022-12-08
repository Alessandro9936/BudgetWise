import { Form, Formik, useFormikContext } from "formik";
import Modal from "../../components/Utilities/Modal";

import classes from "./TransactionModal.module.css";

import * as yup from "yup";
import { useState } from "react";
import FormikControl from "../../components/Utilities/FormikControl";
import { ChevronRight, XCircle } from "react-feather";
import { Button } from "../../components/UI/Button";
import { ButtonRedirect } from "../../components/UI/ButtonRedirect";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const transactionSchema = yup.object().shape({
  type: yup.string().oneOf(["expense", "income"]).required("Type is required"),
  amount: yup.number().required("Amount is required"),
  date: yup.date().required("Date is required"),
  budget: yup.string().when("type", {
    is: (type) => type === "expense",
    then: yup.string().required("Insert budget of this expense"),
  }),
  state: yup.string().when("type", {
    is: (type) => type === "expense",
    then: yup
      .string()
      .oneOf(["paid", "topay"])
      .required("Insert state to this transaction"),
  }),
});

const Field = ({ children, label, handleActiveDropdown, activeDropdown }) => {
  const { errors, touched } = useFormikContext();
  return (
    <div
      style={{
        borderColor: errors[label] && touched[label] && "#ee7172",
      }}
      className={classes["form-radio"]}
    >
      <div
        className={classes["field-header"]}
        onClick={() => handleActiveDropdown(label)}
      >
        <p>{label[0].toUpperCase() + label.slice(1)}</p>
        <ChevronRight
          size={18}
          style={{
            transform:
              activeDropdown === label ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </div>

      <div className={classes["field-options"]}>{children}</div>
    </div>
  );
};

export default function TransactionModal() {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    function handleEscape(e) {
      if (e.code === "Escape") navigate("..");
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const initialValues = {
    type: "",
    amount: "",
    budget: "",
    state: "",
    date: new Date(),
    description: "",
  };

  const handleActiveDropdown = (value) =>
    value !== activeDropdown
      ? setActiveDropdown(value)
      : setActiveDropdown(null);

  return (
    <Modal>
      <Formik
        initialValues={initialValues}
        validationSchema={transactionSchema}
        onSubmit={(values, { setSubmitting, setFieldErrors }) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form
            onSubmit={formik.handleSubmit}
            className={classes["form-container"]}
          >
            <div className={classes["form-header"]}>
              <h1 className={classes["form-title"]}>New transaction</h1>
              <XCircle
                size={24}
                strokeWidth={1.5}
                cursor="pointer"
                onClick={() => navigate("..")}
              />
            </div>
            <div className={classes["form-grid"]}>
              <Field
                activeDropdown={activeDropdown}
                label="type"
                handleActiveDropdown={handleActiveDropdown}
              >
                {activeDropdown === "type" && (
                  <FormikControl
                    onClick={(e) => setTransactionType(e.target.value)}
                    control="radio"
                    label="Type"
                    name="type"
                    options={[
                      { key: "Income", value: "income" },
                      { key: "Expense", value: "expense" },
                    ]}
                    disabled={formik.isSubmitting ? true : false}
                  />
                )}
              </Field>
              <Field
                activeDropdown={activeDropdown}
                label="amount"
                handleActiveDropdown={handleActiveDropdown}
              >
                {activeDropdown === "amount" && (
                  <FormikControl
                    control="input"
                    name="amount"
                    type="number"
                    disabled={formik.isSubmitting ? true : false}
                  />
                )}
              </Field>

              {transactionType === "expense" && (
                <>
                  <Field
                    activeDropdown={activeDropdown}
                    label="budget"
                    handleActiveDropdown={handleActiveDropdown}
                  >
                    {activeDropdown === "budget" && (
                      <FormikControl
                        control="radio"
                        label="Budget"
                        name="budget"
                        options={[
                          { key: "Rent", value: "rent" },
                          { key: "Groceries", value: "groceries" },
                          { key: "Bills", value: "bills" },
                          { key: "Transport", value: "transport" },
                          { key: "Education", value: "education" },
                          { key: "Fitness", value: "health&fitness" },
                          { key: "Personal care", value: "personalcare" },
                          { key: "Shopping", value: "shopping" },
                          { key: "Entertainment", value: "entertainment" },
                          { key: "Travelling", value: "travelling" },
                          { key: "Others", value: "others" },
                        ]}
                        disabled={formik.isSubmitting ? true : false}
                      />
                    )}
                  </Field>
                  <Field
                    activeDropdown={activeDropdown}
                    label="state"
                    handleActiveDropdown={handleActiveDropdown}
                  >
                    {activeDropdown === "state" && (
                      <FormikControl
                        control="radio"
                        label="State"
                        name="state"
                        options={[
                          { key: "Paid", value: "paid" },
                          { key: "To pay", value: "topay" },
                        ]}
                        disabled={formik.isSubmitting ? true : false}
                      />
                    )}
                  </Field>
                </>
              )}

              <div className={classes["form-date"]}>
                <FormikControl
                  control="date"
                  name="date"
                  calendarProps={{ minDetail: "year" }}
                  disabled={formik.isSubmitting ? true : false}
                />
              </div>
              <div className={classes["form-description"]}>
                <FormikControl
                  control="textarea"
                  placeholder="Brief description..."
                  name="description"
                  id="description"
                  maxLength="50"
                  disabled={formik.isSubmitting ? true : false}
                />
              </div>
              <div className={classes["form-buttons"]}>
                <Button type="submit">Submit</Button>
                <ButtonRedirect redirectLink={".."}>Go back</ButtonRedirect>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
