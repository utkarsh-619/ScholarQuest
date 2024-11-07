import React from 'react';
import { Bar } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SideMenu from '../components/SideMenu';
import { BsSearch } from 'react-icons/bs';

// Chart.js registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Summary card component for reusability
const SummaryCard = ({ title, value, color }) => (
  <div className={`p-4 rounded-lg shadow-md ${color}`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

const Dashboard = () => {
  const [date, setDate] = React.useState(new Date());

  // Bar chart data and options with only 4 data points
  const barChartData = {
    labels: ['2018', '2019', '2020', '2021'], // Reduced to 4 labels
    datasets: [
      {
        label: 'Yearly Statistics',
        data: [500, 300, 600, 450], // Reduced to 4 data points
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Yearly Performance',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="flex">
      {/* Side Menu */}
      <SideMenu />

      {/* Main Dashboard Content */}
      <div className="flex-grow p-6 bg-gray-50 min-h-screen">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="p-3 border rounded-lg w-64 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <BsSearch className="absolute left-3 top-3 text-gray-500" size={20} />
          </div>
        </header>

        {/* Summary Cards Section */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <SummaryCard title="Total Students" value="1220" color="bg-purple-100 hover:bg-purple-200" />
          <SummaryCard title="Total Teachers" value="120" color="bg-pink-100 hover:bg-pink-200" />
          <SummaryCard title="Total Courses" value="15" color="bg-blue-100 hover:bg-blue-200" />
          <SummaryCard title="Faculty Room" value="100" color="bg-yellow-100 hover:bg-yellow-200" />
        </div>

        {/* Statistics and Course Activities */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Statistics Chart */}
          <div className="col-span-2 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Statistics</h2>
            <Bar data={barChartData} options={barChartOptions} />
          </div>

          {/* Calendar Component */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Calendar</h2>
            <Calendar
              value={date}
              onChange={setDate}
              className="rounded-lg border-none shadow-inner"
            />
          </div>
        </div>

        {/* Database Table */}
        <div className="p-6 bg-white rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Database</h2>
          {/* Add table content or components here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
