import TimeSpanButton from "../../../components/Buttons/TimeSpanButton";
import Card from "../../../components/Utilities/card";
import DateBar from "../../../components/UI/date-bar";
import useActiveDates from "../../../hooks/useActiveDates";
import {
  useGetTransactionsByDate,
} from "../../../services/transaction-services";
import {
  getGraphMonthData,
  getGraphWeekData,
  getGraphYearData,
} from "../utils/graph-data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import useCheckMobile from "../../../hooks/useCheckMobile";
import { getCurrency } from "../../../context/user-context";
import { BiSync } from "react-icons/bi";
import { motion } from "framer-motion";
import { graphVariants } from "../utils/variants";
import { useMemo, useState } from "react";

const Graph = ({ gridDisposition }: { gridDisposition: string }) => {
  // Use state to delay start animation on first render since graph card will appear after 1.5 seconds
  const [hasRendered, setHasRendered] = useState(false);
  // Check if viewport is mobile to trigger orientation of graph
  const { isMobile } = useCheckMobile();

  const {
    updateActiveDate,
    updateActiveTimeSpan,
    activeDate,
    activeTimeSpan,
    activeDateFormatted,
    refreshDate,
  } = useActiveDates();

  const currency = getCurrency();

  const queryTransactions = useGetTransactionsByDate(
    activeDate,
    activeTimeSpan
  );
  const transactions = queryTransactions?.data ?? [];

  const isFetching = queryTransactions?.isFetching;

  const graphData = {
    Yearly: () => getGraphYearData(transactions, activeDate),
    Monthly: () => getGraphMonthData(transactions, activeDate),
    Weekly: () => getGraphWeekData(transactions, activeDate),
  }[activeTimeSpan];

  return (
    <motion.section
      variants={graphVariants}
      initial="initial"
      animate="ending"
      className={`${gridDisposition} flex flex-col gap-y-4 `}
    >
      <div className="flex items-center justify-between">
        <h3>Overview</h3>
        <div className="flex items-center gap-2 ">
          {["Yearly", "Monthly", "Weekly"].map((timeSpan) => (
            <TimeSpanButton
              key={timeSpan}
              timeSpan={timeSpan as "Yearly" | "Monthly" | "Weekly"}
              activeTimeSpan={activeTimeSpan}
              updateActiveTimeSpan={updateActiveTimeSpan}
            />
          ))}
        </div>
      </div>
      <Card classNames="flex-1 p-4 lg:overflow-hidden relative dark:bg-slate-800">
        <div className="flex items-center justify-center gap-1">
          <BiSync size={26} cursor={"pointer"} onClick={refreshDate} />
          <div className="ml-2 w-full md:w-3/4 lg:w-3/5">
            <DateBar
              updateActiveDate={updateActiveDate}
              activeDateFormatted={activeDateFormatted}
              activeDate={activeDate}
              activeTimeSpan={activeTimeSpan}
              toPrefetch="transactions"
            />
          </div>
        </div>

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
            <Tooltip />
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
      </Card>
    </motion.section>
  );
};
export default Graph;
