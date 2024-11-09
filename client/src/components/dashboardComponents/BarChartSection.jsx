import React from "react";
import { Bar } from "react-chartjs-2";

const BarChartSection = ({ data, options }) => (
  <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4 text-gray-300">Statistics</h2>
    <Bar data={data} options={options} />
  </div>
);

export default BarChartSection;
