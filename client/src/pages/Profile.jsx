import React from "react";
import Axios from "axios"; // Import Axios
import SideMenu from "../components/sideMenu";
import PersonalInfo from "../components/Personal_info";
import ChangePassword from "../components/ChangePassword";
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirecting
import { logoutUser } from "../redux/userSlice";
import { logoutTeacher } from "../redux/teacherSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.userinfo);
  const teacherinfo = useSelector((state) => state.teacherinfo);
  console.log(teacherinfo);
  console.log(userinfo);
  
  
  // Function to handle the logout
  const handleLogout = async () => {
    const role = userinfo?.user?.role || teacherinfo?.teacher?.role;
    console.log(role);

    try {
      let apiEndpoint;
      
      if (role === "teacher") {
        apiEndpoint = "http://localhost:8000/api/v1/teacher/logout";
      } else {
        apiEndpoint = "http://localhost:8000/api/v1/users/logout";
      }

      const response = await Axios.post(apiEndpoint, {}, { withCredentials: true });
      console.log(response.data);

      // Dispatch correct logout action based on role
      if (role === "teacher") {
        dispatch(logoutTeacher()); // Clear teacher state
      } else {
        dispatch(logoutUser()); // Clear student state
      }

      alert("Logout successfully");
      navigate("/signin"); // Redirect to sign-in page

    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex">
      <SideMenu />

      <div className="bg-gray-700 text-white flex justify-center items-center min-h-screen w-full ">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
          {/* Navigation */}
          <div className="border-b border-gray-700 pb-4 mb-6 flex justify-between items-center">
            <nav className="flex space-x-16 text-gray-400 lg:ml-20">
              <a
                href="#"
                className="hover:text-white font-semibold text-sm text-white"
              >
                Account
              </a>
              <a href="#" className="hover:text-white font-semibold text-sm">
                Notifications
              </a>
            </nav>

            <div
              className="bg-red-700 p-2 rounded-xl text-sm font-semibold mr-16 cursor-pointer hover:bg-red-800"
              onClick={handleLogout} // Trigger logout on click
            >
              <button>Log Out</button>
            </div>
          </div>

          {/* Personal Information */}
          <PersonalInfo />

          <hr className="h-[1px] bg-gray-600 border-0 my-6" />

          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default Profile;
