import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { ChevronDown, ChevronRight } from "react-feather";
import { Control, useController, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CloseIcon from "../../components/Icons/CloseIcon";
import CustomRadio from "../../components/Input/custom-radio";
import CalendarInput from "../../components/Input/input-calendar";
import Modal from "../../components/Utilities/modal";
import { getCurrency } from "../../context/user-context";
import { useCloseModal } from "../../hooks/useCloseWindow";
import { useGetBudgetsByDate } from "../../services/budget-services";
import {
  useCreateNewTransaction,
  useGetTransactionDetail,
} from "../../services/transaction-services";
import { ITransactionForm } from "./types/types";
import TransactionSchema from "./utils/validation-schema";
import budgets from "../../constants/all-budgets";
import states from "../../constants/all-states";
import FormHandler from "../../components/Form/form-handler";
import FieldError from "../../components/Error/field-error";
const TransactionForm = () => {
  const { id } = useParams();

  const isUpdate = !!id;
  const queryTransactionDetail = useGetTransactionDetail();
  const transactionDetail = queryTransactionDetail?.data;

  useCloseModal();

  let initialValues: ITransactionForm = {
    type: "income",
    amount: 0,
    date: new Date(),
    description: "",
  };

  if (transactionDetail) {
    initialValues = {
      type: transactionDetail.type,
      amount: transactionDetail.amount,
      budget: transactionDetail.budget?._id,
      state: transactionDetail.state,
      date: transactionDetail.date,
      description: transactionDetail?.description ?? "",
    };
  }

  const [activeDate, setActiveDate] = useState(new Date());

  const queryBudgetsOnActiveDate = useGetBudgetsByDate(activeDate, "Monthly");

  const budgetsOnActiveDate = queryBudgetsOnActiveDate.data ?? [];

  // Transaction type handler
  const [transactionType, setTranctionType] = useState<"income" | "expense">(
    transactionDetail?.type ?? "income"
  );
  const [activeDropdown, setActiveDropdown] = useState<
    "Amount" | "Budget" | "State" | null
  >("Amount");

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

  const { createNewTransaction, isLoading, isError, isSuccess } =
    useCreateNewTransaction(setError);

  const onTransactionTypeChange = useCallback((value: "income" | "expense") => {
    setTranctionType(value);
    setValue("type", value, { shouldValidate: true });
  }, []);

  const activeBudget = budgetsOnActiveDate?.find(
    (budget) => budget._id === getValues("budget")
  );

  const onSubmit = (formData: ITransactionForm) =>
    createNewTransaction(formData);

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
        <div className="flex-1">
          <div className="h-full rounded-md">
            <CalendarInput
              name="date"
              control={control}
              setValue={setValue}
              minDetail="year"
              disabled={isUpdate}
              minDate={new Date()}
              setActiveDate={setActiveDate}
              defaultValue={getValues("date") ?? formState?.defaultValues?.date}
            />
          </div>
          {formState.errors.date && (
            <FieldError message={formState.errors.date.message!} />
          )}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <TransactionType
            activeType={transactionType}
            setActiveType={onTransactionTypeChange}
            value={"income"}
          />
          <TransactionType
            activeType={transactionType}
            setActiveType={onTransactionTypeChange}
            value={"expense"}
          />
          {formState.errors.type && (
            <FieldError message={formState.errors.type.message!} />
          )}
        </div>
        <FieldHeader
          fieldValue={getValues("amount")}
          label="Amount"
          setActive={setActiveDropdown}
          activeDropdown={activeDropdown}
        />
        {activeDropdown === "Amount" && (
          <AmountField control={control} name="amount" disabled={isLoading} />
        )}
        {transactionType === "expense" && (
          <>
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
                    disabled={isUpdate}
                    control={control}
                    isActive={getValues("state") === state.name}
                  />
                ))}
              </ul>
            )}
            {formState.errors.state && (
              <FieldError message={formState.errors.state.message!} />
            )}
          </>
        )}
        <div>
          <p className="mb-4 font-semibold">Description</p>
          <textarea
            rows={2}
            disabled={isLoading}
            {...register("description")}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white p-2 text-base shadow-sm placeholder:text-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>
        <FormHandler
          isLoading={isLoading}
          submitLabel={isUpdate ? "Update transaction" : "Create transaction"}
          isSubmitSuccessful={isSuccess}
          isSubmitError={isError}
        />
      </form>
    </Modal>
  );
};

interface ITransactionType {
  activeType: "income" | "expense";
  setActiveType: (value: "income" | "expense") => void;
  value: "income" | "expense";
}
const TransactionType = ({
  activeType,
  setActiveType,
  value,
}: ITransactionType) => {
  const isActive = activeType === value;
  return (
    <p
      className={`cursor-pointer rounded-lg px-2 py-1 text-lg ${
        isActive ? "bg-purple-500 font-semibold text-white transition-all" : ""
      }`}
      onClick={() => setActiveType(value)}
    >
      {value[0].toUpperCase() + value.slice(1)}
    </p>
  );
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

const AmountField = ({
  control,
  name,
  disabled,
}: {
  control: Control<ITransactionForm>;
  name: "amount";
  disabled: boolean;
}) => {
  const { field, formState } = useController({ name, control });

  const currency = getCurrency();
  const currencySymbol =
    currency === "EUR"
      ? "€"
      : currency === "USD"
      ? "$"
      : currency === "GBP"
      ? "£"
      : "";

  return (
    <>
      <div className="rounder-lg relative shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-sm text-neutral-400">{currencySymbol}</span>
        </div>
        <input
          disabled={disabled}
          type="number"
          placeholder="0.00"
          {...field}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-7 text-base shadow-sm placeholder:text-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
        <div className="absolute inset-y-0 right-0 z-10 flex cursor-pointer items-center rounded-r-lg  border border-gray-300 bg-white px-2">
          <span className="mr-2 text-sm text-gray-500">{currency}</span>
        </div>
      </div>
      {formState.errors.amount && (
        <FieldError message={formState.errors.amount.message!} />
      )}
    </>
  );
};

export default TransactionForm;
