import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ContactList from "../components/ContactList";
import ChatPanel from "../components/ChatPanel";
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../redux/themeActions';
import {motion} from "framer-motion"

function Home() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };


  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <ContactList onSelectContact={handleContactSelect} />
        {selectedContact ? (
          <ChatPanel selectedContact={selectedContact} />
        ) : (
          <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center w-[70%]"
        >
          <img src="your-image-url.jpg" alt="Start a chat" className="max-w-xs mb-4" />
          <p className="text-white text-xl">Start a chat by selecting a contact</p>
        </motion.div>
        )}
      </div>
      
      <div className="w-full " style={{ backgroundColor: theme === 'light' ? 'white' : 'black', color: theme === 'light' ? 'black' : 'white' }}>
      <h1>My App</h1>
      <p>The current theme is: {theme}</p>
      <button onClick={handleThemeToggle}>Toggle Theme</button>
    </div>
      
    </>
  );
}

export default Home;
