import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const PersonaInfo = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phonenumber: "",
    address: "",
    course: "", // this will store the selected course ID
  });
  const [name, setName] = useState();
  const [pic, setpic] = useState();
  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get(
        "http://localhost:8000/api/v1/users/data",
        {
          withCredentials: true,
        }
      );
      setName(userResponse.data.data.username);
      setpic(userResponse.data.data.profilePhoto);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  const [profilePhoto, setAvatar] = useState();
  const [allCourses, setAllCourses] = useState([]); // Initialize as an empty array

  const fileInputRef = useRef();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle avatar change
  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);
    formData.append("fname", user.fname);
    formData.append("lname", user.lname);
    formData.append("phonenumber", user.phonenumber);
    formData.append("address", user.address);
    formData.append("courseId", user.course); // Sending the course ID (not name)

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/details", // Your API endpoint for submitting user details
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  // Fetch courses on component mount
  const fetchCourses = async () => {
    try {
      const courseResponse = await axios.get('http://localhost:8000/api/v1/users/courses', {
        withCredentials: true,
      });
      console.log(courseResponse.data);
      
      setAllCourses(courseResponse.data.data); // Use the data from the response
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses(); // Fetch the courses when the component mounts
    fetchUserData(); // Fetch the user when the component mounts
  }, []);

  return (
    <div className="flex mb-6">
      <div className="w-2/5 lg:pl-20">
        <h2 className="text-lg font-semibold text-gray-200">Personal Information</h2>
        <p className="text-sm text-gray-400">Use a permanent address where you can receive mail.</p>
      </div>

      <div className="w-2/5">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-700 overflow-hidden">
            <img
              src={pic}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="ml-6 mb-2 text-white font-semibold">{name}</h3>
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

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-full">
                <label htmlFor="fname" className="block text-sm text-gray-200 mb-1">First name</label>
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
                <label htmlFor="lname" className="block text-sm text-gray-200 mb-1">Last name</label>
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
              <label htmlFor="address" className="block text-sm text-gray-200 mb-1">Address</label>
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
              <label htmlFor="phonenumber" className="block text-sm text-gray-200 mb-1">Phone Number</label>
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
      <label htmlFor="course" className="block text-sm text-gray-200 mb-1">
        Course
      </label>
      {user.course ? (
        <div className="text-gray-400 text-sm">
          {/* Display the selected course name */}
          <p>Selected Course: {allCourses.find(course => course._id === user.course)?.name || "N/A"}</p>
        </div>
      ) : (
        <select
          id="course"
          name="course"
          value={user.course}
          onChange={handleChange}
          className="bg-gray-700 text-gray-400 text-sm rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {allCourses.length > 0 ? (
            allCourses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))
          ) : (
            <option>Loading courses...</option>
          )}
        </select>
      )}
    </div>
          </div>

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
