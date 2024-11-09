import React from "react";
import SideMenu from "../components/SideMenu";
import PersonalInfo from "../components/Personal_info";
import ChangePassword from "../components/ChangePassword";

const Profile = () => {

    


  return (
    <div className="flex">
      <SideMenu />

      <div className="bg-gray-700 text-white flex justify-center items-center min-h-screen w-full ">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg  w-full">
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

            <div className="bg-red-700 p-2 rounded-xl text-sm font-semibold mr-16 cursor-pointer hover:bg-red-800">
                <button>
                    Log Out
                </button>
            </div>
          </div>

          {/* Personal Information */}
          <PersonalInfo />

          <hr className="h-[1px] bg-gray-600 border-0 my-6" />

          <ChangePassword/>

          
        </div>
      </div>
    </div>
  );
};

export default Profile;
