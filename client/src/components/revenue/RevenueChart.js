import "chart.js/auto";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Current Week",
      data: [33, 53, 65, 41, 44, 65, 80],
      fill: true,
      backgroundColor: "rgb(255,61,87,0.2)",
      borderColor: "#FF3D57",
      borderJoinStyle: "round",
      lineTension: 0.4,
      pointRadius: 0,
    },
    {
      label: "Previous Week",
      data: [33, 25, 55, 51, 54, 36, 43],
      fill: true,
      borderColor: "#8697A8",
      backgroundColor:"rgb(133,151,168, 0.1)",
      lineTension: 0.4,
      borderDash: [10,10],
      pointRadius: 0,
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },           
  }
};

export default function RevenueChart() {
  return <Line data={data} options={options}/>;
}
