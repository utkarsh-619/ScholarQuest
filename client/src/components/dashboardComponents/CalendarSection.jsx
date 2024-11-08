import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarDarkTheme.css"; // Import the dark theme CSS

const CalendarSection = ({ date, onChange }) => (
  <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4 text-gray-300">Calendar</h2>
    <Calendar
      value={date}
      onChange={onChange}
      className="rounded-lg shadow-inner"
    />
  </div>
);

export default CalendarSection;
