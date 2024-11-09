import React, { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import Header from "../components/dashboardComponents/Header";
import SummaryCard from "../components/dashboardComponents/SummaryCard";
import BarChartSection from "../components/dashboardComponents/BarChartSection";
import CalendarSection from "../components/dashboardComponents/CalendarSection";
import DatabaseTable from "../components/dashboardComponents/DatabaseTable";
import axios from "axios";

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
  const [date, setDate] = useState(new Date());
  const [subjects, setSubjects] = useState([]);
  // const [attended, setAttended] = useState([]);
  // const [totalClasses, setTotalClasses] = useState([]);

  // Fetch subjects and update the state
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/data",
        { withCredentials: true }
      );

      const subjectsData = response.data.data.courseEnrollments[0]?.subjects;
      
      // Ensure the subjects exist in the response
      if (subjectsData && subjectsData.length <= 4) {
        setSubjects(subjectsData.slice(0, 4));  // Only keep the first 4 subjects
      }
      
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const subjectColors = [
    "bg-purple-500 hover:bg-purple-600",
    "bg-yellow-500 hover:bg-yellow-600",
    "bg-green-500 hover:bg-green-600",
    "bg-red-500 hover:bg-red-600",
  ];

  // Prepare the subjectsData array dynamically
  const subjectsData = subjects.map((subject, index) => ({
    title: subject.subname,
    color: subjectColors[index],
    value1: subject.attendedClasses,  // Example value, you can modify as needed
    value2: subject.totalClasses,  // Example value, you can modify as needed
  }));
  // console.log(subjects[0].totalClasses);
  
  const doughnutData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [80,20],
        backgroundColor: ["#4F46E5", "#D97706"],
        hoverBackgroundColor: ["#6366F1", "#F59E0B"],
      },
    ],
  };

  const barChartData = {
    labels: subjects.map((subject) => subject.subname),
    datasets: [
      {
        label: "Attendance",
        data: subjects.map((subject) => subject.attendedClasses || 0),
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
    <div className="flex bg-gray-800 min-h-screen">
      <SideMenu />
      <div className="flex-grow p-6">
        <Header />
        <div className="grid grid-cols-4 gap-6 mb-6">
          {subjectsData.map((subject, index) => (
            <SummaryCard
              key={index}
              title={subject.title}
              value1={subject.value1}
              value2={subject.value2}
              color={subject.color}
              doughnutData={doughnutData}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2  bg-gray-800 rounded-lg">
            <BarChartSection data={barChartData} options={barChartOptions} />
          </div>

          <div className="p-2 bg-gray-800 rounded-lg ">
            <CalendarSection date={date} onChange={setDate} />
          </div>
        </div>

        <DatabaseTable />
      </div>
    </div>
  );
};

export default Dashboard;
