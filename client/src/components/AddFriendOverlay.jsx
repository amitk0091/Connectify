// src/components/AddFriendOverlay.js

import React, { useState } from "react";
import { FaTimes, FaUserPlus, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddFriendOverlay = ({ suggestions, onClose }) => {
  const theme = useSelector((state) => state.theme);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSuggestions = suggestions.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed z-[100] inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center transition-opacity duration-300">
      <div
        className={`rounded-2xl shadow-2xl p-6 w-11/12 md:w-2/3 lg:w-1/3 transform transition-transform duration-300 ${
          theme === "light"
            ? "bg-sky-300 text-gray-800"
            : "bg-gray-700 text-white"
        } scale-100 hover:scale-105`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">
            {theme === "light" ? "Add Friend" : "Add a Friend"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition duration-200"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search for friends"
            value={searchTerm}
            onChange={handleSearchChange}
            className={`w-full p-3 pl-10 border ${
              theme === "light" ? "border-gray-300" : "border-gray-500"
            } rounded-full focus:outline-none ${
              theme === "light"
                ? "focus:border-blue-500"
                : "focus:border-blue-300"
            } transition duration-200`}
          />
          <FaSearch
            className={`absolute top-3 left-3 h-6 w-6 ${
              theme === "light" ? "text-gray-400" : "text-gray-300"
            }`}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((friend) => (
              <div
                key={friend.id}
                className={`flex items-center justify-between p-4 ${
                  theme === "light" ? "bg-white" : "bg-gray-600"
                } rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105`}
              >
                <span
                  className={`${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }`}
                >
                  {friend.name}
                </span>
                <button
                  className={`bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200`}
                >
                  <FaUserPlus className="h-5 w-5" />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500">
              No friends found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFriendOverlay;
