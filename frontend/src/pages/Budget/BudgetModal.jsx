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
import { useGetBudgetsByDate, useNewBudget } from "../../utils/queryBudget";
import { Error } from "../../components/UI/Error";
import { ErrorMessage } from "@hookform/error-message";
import { ModalFormActions } from "../../components/Utilities/ModalFormActions";
import { useNavigate } from "react-router-dom";
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

const initialValues = {
  name: "",
  date: new Date(),
  maxAmount: 0,
  usedAmount: 0,
};

export default function BudgetModal() {
  const navigate = useNavigate();
  useCloseModal();
  const { control, formState, handleSubmit, setValue, getValues, setError } =
    useForm({
      defaultValues: initialValues,
      resolver: yupResolver(budgetSchema),
    });

  const { newBudget } = useNewBudget(formState, setError);
  const [activeDate, setActiveDate] = useState(new Date());

  const query = useGetBudgetsByDate(
    activeDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })
  );

  const budgets = query.data ?? [];

  const remainingBudgetsInMonth = useMemo(() => {
    const remainingBudgets = [...allBudgets];

    budgets.map((budget) => {
      if (allBudgets.includes(budget?.name)) {
        remainingBudgets.splice(remainingBudgets.indexOf(budget.name), 1);
      }
    });

    return remainingBudgets;
  }, [budgets]);

  const onSubmit = (formData) => {
    newBudget(formData);
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
              calendarProps={{ minDetail: "year", maxDetail: "year" }}
              setValue={setValue}
              setActiveDate={setActiveDate}
            />
          </div>
          <div className={classes["form__field-name"]}>
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
            <RangeInput control={control} type="range" name="usedAmount" />
          </div>
          <div className={classes["form__handler-buttons"]}>
            <ModalFormActions formState={formState} />
          </div>
        </div>
      </form>
    </Modal>
  );
}

function RangeInput({ type, ...props }) {
  const {
    fieldState,
    field,
    formState: { isSubmitting, errors },
  } = useController(props);

  return (
    <div className={classes["range-container"]}>
      <p>{field.value}</p>
      <input
        {...field}
        type={type}
        className={classes["range-input"]}
        max={2000}
        step={10}
      />
      <ErrorMessage
        errors={errors}
        name={field.name}
        render={({ message }) => <Error message={message} />}
      />
    </div>
  );
}
