import { CloseModalIcon } from "./../../components/UI/CloseModalIcon";
import { ModalFormActions } from "../../components/Utilities/ModalFormActions";
import Modal from "../../components/Utilities/Modal";

import classes from "./TransactionModal.module.css";

import { useEffect, useState } from "react";
import { ChevronRight } from "react-feather";
import { transactionSchema } from "./utils/transactionSchema";
import { useCloseModal } from "../../hooks/useCloseModal";

import { useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { Error } from "../../components/UI/Error";
import {
  useGetTransactionDetails,
  useNewTransaction,
  useUpdateTransaction,
} from "../../utils/queryTransactions";
import { useGetBudgetsByDate } from "../../utils/queryBudget";
import CalendarInput from "../../components/UI/form-inputs/calendar-input";
import OneChoiceInput from "../../components/UI/form-inputs/customRadio-input";
import Input from "../../components/UI/form-inputs/InputText";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

export default function TransactionModal() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isUpdate = !!id;

  const dataTransactionDetail = useGetTransactionDetails();
  const trasactionDetails = dataTransactionDetail?.data;

  let initialValues = {
    type: "",
    amount: "",
    budget: "",
    state: "",
    date: new Date(),
    description: "",
  };

  if (trasactionDetails) {
    initialValues = {
      type: trasactionDetails.type,
      amount: trasactionDetails.amount,
      budget: trasactionDetails?.budget?._id ?? "",
      state: trasactionDetails?.state ?? "",
      date: trasactionDetails.date,
      description: trasactionDetails.description,
    };
  }

  const {
    formState,
    setError,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(transactionSchema),
  });

  const [transactionType, setTransactionType] = useState(
    trasactionDetails?.type ?? null
  );
  const [activeDropdown, setActiveDropdown] = useState("Amount");
  const [activeDate, setActiveDate] = useState(
    trasactionDetails?.date ?? new Date()
  );

  const { data } = useGetBudgetsByDate(
    activeDate.toLocaleDateString("en-GB", { year: "numeric", month: "long" })
  );

  const budgetsInActiveDate = data?.reduce((acc, cur) => {
    acc = [...acc, { key: cur.name, value: cur._id }];
    return acc;
  }, []);

  const activeBudget = budgetsInActiveDate?.find(
    (budget) => budget.value === getValues("budget")
  );

  const { newTransaction } = useNewTransaction(formState, setError);
  const { isSuccess, updateTransaction } = useUpdateTransaction();

  useCloseModal();

  const onSubmit = (formData) => {
    if (isUpdate) {
      updateTransaction(formData);
      if (isSuccess) navigate(`/${id}`, { replace: true });
    } else {
      newTransaction(formData);
    }
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
          <CloseModalIcon />
        </div>
        <div className={classes["form-container"]}>
          <div className={classes["form__field-date"]}>
            <CalendarInput
              control={control}
              name="date"
              calendarProps={{
                minDetail: "year",
                defaultValue: formState.defaultValues.date,
              }}
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
                  value={trasactionDetails?.budget?.name || activeBudget?.key}
                  label="Budget"
                  setActiveDropdown={setActiveDropdown}
                />
                {activeDropdown === "Budget" && (
                  <ul className={classes["form__field-budget__values"]}>
                    {budgetsInActiveDate.map((budget) => (
                      <OneChoiceInput
                        key={budget.value}
                        value={trasactionDetails?.budget?._id ?? budget.value}
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
