import React from "react";
import ReactApexChart from "react-apexcharts";

const getMonth = (month) => {
    switch(month) {
        case 1:
            return "Jan";
        case 2:
            return "Feb";
        case 3:
            return "Mar"
            case 4:
            return "Apr"
            case 5:
            return "May"
            case 6:
            return "Jun"
            case 7:
            return "Jul"
            case 8:
            return "Aug"
            case 9:
            return "Sep"
            case 10:
            return "Oct"
            case 11:
            return "Nov"
            case 12:
            return "Dec"
            default:
                return null
    }
}

export default class AreaChartSpline extends React.Component {
  constructor(props) {
    super(props);

    const month = getMonth(new Date().getMonth() + 1);
    let time=[];

    for(let i=0;i<props.areaData.length;i++) {
        time.push(month + " " + (i+1))
    }

    this.state = {
      series: [
        {
          name: "Avg. Sales",
        //   data: [300, 150, 220, 105, 420, 300],
        data:props.areaData,
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
        //   categories: [
        //     "Januray 5",
        //     "Januray 10",
        //     "Januray 15",
        //     "Januray 20",
        //     "Januray 25",
        //     "Januray 30",
        //   ],
        categories:time,
        },
        // tooltip: {
        //   x: {
        //     format: "dd/MM/yy HH:mm",
        //   },
        // },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={350}
        />
      </div>
    );
  }
}
