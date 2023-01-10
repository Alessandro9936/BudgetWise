import Separator from "./../../components/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { XCircle } from "react-feather";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CustomRadio from "../../components/Input/custom-radio";
import CalendarInput from "../../components/Input/input-calendar";
import RangeInput from "../../components/Input/input-range";
import Modal from "../../components/modal";
import { useCloseModal } from "../../hooks/useCloseWindow";
import {
  useCreateNewBudget,
  useGetBudgetsByDate,
} from "../../services/budget-services";
import budgets from "../budgets/utils/budgets-colors";
import { IBudgetForm } from "./types/types";
import BudgetSchema from "./utils/validation-schema";
import FieldError from "../../components/field-error";
import FormHandler from "../../components/Form/form-handler";

const BudgetModal = () => {
  const { id } = useParams();
  const isUpdate = !!id;

  const navigate = useNavigate();
  useCloseModal();

  const [activeDate, setActiveDate] = useState(new Date());
  const [activeBudget, setActiveBudget] = useState<string | null>(null);

  const initialValues: IBudgetForm = {
    name: "",
    date: new Date(),
    usedAmount: 0,
    maxAmount: 0,
  };

  const { setError, handleSubmit, formState, control, setValue } =
    useForm<IBudgetForm>({
      defaultValues: initialValues,
      resolver: zodResolver(BudgetSchema),
    });

  const { createNewBudget, isLoading } = useCreateNewBudget(setError);
  const query = useGetBudgetsByDate(activeDate, "Monthly");

  const budgetsInActiveMonth = query?.data ?? [];

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

    return remainingBudgets;
  }, [budgetsInActiveMonth]);

  const onSubmit = (formData: IBudgetForm) => {
    createNewBudget(formData);
  };

  return (
    <Modal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">New budget</h1>
          <XCircle
            size={24}
            strokeWidth={1.5}
            cursor="pointer"
            onClick={() => navigate("..")}
          />
        </div>
        <div className="flex-1">
          <div className="h-full rounded-md">
            <CalendarInput
              name="date"
              control={control}
              setValue={setValue}
              minDetail="year"
              maxDetail="year"
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
                key={budget.name}
                setValue={setValue}
                value={budget.name}
                label={budget.label}
                color={budget.color}
                setActiveBudget={setActiveBudget}
                name="name"
                control={control}
                isActive={activeBudget === budget.name}
              />
            ))}
          </ul>
        </div>
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
          <RangeInput name="usedAmount" control={control} />
        </div>
        {formState.errors.maxAmount && (
          <FieldError message={formState.errors.maxAmount.message!} />
        )}
        <FormHandler
          isLoading={isLoading}
          submitLabel="Create budget"
          isSubmitSuccessful={formState.isSubmitSuccessful}
        />
      </form>
    </Modal>
  );
};
export default BudgetModal;
