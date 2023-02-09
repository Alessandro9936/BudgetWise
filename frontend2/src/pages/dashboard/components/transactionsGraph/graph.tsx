import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { getCurrency } from "../../../../context/userContext";
import useCheckMobile from "../../../../hooks/useCheckMobile";
import { TransactionResponse } from "../../../../services/transaction-services";
import { TimeSpanType } from "../../../../types/timeSpanType";
import {
  getGraphMonthData,
  getGraphWeekData,
  getGraphYearData,
} from "../../utils/graph-data";

type GraphProps = {
  transactions: TransactionResponse[];
  isFetching: boolean;
  activeDate: Date;
  activeTimeSpan: TimeSpanType;
};

const Graph = ({
  transactions,
  isFetching,
  activeDate,
  activeTimeSpan,
}: GraphProps) => {
  const { isMobile } = useCheckMobile();
  const currency = getCurrency();

  // Use state to delay start animation on first render since graph card will appear after 1.5 seconds
  const [hasRendered, setHasRendered] = useState(false);

  const graphData = {
    Yearly: () => getGraphYearData(transactions, activeDate),
    Monthly: () => getGraphMonthData(transactions, activeDate),
    Weekly: () => getGraphWeekData(transactions, activeDate),
  }[activeTimeSpan];

  return (
    <ResponsiveContainer width="99%" height="93%">
      <AreaChart
        data={graphData()}
        margin={{
          top: 30,
          right: 30,
          left: 0,
          bottom: 0,
        }}
        layout={isMobile ? "vertical" : "horizontal"}
      >
        <defs>
          <linearGradient id="red" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4ade80" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="1 1" />
        {!isMobile ? (
          <>
            <XAxis
              dataKey="name"
              dy={5}
              tick={{
                fill: "#a3a3a3",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
              tickLine={{ stroke: "#a3a3a3", strokeWidth: 1 }}
            />
            <YAxis
              type="number"
              dx={-5}
              tick={{
                fill: "#a3a3a3",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
              tickLine={{ stroke: "#a3a3a3", strokeWidth: 1 }}
              tickFormatter={(value) => (value === 0 ? "" : value)}
              tickCount={6}
            />
          </>
        ) : (
          <>
            <YAxis
              dataKey="name"
              type="category"
              dy={-5}
              tick={{
                fill: "#a3a3a3",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
              tickLine={{ stroke: "#a3a3a3", strokeWidth: 1 }}
            />
            <XAxis
              type="number"
              dx={5}
              tick={{
                fill: "#a3a3a3",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
              tickLine={{ stroke: "#a3a3a3", strokeWidth: 1 }}
              tickFormatter={(value) => (value === 0 ? "" : value)}
              tickCount={6}
            />
          </>
        )}
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          content={<CustomTooltip />}
        />
        {!isFetching && (
          <>
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              strokeWidth={2.5}
              stroke="#4ade80"
              fillOpacity={0.25}
              fill="url(#green)"
              unit={` ${currency}`}
              animationBegin={!hasRendered ? 1250 : 0}
              onAnimationEnd={() => setHasRendered(true)}
            />

            <Area
              type="monotone"
              dataKey="expenses"
              stackId="0"
              strokeWidth={2.5}
              stroke="#f87171"
              fillOpacity={0.25}
              fill="url(#red)"
              unit={` ${currency}`}
              animationBegin={!hasRendered ? 1250 : 0}
            />
          </>
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  const currency = getCurrency();

  if (active && payload) {
    return (
      <div className="rounded-lg bg-white py-2 px-4 font-semibold ring ring-neutral-300 dark:bg-slate-700 dark:ring-slate-500">
        <p className="mb-1">{payload[0].payload.name}</p>
        <p className="text-green-400">
          Income: {payload[0].payload.income} {currency}
        </p>
        <p className="text-red-400">
          Expenses: {payload[0].payload.expenses} {currency}
        </p>
      </div>
    );
  }
  return null;
};

export default Graph;
