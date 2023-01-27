import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { ChevronDown, ChevronRight } from "react-feather";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "../../components/Icons/CloseIcon";
import CustomRadio from "../../components/Input/custom-radio";
import CalendarInput from "../../components/Input/input-calendar";
import Modal from "../../components/Utilities/modal";
import { useCloseModal } from "../../hooks/useCloseWindow";
import { useGetBudgetsByDate } from "../../services/budget-services";
import {
  useCreateNewTransaction,
  useUpdateTransaction,
} from "../../services/transaction-services";
import { ITransactionForm } from "./types/types";
import {
  formInitialValues,
  TransactionSchema,
} from "./utils/validation-schema";
import budgets from "../../constants/all-budgets";
import states from "../../constants/all-states";
import FieldError from "../../components/Error/field-error";
import AmountField from "./components/amount-field";
import TransactionType from "./components/type-field";

import { motion } from "framer-motion";
import SubmitButton from "../../components/Buttons/SubmitButton";
import ButtonRedirect from "../../components/Buttons/ButtonRedirect";
import useMeasure from "react-use-measure";
import FormResponse from "../../components/Form/form-response";

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

interface IFieldHeader {
  fieldValue?: any;
  label: "Amount" | "Budget" | "State";
  setActive: React.Dispatch<
    React.SetStateAction<"Amount" | "Budget" | "State" | null>
  >;
  activeDropdown: "Amount" | "Budget" | "State" | null;
}

const FieldHeader = ({
  fieldValue,
  label,
  setActive,
  activeDropdown,
}: IFieldHeader) => {
  const isActive = activeDropdown === label;

  return (
    <motion.div
      variants={childrenVariants}
      className="flex cursor-pointer items-center justify-between"
      onClick={() => setActive((prev) => (prev === label ? null : label))}
    >
      <p className="font-semibold">{label}</p>
      <div className="flex cursor-pointer items-center gap-x-1">
        <span className="font-semibold text-neutral-400">{fieldValue}</span>
        {isActive ? (
          <ChevronDown size={18} color={"#a3a3a3"} />
        ) : (
          <ChevronRight size={18} color={"#a3a3a3"} />
        )}
      </div>
    </motion.div>
  );
};

const TransactionForm = () => {
  useCloseModal();
  const navigate = useNavigate;
  const [activeDropdown, setActiveDropdown] = useState<
    "Amount" | "Budget" | "State" | null
  >("Amount");

  const { id } = useParams();
  const isUpdate = !!id;
  const initialValues = formInitialValues();

  /*
  The selected month inside the calendar must be stored in state for the reasons:
  1. It is required to create a new transaction
  2. When transaction type is equal to 'expense', we need to get from the database 
     all the budgets that have been created in the selected month in order to serve
     them as an option. 
  */
  const [activeDate, setActiveDate] = useState(new Date());
  const queryBudgetsOnActiveDate = useGetBudgetsByDate(activeDate, "Monthly");
  const budgetsOnActiveDate = queryBudgetsOnActiveDate.data ?? [];

  const { handleSubmit, control, setValue, formState, getValues, register } =
    useForm<ITransactionForm>({
      defaultValues: initialValues,
      resolver: zodResolver(TransactionSchema),
    });

  // Mutation to create a new transaction
  const {
    createNewTransaction,
    isLoading: createTransactionLoading,
    isSuccess: createTransactionSuccess,
  } = useCreateNewTransaction();

  // Mutation to update a transaction
  const {
    updateTransaction,
    isLoading: updateTransactionLoading,
    isSuccess: updateTransactionSuccess,
  } = useUpdateTransaction();

  const activeBudget = budgetsOnActiveDate?.find(
    (budget) => budget._id === getValues("budget")
  );

  const onSubmit = (formData: ITransactionForm) =>
    isUpdate ? updateTransaction(formData) : createNewTransaction(formData);

  const isSubmitSuccessful = isUpdate
    ? updateTransactionSuccess
    : createTransactionSuccess;
  const isLoadingSubmission = isUpdate
    ? updateTransactionLoading
    : createTransactionLoading;

  return (
    <Modal>
      <motion.form
        variants={parentVariants}
        initial="initial"
        animate="ending"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            {isUpdate ? "Update transaction" : "New transaction"}
          </h1>
          <CloseIcon />
        </div>

        <>
          <motion.div variants={childrenVariants} className="h-full rounded-md">
            {/* Calendar */}
            <CalendarInput
              name="date"
              control={control}
              setValue={setValue}
              minDetail="year"
              disabled={isUpdate}
              setActiveDate={setActiveDate}
              defaultValue={getValues("date") ?? formState?.defaultValues?.date}
            />
          </motion.div>
          {formState.errors.date && (
            <FieldError message={formState.errors.date.message!} />
          )}

          {/* Transaction type */}
          <motion.div
            variants={childrenVariants}
            className={`mb-4 flex items-center justify-between ${
              isUpdate || isSubmitSuccessful ? "pointer-events-none" : ""
            }`}
          >
            <TransactionType
              activeType={getValues("type")}
              setValue={setValue}
              value={"income"}
              disabled={isUpdate && getValues("type") === "income"}
            />
            <TransactionType
              activeType={getValues("type")}
              setValue={setValue}
              value={"expense"}
              disabled={isUpdate && getValues("type") === "expense"}
            />
            {formState.errors.type && (
              <FieldError message={formState.errors.type.message!} />
            )}
          </motion.div>

          {/* Transaction amount */}
          <FieldHeader
            fieldValue={getValues("amount")}
            label="Amount"
            setActive={setActiveDropdown}
            activeDropdown={activeDropdown}
          />
          {activeDropdown === "Amount" && (
            <AmountField
              control={control}
              name="amount"
              disabled={isUpdate || isSubmitSuccessful}
            />
          )}

          {getValues("type") === "expense" && (
            <>
              {/* Transaction budget */}
              <FieldHeader
                fieldValue={activeBudget?.name}
                label="Budget"
                setActive={setActiveDropdown}
                activeDropdown={activeDropdown}
              />
              {activeDropdown === "Budget" && (
                <motion.ul
                  variants={childrenVariants}
                  className="flex flex-wrap gap-3"
                >
                  {budgetsOnActiveDate.map((budget) => (
                    <CustomRadio
                      key={budget._id}
                      setValue={setValue}
                      value={budget._id}
                      view={
                        budgets.find((_budget) => _budget.name === budget.name)!
                      }
                      name="budget"
                      disabled={isUpdate}
                      control={control}
                      isActive={getValues("budget") === budget._id}
                    />
                  ))}
                </motion.ul>
              )}
              {formState.errors.budget && (
                <FieldError message={formState.errors.budget.message!} />
              )}

              {/* Transaction state */}
              <FieldHeader
                fieldValue={getValues("state")}
                label="State"
                setActive={setActiveDropdown}
                activeDropdown={activeDropdown}
              />
              {activeDropdown === "State" && (
                <motion.ul
                  variants={childrenVariants}
                  className="flex flex-wrap gap-3 font-semibold"
                >
                  {states.map((state) => (
                    <CustomRadio
                      key={state.name}
                      setValue={setValue}
                      value={state.name}
                      view={state}
                      name="state"
                      control={control}
                      isActive={getValues("state") === state.name}
                      disabled={
                        isUpdate
                          ? updateTransactionLoading
                          : createTransactionLoading
                      }
                    />
                  ))}
                </motion.ul>
              )}
              {formState.errors.state && (
                <FieldError message={formState.errors.state.message!} />
              )}
            </>
          )}

          {/* Transaction description */}

          <motion.div variants={childrenVariants}>
            <p className="mb-4 font-semibold">Description</p>
            <textarea
              rows={2}
              disabled={isSubmitSuccessful}
              {...register("description")}
              className="input-form w-full resize-none"
            />
          </motion.div>

          {/* Form handler */}
          {!isSubmitSuccessful && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="ml-auto flex w-fit justify-end gap-x-2"
            >
              <SubmitButton
                label={isUpdate ? "Update transaction" : "Create transaction"}
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
                  ? "Transaction successfully created"
                  : "Transaction successfully updated"}
              </p>
            </FormResponse>
          )}
        </>
      </motion.form>
    </Modal>
  );
};

export default TransactionForm;
