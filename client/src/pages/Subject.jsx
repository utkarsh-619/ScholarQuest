import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Subject = () => {
  const [chapters, setChapters] = useState([]);
  const userinfo = useSelector((state) => state.userinfo);
  const temp = useSelector((state) => state.userinfo.temp);
  const dispatch = useDispatch();

  // Update chapters when userinfo or temp changes
  useEffect(() => {
    
    const newChapters =
      userinfo.user?.courseEnrollments?.[0]?.subjects[temp]?.chapters || [];
    setChapters(newChapters);
  }, [userinfo, temp]);

  

  const toggleDone = (index) => {
    setChapters((prevChapters) => {
      const updatedChapters = prevChapters.map((chapter, i) =>
        i === index ? { ...chapter, isCompleted: !chapter.isCompleted } : chapter
      );
  
      const courseName = userinfo.user?.courseEnrollments?.[0]?.courseName;
      const subjectName = userinfo.user?.courseEnrollments?.[0]?.subjects?.[temp]?.subname;
      const chapterId = updatedChapters?.[index]?._id;
      const isCompleted = updatedChapters?.[index]?.isCompleted;
  
      console.log(courseName, subjectName, chapterId, isCompleted); 
  
      if (!courseName || !subjectName || !chapterId) {
        console.error("Missing required IDs for updating chapter.");
        return prevChapters; // Prevent incorrect state update
      }
  
      // Perform API request after state update
      setTimeout(async () => {
        try {
          await axios.post("http://localhost:8000/api/v1/users/chapterUpdate", {
            courseName,
            subjectName,
            chapterId
          },{
            withCredentials: true
          });
    
          console.log("Chapter status updated successfully");

          
          try {
            const userResponse = await axios.get(
              "http://localhost:8000/api/v1/users/data",
              {
                withCredentials: true,
              }
            );
            console.log(userResponse.data.data);
            dispatch(setUser(userResponse.data.data));
            // setChapters(userResponse.data.data.username);
            // setpic(userResponse.data.data.profilePhoto);
          } catch (err) {
            console.error("Failed to fetch courses:", err);
          }
              

        } catch (error) {
          console.error("Error updating chapter:", error);
        }
      }, 0);
  
      return updatedChapters;
    });
  };
  


  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 font-sans">
      <h2 className="text-2xl mb-4">Chapters</h2>
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <div className="text-sm mb-2">Progress: completed</div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div className="bg-green-500 h-4 rounded-full"
            style={{
              width: `${
                (chapters.filter((ch) => ch.isCompleted).length /
                  chapters.length) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div>
      <ul className="list-none space-y-4">
        {chapters.map((chapter, index) => (
          <li
            key={chapter.id}
            className={`p-4 rounded-lg flex items-center justify-between ${
              chapter.isCompleted ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            <span>{chapter.name}</span>
            <label className="cursor-pointer flex items-center">
              <input
                type="checkbox"
                checked={chapter.isCompleted }
                onChange={() => toggleDone(index)}
                className="mr-2 scale-125"
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subject;
