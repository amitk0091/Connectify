import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ContactList from "../components/ContactList";
import ChatPanel from "../components/ChatPanel";
import AddFriend from "../pages/AddFriend"
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
          className={`flex flex-col ${theme === 'light' ? 'bg-[#fceff0]' : 'bg-[#111827]' } items-center justify-center w-[90%]`}
        >
          <img src="your-image-url.jpg" alt="Start a chat" className="max-w-xs mb-4" />
          <p className="text-white text-xl">Start a chat by selecting a contact</p>
        </motion.div>
        )}
      </div>
      <div>
        <AddFriend />
      </div>
      
    </>
  );
}

export default Home;
