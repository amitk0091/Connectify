// src/components/Sidebar.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaComments, FaUserFriends, FaPhoneAlt, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const [selected, setSelected] = useState('chat');

  const handleClick = (icon) => {
    setSelected(icon);
  };

  const icons = [
    { name: 'chat', icon: <FaComments className="w-6 h-6" /> },
    { name: 'contacts', icon: <FaUserFriends className="w-6 h-6" /> },
    { name: 'calls', icon: <FaPhoneAlt className="w-6 h-6" /> },
  ];

  return (
    <motion.div
      initial={{ x: -50 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-14 h-screen bg-black mr-2  text-white flex flex-col items-center py-4"
    >
      <div className="mb-6">
        {/* Logo */}
        <img
          src="/Favicon.png"
          alt="Logo"
          className="w-10 h-10 mb-2"
        />
      </div>
      <div className="space-y-6 flex-1">
        {icons.map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.2 }}
            className={`p-2 rounded-full cursor-pointer ${selected === item.name ? 'bg-blue-700' : 'bg-gray-800'}`}
            onClick={() => handleClick(item.name)}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
      <div className="mb-4">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className={`p-2 rounded-full cursor-pointer ${selected === 'settings' ? 'bg-gradient-to-b from-indigo-800 to-rose-600' : 'bg-gray-800'}`}
          onClick={() => handleClick('settings')}
        >
          <FaCog className="w-6 h-6" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
