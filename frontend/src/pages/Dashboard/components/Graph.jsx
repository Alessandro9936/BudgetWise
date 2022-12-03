import React from "react";
import { RefreshCw } from "react-feather";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../../../components/UI/Card";

import classes from "./Graph.module.css";

import { transactionMapped } from "../../../../data/data";

import { getDataDaily, getDataMonths, getDataWeekly } from "../utils/graphData";
import { useActiveDates } from "../hooks/useActiveDates";
import { DateBar } from "../../../components/UI/DateBar";

export function Graph() {
  const {
    updateActiveDate,
    updateActiveTimeSpan,
    refreshDate,
    activeDate,
    activeTimeSpan,
    activeDateFormatted,
  } = useActiveDates();

  const graphData = {
    Monthly: getDataMonths(transactionMapped, activeDate),
    Weekly: getDataWeekly(transactionMapped, activeDate),
    Daily: getDataDaily(transactionMapped, activeDate),
  }[activeTimeSpan];

  return (
    <section>
      <div className={classes["graph-header"]}>
        <h3>Summary</h3>
        <div className={classes["time-selectors"]}>
          {["Monthly", "Weekly", "Daily"].map((timeSpan) => (
            <span
              key={timeSpan}
              onClick={updateActiveTimeSpan}
              className={`${classes.selector} + ${
                activeTimeSpan === timeSpan ? classes.active : undefined
              }`}
            >
              {timeSpan}
            </span>
          ))}
        </div>
      </div>
      <Card>
        <div className={classes["summary-header"]}>
          <RefreshCw
            size={18}
            color={"#929292"}
            cursor={"pointer"}
            onClick={refreshDate}
          />
          <DateBar
            updateActiveDate={updateActiveDate}
            activeDate={activeDateFormatted}
          />
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={1000}
            height={400}
            data={graphData}
            margin={{
              top: 50,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="red" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ee7172" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ee7172" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#95cba0" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#95cba0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="1 1" horizontal={false} />
            <XAxis dataKey="name" dy={5} />
            <YAxis type="number" dx={-5} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              strokeWidth={2.5}
              stroke="#95cba0"
              fillOpacity={0.25}
              fill="url(#green)"
              unit=" USD"
            />

            <Area
              type="monotone"
              dataKey="expenses"
              stackId="0"
              strokeWidth={2.5}
              stroke="#ee7172"
              fillOpacity={0.25}
              fill="url(#red)"
              unit=" USD"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </section>
  );
}
