import React, { useContext, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { UserContext } from '../context/context';

const ChatRoomList = () => {
  const { chatRooms, allContacts, setAllContacts, selectedContact, setSelectedContact, socket } = useContext(UserContext);
  const theme = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  // Update search term
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Socket event handlers
  useEffect(() => {
    if (socket) {
      socket.on('userOnline', (userId) => {
        // console.log('userOnline', userId);
        setAllContacts(prevContacts =>
          prevContacts.map(contact =>
            contact._id === userId ? { ...contact, isOnline: true } : contact
          )
        );
        // console.log('SelectedContact', selectedContact);
        if (selectedContact && userId === selectedContact._id) {
          setSelectedContact(contact => {
            return {
              ...contact,
              isOnline: true
            };
          });
        }
      });

      socket.on('userOffline', (userId) => {
        setAllContacts(prevContacts =>
          prevContacts.map(contact =>
            contact._id === userId ? { ...contact, isOnline: false } : contact
          )
        );
        // console.log('SelectedContact', selectedContact);
        if (selectedContact && userId === selectedContact._id) {
          setSelectedContact(contact => {
            return {
              ...contact,
              isOnline: false
            };
          });
        }
      });


    }
  }, [socket, selectedContact]);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message) => {
        // console.log('New Message', message);
        setAllContacts(prevContacts =>
          prevContacts.map(contact => {
            if (contact._id === message.sender) {
              return { ...contact, messages: [...(contact.messages ? contact.messages : []), message] };
            } else {
              return contact;
            }
          })
        );
        // console.log(allContacts);
      });
    }
  }, [socket]);
  // Update contacts with chat rooms
  useEffect(() => {
    if (chatRooms.length > 0 && allContacts.length > 0) {
      const updatedContacts = allContacts.map(contact => {
        const foundRoom = chatRooms.find(room => room.users.includes(contact._id));
        return {
          ...contact,
          roomId: foundRoom ? foundRoom._id : null,
          messages: foundRoom ? foundRoom.messages : []
        };
      });
      setAllContacts(updatedContacts);
    }
  }, [chatRooms]);

  // Memoized filtered contacts list
  const filteredContacts = useMemo(() => {
    return allContacts.filter(contact =>
      contact.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allContacts]);

  // Handle selecting a contact
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className={`w-64 h-screen ${theme === 'light' ? 'bg-sky-300 text-gray-800' : 'bg-gradient-to-b from-gray-700 to-gray-900 text-white'} p-4 shadow-lg`}>
      <h2 className={`text-2xl font-semibold mb-6 border-b ${theme === 'light' ? 'text-gray-900 border-gray-300 pb-2' : 'text-white border-gray-600 pb-2'}`}>
        Contact List
      </h2>
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
        {(filteredContacts.length > 0 ? filteredContacts : allContacts).map(contact => (

          <motion.li
            key={contact._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: contact.id * 0.1 }}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${selectedContact && selectedContact._id === contact._id ? (theme === 'light' ? 'bg-blue-200' : 'bg-blue-700') : (theme === 'light' ? 'bg-sky-300 hover:bg-sky-200' : 'bg-gray-900 hover:bg-blue-700')} ${theme === 'light' ? 'text-black' : 'text-white'}`}
            onClick={() => handleSelectContact(contact)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${theme === 'light' ? 'bg-gray-900' : 'bg-blue-500'}`}>
              <span className="text-lg font-bold text-white">{contact.username[0]}</span>
            </div>
            <div className={`ml-4 border-l border-gray-300 pl-4 ${theme === 'light' ? 'border-black' : 'border-white'}`}>
              <p className={`font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{contact.username}</p>
              <p className={`text-sm ${contact.isOnline ? 'text-green-600' : 'text-gray-600'}` }>{contact.isOnline ? "Online" : "Offline"}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
