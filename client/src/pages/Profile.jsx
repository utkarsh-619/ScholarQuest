import React from "react";
import Axios from "axios"; // Import Axios
import SideMenu from "../components/sideMenu";
import PersonalInfo from "../components/Personal_info";
import ChangePassword from "../components/ChangePassword";
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirecting

const Profile = () => {
  const navigate = useNavigate(); // Hook to navigate after logout

  // Function to handle the logout
  const handleLogout = async () => {
    try {
      const response = await Axios.post("http://localhost:8000/api/v1/users/logout", {
        
      },{
        withCredentials: true
      });
      console.log(response.data); 
      // After logout, clear any local storage or session storage

      // Redirect to login page or homepage after successful logout
      alert("Logout successfully");
      navigate("/signin"); // Use navigate to redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error, like showing a message to the user
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
