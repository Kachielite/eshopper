import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["Current", "Loss", "Target"],
  datasets: [
    {
      data: [37, 35, 28],
      fill: true,
      backgroundColor: ["#FF3D57","#FDBF5E", "#22CCE2"],
      borderColor: ["#FF3D57","#FDBF5E", "#22CCE2"],
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
  },
  cutout: 85
};

export default function ProfitCharts() {
  return <Doughnut data={data} options={options} />;
}
