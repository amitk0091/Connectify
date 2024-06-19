import { useEffect, useState, useContext, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FiPhone, FiVideo } from 'react-icons/fi';
import { CgAttachment } from "react-icons/cg";
import { AiOutlineSmile } from 'react-icons/ai';
import Picker from '@emoji-mart/react';
import { useSelector } from 'react-redux';
import { UserContext } from '../context/context';

const ChatPanel = () => {
  const theme = useSelector((state) => state.theme);
  const { socket, setAllContacts, allContacts, selectedContact } = useContext(UserContext);
  // console.log('chat panel', selectedContact);

  const message = useRef(null);
  const [messages, setMessages] = useState([]);
  const otherGuy = selectedContact?._id; // Add a null check for selectedContact

  useEffect(() => {
    if (otherGuy) { // Add a null check for otherGuy
      const foundContact = allContacts.find(contact => contact._id === otherGuy);

      if (foundContact) {
        setMessages(foundContact.messages);
      } else {
        setMessages([]);
      }
    }
  }, [allContacts,selectedContact]); // Correct the dependency array

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('ConnectifyUser'));
    if (selectedContact && user) { // Add null checks for selectedContact and user
      socket.emit('joinRoom', { user1: { id: selectedContact._id, username: selectedContact.username }, user2: { id: user._id, username: user.username } });
    }
  }, [selectedContact]); // Add selectedContact and socket as dependencies

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const sender = JSON.parse(localStorage.getItem('ConnectifyUser'));
    const messageContent = message.current.value;

    if (selectedContact && sender) { // Add null checks for selectedContact and sender
      // Emit the message using the socket
      socket.emit("sendMessage", {
        sender: sender._id,
        receiver: selectedContact._id,
        content: messageContent
      });

      // Update the state immutably
      setAllContacts(prevContacts =>
        prevContacts.map(contact =>
          contact._id === selectedContact._id
            ? { ...contact, messages: [...(contact.messages ? contact.messages : []), { sender: sender._id, receiver: selectedContact._id, content: messageContent }] }
            : contact
        )
      );
    }

    // Clear the input field
    message.current.value = "";
  };

  const handleEmojiSelect = (emoji) => {
    setShowEmojiPicker(false);
  };
  const iconColor = theme === 'light' ? 'black' : 'white';

  return (
    <div
      className="flex-1  flex flex-col text-white p-4 max-h-screen overflow-y-auto"
      style={{
        backgroundColor: theme === 'light' ? '#dbeeff' : '#111827',
        color: theme === 'light' ? '#1e2a4a' : '#ffffff',
      }}
    >
      {selectedContact && (
        <div
          className={`flex items-center mb-4 border-b  p-2 ${theme === 'light' ? 'border-black' : 'border-white'}`}
          style={{ color: theme === 'light' ? '#1e2a4a' : '#ffffff' }}
        >
          <div className="flex items-center mr-4 "
            style={{ color: theme === 'light' ? 'black' : 'white' }}
          >
            <div className={`w-10 h-10 rounded-full mr-2 flex items-center justify-center shadow-md ${theme === 'light' ? 'bg-gray-900' : 'bg-blue-500'}`}>
              <span className="text-lg font-bold text-white">{selectedContact.username[0]}</span>
            </div>
            <div>
              <p className="font-semibold">{selectedContact.username}</p>
              <p className={`text-sm ${selectedContact.isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                {selectedContact.isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex ml-auto space-x-6 ">
            <FiVideo className="text-xl cursor-pointer" style={{ color: iconColor }} />
            <FiPhone className="text-xl cursor-pointer" style={{ color: iconColor }} />
            <BsSearch className="text-xl cursor-pointer" style={{ color: iconColor }} />
          </div>
        </div>
      )}
      <div className="flex-1 overflow-x-auto">
        {messages && messages.length > 0 && messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-2 max-w-md ${msg.sender !== otherGuy ? 'ml-auto flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`p-3 rounded-lg ${msg.sender !== otherGuy ? (theme === 'light' ? 'bg-sky-600 text-white' : 'bg-blue-700') : (theme === 'light' ? 'bg-sky-900 text-white' : 'bg-gray-800 text-white dark:text-gray-900')}`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex p-2">
        <div className="flex items-center mr-2">
          <CgAttachment className="text-xl cursor-pointer" />
        </div>
        <div className="relative w-full gap-2">
          <input
            type="text"
            ref={message}
            placeholder="Type a message..."
            className={` w-full  py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 ${theme === 'light' ? 'shadow-md bg-sky-600  text-white border border-gray-300' : 'shadow-md border border-blue-300 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              }  `}
          />
          <AiOutlineSmile
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl cursor-pointer"
            style={{ color: theme === 'light' ? 'white' : 'white' }}
            onClick={handleToggleEmojiPicker}
          />
          {showEmojiPicker && (
            <div className="absolute bottom-12 right-4 z-10">
              <Picker set="apple" onSelect={handleEmojiSelect} />
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`" ml-2 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" ${theme === 'light' ? 'bg-sky-600' : 'bg-blue-700'}`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;


