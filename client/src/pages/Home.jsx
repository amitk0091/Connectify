import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ContactList from "../components/ContactList";
import ChatPanel from "../components/ChatPanel";
import {motion} from "framer-motion"
import { useSelector } from "react-redux";




function Home() {
  const theme = useSelector((state) => state.theme);
  
 


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
      className={`flex flex-col items-center justify-center w-full  ${
        theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'
      }`}
    >
      <img src="/start.png" alt="Start a chat" className="max-w-sm mb-6 rounded-2xl " />
      <p className="text-3xl font-bold mb-4 text-center">Start a Chat</p>
      <p className="text-lg text-center mb-6">Select a contact to begin your conversation</p>
      
    </motion.div>
        )}
      </div>
      
      
    </>
  );
}

export default Home;
