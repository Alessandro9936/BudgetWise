import { Form, Formik, useFormikContext } from "formik";
import Modal from "../../components/Utilities/Modal";

import classes from "./TransactionModal.module.css";

import { useState } from "react";
import FormikControl from "../../components/Utilities/FormikControl";
import { ChevronRight, XCircle } from "react-feather";
import { Button } from "../../components/UI/Button";
import { ButtonRedirect } from "../../components/UI/ButtonRedirect";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useBudgets } from "../../context/budgetsContenxt";
import { useMemo } from "react";
import { isSameMonth } from "date-fns";
import { Loader } from "../../components/UI/Loader";
import { initialValues, transactionSchema } from "./utils/transactionSchema";
import { useCloseModal } from "../../hooks/useCloseModal";

import { SuccessRedirect } from "../../components/UI/SuccessRedirect";
import { FormikActionButtons } from "../../components/UI/FormikActionButtons";

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
  useCloseModal();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const queryClient = useQueryClient();

  const { budgetsState } = useBudgets();

  const [activeDate, setActiveDate] = useState(new Date());

  const axiosPrivate = useAxiosPrivate();

  const { mutate } = useMutation((values) =>
    axiosPrivate.post("/api/transactions", values)
  );

  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const budgetsInActiveDate = useMemo(() => {
    return budgetsState.reduce((acc, cur) => {
      if (isSameMonth(cur.date, activeDate)) {
        acc = [...acc, { key: cur.name, value: cur._id }];
      }
      return acc;
    }, []);
  }, [activeDate.getMonth()]);

  const handleActiveDropdown = (value) =>
    value !== activeDropdown
      ? setActiveDropdown(value)
      : setActiveDropdown(null);

  return (
    <Modal>
      <Formik
        initialValues={initialValues}
        validationSchema={transactionSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          mutate(values, {
            onSuccess: (data) => {
              if (data.status === 201) {
                queryClient.invalidateQueries(["user-transactions"]);
                setSubmitting(false);
                setIsSubmitted(true);
              }
            },
            onError: (error) => {
              const { param: field, msg: message } = error.response.data[0];
              setFieldError(field, message);
              setSubmitting(false);
            },
          });
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
              <div className={classes["form-date"]}>
                <FormikControl
                  control="date"
                  name="date"
                  calendarProps={{ minDetail: "year" }}
                  setActiveDate={setActiveDate}
                  disabled={formik.isSubmitting}
                />
              </div>
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
                    disabled={formik.isSubmitting}
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
                    disabled={formik.isSubmitting}
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
                        options={budgetsInActiveDate}
                        disabled={formik.isSubmitting}
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
                        disabled={formik.isSubmitting}
                      />
                    )}
                  </Field>
                </>
              )}

              <div className={classes["form-description"]}>
                <FormikControl
                  control="textarea"
                  placeholder="Brief description..."
                  name="description"
                  id="description"
                  maxLength="50"
                  disabled={formik.isSubmitting}
                />
              </div>
              {!isSubmitted && (
                <FormikActionButtons isSubmitting={formik.isSubmitting} />
              )}

              {isSubmitted && <SuccessRedirect isSubmitted={isSubmitted} />}
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
