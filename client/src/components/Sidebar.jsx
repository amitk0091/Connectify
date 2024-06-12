  
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
       className="w-16 h-screen bg-gray-900 text-white flex flex-col items-center py-4"
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
           className={`p-2 rounded-full cursor-pointer ${selected === 'settings' ? 'bg-blue-700' : 'bg-gray-800'}`}
           onClick={() => handleClick('settings')}
         >
           <FaCog className="w-6 h-6" />
         </motion.div>
       </div>
     </motion.div>
   );
 };

 export default Sidebar;


