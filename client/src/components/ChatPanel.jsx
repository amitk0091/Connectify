


import  { useState } from 'react';
import { BsFillPersonFill, BsSearch } from 'react-icons/bs';
import { FiPhone, FiVideo } from 'react-icons/fi';
import { AiOutlineSmile, AiOutlineFileImage } from 'react-icons/ai';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const ChatPanel = ({ selectedContact }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([  { id: 1, text: 'Hey there!', sender: 'other' },
  { id: 2, text: 'Hi! How are you?', sender: 'me' },
  { id: 3, text: 'I am doing great, thanks!', sender: 'other' },
  { id: 1, text: 'Hey there!', sender: 'other' },
  { id: 2, text: 'Hi! How are you?', sender: 'me' },
  { id: 3, text: 'I am doing great, thanks!', sender: 'other' },
  { id: 1, text: 'Hey there!', sender: 'other' },
  { id: 2, text: 'Hi! How are you?', sender: 'me' },
  { id: 3, text: 'I am doing great, thanks!', sender: 'other' },]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() === '') return;
    setMessages([...messages, { id: messages.length + 1, text: message, sender: 'me' }]);
    setMessage('');
  };

  // Function to handle emoji selection and insert it into the input field
  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native); // Append the selected emoji to the current message
    setShowEmojiPicker(false); // Close the emoji picker after selection
  };

  return (
    <div className="flex-1 flex flex-col bg-black text-white p-4 max-h-screen overflow-y-auto">
      {selectedContact && (
        <div className="flex items-center mb-4 border-b p-2">
          <div className="flex items-center mr-4">
            <BsFillPersonFill className="text-2xl mr-2" />
            <div>
              <p className="font-semibold">{selectedContact.name}</p>
              <p className={`text-sm ${selectedContact.status === 'Online' ? 'text-green-400' : 'text-gray-400'}`}>
                {selectedContact.status}
              </p>
            </div>
          </div>
          <div className="flex ml-auto space-x-6">
            <FiVideo className="text-xl cursor-pointer" />
            <FiPhone className="text-xl cursor-pointer" />
            <BsSearch className="text-xl cursor-pointer" />
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 max-w-md ${msg.sender === 'me' ? 'ml-auto' : ''}`}
          >
            <div
              className={`p-3 rounded-lg ${msg.sender === 'me' ? 'bg-blue-700 text-white' : 'bg-gray-800'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center border-t p-2">
        <div className="flex items-center mr-2">
          <AiOutlineFileImage className="text-xl cursor-pointer" />
        </div>
        <div className="relative w-full gap-2">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 w-full text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
          />
          <AiOutlineSmile
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl cursor-pointer"
            onClick={handleToggleEmojiPicker}
          />
          {showEmojiPicker && (
            <div className="absolute bottom-12 right-4 z-10">
              <Picker
                set="apple" // specify the emoji set you want to use, e.g., "apple", "google", "twitter", etc.
                onSelect={handleEmojiSelect}
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-700 ml-2 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
