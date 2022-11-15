import "chart.js/auto";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "",
      data: [33, 53, 25, 41, 44, 65],
      fill: true,
      backgroundColor: "rgb(255,61,87,0.2)",
      borderColor: "#FF3D57",
      borderJoinStyle: "round",
    },
    {
      label: "",
      data: [33, 25, 35, 51, 54, 36],
      fill: false,
      borderColor: "#8697A8",
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
};

export default function RevenueChart() {
  return <Line data={data} options={options}/>;
}
