import { createContext, useState, useEffect, useContext, useRef } from 'react';
// 🧠 Plugging the real API back in!
import { generateAIResponse, initializeChat } from '../services/geminiService';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Namaste! I am Routeify AI. Where would you like to travel in Incredible India, and who are you traveling with?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    initializeChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const clearConversation = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'assistant',
        content: 'Conversation cleared. Where would you like to plan your next trip?',
        timestamp: new Date()
      }
    ]);
    initializeChat(); 
  };

  const sendMessage = async (userText) => {
    if (!userText.trim()) return;

    const newUserMsg = {
      id: Date.now(),
      type: 'user',
      content: userText,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsTyping(true);

    try {
      // 🧠 Calling the REAL Google Gemini API
      const aiResponseText = await generateAIResponse(userText);
      
      const newAIMsg = {
        id: Date.now() + 1,
        type: 'assistant',
        content: aiResponseText, 
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, newAIMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg = {
        id: Date.now() + 1,
        type: 'assistant',
        content: `I'm having trouble connecting to the brain. \n\n**System Error:** \`${error.message || String(error)}\``,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      isTyping, 
      sendMessage, 
      scrollToBottom, 
      clearConversation, 
      messagesEndRef 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};