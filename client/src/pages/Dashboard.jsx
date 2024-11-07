import React from "react";
import SideMenu from "../components/SideMenu";
import { useEffect } from "react";
import axios from "axios";

const Dashboard = (props) => {
  // Fetch courses on component mount
  const fetchUserData = async () => {
    try {
      const courseResponse = await axios.get(
        "http://localhost:8000/api/v1/users/data",
        {
          withCredentials: true,
        }
      );
      console.log(courseResponse.data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch the courses when the component mounts
  }, []);

  return (
    <div className="flex">
      <SideMenu />
      DashBoardh
    </div>
  );
};

export default Dashboard;
