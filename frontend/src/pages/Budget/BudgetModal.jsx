import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useController, useForm } from "react-hook-form";
import Modal from "../../components/Utilities/Modal";

import classes from "./BudgetModal.module.css";
import { XCircle } from "react-feather";
import CalendarInput from "../../components/UI/form-inputs/calendar-input";
import { useState } from "react";
import OneChoiceInput from "../../components/UI/form-inputs/customRadio-input";
import { useMemo } from "react";
import {
  useGetBudgetDetails,
  useGetBudgetsByDate,
  useNewBudget,
  useUpdateBudget,
} from "../../utils/queryBudget";
import { Error } from "../../components/UI/Error";
import { ErrorMessage } from "@hookform/error-message";
import { ModalFormActions } from "../../components/Utilities/ModalFormActions";
import { useNavigate, useParams } from "react-router-dom";
import { useCloseModal } from "../../hooks/useCloseModal";

const allBudgets = [
  "rent",
  "groceries",
  "bills",
  "education",
  "health&fitness",
  "personalcare",
  "shopping",
  "entertainment",
  "travelling",
  "others",
  "transport",
];

const budgetSchema = yup.object().shape({
  name: yup.string().required("Type is required"),
  date: yup.date().required("Date is required"),
  maxAmount: yup.string().required("Budget total is required"),
  usedAmount: yup.string().required("Budget used is required"),
});

export default function BudgetModal() {
  const { id } = useParams();
  const isUpdate = !!id;

  const dataBudgetDetails = useGetBudgetDetails();
  const budgetDetails = dataBudgetDetails?.data;

  let initialValues = {
    name: "",
    date: new Date(),
    maxAmount: 0,
    usedAmount: 0,
  };

  if (budgetDetails) {
    initialValues = {
      name: budgetDetails.name,
      date: budgetDetails.date,
      maxAmount: budgetDetails.maxAmount,
      usedAmount: budgetDetails.usedAmount,
    };
  }

  const navigate = useNavigate();
  useCloseModal();

  const { control, formState, handleSubmit, setValue, getValues, setError } =
    useForm({
      defaultValues: initialValues,
      resolver: yupResolver(budgetSchema),
    });

  const { newBudget } = useNewBudget(formState, setError);
  const { updateBudget } = useUpdateBudget();

  const [activeDate, setActiveDate] = useState(new Date());

  const dataBudgetsInActiveMonth = useGetBudgetsByDate(
    activeDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })
  );
  const budgets = dataBudgetsInActiveMonth.data ?? [];

  const remainingBudgetsInMonth = useMemo(() => {
    const remainingBudgets = [...allBudgets];

    budgets.map((budget) => {
      if (allBudgets.includes(budget?.name)) {
        remainingBudgets.splice(remainingBudgets.indexOf(budget.name), 1);
      }
    });

    return !isUpdate
      ? remainingBudgets
      : [...remainingBudgets, budgetDetails.name];
  }, [budgets]);

  const onSubmit = (formData) => {
    isUpdate
      ? updateBudget(formState.defaultValues, formData.maxAmount)
      : newBudget(formData);
  };

  return (
    <Modal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes["form-wrapper"]}
      >
        <div className={classes["form-header"]}>
          <h1>New budget</h1>
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
              disabled={isUpdate}
              calendarProps={{
                minDetail: "year",
                maxDetail: "year",
                defaultValue: formState.defaultValues.date,
              }}
              setValue={setValue}
              setActiveDate={setActiveDate}
            />
          </div>
          {isUpdate && (
            <span>
              <Error message="Can't update budget type" />
            </span>
          )}
          <div
            className={`${classes["form__field-name"]} ${
              isUpdate ? classes["overlay-disable"] : ""
            }`}
          >
            <p>Budget type</p>
            <ul className={classes["form__field-name__values"]}>
              {remainingBudgetsInMonth.map((budgetName) => (
                <OneChoiceInput
                  key={budgetName}
                  value={budgetName}
                  setValue={setValue}
                  control={control}
                  name="name"
                  isActive={getValues("name") === budgetName}
                />
              ))}
            </ul>
            <ErrorMessage
              errors={formState.errors}
              name={"name"}
              render={({ message }) => <Error message={message} />}
            />
          </div>
          <div className={classes["form__field-maxAmount"]}>
            <p>Maximum amount of budget</p>
            <RangeInput control={control} type="range" name="maxAmount" />
          </div>
          <div className={classes["form__field-usedAmount"]}>
            <p>Used amount of budget</p>
            <RangeInput
              disabled={isUpdate}
              control={control}
              type="range"
              name="usedAmount"
            />
          </div>
          <div className={classes["form__handler-buttons"]}>
            <ModalFormActions formState={formState} />
          </div>
        </div>
      </form>
    </Modal>
  );
}

function RangeInput({ type, disabled, ...props }) {
  const {
    fieldState,
    field,
    formState: { errors },
  } = useController(props);

  //console.log(defaultValues);

  return (
    <div className={classes["range-container"]}>
      <p>{field.value}</p>
      <input
        {...field}
        type={type}
        className={classes["range-input"]}
        max={2000}
        step={10}
        disabled={disabled}
      />
      <ErrorMessage
        errors={errors}
        name={field.name}
        render={({ message }) => <Error message={message} />}
      />
    </div>
  );
}
