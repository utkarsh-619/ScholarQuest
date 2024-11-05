import React, { useState } from "react";

const PersonaInfo = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    regNumber: "",
    course: "Pacific Standard Time",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="flex mb-6">
      <div className="w-2/5 lg:pl-20">
        <h2 className="text-lg font-semibold text-gray-200">
          Personal Information
        </h2>
        <p className="text-sm text-gray-400">
          Use a permanent address where you can receive mail.
        </p>
      </div>

      {/* Avatar */}
      <div className="w-2/5">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-700 overflow-hidden">
            <img
              src="https://via.placeholder.com/64"
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="ml-6 mb-2 text-white font-semibold">John Doe</h3>
            <button className="ml-6 px-4 py-1 bg-gray-700 text-sm text-gray-300 rounded hover:bg-gray-600">
              Change avatar
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-full">
              <label
                htmlFor="firstName"
                className="block text-sm text-gray-200 mb-1"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="bg-gray-700 text-white text-sm rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="lastName"
                className="block text-sm text-gray-200 mb-1"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="bg-gray-700 text-white text-sm rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label
              htmlFor="regNumber"
              className="block text-sm text-gray-200 mb-1"
            >
              Registration Number
            </label>
            <input
              type="text"
              id="regNumber"
              name="regNumber"
              value={user.regNumber}
              onChange={handleChange}
              className="bg-gray-700 text-white text-sm rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm text-gray-200 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone_number"
              value={user.phone}
              onChange={handleChange}
              className="bg-gray-700 text-white text-sm rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <div>
            <label
              htmlFor="course"
              className="block text-sm text-gray-200 mb-1"
            >
              Course
            </label>
            <select
              id="course"
              name="course"
              value={user.course}
              onChange={handleChange}
              className="bg-gray-700 text-gray-400 text-sm rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Pacific Standard Time</option>
              <option>Eastern Standard Time</option>
              <option>Central Standard Time</option>
              <option>Mountain Standard Time</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonaInfo;