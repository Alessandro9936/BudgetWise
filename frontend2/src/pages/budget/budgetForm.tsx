import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CalendarInput from "../../components/input/calendarInput";
import RangeInput from "../../components/input/rangeInput";
import Modal from "../../components/modal/modal";
import { useCloseModal } from "../../hooks/useCloseWindow";
import {
  useCreateNewBudget,
  useUpdateBudget,
} from "../../services/budget-services";
import { IBudgetForm } from "./types/types";
import { BudgetSchema, formInitialValues } from "./utils/validation-schema";
import FieldError from "../../components/error/fieldError";
import { motion } from "framer-motion";
import FormHandler from "../../components/form/formHandler";
import BudgetsList from "./components/budgetsList";
import ModalHeader from "../../components/modal/modalHeader";
import { childrenVariants, parentVariants } from "./utils/variants";

// This form allow to both create or update a new budget
const BudgetForm = () => {
  useCloseModal();
  const { id } = useParams();
  // Set form to update if there url includes an id
  const isUpdate = !!id;

  const [activeDate, setActiveDate] = useState(new Date());

  const methods = useForm<IBudgetForm>({
    defaultValues: formInitialValues(),
    resolver: zodResolver(BudgetSchema),
  });

  // Get mutation to create a new budget
  const createBudget = useCreateNewBudget();
  // Get mutation to update budget
  const updateBudget = useUpdateBudget();

  const isSubmitSuccessful = isUpdate
    ? updateBudget.isSuccess
    : createBudget.isSuccess;
  const isLoadingSubmission = isUpdate
    ? updateBudget.isLoading
    : createBudget.isLoading;

  const onSubmit = (formData: IBudgetForm) => {
    isUpdate ? updateBudget.mutate(formData) : createBudget.mutate(formData);
  };

  return (
    <Modal>
      <FormProvider {...methods}>
        <motion.form
          variants={parentVariants}
          initial="initial"
          animate="ending"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-6"
        >
          <ModalHeader label={!isUpdate ? "New budget" : "Update budget"} />

          {/* Calendar field */}
          <motion.div variants={childrenVariants} className="h-full rounded-md">
            <CalendarInput
              minDetail="year"
              maxDetail="year"
              minDate={new Date()}
              disabled={isUpdate}
              setActiveDate={setActiveDate}
            />
          </motion.div>

          {/* Budget type field */}
          <motion.div variants={childrenVariants} className="font-semibold">
            <p>Budget type</p>
            <BudgetsList
              activeDate={activeDate}
              isUpdate={isUpdate}
              updatingBudget={methods.formState.defaultValues?.name}
            />
          </motion.div>
          {methods.formState.errors.name?.message && (
            <FieldError message={methods.formState.errors.name.message} />
          )}

          {/* maxAmount field */}
          <motion.div variants={childrenVariants}>
            <p className="font-semibold">Maximum amount</p>
            <RangeInput name="maxAmount" control={methods.control} />
          </motion.div>

          {/* usedAmount field, displayed only when updating a budget and not editable. The main purpose is to just show how much of the budget amount has already been spent */}
          {isUpdate && (
            <motion.div variants={childrenVariants}>
              <p className="font-semibold">Used amount</p>
              <RangeInput
                disable={isUpdate}
                name="usedAmount"
                control={methods.control}
              />
            </motion.div>
          )}
          {methods.formState.errors.maxAmount?.message && (
            <FieldError message={methods.formState.errors.maxAmount.message} />
          )}

          {/* Form handler */}
          <FormHandler
            isSuccess={isSubmitSuccessful}
            isLoading={isLoadingSubmission}
            isUpdate={isUpdate}
            label="Budget"
          />
        </motion.form>
      </FormProvider>
    </Modal>
  );
};
export default BudgetForm;
