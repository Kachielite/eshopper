import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 75
};

export default function StatsChart({color, percentage}) {
  return <Doughnut data={{
    labels: ["Current", "Target"],
    datasets: [
      {
        data: [percentage,100-percentage],
        fill: true,
        backgroundColor: [color,"rgb(133,151,168, 0.1)",],
        borderColor: [color,"rgb(133,151,168, 0.1)",],
      },
    ],
  }} options={options} />;
}