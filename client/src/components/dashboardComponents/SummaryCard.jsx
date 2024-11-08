import React from "react";
import { Doughnut } from "react-chartjs-2";

const SummaryCard = ({ title, value, color, doughnutData }) => (
  <div className={`p-6 rounded-lg shadow-md flex items-center ${color} transition duration-200 transform hover:scale-105`}>
    <div className="mr-6">
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      <p className="text-2xl font-bold mt-1 text-white">{value}</p>
    </div>
    <div className="w-16 h-16">
      <Doughnut
        data={doughnutData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            tooltip: { enabled: true },
            legend: { display: false },
          },
        }}
      />
    </div>
  </div>
);

export default SummaryCard;
