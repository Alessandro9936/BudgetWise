import { useMemo } from "react";
import RadioBudgetInput from "@/components/input/radioBudgetInput";
import { useGetBudgetsByDate } from "@/services/budget-services";
import { budgets } from "@/utils/getBudgetUI";

type BudgetsListProps = {
  activeDate: Date;
  isUpdate: boolean;
  updatingBudget?: string;
};

const BudgetsList = ({
  activeDate,
  isUpdate,
  updatingBudget,
}: BudgetsListProps) => {
  // Get already created budgets in active month
  const budgetsQuery = useGetBudgetsByDate(activeDate, "Monthly");
  const budgetsInActiveMonth = budgetsQuery?.data ?? [];

  // Compare all budgets with created budgets and keep only the ones that are still available to create
  const remainingBudgetsInActiveMonth = useMemo(() => {
    const allBudgetsNames = budgets.map((budget) => budget.name);
    const activeBudgetNames = budgetsInActiveMonth.map((budget) => budget.name);
    const combinedArray = allBudgetsNames.concat(activeBudgetNames);

    // Filter budget names that appear only once in the combined array, which means that can still be created
    const remainingBudgets = combinedArray.filter(
      (item, index) =>
        combinedArray.indexOf(item) === index &&
        combinedArray.lastIndexOf(item) === index
    );

    // return also active budget of transaction to display if form is updating
    return isUpdate && updatingBudget
      ? remainingBudgets.concat(updatingBudget)
      : remainingBudgets;
  }, [budgetsInActiveMonth]);

  return (
    <ul className="mt-4 grid max-h-36 grid-cols-2 gap-3 overflow-auto px-2">
      {remainingBudgetsInActiveMonth.map((budget) => (
        <RadioBudgetInput
          key={budget}
          value={budget}
          budgetName={budget}
          inputName="name"
          disabled={isUpdate}
        />
      ))}
    </ul>
  );
};

export default BudgetsList;
