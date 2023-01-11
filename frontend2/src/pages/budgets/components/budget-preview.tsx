import DeleteIcon from "../../../components/Icons/DeleteIcon";
import UpdateIcon from "../../../components/Icons/UpdateIcon";
import Card from "../../../components/card";
import { useGetBudgetsByDate } from "../../../services/budget-services";

import ProgressBar from "../../../components/progress-bar";

const BudgetPreviews = ({
  activeDate,
  timeSpan,
}: {
  activeDate: Date;
  timeSpan: string;
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
                    <UpdateIcon redirectLink={budget._id} />
                    <DeleteIcon id={budget._id} />
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
