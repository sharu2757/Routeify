import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Bot, User } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import ReactMarkdown from 'react-markdown';

const ChatInterface = () => {
  const { messages, isTyping, sendMessage, clearConversation, messagesEndRef } = useChat();
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-emerald-900/30 overflow-hidden flex flex-col h-[500px] lg:h-[600px] w-full">
      
      <div className="px-6 py-5 border-b border-white/20 dark:border-gray-800 flex items-center justify-between shrink-0 bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 dark:from-emerald-800 dark:via-green-700 dark:to-yellow-600 animate-gradient-x text-white shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/30">
            <Bot className="w-6 h-6 text-white drop-shadow-sm" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg tracking-tight drop-shadow-md">Routeify AI</h3>
            <div className="flex items-center text-xs font-semibold text-white/90">
              <span className="w-2 h-2 rounded-full bg-green-300 mr-1.5 animate-pulse shadow-[0_0_8px_#86efac]"></span>
              Online & Ready
            </div>
          </div>
        </div>
        
        {/* 🛠️ FIX: Trash icon ONLY shows if user has started chatting */}
        {messages.length > 1 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearConversation}
            className="p-2.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all"
            title="Clear Chat"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth bg-gray-50/30 dark:bg-gray-900/30">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className={`flex w-full ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 mt-auto ${msg.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                    msg.type === 'user' 
                    ? 'bg-gradient-to-br from-rose-500 to-fuchsia-600 dark:from-green-500 dark:to-emerald-700' 
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}>
                    {msg.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-rose-500 dark:text-emerald-500" />}
                  </div>
                </div>
                <div className={`p-4 shadow-md overflow-hidden break-words prose prose-sm dark:prose-invert leading-relaxed border 
                  ${msg.type === 'user' 
                    ? 'bg-gradient-to-br from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-700 dark:via-green-600 dark:to-yellow-600 animate-gradient-x text-white rounded-[24px] rounded-br-[4px] border-transparent prose-p:text-white' 
                    : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-800 dark:text-gray-100 rounded-[24px] rounded-bl-[4px] border-gray-100 dark:border-gray-700 prose-a:text-rose-500 dark:prose-a:text-yellow-500'
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start w-full">
            <div className="flex flex-row max-w-[85%]">
              <div className="flex-shrink-0 mt-auto mr-3">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-md">
                  <Bot className="w-4 h-4 text-rose-500 dark:text-emerald-500" />
                </div>
              </div>
              <div className="p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-[24px] rounded-bl-[4px] border border-gray-100 dark:border-gray-700 shadow-md flex items-center space-x-2">
                <motion.div className="w-2 h-2 bg-rose-400 dark:bg-emerald-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                <motion.div className="w-2 h-2 bg-fuchsia-400 dark:bg-green-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                <motion.div className="w-2 h-2 bg-purple-400 dark:bg-yellow-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about destinations, budgets..."
            disabled={isTyping}
            className="w-full pl-6 pr-16 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-rose-500 dark:focus:ring-emerald-500 outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 disabled:opacity-50 transition-all shadow-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-3 bg-gradient-to-r from-amber-500 to-rose-500 dark:from-emerald-500 dark:to-yellow-500 text-white rounded-full hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-md hover:shadow-[0_0_15px_rgba(244,63,94,0.5)] dark:hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center justify-center group"
          >
            <Send className="w-5 h-5 ml-0.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;