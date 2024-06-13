import { useState } from 'react';
import { BsFillPersonFill, BsSearch } from 'react-icons/bs';
import { FiPhone, FiVideo } from 'react-icons/fi';
import { AiOutlineSmile, AiOutlineFileImage } from 'react-icons/ai';
import Picker from '@emoji-mart/react';
import { useSelector } from 'react-redux';

const ChatPanel = ({ selectedContact }) => {
  const theme = useSelector((state) => state.theme); // Assuming you're fetching theme from Redux

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey there!', sender: 'other' },
    { id: 2, text: 'Hi! How are you?', sender: 'me' },
    { id: 3, text: 'I am doing great, thanks!', sender: 'other' },
    { id: 4, text: 'That sounds awesome!', sender: 'other' },
    { id: 5, text: 'Yeah, its been a good day.', sender: 'me' },
  ]);

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

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
    setShowEmojiPicker(false);
  };
  const iconColor = theme === 'light' ? 'black' : 'white';

  return (
    <div
      className="flex-1 flex flex-col text-white p-4 max-h-screen overflow-y-auto"
      style={{
        backgroundColor: theme === 'light' ? '#dbeeff' : '#111827',
        color: theme === 'light' ? '#1e2a4a' : '#ffffff', 
      }}
    >
      {selectedContact && (
        <div
          className={`flex items-center mb-4 border-b  p-2 ${theme === 'light'?'border-black':'border-white'}`}
          style={{ color: theme === 'light' ? '#1e2a4a' : '#ffffff' }}
        >
          <div className="flex items-center mr-4 "
          style={{color: theme === 'light'?'black':'white'}}
          >
            <div className={`w-10 h-10 rounded-full mr-2 flex items-center justify-center shadow-md ${theme === 'light'?'bg-gray-900':'bg-blue-500'}`}>
              <span className="text-lg font-bold text-white">{selectedContact.name[0]}</span>
            </div>
            <div>
              <p className="font-semibold">{selectedContact.name}</p>
              <p className={`text-sm ${selectedContact.status === 'Online' ? 'text-green-400' : 'text-gray-400'}`}>
                {selectedContact.status}
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
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 max-w-md ${msg.sender === 'me' ? 'ml-auto flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`p-3 rounded-lg ${msg.sender === 'me' ? (theme === 'light'?'bg-sky-600 text-white' :'bg-blue-700' ): (theme === 'light'?'bg-sky-900 text-white':'bg-gray-800 text-white dark:text-gray-900')}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex p-2">
        <div className="flex items-center mr-2">
          <AiOutlineFileImage className="text-xl cursor-pointer" />
        </div>
        <div className="relative w-full gap-2">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Type a message..."
            className={` w-full  py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 ${
              theme === 'light' ? 'shadow-md bg-sky-600  text-white border border-gray-300' : 'shadow-md border border-blue-300 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            }  `}
          />
          <AiOutlineSmile
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl cursor-pointer"
            style={{color: theme === 'light'? 'white' : 'white'}}
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
          className={`" ml-2 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" ${theme==='light'?'bg-sky-600':'bg-blue-700'}`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
