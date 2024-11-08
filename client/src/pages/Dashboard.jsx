import React from "react";
import SideMenu from "../components/SideMenu";
import Header from "../components/dashboardComponents/Header";
import SummaryCard from "../components/dashboardComponents/SummaryCard";
import BarChartSection from "../components/dashboardComponents/BarChartSection";
import CalendarSection from "../components/dashboardComponents/CalendarSection";
import DatabaseTable from "../components/dashboardComponents/DatabaseTable";

// Chart.js registration and imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [date, setDate] = React.useState(new Date());

  const doughnutData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#4F46E5", "#D97706"],
        hoverBackgroundColor: ["#6366F1", "#F59E0B"],
      },
    ],
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Attendance",
        data: [40, 80, 30, 60],
        backgroundColor: (context) => {
          const value = context.raw;
          if (value > 75) return "#4F46E5";
          else if (value >= 50) return "#14B8A6";
          else return "#D97706";
        },
        borderColor: "#9CA3AF",
        borderWidth: 2,
        borderRadius: 5,
        hoverBackgroundColor: (context) => {
          const value = context.raw;
          if (value > 75) return "#6366F1";
          else if (value >= 50) return "#2DD4BF";
          else return "#F59E0B";
        },
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          color: "#9CA3AF",
        },
      },
      x: {
        ticks: { color: "#9CA3AF" },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Attendance",
        color: "#9CA3AF",
        font: { size: 24 },
      },
    },
  };

  return (
    <div className="flex bg-gray-900 min-h-screen">
      <SideMenu />
      <div className="flex-grow p-6">
        <Header />
        <div className="grid grid-cols-4 gap-6 mb-6">
          <SummaryCard
            title="Total Students"
            value="1220"
            color="bg-purple-800 hover:bg-purple-700"
            doughnutData={doughnutData}
          />
          <SummaryCard
            title="Total Teachers"
            value="120"
            color="bg-orange-700 hover:bg-orange-600"
            doughnutData={doughnutData}
          />
          <SummaryCard
            title="Total Lectures"
            value="720"
            color="bg-green-700 hover:bg-green-600"
            doughnutData={doughnutData}
          />
          <SummaryCard
            title="Absent Today"
            value="70"
            color="bg-red-800 hover:bg-red-700"
            doughnutData={doughnutData}
          />
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2  bg-gray-800 rounded-lg shadow-lg">
            <BarChartSection data={barChartData} options={barChartOptions} />
          </div>

          <div className="p-2 bg-gray-800 rounded-lg shadow-lg">
            <CalendarSection date={date} onChange={setDate} />
          </div>
        </div>

        <DatabaseTable />
      </div>
    </div>
  );
};

export default Dashboard;
