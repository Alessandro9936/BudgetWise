import { ModalFormActions } from "../../components/Utilities/ModalFormActions";
import Modal from "../../components/Utilities/Modal";

import classes from "./TransactionModal.module.css";

import { useState } from "react";
import { ChevronRight, XCircle } from "react-feather";
import { useNavigate } from "react-router-dom";
import { initialValues, transactionSchema } from "./utils/transactionSchema";
import { useCloseModal } from "../../hooks/useCloseModal";

import { useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Calendar } from "react-calendar";
import Input from "../../components/UI/InputText";
import { ErrorMessage } from "@hookform/error-message";
import { Error } from "../../components/UI/Error";
import { useNewTransaction } from "../../utils/queryTransactions";
import { useGetBudgets } from "../../utils/queryBudget";

export default function TransactionModal() {
  const [transactionType, setTransactionType] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState("Amount");
  const [activeDate, setActiveDate] = useState(new Date());

  const { formState, setError, control, handleSubmit, setValue, getValues } =
    useForm({
      defaultValues: initialValues,
      resolver: yupResolver(transactionSchema),
    });

  const { data } = useGetBudgets(
    activeDate.toLocaleDateString("en-GB", { year: "numeric", month: "long" })
  );

  const budgetsInActiveDate = data?.reduce((acc, cur) => {
    acc = [...acc, { key: cur.name, value: cur._id }];
    return acc;
  }, []);

  const activeBudget = budgetsInActiveDate?.find(
    (budget) => budget.value === getValues("budget")
  );

  const navigate = useNavigate();

  const { newTransaction } = useNewTransaction(formState, setError);

  useCloseModal();

  const onSubmit = (formData) => {
    newTransaction(formData);
  };

  const onTransactionTypeChange = (type) => {
    setTransactionType(type);
    setValue("type", type, { shouldValidate: true });
  };

  return (
    <Modal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes["form-wrapper"]}
      >
        <div className={classes["form-header"]}>
          <h1>New transaction</h1>
          <XCircle
            size={24}
            strokeWidth={1.5}
            cursor="pointer"
            onClick={() => navigate("..")}
          />
        </div>
        <div className={classes["form-container"]}>
          <div className={classes["form__field-date"]}>
            <CalendarInput
              control={control}
              name="date"
              calendarProps={{ minDetail: "year" }}
              setValue={setValue}
              setActiveDate={setActiveDate}
            />
          </div>
          <div className={classes["form__field-type"]}>
            <TypeInput
              activeType={transactionType}
              onTypeChange={onTransactionTypeChange}
              value="income"
            />
            <TypeInput
              activeType={transactionType}
              onTypeChange={onTransactionTypeChange}
              value="expense"
            />
            <ErrorMessage
              errors={formState.errors}
              name={"type"}
              render={({ message }) => <Error message={message} />}
            />
          </div>
          <div className={classes["form__field-amount"]}>
            <FormFieldHeader
              value={getValues("amount")}
              label="Amount"
              setActiveDropdown={setActiveDropdown}
            />
            {activeDropdown === "Amount" && (
              <Input control={control} type="number" name="amount" />
            )}
          </div>
          {transactionType === "expense" && (
            <>
              <div className={classes["form__field-budget"]}>
                <FormFieldHeader
                  value={activeBudget?.key}
                  label="Budget"
                  setActiveDropdown={setActiveDropdown}
                />
                {activeDropdown === "Budget" && (
                  <ul className={classes["form__field-budget__values"]}>
                    {budgetsInActiveDate.map((budget) => (
                      <OneChoiceInput
                        key={budget.value}
                        value={budget.value}
                        label={budget.key}
                        setValue={setValue}
                        control={control}
                        name="budget"
                        isActive={getValues("budget") === budget.value}
                      />
                    ))}
                  </ul>
                )}
                <ErrorMessage
                  errors={formState.errors}
                  name={"budget"}
                  render={({ message }) => <Error message={message} />}
                />
              </div>
              <div className={classes["form__field-state"]}>
                <FormFieldHeader
                  value={getValues("state")}
                  label="State"
                  setActiveDropdown={setActiveDropdown}
                />
                {activeDropdown === "State" && (
                  <ul className={classes["form__field-state__values"]}>
                    {["paid", "topay", "upcoming"].map((state) => (
                      <OneChoiceInput
                        key={state}
                        value={state}
                        setValue={setValue}
                        control={control}
                        name="state"
                        isActive={getValues("state") === state}
                      />
                    ))}
                  </ul>
                )}
                <ErrorMessage
                  errors={formState.errors}
                  name={"state"}
                  render={({ message }) => <Error message={message} />}
                />
              </div>
            </>
          )}
          <div className={classes["form__field-description"]}>
            <p>Description</p>
            <TextareaInput name="description" control={control} />
          </div>
          <div className={classes["form__handler-buttons"]}>
            <ModalFormActions formState={formState} />
          </div>
        </div>
      </form>
    </Modal>
  );
}

function TextareaInput({ ...props }) {
  const { field, formState, fieldState } = useController(props);

  return <textarea {...field} className={classes.textarea}></textarea>;
}

function FormFieldHeader({ label, value, setActiveDropdown }) {
  return (
    <div
      className={classes["form__field-amount__header"]}
      onClick={() =>
        setActiveDropdown((prev) => (prev === label ? null : label))
      }
    >
      <p>{label}</p>
      <div className={classes["field-handler"]}>
        <span className={classes["field-handler__value"]}>{value}</span>
        <ChevronRight size={18} color={"#929292"} />
      </div>
    </div>
  );
}

function OneChoiceInput({ setValue, value, label, isActive, ...props }) {
  const { field } = useController(props);

  return (
    <li
      onClick={() => setValue(field.name, value, { shouldValidate: true })}
      className={`${classes["value-option"]} ${isActive ? classes.active : ""}`}
    >
      {label ?? value}
    </li>
  );
}

function TypeInput({ activeType, onTypeChange, value }) {
  const isActive = activeType === value ? classes["active-type"] : "";
  return (
    <p
      onClick={() => onTypeChange(value)}
      className={`${classes.type} ${isActive}`}
    >
      {value[0].toUpperCase() + value.slice(1)}
    </p>
  );
}

function CalendarInput({ calendarProps, setValue, setActiveDate, ...props }) {
  const { field } = useController(props);

  const onDateChange = (date) => {
    setValue(field.name, date, { shouldValidate: true });
    setActiveDate(date);
  };

  return <Calendar {...calendarProps} onChange={onDateChange} />;
}

/* const { mutate } = useMutation((values) =>
  axiosPrivate.post("/api/transactions", values)
);

const navigate = useNavigate(); 

useCloseModal();

const [isSubmitted, setIsSubmitted] = useState(false);

const queryClient = useQueryClient();

const [activeDate, setActiveDate] = useState(new Date());

const axiosPrivate = useAxiosPrivate();

const [transactionType, setTransactionType] = useState(null);
const [activeDropdown, setActiveDropdown] = useState(null);

const { data } = useGetBudgets();

const budgetsInActiveDate = useMemo(() => {
  return data.reduce((acc, cur) => {
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
    */

/* 

<Formik
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
*/
