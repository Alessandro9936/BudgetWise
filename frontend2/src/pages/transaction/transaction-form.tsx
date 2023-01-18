import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { ChevronDown, ChevronRight } from "react-feather";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
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
import FormHandler from "../../components/Form/form-handler";
import FieldError from "../../components/Error/field-error";
import AmountField from "./components/amount-field";
import TransactionType from "./components/type-field";

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
    <div
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
    </div>
  );
};

const TransactionForm = () => {
  useCloseModal();
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

  const {
    handleSubmit,
    control,
    setValue,
    formState,
    setError,
    getValues,
    register,
  } = useForm<ITransactionForm>({
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

  return (
    <Modal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 p-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">New transaction</h1>
          <CloseIcon />
        </div>

        {/* Calendar */}
        <div>
          <div className="h-full rounded-md">
            <CalendarInput
              name="date"
              control={control}
              setValue={setValue}
              minDetail="year"
              disabled={isUpdate}
              setActiveDate={setActiveDate}
              defaultValue={getValues("date") ?? formState?.defaultValues?.date}
            />
          </div>
          {formState.errors.date && (
            <FieldError message={formState.errors.date.message!} />
          )}
        </div>

        {/* Transaction type */}
        <div
          className={`mb-4 flex items-center justify-between ${
            isUpdate ? "pointer-events-none" : ""
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
        </div>

        {/* Transaction amount */}
        <FieldHeader
          fieldValue={getValues("amount")}
          label="Amount"
          setActive={setActiveDropdown}
          activeDropdown={activeDropdown}
        />
        {activeDropdown === "Amount" && (
          <AmountField control={control} name="amount" disabled={isUpdate} />
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
              <ul className="flex flex-wrap gap-3 font-semibold">
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
              </ul>
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
              <ul className="flex flex-wrap gap-3 font-semibold">
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
              </ul>
            )}
            {formState.errors.state && (
              <FieldError message={formState.errors.state.message!} />
            )}
          </>
        )}

        {/* Transaction description */}
        <div>
          <p className="mb-4 font-semibold">Description</p>
          <textarea
            rows={2}
            disabled={
              isUpdate ? updateTransactionLoading : createTransactionLoading
            }
            {...register("description")}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white p-2 text-base shadow-sm placeholder:text-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        {/* Form handler */}
        <FormHandler
          isLoading={
            isUpdate ? updateTransactionLoading : createTransactionLoading
          }
          submitLabel={isUpdate ? "Update transaction" : "Create transaction"}
          isSubmitSuccessful={
            isUpdate ? updateTransactionSuccess : createTransactionSuccess
          }
        >
          <p className="font-semibold">Transaction successfully created</p>
        </FormHandler>
      </form>
    </Modal>
  );
};

export default TransactionForm;
