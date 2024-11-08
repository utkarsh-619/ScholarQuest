import React from "react";
import { BsSearch } from "react-icons/bs";

const Header = () => (
  <header className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="p-3 rounded-lg w-64 pl-10 shadow-sm focus:outline-none bg-gray-800 text-gray-300 placeholder-gray-500"
      />
      <BsSearch className="absolute left-3 top-3 text-gray-500" size={20} />
    </div>
  </header>
);

export default Header;
