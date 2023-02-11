import { endOfMonth, isFuture } from "date-fns";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ButtonRedirect from "@/components/buttons/redirectButton";
import Card from "@/components/wrapper/card";
import { getCurrency } from "@/context/userContext";
import { useGetBudgetsByDate } from "@/services/budget-services";
import { getBudgetUI } from "@/utils/getBudgetUI";
import { motion } from "framer-motion";
import { childVariants } from "../../utils/variants";
import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import PercentageText from "./percentageText";
import BudgetLegend from "./budgetLegend";

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
                <Tooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{ outline: "none" }}
                />
              </PieChart>
            </ResponsiveContainer>

            <PercentageText
              budgets={budgets}
              activeDate={activeDateFormatted}
            />

            <BudgetLegend budgets={budgets} />
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

export default BudgetsChart;

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  const currency = getCurrency();

  if (active && payload) {
    return (
      <>
        <div
          key={payload[0].payload._id}
          className="rounded-lg border-none bg-white py-2 px-4 outline-none ring ring-neutral-300 dark:bg-slate-700 dark:ring-slate-600"
        >
          <p className="font-semibold">
            {payload[0].name}: {payload[0].payload.usedAmount} {currency}
          </p>
        </div>
      </>
    );
  }
  return null;
};
