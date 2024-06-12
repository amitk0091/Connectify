import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';

const contacts = [
  { id: 1, name: 'John Doe', status: 'Online' },
  { id: 2, name: 'Jane Smith', status: 'Offline' },
  { id: 3, name: 'Bob Johnson', status: 'Online' },
];

const ContactList = ({ onSelectContact }) => {
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
    <div className="w-64 h-screen bg-gradient-to-b from-gray-700 to-gray-900 text-white p-4 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-2">Contact List</h2>
      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search"
          className="w-full bg-gray-900 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              selectedContact && selectedContact.id === contact.id ? 'bg-gray-900' : 'hover:bg-gray-800'
            }`}
            onClick={() => handleContactClick(contact)}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center shadow-md">
              <span className="text-lg font-bold text-white">{contact.name[0]}</span>
            </div>
            <div className="ml-4 border-l border-gray-600 pl-4">
              <p className="font-semibold">{contact.name}</p>
              <p className="text-sm text-gray-300">{contact.status}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
