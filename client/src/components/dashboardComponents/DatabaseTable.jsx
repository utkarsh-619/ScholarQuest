import React from "react";

const DatabaseTable = () => {
  const data = [
    { name: "Glenn Maxwell", score: "80/100", submitted: "12/10/22 - 10 PM", grade: "Excellent", status: "Pass" },
    { name: "Cathe Heaven", score: "70/100", submitted: "12/10/22 - 9 PM", grade: "Average", status: "Pass" },
    { name: "Yeadar Gil", score: "35/100", submitted: "12/10/22 - 8 PM", grade: "Poor", status: "Fail" },
    { name: "Preeth Shing", score: "80/100", submitted: "12/10/22 - 10 PM", grade: "Excellent", status: "Pass" },
  ];

  return (
    <div className="p-6 bg-gray-700 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-300">Database</h2>
      <table className="min-w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="border-b-2 px-4 py-2 text-gray-500">Student Name</th>
            <th className="border-b-2 px-4 py-2 text-gray-500">Score</th>
            <th className="border-b-2 px-4 py-2 text-gray-500">Submitted</th>
            <th className="border-b-2 px-4 py-2 text-gray-500">Grade</th>
            <th className="border-b-2 px-4 py-2 text-gray-500">Pass/Fail</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="border-b px-4 py-2 text-gray-300">{student.name}</td>
              <td className="border-b px-4 py-2 text-gray-300">{student.score}</td>
              <td className="border-b px-4 py-2 text-gray-300">{student.submitted}</td>
              <td className="border-b px-4 py-2 text-gray-300">{student.grade}</td>
              <td className={`border-b px-4 py-2 font-semibold ${student.status === "Pass" ? "text-teal-400" : "text-red-500"}`}>
                {student.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatabaseTable;
