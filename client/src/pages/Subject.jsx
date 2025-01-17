import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Subject = () => {
  const [chapters, setChapters] = useState([]);
  const userinfo = useSelector((state) => state.userinfo);
  const temp = useSelector((state) => state.userinfo.temp);

  // Update chapters when userinfo or temp changes
  useEffect(() => {
    const newChapters =
      userinfo.user?.courseEnrollments[0]?.subjects[temp]?.chapters || [];
    setChapters(newChapters);
  }, [userinfo, temp]);

  // const toggleDone = async (index) => {
  //   const updatedChapters = chapters.map((chapter, i) =>
  //     (i === index) ? { ...chapter, isCompleted: !chapter.isCompleted } : chapter
  //   );

  //   setChapters(updatedChapters);

  //   try {
  //     await fetch(`/api/users/subjectsData`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         id,
  //         isCompleted: updatedChapters.find((ch) => ch.id === id).isCompleted,
  //       }),
  //     });
  //   } catch (error) {
  //     console.error("Error updating chapter:", error);
  //     // Rollback the update in case of error
  //     setChapters(chapters);
  //   }
  // };

  const toggleDone = async (index) => {
    let updatedChapters;
  
    setChapters((prevChapters) => {
      updatedChapters = prevChapters.map((chapter, i) =>
        i === index ? { ...chapter, isCompleted: !chapter.isCompleted } : chapter
      );
      return updatedChapters;
    });
  
    // Get the ID of the updated chapter
    const updatedChapter = updatedChapters[index];
  
    try {
      await fetch(`/api/users/subjectsData`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: updatedChapter.id, // Get the correct ID
          isCompleted: updatedChapter.isCompleted,
        }),
      });
    } catch (error) {
      console.error("Error updating chapter:", error);
      // Rollback in case of error
      setChapters((prevChapters) => [...prevChapters]);
    }
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
