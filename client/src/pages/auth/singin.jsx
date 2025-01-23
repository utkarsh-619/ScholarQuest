import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogIn, setIsLogIn] = useState(location.pathname === "/signin");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // const [profilePhoto, setProfilePhoto] = useState(null);
  const [role, setUserType] = useState(""); // State for user type

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare data object
    const data = {
      username: formData.username,
      password: formData.password,
      role,
    };
  
    // Add email if signing up
    if (!isLogIn) {
      data.email = formData.email;
    }
  
    try {
      const baseEndPoint = role === "teacher" ? "/teacher" : "/users";
      const endpoint = isLogIn ? "/login" : "/register";
  
      // Send request with withCredentials set to true
      const response = await axios.post(
        `http://localhost:8000/api/v1${baseEndPoint}${endpoint}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Enable cookies
        }
      );

      const fetchUserData = async () => {
        try {
          const courseResponse = await axios.get(
            "http://localhost:8000/api/v1/users/data",
            {
              withCredentials: true,
            }
          );
          // setSubjects(courseResponse.data.data.courseEnrollments[0].subjects);
          // setCourse(courseResponse.data.data.courseEnrollments[0].courseName);
          console.log(courseResponse);
        } catch (err) {
          console.error("Failed to fetch courses:", err);
        }
      };

      console.log("Response:", response.data);
  
      if (response.status >= 200 && response.status < 300) {
        // Redirect upon successful sign-in or sign-up
        if(isLogIn){
          if(role === "teacher"){
            navigate("/dashboard");
          }
          else{
            navigate("/dashboard");
          }
        }
        else{
          navigate("/signin");
          setIsLogIn(true);
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          })
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };
  

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex justify-center mx-auto">
              <img className="w-32" src="/image/logoWithName.png" alt="" />
            </div>

            <div className="flex items-center justify-center mt-6">
              <Link
                to="/signin"
                className={` w-1/3 pb-4 font-medium text-center ${
                  !isLogIn
                    ? "text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
                    : "text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
                }`}
                onClick={() => {
                  setIsLogIn(true);
                }}
              >
                sign in
              </Link>

              <Link
                to="/signup"
                className={` w-1/3 pb-4 font-medium text-center ${
                  isLogIn
                    ? "text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
                    : "text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
                }`}
                onClick={() => {
                  setIsLogIn(false);
                }}
              >
                sign up
              </Link>
            </div>

            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Username"
              />
            </div>

            {!isLogIn && (
              <div className="relative flex items-center mt-6">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email address"
                />
              </div>
            )}

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
            </div>

            {!isLogIn && (
              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Confirm Password"
                />
              </div>
            )}

            {/* Checkboxes for user type */}
            {(
              <div className="mt-4 flex justify-evenly">
                <label className="inline-flex items-center mx-4">
                  <input
                    type="radio"
                    name="role"
                    value="teacher"
                    checked={role === "teacher"}
                    onChange={handleUserTypeChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    Teacher
                  </span>
                </label>

                <label className="inline-flex items-center mx-4">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === "student"}
                    onChange={handleUserTypeChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    Student
                  </span>
                </label>
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                {isLogIn ? "Sign In" : "Sign Up"}
              </button>

              <div
                className="mt-6 text-center "
                onClick={() => {
                  setIsLogIn(!isLogIn);
                }}
              >
                <Link
                  to={isLogIn ? "/signin" : "/signup"}
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  {isLogIn ? "don't have account" : "Already have an account?"}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signin;
