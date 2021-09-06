import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan1",
    amt: 0,
  },
  {
    name: "Jan5",
    amt: 2000,
  },
  {
    name: "Jan10",
    amt: 5000,
  },
  {
    name: "Jan15",
    amt: 9000,
  },
  {
    name: "Jan20",
    amt: 12000,
  },
  {
    name: "Jan25",
    amt: 13000,
  },
  {
    name: "Jan30",
    amt: 14000,
  },
];

export default class LineChartSales extends PureComponent {
  render() {
    return (
      <ResponsiveContainer height={600}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amt"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
