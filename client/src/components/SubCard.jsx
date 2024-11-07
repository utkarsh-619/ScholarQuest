import React from "react";

const SubCard = (props) => {
    console.log(props)
  return (
    <div className="w-64 lg:p-4 md:p-2 bg-white rounded-lg shadow-md relative overflow-hidden">
      {/* Top Section */}
      <div className="bg-gray-800 text-white p-4 rounded-t-lg relative">
        <div className="text-lg font-semibold leading-tight">{props.subject.subname}</div>
        <div className="text-sm font-medium uppercase">{props.course}</div>
        <div className="text-xs ">Attendence : {`${props.subject.attendedClasses} / ${props.subject.totalClasses}`}</div>
        {/* Profile Image */}
        
      </div>
      
      {/* Bottom Section with Icons */}
      <div className="flex justify-around items-center mt-10 border-t pt-2">
        {/* Icon 1: Calendar */}
        <button className="text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 15h14m-7 4h7m-7 0H5m7-4v4" />
          </svg>
        </button>
        {/* Icon 2: Folder */}
        <button className="text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SubCard;
