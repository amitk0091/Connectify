import React, { useContext, useState } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addContact } from "../../fetchAPI";
import { UserContext } from "../context/context";

const AddFriendOverlay = ({ onClose }) => {
  const theme = useSelector((state) => state.theme);
  const { setAllContacts } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [showNoUser, setShowNoUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddFriend = async () => {
    setLoading(true);
    setShowNoUser(false);
    try {
      const response = await addContact({ user_email: userEmail });
      setAllContacts(prev => [...prev, response]);
      toast.success('Friend added successfully!');
      setUserEmail(""); // Clear input field after success
    } catch (error) {
      setShowNoUser(true);
      toast.error('Failed to add friend. Please check the email and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-[100] inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center transition-opacity duration-300">
      <ToastContainer />
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
            placeholder="Enter email address"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
            className={`w-full p-3 border ${theme === "light" ? "border-gray-300 text-black" : "border-gray-500 text-black"
              } rounded-full focus:outline-none ${theme === "light"
                ? "focus:border-blue-500"
                : "focus:border-blue-300"
              } transition duration-200`}
            disabled={loading}
          />
          <IoMdPersonAdd onClick={handleAddFriend}
            className={`absolute top-3 right-3 h-6 w-6 ${theme === "light" ? "text-gray-400" : "text-gray-300"
              } cursor-pointer ${loading ? "cursor-not-allowed" : ""}`}
          />
          {loading && <FaSpinner className="absolute top-3 right-3 h-6 w-6 text-gray-400 animate-spin" />}
        </div>
        {showNoUser && <div className="text-center text-gray-500 mb-4">
          No user found with this email.
        </div>}
        <button
          onClick={handleAddFriend}
          className={`w-full p-3 rounded-full ${theme === "light" ? "bg-blue-500 text-white" : "bg-blue-300 text-gray-700"
            } focus:outline-none hover:opacity-90 transition duration-200 ${loading ? "cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Friend"}
        </button>
      </div>
    </div>
  );
};

export default AddFriendOverlay;
