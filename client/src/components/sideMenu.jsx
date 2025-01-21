import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { RiCopperCoinFill } from "react-icons/ri";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { setTeacherData } from "../redux/teacherSlice";

const SideMenu = () => {
  const dispatch = useDispatch();
  //   const [name, setName] = useState();
  //   const [avatar, setAvatar] = useState();
  //   const [auraPoints, setAuraPoints] = useState();
  //   const [role, setRole] = useState();

  const userinfo = useSelector((state) => state.userinfo);
  const teacherinfo = useSelector((state) => state.teacherinfo);
    console.log(teacherinfo);
    console.log(userinfo);

  const name = userinfo.user.username;
  const avatar = userinfo.user.profilePhoto;
  const auraPoints = userinfo.user.auraPoints;
  const role = userinfo?.user?.role || teacherinfo?.teacher?.role;
  const tname = teacherinfo.teacher.username;
  const tavatar = teacherinfo.teacher.profilePhoto;
  // const tauraPoints = teacherinfo.teacher.auraPoints;

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/data",
        { withCredentials: true }
      );

      dispatch(setUser(response.data.data));

      //   setName(response.data.data.username);
      //   setAvatar(response.data.data.profilePhoto);
      //   setAuraPoints(response.data.data.auraPoints);
      //   setRole(response.data.data.role);
    } catch (err) {
      console.error("Failed to fetch leaderboard data:", err);
    }
  };

  const fetchTeacherData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/teacher/data",
        { withCredentials: true }
      );
  
      dispatch(setTeacherData(response.data.data));
    } catch (err) {
      console.error("Failed to fetch teacher data:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
      await fetchTeacherData();
    };

    fetchData();
  }, [dispatch]); 


  return (
    <div className="mr-64">
      <aside className="fixed flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <NavLink to="/">
              <img className="w-16" src="/image/logo.png" alt="Logo" />
            </NavLink>
          </div>

          <div className="flex items-center">
            <RiCopperCoinFill color="yellow" size="2em" />
            <h3 className="text-white mr-2">{auraPoints}</h3>
          </div>
        </div>

        <div className="relative mt-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>

          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Search"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <NavLink
              to={role === "teacher" ? "/teacherDashboard" : "/dashboard"}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-5 transition-colors transform rounded-md ${
                  isActive
                    ? "text-gray-200 bg-gray-100 dark:bg-gray-800 font-bold"
                    : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                }`
              }
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mx-4 font-medium">Dashboard</span>
            </NavLink>

            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-5 transition-colors transform rounded-md ${
                  isActive
                    ? "text-gray-200 bg-gray-100 dark:bg-gray-800 font-bold"
                    : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                }`
              }
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mx-4 font-medium">LeaderBoard</span>
            </NavLink>

            <NavLink
              to="/assignment"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-5 transition-colors transform rounded-md ${
                  isActive
                    ? "text-gray-200 bg-gray-100 dark:bg-gray-800 font-bold"
                    : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                }`
              }
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mx-4 font-medium">Assignment</span>
            </NavLink>

            <NavLink
              to="/redeem"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-5 transition-colors transform rounded-md ${
                  isActive
                    ? "text-gray-200 bg-gray-100 dark:bg-gray-800 font-bold"
                    : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                }`
              }
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.951 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74925 18.0096 7.75218 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.951 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99038 8.74925 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75218 5.38285C8.74925 5.99038 10.0492 5.45193 10.3246 4.31731Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mx-4 font-medium">Redeem</span>
            </NavLink>

            {/* Add horizontal rule and settings link */}
            <hr className="my-6 border-gray-200 dark:border-gray-600" />

            <Link
              to="/settings"
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.4 15A1.6 1.6 0 0 1 21 16.6V18.4A1.6 1.6 0 0 1 19.4 20H4.6A1.6 1.6 0 0 1 3 18.4V16.6A1.6 1.6 0 0 1 4.6 15H19.4ZM15.2 4.4A1.6 1.6 0 0 1 16.8 6V7.8A1.6 1.6 0 0 1 15.2 9.4H8.8A1.6 1.6 0 0 1 7.2 7.8V6A1.6 1.6 0 0 1 8.8 4.4H15.2ZM9 18.5A1.5 1.5 0 1 1 9 21.5A1.5 1.5 0 0 1 9 18.5ZM15 18.5A1.5 1.5 0 1 1 15 21.5A1.5 1.5 0 0 1 15 18.5ZM9 3.5A1.5 1.5 0 1 1 9 6.5A1.5 1.5 0 0 1 9 3.5ZM15 3.5A1.5 1.5 0 1 1 15 6.5A1.5 1.5 0 0 1 15 3.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mx-4 font-medium">Settings</span>
            </Link>
          </nav>
          <Link to="/profile" className="flex items-center px-4 -mx-2">
            <img
              className="object-cover mx-2 rounded-full h-9 w-9"
              src={role==="teacher"?tavatar:avatar}
              alt="avatar"
            />
            <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
              {role==="teacher"?tname:name}
              {/* {role} */}
            </span>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default SideMenu;
