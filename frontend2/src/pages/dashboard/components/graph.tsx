import { RefreshCw } from "react-feather";
import TimeSpanButton from "../../../components/Buttons/TimeSpanButton";
import Card from "../../../components/Utilities/card";
import DateBar from "../../../components/UI/date-bar";
import useActiveDates from "../../../hooks/useActiveDates";
import { useGetTransactionsByDate } from "../../../services/transaction-services";
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
import { useMemo } from "react";

const Graph = ({ gridDisposition }: { gridDisposition: string }) => {
  const {
    updateActiveDate,
    updateActiveTimeSpan,
    activeDate,
    activeTimeSpan,
    activeDateFormatted,
    refreshDate,
  } = useActiveDates();

  const { isMobile } = useCheckMobile();

  const query = useGetTransactionsByDate(activeDate, activeTimeSpan);

  const transactions = useMemo(() => query?.data ?? [], [query]);
  const isFetching = query?.isFetching ?? [];
  const currency = getCurrency();

  let graphData: {
    name: string;
    income: number;
    expenses: number;
  }[];

  switch (activeTimeSpan) {
    case "Yearly": {
      graphData = getGraphYearData(transactions, activeDate);
      break;
    }
    case "Monthly": {
      graphData = getGraphMonthData(transactions, activeDate);
      break;
    }
    case "Weekly": {
      graphData = getGraphWeekData(transactions, activeDate);
      break;
    }
  }

  return (
    <section className={`${gridDisposition} flex flex-col gap-y-3`}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Summary</h3>
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
      <Card classNames="flex-1 p-4 lg:overflow-hidden relative">
        <div className="flex items-center justify-center gap-1">
          <RefreshCw
            size={18}
            color={"#929292"}
            cursor={"pointer"}
            onClick={refreshDate}
          />
          <div className="ml-2 w-full md:w-3/4 lg:w-3/5">
            <DateBar
              updateActiveDate={updateActiveDate}
              activeDateFormatted={activeDateFormatted}
            />
          </div>
        </div>

        <ResponsiveContainer width="100%" height="93%">
          <AreaChart
            data={graphData}
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
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#84cc16" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="1 1" />
            {!isMobile ? (
              <>
                <XAxis dataKey="name" dy={5} />
                <YAxis type="number" dx={-5} />
              </>
            ) : (
              <>
                <YAxis dataKey="name" type="category" dy={-5} />
                <XAxis type="number" dx={5} />
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
                  stroke="#84cc16"
                  fillOpacity={0.25}
                  fill="url(#green)"
                  unit={` ${currency}`}
                />

                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="0"
                  strokeWidth={2.5}
                  stroke="#ef4444"
                  fillOpacity={0.25}
                  fill="url(#red)"
                  unit={` ${currency}`}
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </section>
  );
};
export default Graph;
