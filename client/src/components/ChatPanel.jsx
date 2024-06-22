import React, { useEffect, useState, useContext, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FiPhone, FiVideo } from 'react-icons/fi';
import { CgAttachment, CgClose } from "react-icons/cg";
import { AiOutlineSmile } from 'react-icons/ai';
import Picker from '@emoji-mart/react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/context';

const ChatPanel = () => {
  const theme = useSelector((state) => state.theme);
  const { socket, setAllContacts, allContacts, selectedContact } = useContext(UserContext);
  const message = useRef(null);
  const fileInput = useRef(null);
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [attachments, setAttachments] = useState([]); // To store selected attachments
  const otherGuy = selectedContact?._id;

  useEffect(() => {
    if (otherGuy) {
      const foundContact = allContacts.find(contact => contact._id === otherGuy);

      if (foundContact) {
        setMessages(foundContact.messages);
      } else {
        setMessages([]);
      }
    }
  }, [allContacts, selectedContact]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('ConnectifyUser'));
    if (selectedContact && user) {
      socket.emit('joinRoom', { user1: { id: selectedContact._id, username: selectedContact.username }, user2: { id: user._id, username: user.username } });
    }
  }, [selectedContact, socket]);

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const sender = JSON.parse(localStorage.getItem('ConnectifyUser'));
    const messageContent = message.current.value;

    if (selectedContact && sender) {
      const messageData = {
        sender: sender._id,
        receiver: selectedContact._id,
        content: messageContent,
        attachments: attachments.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file) // Create a URL for preview
        }))
      };

      socket.emit("sendMessage", messageData);

      setAllContacts(prevContacts =>
        prevContacts.map(contact =>
          contact._id === selectedContact._id
            ? { ...contact, messages: [...(contact.messages ? contact.messages : []), { ...messageData, _id: Date.now().toString(), timestamp: new Date().toLocaleTimeString() }] }
            : contact
        )
      );

      toast.success('Message sent!');
    } else {
      toast.error('Failed to send message. Please try again.');
    }

    message.current.value = "";
    setAttachments([]); // Clear attachments after sending message
  };

  const handleEmojiSelect = (emoji) => {
    message.current.value += emoji.native;
    setShowEmojiPicker(false);
  };

  const handleDeleteMessage = (msgId) => {
    const user = JSON.parse(localStorage.getItem('ConnectifyUser'));

    if (selectedContact && user) {
      socket.emit("deleteMessage", {
        messageId: msgId,
        sender: user._id,
        receiver: selectedContact._id
      });

      setAllContacts(prevContacts =>
        prevContacts.map(contact =>
          contact._id === selectedContact._id
            ? { ...contact, messages: contact.messages.filter(message => message._id !== msgId) }
            : contact
        )
      );

      toast.success('Message deleted!');
    } else {
      toast.error('Failed to delete message. Please try again.');
    }
  };

  const handleContextMenu = (event, msgId) => {
    event.preventDefault();
    setContextMenu({
      x: event.pageX,
      y: event.pageY,
      msgId,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleAttachmentChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachments(files);
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const iconColor = theme === 'light' ? 'black' : 'white';

  return (
    <div
      className="flex-1 flex flex-col text-white p-4 max-h-screen overflow-y-auto"
      style={{
        backgroundColor: theme === 'light' ? '#dbeeff' : '#111827',
        color: theme === 'light' ? '#1e2a4a' : '#ffffff',
      }}
      onClick={closeContextMenu}
    >
      <ToastContainer />
      {selectedContact && (
        <div
          className={`flex items-center mb-4 border-b p-2 ${theme === 'light' ? 'border-black' : 'border-white'}`}
          style={{ color: theme === 'light' ? '#1e2a4a' : '#ffffff' }}
        >
          <div className="flex items-center mr-4"
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
          <div className="flex ml-auto space-x-6">
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
            className={`mb-2 max-w-md ${msg.sender !== otherGuy ? 'ml-auto flex-row-reverse' : 'flex-row'} flex items-center relative`}
            onContextMenu={(event) => handleContextMenu(event, msg._id)}
          >
            <div
              className={`p-3 rounded-xl ${msg.sender !== otherGuy ? (theme === 'light' ? 'bg-blue-600 text-white' : 'bg-blue-700') : (theme === 'light' ? 'bg-gray-300 text-gray-900' : 'bg-gray-800 text-white')}`}
            >
              <div className="flex items-center">
                <div className="mr-2">{msg.content}</div>
                <div className="text-xs text-gray-400">{msg.timestamp}</div>
              </div>
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="mt-2">
                  {msg.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CgAttachment className="text-sm" />
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                      >
                        {attachment.name} ({(attachment.size / 1024).toFixed(2)} KB)
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {contextMenu && (
        <div
          className="absolute z-20 bg-white dark:bg-gray-800 shadow-md rounded-md py-2"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => handleDeleteMessage(contextMenu.msgId)}
          >
            Delete
          </button>
        </div>
      )}
      {/* Other parts of your ChatPanel component */}
      <form onSubmit={handleSubmit} className="flex p-2  relative">
        {attachments.length > 0 && (
          <div className={`flex flex-wrap gap-2 mb-2 absolute bottom-full ${theme === 'light' ? 'text-gray-900 ' : 'text-white'}`}>
            {attachments.map((file, index) => (
              <div key={index} className={`flex items-center  rounded-md p-2 ${theme === 'light' ? 'text-gray-900 bg-blue-200' : 'text-white bg-blue-900'}`}>
                <CgAttachment className="text-lg"  />
                <span className="text-sm ml-2">{file.name}</span>
                <button className="ml-2 text-red-500" onClick={() => removeAttachment(index)}>
                  <CgClose className="text-lg" style={{ color: 'red' }} />
                </button>
              </div>
            ))}
          </div>
        )}
        <label htmlFor="fileInput">
          <CgAttachment className="text-xl cursor-pointer mt-3 mr-3" style={{ color: theme === 'light' ? '#4B5563' : '#D1D5DB' }} />
        </label>
        <input
          id="fileInput"
          type="file"
          ref={fileInput}
          className="hidden"
          onChange={handleAttachmentChange}
          multiple
        />
        <div className="relative w-full gap-2">
          <input
            type="text"
            ref={message}
            placeholder="Type a message..."
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 ${theme === 'light' ? 'shadow-md bg-white text-gray-900 border border-gray-300' : 'shadow-md border border-blue-300 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
          />
          <AiOutlineSmile
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl cursor-pointer"
            style={{ color: theme === 'light' ? '#9CA3AF' : '#D1D5DB' }}
            onClick={handleToggleEmojiPicker}
          />
          {showEmojiPicker && (
            <div className="absolute bottom-12 right-4 z-10">
              <Picker set="apple" onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`ml-2 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-700'}`}
        >
          Send
        </button>
      </form>
    
    </div>
  );
};

export default ChatPanel;
