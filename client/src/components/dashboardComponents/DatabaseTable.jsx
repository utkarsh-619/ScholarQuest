import React, {useState,useEffect} from "react";
import axios from "axios";

const DatabaseTable = () => {
    const [attendance, setAttendence] = useState('Present');
  const [subData, setSubData] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/data",
        { withCredentials: true }
      );

      setSubData(response.data.data.courseEnrollments[0].subjects);
    //   console.log(subData)
    } catch (err) {
      console.error("Failed to fetch leaderboard data:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="p-6 bg-gray-700 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-300">
        Today's Classes
      </h2>
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="border-b-2 px-4 py-2 text-gray-500">Subject Name</th>
            <th className="border-b-2 px-4 py-2 text-gray-500">Total Class</th>
            <th className="border-b-2 px-4 py-2 text-gray-500">
              Attended Classes
            </th>
            <th className="border-b-2 px-4 py-2 text-gray-500">Class Time</th>
            <th className="border-b-2 px-4 py-2 text-gray-500">
              Present/Absent
            </th>
          </tr>
        </thead>
        <tbody>
          {subData.map((subject, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="border-b px-4 py-2 text-gray-300">
                {subject.subname}
              </td>
              <td className="border-b px-4 py-2 text-gray-300">
                {subject.totalClasses}
              </td>
              <td className="border-b px-4 py-2 text-gray-300">
                {subject.attendedClasses}
              </td>
              <td className="border-b px-4 py-2 text-gray-300">
                10 PM
              </td>
              <td
                className={`border-b px-4 py-2 font-semibold ${
                  attendance == 'Present'
                    ? "text-teal-400"
                    : "text-red-500"
                }`}
              >
               <button className="cursor-pointer" onClick={() => {
                    setAttendence(() => {
                        return (attendance === 'Present' ? 'Absent' : 'Present')
                    })
               }}>
                {attendance}
               </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatabaseTable;
