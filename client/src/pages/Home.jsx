import { useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatPanel from "../components/ChatPanel";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { getAllChatRoom, getContacts } from "../../fetchAPI";
import { UserContext } from "../context/context";
import ChatRoomList from "../components/ChatRoomList";
import { io } from 'socket.io-client';

function Home() {
  const {
    setAllContacts,
    setChatRooms,
    setSocket,
    socket,
    selectedContact,
  } = useContext(UserContext);
  const theme = useSelector((state) => state.theme);

  // Initialize socket connection
  useEffect(() => {
    const initializeSocket = () => {
      const newSocket = io('http://localhost:5000', { withCredentials: true });

      newSocket.on('connect_error', (error) => {
        console.error('Connection Error:', error.message);
      });

      setSocket(newSocket);
    };

    if (!socket) {
      initializeSocket();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  // Fetch contacts and chat rooms on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contacts = await getContacts();
        setAllContacts(contacts);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        // if(error.response.status === 401 ){
          window.location.href ='/signin';
        // }
      }
    };

    const fetchChatRooms = async () => {
      try {
        const chatRooms = await getAllChatRoom();
        setChatRooms(chatRooms);
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchContacts();
    fetchChatRooms();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <ChatRoomList />
      {selectedContact ?
        <ChatPanel />
        :
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex flex-col items-center justify-center w-full ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-white"
            }`}
        >
          <img
            src="/start.png"
            alt="Start a chat"
            className="max-w-sm mb-6 rounded-2xl"
          />
          <p className="text-3xl font-bold mb-4 text-center">Start a Chat</p>
          <p className="text-lg text-center mb-6">
            Select a contact to begin your conversation
          </p>
        </motion.div>
      }
    </div>
  );
}

export default Home;
