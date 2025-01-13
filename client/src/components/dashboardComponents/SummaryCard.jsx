import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTemp } from "../../redux/userSlice"

const SummaryCard = ({ index, title, value1, value2, color, doughnutData, currentUser }) => {
    // console.log(index);
    const dispatch = useDispatch();
    
  return (
    <Link to={`/subject`} onClick={() => dispatch(setTemp(index))} >
      <div
        className={`p-6 rounded-lg shadow-md flex items-center ${color} transition duration-200 transform hover:scale-105`}
        style={{ maxWidth: "300px", minWidth: "250px" }} 
      >
        <div className="mr-6 flex-1 overflow-hidden">
          <h3 className="text-xl font-bold text-gray-300 uppercase">{title}</h3>
          <p className="text-sm mt-1 mr-10 text-white">Completed: {value1}</p>
          <p className="text-sm mt-1 text-white">Remaining: {value2}</p>
        </div>
        <div className="flex-shrink-0 w-16 h-16">
          <Doughnut
            data={doughnutData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                tooltip: { enabled: true },
                legend: { display: false },
              },
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default SummaryCard;
