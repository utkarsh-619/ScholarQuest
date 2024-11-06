import React, { useState, useRef } from "react";
import axios from "axios";


const PersonaInfo = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phonenumber: "",
    address: "",
    course: "Pacific Standard Time",
  });

  const [profilePhoto, setAvatar] = useState();

  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);
    formData.append("fname", user.fname);
    formData.append("lname", user.lname);
    formData.append("phonenumber", user.phonenumber);
    formData.append("registrationNumber", user.registrationNumber);
    formData.append("course", user.course);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/details",
        formData, // send formData instead of user
        {
          withCredentials: true, // Enable cookies in request
          headers: {
            "Content-Type": "multipart/form-data", // important for file uploads
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
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
              src={profilePhoto ? URL.createObjectURL(profilePhoto) : "https://via.placeholder.com/64"}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="ml-6 mb-2 text-white font-semibold">Kushagra Kumar</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="ml-6 px-4 py-1 bg-gray-700 text-sm text-gray-300 rounded hover:bg-gray-600">
              Change profilePhoto
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-full">
                <label
                  htmlFor="fname"
                  className="block text-sm text-gray-200 mb-1"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={user.fname}
                  onChange={handleChange}
                  className="bg-gray-700 text-white text-sm rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lname"
                  className="block text-sm text-gray-200 mb-1"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  value={user.lname}
                  onChange={handleChange}
                  className="bg-gray-700 text-white text-sm rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="registrationNumber"
                className="block text-sm text-gray-200 mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={user.address}
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
                id="phonenumber"
                name="phonenumber"
                value={user.phonenumber}
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
                <option>Data structure and algorithm</option>
                <option>Operating system</option>
                <option>Database managament system</option>
                <option>Computer network</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonaInfo;
