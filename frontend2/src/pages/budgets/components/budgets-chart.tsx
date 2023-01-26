import { endOfMonth, isFuture } from "date-fns";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ButtonRedirect from "../../../components/Buttons/ButtonRedirect";
import Card from "../../../components/Utilities/card";
import { getCurrency } from "../../../context/user-context";
import { useGetBudgetsByDate } from "../../../services/budget-services";
import allBudgets from "../../../constants/all-budgets";

import { motion } from "framer-motion";

const childVariants = {
  initial: { opacity: 0, y: 20 },
  ending: { opacity: 1, y: 0, transition: { type: "tween", delay: 0.3 } },
};

interface IBudgetsChart {
  activeDate: Date;
  timeSpan: string;
  activeDateFormatted: string | number;
}

const BudgetsChart = ({
  activeDateFormatted,
  activeDate,
  timeSpan,
}: IBudgetsChart) => {
  const query = useGetBudgetsByDate(activeDate, timeSpan);
  const budgets = query?.data ?? [];
  const currency = getCurrency();

  const getBudgetView = (name: string) =>
    allBudgets.find((budget) => budget.name === name);

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

  return (
    <motion.div
      variants={childVariants}
      initial="initial"
      animate="ending"
      className="flex flex-1 flex-col"
    >
      <h3 className="mb-4 text-base font-semibold">Budgets distribution</h3>
      <Card classNames="dark:bg-slate-800 flex-1 w-full flex flex-col items-center px-6 min-h-[200px]">
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
                      fill={getBudgetView(entry.name)?.color}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className=" text-center">
              <p className="text-2xl font-bold">{percentage}%</p>
              <p className="text-lg">
                In {activeDateFormatted} you spent {totalAmounts.usedAmount}{" "}
                {currency} ({percentage}%) of your total budget (
                {totalAmounts.maxAmount} {currency})
              </p>
            </div>
            <div className="my-10 grid grid-cols-2 gap-y-5 gap-x-8">
              {budgetLabels.map((label) => {
                const budget = getBudgetView(
                  label.toLocaleLowerCase().replaceAll(" ", "")
                );

                return (
                  <div key={label} className="flex items-center gap-4">
                    <span
                      className="rounded-full p-2"
                      style={{ backgroundColor: budget?.color }}
                    />
                    <span className="font-semibold">{budget?.label}</span>
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
              styles="button-primary mt-auto mb-6 w-full"
              redirect="new"
              label="Create new budget"
            />
          )}
      </Card>
    </motion.div>
  );
};

export default BudgetsChart;
