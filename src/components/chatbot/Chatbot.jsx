import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'
import { chatbotResponses } from '../../data/chatbotData'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: "👋 Hi! I'm your Routeify travel assistant. How can I help you plan your next adventure?", timestamp: new Date() }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage = {
      type: 'user',
      text: inputText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputText)
      setMessages(prev => [...prev, {
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      }])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase()
    
    // Check for matches in predefined responses
    for (const [key, response] of Object.entries(chatbotResponses)) {
      if (input.includes(key)) {
        return response
      }
    }
    
    // Default response
    return chatbotResponses.default
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestions = [
    "Popular destinations",
    "Budget for Paris",
    "Best hotels in Tokyo",
    "Food recommendations",
    "Travel tips"
  ]

  return (
    <>
      {/* Chat button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 gradient-bg text-white rounded-full shadow-2xl hover-glow ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] glass-card rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="gradient-bg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-6 h-6 text-white" />
                <div>
                  <h3 className="font-display font-semibold text-white">Routeify Assistant</h3>
                  <p className="text-xs text-white/80">AI Travel Guide</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={20} className="text-white" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="h-[calc(100%-120px)] overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-2' : 'mr-2'}`}>
                      {message.type === 'user' ? (
                        <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center">
                          <Bot size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className={`p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'gradient-bg text-white rounded-tr-none'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-none shadow-md'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex flex-row">
                    <div className="mr-2">
                      <div className="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center">
                        <Bot size={16} className="text-white" />
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-md">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-primary-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                          className="w-2 h-2 bg-primary-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-primary-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles size={14} className="text-primary-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Suggestions:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setInputText(suggestion)
                      handleSendMessage()
                    }}
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className={`p-2 rounded-full ${
                    inputText.trim()
                      ? 'gradient-bg text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot