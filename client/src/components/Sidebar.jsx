
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaComments, FaUserFriends, FaPhoneAlt, FaCog } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IoMdLogOut } from 'react-icons/io';
import Toggle from './Toggle';
import { useSelector } from 'react-redux';
import AddFriendOverlay from './AddFriendOverlay';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'


const Sidebar = () => {

  const navigate = useNavigate();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleOpenOverlay = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };
  const theme = useSelector((state) => state.theme);

  const [selected, setSelected] = useState('chat');

  const handleClick = (icon) => {
    setSelected(icon);
  };

  const icons = [
    { name: 'chat', icon: <FaComments className="w-6 h-6" /> },
    { name: 'contacts', icon: <FaUserFriends className="w-6 h-6" /> },
    { name: 'calls', icon: <FaPhoneAlt className="w-6 h-6" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('ConnectifyLoggedIn');
    localStorage.removeItem('ConnectifyUser');

    Cookies.remove('token');
    window.location.href = "/home";
  }


  return (
    <>
      <motion.div
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-16 h-screen  text-white flex flex-col items-center py-4"
        style={{ backgroundColor: theme === 'light' ? '#dbeeff' : '#111827' }}
      >
        <div className="mb-6">
          {/* Logo */}
          <img
            src="/Logo.png"
            alt="Logo"
            className="w-[26rem] mb-2"
          />
        </div>
        <div className="space-y-6 flex-1">
          {icons.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.2 }}
              className={`p-2 rounded-full cursor-pointer ${selected === item.name ? (theme === 'light' ? ' bg-sky-600' : 'bg-blue-700') : 'bg-gray-800'}`}
              onClick={() => handleClick(item.name)}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>
        <div className="mb-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
          >
            <Toggle />
          </motion.div>
        </div>
        <div className="mb-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className={`p-2 rounded-full cursor-pointer ${selected === 'settings' ? 'bg-blue-700' : 'bg-gray-800'}`}
            onClick={handleOpenOverlay}
          >
            <AiOutlineUserAdd className="w-6 h-6" />
          </motion.div>
          {isOverlayVisible && (
            <AddFriendOverlay onClose={handleCloseOverlay} />
          )}
        </div>
        <div className="mb-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className={`p-2 rounded-full cursor-pointer ${selected === 'settings' ? 'bg-blue-700' : 'bg-gray-800'}`}
            onClick={() => handleClick('settings')}
          >
            <FaCog className="w-6 h-6" />
          </motion.div>
        </div>
        <div className="mb-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className={`p-2 rounded-full cursor-pointer bg-red-600`}
          >
            <IoMdLogOut onClick={handleLogout} className="w-6 h-6" />
          </motion.div>
        </div>
      </motion.div>

    </>
  );
};

export default Sidebar;


