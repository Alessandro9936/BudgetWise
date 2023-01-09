import DeleteLink from "../../../components/Buttons/DeleteLink";
import UpdateLink from "../../../components/Buttons/UpdateLink";
import Card from "../../../components/card";
import {
  IBudget,
  useGetBudgetsByDate,
} from "../../../services/budget-services";

import budgetColors from "../utils/budgets-colors";

const ProgressBar = ({ budget }: { budget: IBudget }) => {
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
          {budget.maxAmount - budget.usedAmount} $
        </span>{" "}
        left from {budget.maxAmount}
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

const BudgetPreviews = ({
  activeDateFormatted,
  activeDate,
  timeSpan,
}: {
  activeDate: Date;
  timeSpan: string;
  activeDateFormatted: string | number;
}) => {
  const query = useGetBudgetsByDate(activeDate, timeSpan);
  const budgets = query?.data ?? [];

  const formatBudgetDate = (budgetDate: Date) => {
    return timeSpan === "Yearly"
      ? budgetDate.getFullYear()
      : `${budgetDate.toLocaleDateString(navigator.language, {
          month: "long",
          year: "numeric",
        })} `;
  };

  return (
    <div className="relative flex-1 overflow-auto">
      <h3 className="mb-3 text-base font-semibold">Budget Previews</h3>
      <ul className="grid grid-cols-autoFillBudgets gap-8 overflow-y-auto">
        {budgets.map((budget) => (
          <li key={budget._id}>
            <Card classNames="py-4 px-4">
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold">{budget.name}</p>
                {timeSpan === "Monthly" && (
                  <div className="flex items-center gap-2">
                    <UpdateLink id={budget._id} />
                    <DeleteLink id={budget._id} />
                  </div>
                )}
              </div>
              <p className="mb-4 mt-1 text-xs font-semibold text-neutral-500">
                {formatBudgetDate(budget.date)}
              </p>
              <ProgressBar budget={budget} />
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetPreviews;
