import FieldError from "@/components/error/fieldError";
import { useGetBudgetsByDate } from "@/services/budget-services";
import { childrenVariants } from "../utils/variants";
import ToggleFieldHeader from "./toggleFieldHeader";

import { motion } from "framer-motion";
import RadioBudgetInput from "@/components/input/radioBudgetInput";
import RadioStateInput from "@/components/input/radioStateInput";
import { stateNames } from "@/utils/getStateUI";
import { FieldErrorsImpl, UseFormGetValues } from "react-hook-form";
import { TransactionFormProps } from "../types/types";

type ExpenseFieldsProps = {
  activeDate: Date;
  activeDropdown: "Budget" | "State" | "Amount" | null;
  setActiveDropdown: React.Dispatch<
    React.SetStateAction<"Budget" | "State" | "Amount" | null>
  >;
  isUpdate: boolean;
  isLoadingSubmission: boolean;
  getValues: UseFormGetValues<TransactionFormProps>;
  errors: Partial<FieldErrorsImpl<TransactionFormProps>>;
};

const ExpenseFields = ({
  activeDate,
  activeDropdown,
  setActiveDropdown,
  isUpdate,
  isLoadingSubmission,
  getValues,
  errors,
}: ExpenseFieldsProps) => {
  const queryBudgetsOnActiveDate = useGetBudgetsByDate(activeDate, "Monthly");
  const budgetsOnActiveDate = queryBudgetsOnActiveDate.data ?? [];

  // Get label from id value of selected budget to display in preview
  const activeBudget = budgetsOnActiveDate?.find(
    (budget) => budget._id === getValues("budget")
  );

  return (
    <>
      {/* Transaction budget field*/}
      <ToggleFieldHeader
        fieldValue={activeBudget?.name}
        label="Budget"
        setActive={setActiveDropdown}
        activeDropdown={activeDropdown}
      />
      {activeDropdown === "Budget" && (
        <motion.ul
          variants={childrenVariants}
          className="grid max-h-36 grid-cols-2 gap-3 overflow-auto px-2"
        >
          {budgetsOnActiveDate.map((budget) => (
            <RadioBudgetInput
              key={budget._id}
              value={budget._id}
              budgetName={budget.name}
              inputName="budget"
              disabled={isUpdate}
            />
          ))}
        </motion.ul>
      )}
      {errors.budget?.message && <FieldError message={errors.budget.message} />}

      {/* Transaction state field*/}
      <ToggleFieldHeader
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
          {stateNames.map((state) => (
            <RadioStateInput
              key={state}
              value={state}
              stateName={state}
              disabled={isLoadingSubmission}
            />
          ))}
        </motion.ul>
      )}
      {errors.state && <FieldError message={errors.state.message!} />}
    </>
  );
};

export default ExpenseFields;
