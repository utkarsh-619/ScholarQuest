import React, { useEffect, useState } from "react";
import SideMenu from "../components/sideMenu";
import Header from "../components/dashboardComponents/Header";
import SummaryCard from "../components/dashboardComponents/SummaryCard";
import BarChartSection from "../components/dashboardComponents/BarChartSection";
import CalendarSection from "../components/dashboardComponents/CalendarSection";
import DatabaseTable from "../components/dashboardComponents/DatabaseTable";
import { useSelector } from "react-redux";
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
  const [currentUser, setCurrentUser] = useState();

//   const userinfo = useSelector((state) => state.userinfo);
//   const data = userinfo.user?.courseEnrollments[0]?.subjects || [];

//   if (data && data.length <= 4) {
//     setSubjects(data.slice(0, 4)); // Only keep the first 4 subjects
//     setCurrentUser(data.user._id)
//   }

//   Fetch subjects and update the state
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/data",
        { withCredentials: true }
      );

      const subjectsData = response.data.data.courseEnrollments[0]?.subjects;
      

      // Ensure the subjects exist in the response
      if (subjectsData && subjectsData.length <= 4) {
        setSubjects(subjectsData.slice(0, 4)); // Only keep the first 4 subjects
        setCurrentUser(response.data.data._id)
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
  // let completedCount, remainingCount;
  // Prepare the subjectsData array dynamically
  const subjectsData = subjects.map((subject, index) => {
    const chapters = subject.chapters || []; // Array of chapters, each with an `isCompleted` property
  
    // Count `true` and `false` values in `isCompleted`
    let completedCount = 0;
    let remainingCount = 0;
  
    chapters.forEach((chapter) => {
      if (chapter.isCompleted) {
        completedCount++;
      } else {
        remainingCount++;
      }
    });
  
    // Create the doughnut chart data
    const doughnutData = {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [completedCount, remainingCount],
          backgroundColor: ["#D97706", "#4F46E5"], // Orange for completed, blue for remaining
          hoverBackgroundColor: ["#F59E0B", "#6366F1"], // Hover colors
        },
      ],
    };
  
    return {
      title: subject.subname,
      color: subjectColors[index],
      value1: completedCount, // Display count of completed chapters
      value2: remainingCount, // Display count of remaining chapters
      _id: subject._id,
      doughnutData,
    };
  });
  
  


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
              index = {index}
              title={subject.title}
              value1={subject.value1}
              value2={subject.value2}
              color={subject.color}
              currentUser = {currentUser}
              doughnutData={subject.doughnutData} // Pass the doughnut data
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 bg-gray-800 rounded-lg">
            <BarChartSection data={barChartData} options={barChartOptions} />
          </div>

          <div className="p-2 bg-gray-800 rounded-lg">
            <CalendarSection date={date} onChange={setDate} />
          </div>
        </div>

        <DatabaseTable />
      </div>
    </div>
  );
};

export default Dashboard;
