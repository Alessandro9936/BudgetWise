import { IBudgetResponse } from "../../services/budget-services";

import budgetColors from "../../constants/all-budgets";
import { getCurrency } from "../../context/user-context";

const ProgressBar = ({ budget }: { budget: IBudgetResponse }) => {
  const currency = getCurrency();
  const percentage = Math.ceil((budget.usedAmount / budget.maxAmount) * 100);
  const { color } = budgetColors.find(
    (_budget) => _budget.name === budget.name
  )!;

  return (
    <>
      <p className="mb-2">
        <span
          className={`font-semibold ${
            budget.maxAmount >= budget.usedAmount
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {budget.maxAmount - budget.usedAmount} {currency}
        </span>{" "}
        left from {budget.maxAmount} {currency}
      </p>
      <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div style={{ width: `${percentage}%`, maxWidth: "100%" }}>
          <div
            className="w-full animate-progressBar rounded-full p-1 text-center text-xs font-semibold leading-none text-white"
            style={{ backgroundColor: color }}
          >
            {percentage}%
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
