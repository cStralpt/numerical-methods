import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
function LineChart({ datas }) {
  const data = {
    labels: [1,2,3],
    datasets: [
      {
        label: "sales for 2020 (M)",
        lineTension: 0.4,
        radius:5,
        data: [5,2,3],
      },
    ],
  };
  return <Line data={datas} />;
}

export default LineChart;
