import { endOfMonth, isFuture } from "date-fns";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ButtonRedirect from "../../../components/Buttons/ButtonRedirect";
import Card from "../../../components/Utilities/card";
import { getCurrency } from "../../../context/user-context";
import { useGetBudgetsByDate } from "../../../services/budget-services";
import budgetColors from "../utils/all-budgets";

const BudgetsChart = ({
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
  const currency = getCurrency();

  const budgetColor = (name: string): string | undefined => {
    const curBudget = budgetColors.find((budget) => budget.name === name);
    if (curBudget) {
      return curBudget.color;
    }
  };
  const budgetLabels = budgets.map((budget) => budget.name);

  const totalAmounts = budgets.reduce(
    (acc, cur) => {
      acc.maxAmount += cur.maxAmount;
      acc.usedAmount += cur.usedAmount;
      return acc;
    },
    { usedAmount: 0, maxAmount: 0 }
  );

  const percentage = Math.ceil(
    (totalAmounts.usedAmount / totalAmounts.maxAmount) * 100
  );
  const percentageMessageDetails = `In ${activeDateFormatted} you spent ${totalAmounts.usedAmount} ${currency} (
    ${percentage}%) of your total budget (${totalAmounts.maxAmount} ${currency})`;

  return (
    <div className="flex flex-1 flex-col">
      <h3 className="mb-3 text-base font-semibold">Budgets distribution</h3>
      <Card classNames="flex-1 w-full flex flex-col items-center px-6 min-h-[200px]">
        {budgets.length > 0 ? (
          <>
            <ResponsiveContainer width={"99%"} height={250}>
              <PieChart height={250}>
                <Pie
                  data={budgets}
                  innerRadius={"50%"}
                  outerRadius={"70%"}
                  paddingAngle={2}
                  dataKey="usedAmount"
                >
                  {budgets.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={budgetColor(entry.name)}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className=" text-center">
              <p className="text-2xl font-bold">{percentage}%</p>
              <p className="text-lg">{percentageMessageDetails}</p>
            </div>
            <div className="my-10 grid grid-cols-2 gap-y-5 gap-x-8">
              {budgetLabels.map((label) => {
                const color = budgetColor(
                  label.toLocaleLowerCase().replaceAll(" ", "")
                );

                return (
                  <div key={label} className="flex items-center gap-4">
                    <span
                      className="rounded-full p-2"
                      style={{ backgroundColor: color }}
                    ></span>
                    <span className="font-semibold">{label}</span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className="pt-6">No budgets created in {activeDateFormatted}</p>
        )}
        {timeSpan === "Monthly" &&
          isFuture(new Date(endOfMonth(activeDate))) && (
            <ButtonRedirect
              styles="w-full mx-6 mt-auto mb-6 bg-slate-900 text-white hover:bg-purple-500"
              redirect="new"
              label="Create new budget"
            />
          )}
      </Card>
    </div>
  );
};

export default BudgetsChart;
