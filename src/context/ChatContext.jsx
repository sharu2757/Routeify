import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { generateAIResponse, initializeChat } from '../services/geminiService';

// 🔥 ADDED: Import Firebase Authentication tools + onAuthStateChanged
import { auth, googleProvider } from '../services/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const defaultGreeting = [
    {
      id: 1,
      type: 'assistant',
      content: `Namaste! I am **Routeify AI**, your personal travel advisor for Incredible India. 🇮🇳\n\nTo craft a perfect itinerary, just tell me a little bit about your trip:\n\n* 📍 **Where** do you want to go?\n* ⏳ **How many days** do you have?\n* 👥 **Who** is traveling?\n* 🎒 **What's your vibe**?\n\n*Just drop a quick message like: "I want to explore Goa for 3 days on a tight budget!"*`,
      timestamp: new Date().toISOString()
    }
  ];

  const [messages, setMessages] = useState(defaultGreeting);
  const [isTyping, setIsTyping] = useState(false);
  
  // Auth State
  const [user, setUser] = useState(null); // 🔥 ADDED: Holds full Google User data
  const [isAuthLoading, setIsAuthLoading] = useState(true); // 🔥 ADDED: Controls the loading spinner
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const [mapLocation, setMapLocation] = useState("India");
  const messagesEndRef = useRef(null);

  // 🚀 ON LOAD: Real-time Firebase Auth Listener
  useEffect(() => {
    // This officially waits for Firebase to confirm the user's status
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        setUserEmail(currentUser.email);
        
        // Sync with local storage to keep your existing logic intact
        localStorage.setItem('routeify_auth', 'true');
        localStorage.setItem('routeify_email', currentUser.email);
        
        fetchChatHistory(currentUser.email);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setUserEmail(null);
        initializeChat(); // Start fresh for guests
      }
      setIsAuthLoading(false); // 🔥 Tells the Profile page to stop spinning!
    });

    return () => unsubscribe();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 🌐 THE NETWORK FUNCTIONS
  const fetchChatHistory = async (email) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${email}`);
      const data = await response.json();
      
      if (data.success && data.messages && data.messages.length > 0) {
        setMessages(data.messages);
        
        // Re-initialize AI brain with this history
        const pastUserMessages = data.messages.filter(m => m.type === 'user').map(m => ({ role: 'user', parts: [{ text: m.content }] }));
        initializeChat(pastUserMessages);
      } else {
        setMessages(defaultGreeting);
        initializeChat();
      }
    } catch (error) {
      console.error("Failed to fetch from Cloud:", error);
      initializeChat();
    }
  };

  const saveChatHistory = async (email, updatedMessages) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/chats/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, messages: updatedMessages })
      });
    } catch (error) {
      console.error("Failed to save to Cloud:", error);
    }
  };

  // 🧹 Clear Conversation
  const clearConversation = () => {
    const freshStart = [
      {
        id: Date.now(),
        type: 'assistant',
        content: 'Conversation cleared. Where would you like to plan your next trip?',
        timestamp: new Date().toISOString()
      }
    ];
    setMessages(freshStart);
    initializeChat();
    
    if (isAuthenticated && userEmail) {
      saveChatHistory(userEmail, freshStart); // Wipe the DB history too
    }
  };

  // 💬 Send Message
  const sendMessage = async (userText) => {
    if (!userText.trim()) return;

    // The Friction Wall
    const userMessageCount = messages.filter(m => m.type === 'user').length;
    if (!isAuthenticated && userMessageCount >= 2) {
      setShowAuthModal(true);
      return; 
    }

    const newUserMsg = { id: Date.now(), type: 'user', content: userText, timestamp: new Date().toISOString() };
    
    // We create a temporary array to hold the conversation as it builds
    let currentConversation = [...messages, newUserMsg];
    setMessages(currentConversation);
    setIsTyping(true);

    try {
      const aiResponseText = await generateAIResponse(userText);
      
      let cleanText = aiResponseText;
      const mapMatch = aiResponseText.match(/\|MAP:\s*(.*?)\|/);
      
      if (mapMatch && mapMatch[1]) {
        setMapLocation(mapMatch[1]);
        cleanText = aiResponseText.replace(/\|MAP:\s*(.*?)\|/, '').trim(); 
      }

      const newAIMsg = { id: Date.now() + 1, type: 'assistant', content: cleanText, timestamp: new Date().toISOString() };
      
      currentConversation = [...currentConversation, newAIMsg];
      setMessages(currentConversation);

      // 🚀 SAVE TO MONGODB: If logged in, push this new conversation to the cloud
      if (isAuthenticated && userEmail) {
        saveChatHistory(userEmail, currentConversation);
      }

    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg = { id: Date.now() + 1, type: 'assistant', content: `System Error: ${error.message}`, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // 🔐 REAL GOOGLE LOGIN FLOW
  const login = async () => {
    try {
      // 1. Trigger the Google Popup
      const result = await signInWithPopup(auth, googleProvider);
      const realEmail = result.user.email; 
      
      // 2. Set the state
      setUser(result.user); // 🔥 ADDED: Save Google profile
      setIsAuthenticated(true);
      setUserEmail(realEmail);
      localStorage.setItem('routeify_auth', 'true');
      localStorage.setItem('routeify_email', realEmail);
      setShowAuthModal(false);

      // 3. Fetch their personal cloud memory using their real email
      await fetchChatHistory(realEmail);
      
    } catch (error) {
      console.error("Google Sign-In Failed:", error);
    }
  };

  // 🚪 REAL LOGOUT FLOW
  const logout = async () => {
    try {
      await signOut(auth); 
      setUser(null); // 🔥 ADDED
      setIsAuthenticated(false);
      setUserEmail(null);
      localStorage.removeItem('routeify_auth');
      localStorage.removeItem('routeify_email');
      setMessages(defaultGreeting); // Reset to guest mode
      initializeChat();
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  return (
    <ChatContext.Provider value={{ 
      messages, isTyping, sendMessage, scrollToBottom, clearConversation, messagesEndRef,
      showAuthModal, setShowAuthModal, isAuthenticated, login, logout, mapLocation,
      user, isAuthLoading // 🔥 EXPOSED TO GLOBAL APP
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};