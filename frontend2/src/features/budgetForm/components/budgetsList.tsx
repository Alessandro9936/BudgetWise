import { useMemo } from "react";
import RadioBudgetInput from "@/components/input/radioBudgetInput";
import { useGetBudgetsByDate } from "@/services/budget-services";
import { budgets } from "@/utils/getBudgetUI";
import { PuffLoader } from "react-spinners";

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
  const isFetching = budgetsQuery.isFetching;

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
    <>
      <div className="flex items-center gap-2">
        <p>Budget type</p>
        {isFetching && <PuffLoader color="#6366f1" size={20} />}
      </div>
      <ul className="scrollbar-vertical mt-4 grid max-h-36 grid-cols-1 gap-3 overflow-auto px-2 midsm:grid-cols-2">
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
    </>
  );
};

export default BudgetsList;
