import Separator from "../../components/UI/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CustomRadio from "../../components/Input/custom-radio";
import CalendarInput from "../../components/Input/input-calendar";
import RangeInput from "../../components/Input/input-range";
import Modal from "../../components/Utilities/modal";
import { useCloseModal } from "../../hooks/useCloseWindow";
import {
  useCreateNewBudget,
  useGetBudgetDetails,
  useGetBudgetsByDate,
  useUpdateBudget,
} from "../../services/budget-services";
import budgets from "../budgets/utils/all-budgets";
import { IBudgetForm } from "./types/types";
import BudgetSchema from "./utils/validation-schema";
import FieldError from "../../components/Error/field-error";
import FormHandler from "../../components/Form/form-handler";
import CloseIcon from "../../components/Icons/CloseIcon";

// This modal has both the capability to create or update a new budget
const BudgetForm = () => {
  const { id } = useParams();
  // Set form to update if there url includes an id
  const isUpdate = !!id;
  const budgetDetailQuery = useGetBudgetDetails();
  const budgetDetail = budgetDetailQuery?.data;

  // This custom hook allow to close modal by clicking esc on keyboard
  useCloseModal();

  // Depending on the form functionality, update or create a budget, set the initial values
  let initialValues: IBudgetForm = {
    name: "",
    date: new Date(),
    usedAmount: 0,
    maxAmount: 0,
  };

  if (budgetDetail) {
    initialValues = {
      name: budgetDetail?.name,
      date: budgetDetail?.date,
      maxAmount: budgetDetail?.maxAmount,
      usedAmount: budgetDetail?.usedAmount,
    };
  }

  const [activeDate, setActiveDate] = useState(new Date());

  const { setError, handleSubmit, formState, control, setValue, getValues } =
    useForm<IBudgetForm>({
      defaultValues: initialValues,
      resolver: zodResolver(BudgetSchema),
    });

  // Get mutation to create a new budget
  const { createNewBudget, isLoading: createLoading } =
    useCreateNewBudget(setError);

  //Get mutation to update budget
  const { updateBudget, isLoading: updateLoading } = useUpdateBudget();

  const isLoading = createLoading ?? updateLoading;

  // Get already created budgets in active month
  const budgetsQuery = useGetBudgetsByDate(activeDate, "Monthly");
  const budgetsInActiveMonth = budgetsQuery?.data ?? [];

  // Compare all available budgets with created budgets and keep only the ones
  // that are still available
  const remainingBudgetsInActiveMonth = useMemo(() => {
    const remainingBudgets = [...budgets];

    budgetsInActiveMonth.map((budget) => {
      if (budgets.some((_budget) => budget.name === _budget.name)) {
        const budgetIndex = remainingBudgets.findIndex(
          (_budget) => budget.name === _budget.name
        );
        remainingBudgets.splice(budgetIndex, 1);
      }
    });

    return !isUpdate
      ? remainingBudgets
      : [
          ...remainingBudgets,
          budgets.find((_budget) => _budget.name === budgetDetail!.name),
        ];
  }, [budgetsInActiveMonth]);

  const onSubmit = (formData: IBudgetForm) => {
    isUpdate ? updateBudget(formData) : createNewBudget(formData);
  };

  return (
    <Modal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">New budget</h1>
          <CloseIcon />
        </div>
        <div className="flex-1">
          <div className="h-full rounded-md">
            <CalendarInput
              name="date"
              control={control}
              setValue={setValue}
              minDetail="year"
              maxDetail="year"
              disabled={isUpdate}
              minDate={new Date()}
              setActiveDate={setActiveDate}
              defaultValue={formState?.defaultValues?.date}
            />
          </div>
        </div>
        <Separator />
        <div className="font-semibold">
          <p>Budget type</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {remainingBudgetsInActiveMonth.map((budget) => (
              <CustomRadio
                key={budget!.name}
                setValue={setValue}
                value={budget!.name}
                label={budget!.label}
                color={budget!.color}
                name="name"
                disabled={isUpdate}
                control={control}
                isActive={getValues("name") === budget!.name}
              />
            ))}
          </ul>
        </div>
        {isUpdate && <FieldError message="Can't update budget type" />}
        {formState.errors.name && (
          <FieldError message={formState.errors.name.message!} />
        )}
        <Separator />

        <div>
          <p className="font-semibold">Maximum amount</p>
          <RangeInput name="maxAmount" control={control} />
        </div>
        <div>
          <p className="font-semibold">Used amount</p>
          <RangeInput disable={isUpdate} name="usedAmount" control={control} />
        </div>
        {formState.errors.maxAmount && (
          <FieldError message={formState.errors.maxAmount.message!} />
        )}
        <FormHandler
          isLoading={isLoading}
          submitLabel={isUpdate ? "Update budget" : "Create budget"}
          isSubmitSuccessful={formState.isSubmitSuccessful}
        />
      </form>
    </Modal>
  );
};
export default BudgetForm;
