// src/components/ContactList.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
    <div className="w-64 h-screen bg-black border border-white rounded-md text-white p-4">
      <h2 className="text-xl font-bold mb-4">Contacts</h2>
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search"
          className="w-full bg-gray-800 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.293 13.707a1 1 0 01-1.414 1.414l-3.586-3.586a5 5 0 111.414-1.414l3.586 3.586zM9 13a4 4 0 100-8 4 4 0 000 8z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      <ul className="space-y-4 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <motion.li
            key={contact.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: contact.id * 0.1 }}
            className={`flex items-center p-2 rounded-lg cursor-pointer ${
              selectedContact && selectedContact.id === contact.id ? 'bg-gray-800' : 'hover:bg-gray-800'
            }`}
            onClick={() => handleContactClick(contact)}
          >
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-lg font-bold">{contact.name[0]}</span>
            </div>
            <div className="ml-4">
              <p className="font-semibold">{contact.name}</p>
              <p className="text-sm text-gray-400">{contact.status}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
