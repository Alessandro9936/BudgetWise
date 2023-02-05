import { endOfMonth, isFuture } from "date-fns";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ButtonRedirect from "../../../components/Buttons/ButtonRedirect";
import Card from "../../../components/Utilities/card";
import { getCurrency } from "../../../context/user-context";
import {
  IBudgetResponse,
  useGetBudgetsByDate,
} from "../../../services/budget-services";
import { getBudgetUI } from "../../../utils/getBudgetUI";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { childVariants } from "../utils/variants";

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
  const isFetching = query.isFetching;

  const currency = getCurrency();

  const totalAmounts = useMemo(
    () =>
      budgets.reduce(
        (acc, cur) => {
          acc.maxAmount += cur.maxAmount;
          acc.usedAmount += cur.usedAmount;
          return acc;
        },
        { usedAmount: 0, maxAmount: 0 }
      ),
    [budgets]
  );

  const percentageSpent = Math.ceil(
    (totalAmounts.usedAmount / totalAmounts.maxAmount) * 100
  );
  const percentageSpentMessage = `In ${activeDateFormatted} you spent ${totalAmounts.usedAmount} 
  ${currency} (${percentageSpent}%) of your total budget (
  ${totalAmounts.maxAmount} ${currency})`;

  return (
    <motion.div
      variants={childVariants}
      initial="initial"
      animate="ending"
      transition={{ delay: 0.3, type: "tween" }}
      className="flex flex-1 flex-col"
    >
      <h3 className="mb-4">Budgets distribution</h3>
      <Card classNames="dark:bg-slate-800 flex-1 w-full flex flex-col items-center px-6 min-h-[200px]">
        {budgets.length > 0 ? (
          <>
            <ResponsiveContainer width={"99%"} height={250}>
              <PieChart height={250}>
                {!isFetching && (
                  <Pie
                    data={budgets}
                    innerRadius={"50%"}
                    dataKey="usedAmount"
                    animationBegin={300}
                  >
                    {budgets.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getBudgetUI(entry.name)?.color}
                      />
                    ))}
                  </Pie>
                )}

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className=" text-center">
              <p className="text-2xl font-bold">{percentageSpent}%</p>
              <p className="text-lg">{percentageSpentMessage}</p>
            </div>
            <div className="my-10 grid grid-cols-2 gap-y-5 gap-x-8">
              {budgets.map((budget) => (
                <BudgetLegend key={budget._id} budget={budget} />
              ))}
            </div>
          </>
        ) : (
          <p className="pt-6 font-semibold">
            No budgets created in {activeDateFormatted}
          </p>
        )}
        {/* Allow to change or create a monthly budget only if it's in the present or future */}
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

const BudgetLegend = ({ budget }: { budget: IBudgetResponse }) => {
  const budgetUI = getBudgetUI(
    budget.name.toLocaleLowerCase().replaceAll(" ", "")
  );
  return (
    <div className="flex items-center gap-4">
      <span
        className="rounded-full p-2"
        style={{ backgroundColor: budgetUI?.color }}
      />
      <span className="font-semibold">{budgetUI?.label}</span>
    </div>
  );
};

export default BudgetsChart;
