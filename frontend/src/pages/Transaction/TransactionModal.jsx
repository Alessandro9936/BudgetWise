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
import { ErrorMessage } from "@hookform/error-message";
import { Error } from "../../components/UI/Error";
import { useNewTransaction } from "../../utils/queryTransactions";
import { useGetBudgets } from "../../utils/queryBudget";
import CalendarInput from "../../components/UI/form-inputs/calendar-input";
import OneChoiceInput from "../../components/UI/form-inputs/customRadio-input";
import Input from "../../components/UI/form-inputs/InputText";

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
