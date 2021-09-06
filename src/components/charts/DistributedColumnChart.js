import React from "react";
import ReactApexChart from "react-apexcharts";

export default class DistributedColumnChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          //   data: [21, 22, 10, 28, 16, 21, 13, 30, 35, 24],
          data: props.sold,
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          //   categories: [
          //     "Product 1",
          //     "Product 2",
          //     "Product 3",
          //     "Product 4",
          //     "Product 6",
          //     "Product 7",
          //     "Product 8",
          //     "Product 9",
          //     "Product 10",
          //     "Product 11",
          //   ],
          categories: props.products,
          labels: {
            style: {
              fontSize: "12px",
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}
