import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const userinfo = useSelector((state) => state.userinfo);
  const temp = useSelector((state) => state.userinfo.temp);
  const dispatch = useDispatch();

  useEffect(() => {
    const newAssignments =
      userinfo.user?.courseEnrollments?.[0]?.subjects[temp]?.assignments || [];
    setAssignments(newAssignments);
  }, [userinfo, temp]);

  const uploadAssignment = async (index, file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("assignmentFile", file);
  formData.append("assignmentName", assignments[index].assignmentName);
  formData.append("courseName", userinfo.user?.courseEnrollments?.[0]?.courseName);
  formData.append("subjectName", userinfo.user?.courseEnrollments?.[0]?.subjects?.[temp]?.subname);

  try {
    // Upload the assignment file to the backend
    await axios.post("http://localhost:8000/api/v1/users/uploadassignment", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" }
    });

    console.log("Assignment uploaded successfully");

    // Optionally: You could update the UI here (not changing the original assignmentFile)
    // Just log a message or notify the user that the file has been uploaded
    alert("Assignment uploaded successfully");

    // Fetch fresh data from the backend
    const userResponse = await axios.get("http://localhost:8000/api/v1/users/data", {
      withCredentials: true,
    });
    dispatch(setUser(userResponse.data.data));
  } catch (error) {
    console.error("Error uploading assignment:", error);
  }
};

  


  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 font-sans">
      <h2 className="text-2xl mb-4">Assignments</h2>
      <ul className="list-none space-y-4">
        {assignments.map((assignment, index) => (
          <li key={assignment._id} className="p-4 rounded-lg bg-gray-700 flex items-center justify-between">
            <span>{assignment.assignmentName}</span>
            <span className="text-sm text-red-400">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</span>
            <div className="flex items-center space-x-10">
              <button
                onClick={() => window.open(assignment.assignmentQuestion, "_blank")}
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
              >
                View Assignment
              </button>
              

              <input
                type="file"
                onChange={(e) => uploadAssignment(index, e.target.files[0])}
                className="hidden"
                id={`upload-${index}`}
              />
              <label htmlFor={`upload-${index}`} className="bg-green-500 px-4 py-2 rounded cursor-pointer hover:bg-green-600">Upload Assignment</label>

              <button
                onClick={() => window.open(assignment.assignmentFile, "_blank")}
                className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
              >
                View your File
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assignments;
