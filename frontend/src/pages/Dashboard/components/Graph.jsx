import {
  addMonths,
  addWeeks,
  addYears,
  startOfWeek,
  startOfYear,
  subWeeks,
  subYears,
  subMonths,
} from "date-fns";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw } from "react-feather";

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
import { endOfWeek } from "date-fns/esm";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDateString = (timeSpan, activeDate) => {
  const year = activeDate.getFullYear();
  const month = monthNames[activeDate.getMonth()];
  const week = {
    start: startOfWeek(activeDate, { weekStartsOn: 1 }),
    end: endOfWeek(activeDate, { weekStartsOn: 1 }),
  };

  const formatString = {
    Monthly: year,
    Weekly: `${month} ${year}`,
    Daily: `${week.start.toLocaleDateString("en-GB", {
      dateStyle: "long",
    })} - ${week.end.toLocaleDateString("en-GB", {
      dateStyle: "long",
    })} `,
  };

  return formatString[timeSpan];
};

export function Graph() {
  const [activeTimeSpan, setActiveTimeSpan] = useState("Monthly");
  const [activeDate, setActiveDate] = useState(new Date());

  const graphData = {
    Monthly: getDataMonths(transactionMapped, activeDate, monthNames),
    Weekly: getDataWeekly(transactionMapped, activeDate),
    Daily: getDataDaily(transactionMapped, activeDate),
  }[activeTimeSpan];

  const updateActiveDate = (action) => {
    switch (activeTimeSpan) {
      case "Monthly":
        {
          setActiveDate((prev) =>
            action === "add"
              ? addYears(startOfYear(prev), 1)
              : subYears(startOfYear(prev), 1)
          );
        }
        break;
      case "Weekly":
        {
          setActiveDate((prev) =>
            action === "add" ? addMonths(prev, 1) : subMonths(prev, 1)
          );
        }
        break;
      case "Daily": {
        setActiveDate((prev) =>
          action === "add"
            ? addWeeks(startOfWeek(prev, { weekStartsOn: 1 }), 1)
            : subWeeks(startOfWeek(prev, { weekStartsOn: 1 }), 1)
        );
      }
    }
  };

  const updateActiveTimeSpan = (e) => {
    setActiveTimeSpan(e.target.textContent);
  };

  const refreshDate = () => {
    setActiveDate(new Date());
  };

  const formatActiveValue = formatDateString(activeTimeSpan, activeDate);

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
          <div className={classes["value-container"]}>
            <ChevronLeft
              size={20}
              color={"white"}
              strokeWidth={3}
              onClick={() => updateActiveDate("sub")}
            />
            <p>{formatActiveValue}</p>
            <ChevronRight
              size={20}
              color={"white"}
              strokeWidth={3}
              onClick={() => updateActiveDate("add")}
            />
          </div>
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
