import { BudgetResponse } from "@/services/budget-services";
import { getBudgetUI } from "@/utils/getBudgetUI";

const BudgetLegend = ({ budgets }: { budgets: BudgetResponse[] }) => {
  return (
    <div className="my-10 grid grid-cols-2 gap-y-5 gap-x-8">
      {budgets?.map((budget) => (
        <div key={budget._id} className="flex items-center gap-4">
          <span
            className="rounded-full p-2"
            style={{ backgroundColor: getBudgetUI(budget.name)?.color }}
          />
          <span className="font-semibold">
            {getBudgetUI(budget.name)?.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BudgetLegend;
