import { Form, Formik, useFormikContext } from "formik";
import Modal from "../../components/Utilities/Modal";

import classes from "./BudgetModal.module.css";

import * as yup from "yup";
import { useState } from "react";
import FormikControl from "../../components/Utilities/FormikControl";
import { ChevronRight, XCircle } from "react-feather";
import { Button } from "../../components/UI/Button";
import { ButtonRedirect } from "../../components/UI/ButtonRedirect";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const budgetSchema = yup.object().shape({
  type: yup.string().required("Type is required"),
  date: yup.date().required("Date is required"),
  maxAmount: yup.string().required("Budget total is required"),
  usedAmount: yup.string().required("Budget used is required"),
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

export default function BudgetModal() {
  const navigate = useNavigate();
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
    date: new Date(),
    maxAmount: 0,
    usedAmount: 0,
  };

  const handleActiveDropdown = (value) =>
    value !== activeDropdown
      ? setActiveDropdown(value)
      : setActiveDropdown(null);

  return (
    <Modal>
      <Formik
        initialValues={initialValues}
        validationSchema={budgetSchema}
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
              <h1 className={classes["form-title"]}>New budget</h1>
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
                    control="radio"
                    label="Type"
                    name="type"
                    options={[
                      { key: "Rent", value: "rent" },
                      { key: "Groceries", value: "groceries" },
                      { key: "Bills", value: "bills" },
                      { key: "Transport", value: "transport" },
                      { key: "Education", value: "education" },
                      { key: "Health & Fitness", value: "health&fitness" },
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

              <div className={classes["form-date"]}>
                <FormikControl
                  control="date"
                  name="date"
                  calendarProps={{ minDetail: "year", maxDetail: "year" }}
                  disabled={formik.isSubmitting ? true : false}
                />
              </div>

              <div className={classes["form-range"]}>
                <FormikControl
                  control="range"
                  name="maxAmount"
                  min="0"
                  max="1000"
                  step="10"
                  label="Budget total amount"
                  disabled={formik.isSubmitting ? true : false}
                />
              </div>
              <div className={classes["form-range"]}>
                <FormikControl
                  control="range"
                  name="usedAmount"
                  min="0"
                  max="1000"
                  step="10"
                  label="Budget used amount"
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
