

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const contacts = [
  { id: 1, name: 'John Doe', status: 'Online' },
  { id: 2, name: 'Jane Smith', status: 'Offline' },
  { id: 3, name: 'Bob Johnson', status: 'Online' },
];

const ContactList = ({ onSelectContact }) => {

  const theme = useSelector((state) => state.theme);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    onSelectContact(contact);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`w-64 h-screen ${theme === 'light' ? 'bg-sky-300 text-gray-800' : 'bg-gradient-to-b from-gray-700 to-gray-900 text-white'} p-4 shadow-lg rounded-lg`}>
      <h2 className={`text-2xl font-semibold mb-6 border-b ${theme === 'light' ? 'text-gray-900 border-gray-300 pb-2' : 'text-white border-gray-600 pb-2'}`}>Contact List</h2>
      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search"
          className={`w-full ${theme === 'light' ? 'bg-gray-200 text-gray-800 border border-gray-300' : 'bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'} py-2 px-3 rounded-md`}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <AiOutlineSearch className="h-5 w-5 text-gray-400" />
        </span>
      </div>
      <ul className="space-y-4 overflow-y-auto h-[calc(100vh-14rem)]">
        {filteredContacts.map((contact) => (
         <motion.li
         key={contact.id}
         initial={{ opacity: 0, x: -10 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ delay: contact.id * 0.1 }}
         className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
           selectedContact && selectedContact.id === contact.id ? (theme === 'light' ? 'bg-blue-200' : 'bg-blue-700') : (theme === 'light' ? 'bg-sky-300 hover:bg-sky-200' : 'bg-gray-900 hover:bg-blue-700')
         } ${theme === 'light' ? 'text-black' : 'text-white'}`}
         onClick={() => handleContactClick(contact)}
       >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center shadow-md">
              <span className="text-lg font-bold text-white">{contact.name[0]}</span>
            </div>
            <div className="ml-4 border-l border-gray-300 pl-4">
              <p className={`font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{contact.name}</p>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{contact.status}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
