import React from "react";

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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export function Graph() {
  return (
    <section>
      <div className={classes["graph-header"]}>
        <h3>Summary</h3>
        <div className={classes["time-selectors"]}>
          <span className={classes.selector}>Yearly</span>
          <span className={classes.selector}>Monthly</span>
          <span className={classes.selector}>Weekly</span>
          <span className={classes.selector}>Daily</span>
        </div>
      </div>
      <Card>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 50,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3" horizontal={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stackId="1"
              strokeWidth={2}
              stroke="#95cba0"
              fill="#95cba0"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stackId="1"
              strokeWidth={2}
              stroke="#ee7172"
              fill="#ee7172"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </section>
  );
}
