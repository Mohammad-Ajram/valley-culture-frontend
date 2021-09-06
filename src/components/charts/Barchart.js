import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Product1",
    sold: 10,
  },
  {
    name: "Product2",
    sold: 20,
  },
  {
    name: "Product3",
    sold: 50,
  },
  {
    name: "Product4",
    sold: 6,
  },
  {
    name: "Product5",
    sold: 7,
  },
  {
    name: "Product6",
    sold: 8,
  },
  {
    name: "Product7",
    sold: 9,
  },
];

export default class Barchart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer height={600}>
        <BarChart
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
          <Bar dataKey="sold" fill="#8884d8" width={10} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
