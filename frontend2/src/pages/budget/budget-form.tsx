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
import budgets from "../../constants/all-budgets";
import { IBudgetForm } from "./types/types";
import BudgetSchema from "./utils/validation-schema";
import FieldError from "../../components/Error/field-error";

import { motion } from "framer-motion";
import SubmitButton from "../../components/Buttons/SubmitButton";
import ButtonRedirect from "../../components/Buttons/ButtonRedirect";
import FormResponse from "../../components/Form/form-response";
import CloseIcon from "../../components/Icons/CloseIcon";

const parentVariants = {
  initial: { opacity: 0 },
  ending: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.25,
      staggerChildren: 0.15,
    },
  },
};

const childrenVariants = {
  initial: { opacity: 0, y: 20 },
  ending: { opacity: 1, y: 0, transition: { type: "tween" } },
};

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

  const { handleSubmit, formState, control, setValue, getValues } =
    useForm<IBudgetForm>({
      defaultValues: initialValues,
      resolver: zodResolver(BudgetSchema),
    });

  // Get mutation to create a new budget
  const {
    createNewBudget,
    isLoading: createBudgetLoading,
    isSuccess: createBudgetSuccess,
  } = useCreateNewBudget();

  // Get mutation to update budget
  const {
    updateBudget,
    isLoading: updateBudgetLoading,
    isSuccess: updateBudgetSuccess,
  } = useUpdateBudget();

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
          budgets.find((_budget) => _budget.name === budgetDetail?.name),
        ];
  }, [budgetsInActiveMonth]);

  const onSubmit = (formData: IBudgetForm) => {
    isUpdate ? updateBudget(formData) : createNewBudget(formData);
  };

  const isSubmitSuccessful = isUpdate
    ? updateBudgetSuccess
    : createBudgetSuccess;
  const isLoadingSubmission = isUpdate
    ? updateBudgetLoading
    : createBudgetLoading;

  return (
    <Modal>
      <motion.form
        variants={parentVariants}
        initial="initial"
        animate="ending"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-6"
      >
        <motion.div
          variants={childrenVariants}
          className="flex items-center justify-between"
        >
          <h1 className="text-2xl font-semibold">
            {!isUpdate ? "New budget" : "Update budget"}
          </h1>
          <CloseIcon />
        </motion.div>

        <motion.div variants={childrenVariants} className="h-full rounded-md">
          <CalendarInput
            name="date"
            control={control}
            setValue={setValue}
            minDetail="year"
            maxDetail="year"
            disabled={isUpdate}
            minDate={new Date()}
            setActiveDate={setActiveDate}
            defaultValue={getValues("date") ?? formState?.defaultValues?.date}
          />
        </motion.div>

        <motion.div variants={childrenVariants} className="font-semibold">
          <p>Budget type</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {remainingBudgetsInActiveMonth?.map((budget) => (
              <CustomRadio
                key={budget!.name}
                setValue={setValue}
                value={budget!.name}
                view={budget!}
                name="name"
                disabled={isUpdate}
                control={control}
                isActive={getValues("name") === budget!.name}
              />
            ))}
          </ul>
        </motion.div>
        {formState.errors.name && (
          <FieldError message={formState.errors.name.message!} />
        )}

        <motion.div variants={childrenVariants}>
          <p className="font-semibold">Maximum amount</p>
          <RangeInput name="maxAmount" control={control} />
        </motion.div>
        {isUpdate && (
          <motion.div variants={childrenVariants}>
            <p className="font-semibold">Used amount</p>
            <RangeInput
              disable={isUpdate}
              name="usedAmount"
              control={control}
            />
          </motion.div>
        )}
        {formState.errors.maxAmount && (
          <FieldError message={formState.errors.maxAmount.message!} />
        )}

        {!isSubmitSuccessful && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="ml-auto flex w-fit justify-end gap-x-2"
          >
            <SubmitButton
              label={isUpdate ? "Update budget" : "Create budget"}
              isLoading={isLoadingSubmission}
            />
            <ButtonRedirect
              redirect=".."
              styles="px-6 button-secondary"
              label="Go back"
            />
          </motion.div>
        )}
        {isSubmitSuccessful && !isLoadingSubmission && (
          <FormResponse>
            <p className="font-semibold dark:text-slate-800">
              {!isUpdate
                ? "Budget successfully created"
                : "Budget successfully updated"}
            </p>
          </FormResponse>
        )}
      </motion.form>
    </Modal>
  );
};
export default BudgetForm;
