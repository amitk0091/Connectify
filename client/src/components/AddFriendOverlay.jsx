// src/components/AddFriendOverlay.js

import React, { useContext, useState } from "react";
import { FaTimes, FaUserPlus, FaSearch } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { addContact } from "../../fetchAPI";
import { UserContext } from "../context/context";

const AddFriendOverlay = ({ onClose }) => {
  const theme = useSelector((state) => state.theme);
  const {setAllContacts} = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [showNoUser, setShowNoUser] = useState(false);
  const handleAddFriend = async () => {
    try {
      const response = await addContact({ user_email: userEmail });
      setAllContacts(prev => {
        return [...prev, response];
      });
    } catch (error) {
      setShowNoUser(true);
    }
  }

  return (
    <div className="fixed z-[100] inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center transition-opacity duration-300">
      <div
        className={`rounded-2xl shadow-2xl p-6 w-11/12 md:w-2/3 lg:w-1/3 transform transition-transform duration-300 ${theme === "light"
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
            placeholder="Enter username or email address"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
            className={`w-full p-3  border ${theme === "light" ? "border-gray-300" : "border-gray-500"
              } rounded-full focus:outline-none ${theme === "light"
                ? "focus:border-blue-500"
                : "focus:border-blue-300"
              } transition duration-200`}
          />
          <IoMdPersonAdd onClick={handleAddFriend}
            className={`absolute top-3 right-3 h-6 w-6 ${theme === "light" ? "text-gray-400" : "text-gray-300"
              }`}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
          {showNoUser && <div className="col-span-2 text-center text-gray-500">
            No friends found
          </div>}
        </div>
      </div>
    </div>
  );
};

export default AddFriendOverlay;
