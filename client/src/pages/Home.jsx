import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ContactList from "../components/ContactList";
import ChatPanel from "../components/ChatPanel";

function Home() {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <ContactList onSelectContact={handleContactSelect} />
        {selectedContact ? <ChatPanel selectedContact={selectedContact} /> :<>img</>}
      </div>
    </>
  );
}

export default Home;
