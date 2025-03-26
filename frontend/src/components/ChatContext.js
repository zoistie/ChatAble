import React, { createContext, useState, useContext } from 'react';

// Creates chat context
export const ChatContext = createContext();

// Creates chat provider
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <ChatContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

// Makes a hook to use chat context
export const useChat = () => useContext(ChatContext);
