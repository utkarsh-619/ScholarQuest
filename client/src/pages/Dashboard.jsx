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

  // Bar chart data and options
  const barChartData = {
    labels: ['2017', '2018', '2019', '2020'],
    datasets: [
      {
        label: 'Attendance',
        data: [40, 80, 30, 60], // Adjusted data to match the number of years
        backgroundColor: (context) => {
          const value = context.raw; // Get the raw value of the bar
          
          // Apply the color based on the value ranges
          if (value > 75) {
            return 'rgba(0, 255, 156, 0.6)'; // #00FF9C (Green)
          } else if (value >= 50) {
            return 'rgba(255, 235, 85, 0.6)'; // #FFEB55 (Yellow)
          } else {
            return 'rgba(238, 66, 102, 0.6)'; // #EE4266 (Red)
          }
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        borderRadius: 5,
        // Hover effect for color change and size increase
        hoverBackgroundColor: (context) => {
          const value = context.raw;
          
          if (value > 75) {
            return 'rgba(0, 255, 156, 1)'; // Brighter green
          } else if (value >= 50) {
            return 'rgba(255, 235, 85, 1)'; // Brighter yellow
          } else {
            return 'rgba(238, 66, 102, 1)'; // Brighter red
          }
        },
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        hoverBorderWidth: 3,
        hoverBorderRadius: 5,
      },
    ],
  };
  
  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Sets the maximum value on the y-axis to 100
        ticks: {
          stepSize: 10, // Defines the step size between each tick on the y-axis
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          // Custom legend labels to show attendance types
          generateLabels: function(chart) {
            return [
              {
                text: '> 75%',
                fillStyle: 'rgba(0, 255, 156, 0.6)', // Green
              },
              {
                text: '50%-70%',
                fillStyle: 'rgba(255, 235, 85, 0.6)', // Yellow
              },
              {
                text: '< 50%',
                fillStyle: 'rgba(238, 66, 102, 0.6)', // Red
              },
            ];
          },
        },
      },
      title: {
        display: true,
        text: 'Attendance',
        font: {
          size: 24,
        },
      },
    },
    // Hover settings to increase bar size on hover
    elements: {
      bar: {
        hoverRadius: 10, // Increases the radius of the bar on hover
      },
    },
  };
  
  
  
  

  return (
    <div className="flex">
      {/* Side Menu */}
      <SideMenu />

      {/* Main Dashboard Content */}
      <div className="flex-grow p-6 bg-gray-700 min-h-screen" style={{backgroundColor: "#27374D"}}> {/* Apply bg-gray-700 here */}
        {/* Header Section */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-200">Dashboard</h1>
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
          <div className="col-span-2 p-6 bg-white rounded-lg shadow-lg" style={{backgroundColor: "#fffff0"}}>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Statistics</h2>
            <Bar data={barChartData} options={barChartOptions} />
          </div>

          {/* Calendar Component */}
          <div className="p-6 bg-white rounded-lg shadow-lg" style={{backgroundColor: "#e9d8fd"}}>
            <h2 className="text-xl font-semibold mb-4 text-gray-700" style={{backgroundColor: "#e9d8fd"}}>Calendar</h2>
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
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="border-b-2 px-4 py-2 bg-gray-50 text-gray-600">Student Name</th>
                <th className="border-b-2 px-4 py-2 bg-gray-50 text-gray-600">Score</th>
                <th className="border-b-2 px-4 py-2 bg-gray-50 text-gray-600">Submitted</th>
                <th className="border-b-2 px-4 py-2 bg-gray-50 text-gray-600">Grade</th>
                <th className="border-b-2 px-4 py-2 bg-gray-50 text-gray-600">Pass/Fail</th>
              </tr>
            </thead>
            <tbody>
              {[ 
                { name: 'Glenn Maxwell', score: '80/100', submitted: '12/10/22 - 10 PM', grade: 'Excellent', status: 'Pass' },
                { name: 'Cathe Heaven', score: '70/100', submitted: '12/10/22 - 9 PM', grade: 'Average', status: 'Pass' },
                { name: 'Yeadar Gil', score: '35/100', submitted: '12/10/22 - 8 PM', grade: 'Poor', status: 'Fail' },
                { name: 'Preeth Shing', score: '80/100', submitted: '12/10/22 - 10 PM', grade: 'Excellent', status: 'Pass' },
              ].map((student, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border-b px-4 py-2">{student.name}</td>
                  <td className="border-b px-4 py-2">{student.score}</td>
                  <td className="border-b px-4 py-2">{student.submitted}</td>
                  <td className="border-b px-4 py-2">{student.grade}</td>
                  <td className={`border-b px-4 py-2 font-semibold ${student.status === 'Pass' ? 'text-green-600' : 'text-red-600'}`}>
                    {student.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
