import React, { createContext, useEffect, useState } from 'react';
import { getContacts } from '../../fetchAPI';

// Create context object
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [chatRooms,setChatRooms] = useState([]);
    const [allContacts, setAllContacts] = useState([]);
    const [socket, setSocket] = useState(null);
    const [selectedContact , setSelectedContact] = useState(null);
    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

   

    return (
        <UserContext.Provider value={{  login, logout, allContacts, setAllContacts,chatRooms , setChatRooms , setSocket, socket, selectedContact, setSelectedContact}}>
            {children}
        </UserContext.Provider>
    );
};
