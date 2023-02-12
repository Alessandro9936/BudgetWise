import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CalendarInput from "@/components/input/calendarInput";
import Modal from "@/components/modal/modal";
import { useCloseModal } from "@/hooks/useCloseWindow";
import {
  useCreateNewTransaction,
  useUpdateTransaction,
} from "@/services/transaction-services";
import FieldError from "@/components/error/fieldError";
import { motion } from "framer-motion";
import ModalHeader from "@/components/modal/modalHeader";
import FormHandler from "@/components/form/formHandler";

import {
  DropdownTypes,
  TransactionFormProps,
  formInitialValues,
  TransactionSchema,
  TransactionAmountField,
  TransactionTypeField,
  ToggleFieldHeader,
  ExpenseFields,
} from "@/features/transactionForm";
import {
  parentVariants,
  transitionFadeInVariants,
} from "@/utils/reusableVariants";

const TransactionForm = () => {
  useCloseModal();
  const [activeDropdown, setActiveDropdown] = useState<DropdownTypes>(null);

  const { id } = useParams();
  const isUpdate = !!id;
  const initialValues = formInitialValues();

  /*
  The selected month inside the calendar must be stored in state for following two reasons:
  1. It is required to create a new transaction
  2. When transaction type is equal to 'expense', we need to get from the database 
     all the budgets that have been created in the selected month in order to display
     them as an option. 
  */
  const [activeDate, setActiveDate] = useState(new Date());

  const methods = useForm<TransactionFormProps>({
    defaultValues: initialValues,
    resolver: zodResolver(TransactionSchema),
  });

  // Mutation to create a new transaction
  const createTransaction = useCreateNewTransaction();
  // Mutation to update a transaction
  const updateTransaction = useUpdateTransaction();

  const onSubmit = (formData: TransactionFormProps) =>
    isUpdate
      ? updateTransaction.mutate(formData)
      : createTransaction.mutate(formData);

  const isSubmitSuccessful = isUpdate
    ? updateTransaction.isSuccess
    : createTransaction.isSuccess;
  const isLoadingSubmission = isUpdate
    ? updateTransaction.isLoading
    : createTransaction.isLoading;

  return (
    <Modal>
      <FormProvider {...methods}>
        <motion.form
          variants={parentVariants}
          initial="initial"
          animate="ending"
          custom={0.15}
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-6"
        >
          <ModalHeader
            label={isUpdate ? "Update transaction" : "New transaction"}
          />

          {/* Calendar field */}
          <motion.div
            variants={transitionFadeInVariants}
            transition={{ type: "tween" }}
            className="h-full rounded-md"
          >
            <CalendarInput
              minDetail="year"
              disabled={isUpdate}
              setActiveDate={setActiveDate}
            />
          </motion.div>
          {methods.formState.errors.date?.message && (
            <FieldError message={methods.formState.errors.date.message} />
          )}

          {/* Transaction type field*/}
          <motion.div
            variants={transitionFadeInVariants}
            transition={{ type: "tween" }}
            className={`mb-4 flex items-center justify-between ${
              isUpdate || isSubmitSuccessful ? "pointer-events-none" : ""
            }`}
          >
            <TransactionTypeField
              value={"income"}
              disabled={isUpdate && methods.getValues("type") === "income"}
            />
            <TransactionTypeField
              value={"expense"}
              disabled={isUpdate && methods.getValues("type") === "expense"}
            />
            {methods.formState.errors.type?.message && (
              <FieldError message={methods.formState.errors.type.message} />
            )}
          </motion.div>

          {/* Transaction amount field*/}
          <ToggleFieldHeader
            fieldValue={methods.getValues("amount")}
            label="Amount"
            setActive={setActiveDropdown}
            activeDropdown={activeDropdown}
          />
          {activeDropdown === "Amount" && (
            <TransactionAmountField
              control={methods.control}
              name="amount"
              disabled={isUpdate || isSubmitSuccessful}
            />
          )}
          {methods.formState.errors.amount && (
            <FieldError message={methods.formState.errors.amount.message!} />
          )}

          {methods.getValues("type") === "expense" && (
            <ExpenseFields
              activeDate={activeDate}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              isUpdate={isUpdate}
              isLoadingSubmission={isLoadingSubmission}
              getValues={methods.getValues}
              errors={methods.formState.errors}
            />
          )}

          {/* Transaction description field*/}
          <motion.div
            variants={transitionFadeInVariants}
            transition={{ type: "tween" }}
          >
            <p className="mb-4 font-semibold">Description</p>
            <textarea
              rows={2}
              disabled={isSubmitSuccessful}
              {...methods.register("description")}
              className="input-form w-full resize-none"
            />
          </motion.div>

          {/* Form handler */}
          <FormHandler
            isSuccess={isSubmitSuccessful}
            isLoading={isLoadingSubmission}
            isUpdate={isUpdate}
            label="Transaction"
          />
        </motion.form>
      </FormProvider>
    </Modal>
  );
};

export default TransactionForm;
