import React, { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import SubCard from "../components/SubCard";
import { useSelector } from "react-redux";
// import axios from "axios";

const Assignment = () => {
  //   const [subjects, setSubjects] = useState([]);
  //   const [course, setCourse] = useState(""); // New state for course name

  const userinfo = useSelector((state) => state.userinfo);
  const subjects = userinfo.user.courseEnrollments[0].subjects;
  const course = userinfo.user.courseEnrollments[0].courseName;

  //   const fetchUserData = async () => {
  //     try {
  //       const courseResponse = await axios.get(
  //         "http://localhost:8000/api/v1/users/data",
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setSubjects(courseResponse.data.data.courseEnrollments[0].subjects);
  //       setCourse(courseResponse.data.data.courseEnrollments[0].courseName);
  //     } catch (err) {
  //       console.error("Failed to fetch courses:", err);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchUserData();
  //   }, []);

  return (
    <div className="bg-gray-700 min-h-screen">
      <div className="flex">
        <SideMenu />
        <div className="mt-10 ml-5">
          <h2 className="text-white text-3xl font font-semibold mb-10">
            Assignment
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full gap-4">
            {subjects.map((data) => (
              <SubCard key={data._id} subject={data} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
