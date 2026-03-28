import React, { useState, useEffect } from 'react'
import { Languages, Loader2, Bot, ChevronDown, Sparkles } from 'lucide-react'
import { useChat } from '../../context/ChatContext'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { translateText } from '../../services/geminiService'

const supportedLanguages = ['Hindi (हिन्दी)', 'Bengali (বাংলা)', 'Telugu (తెలుగు)', 'Tamil (தமிழ்)', 'Marathi (मराठी)', 'Gujarati (ગુજરાતી)', 'Kannada (ಕನ್ನಡ)', 'Malayalam (മലയാളം)', 'Punjabi (ਪੰਜਾਬੀ)', 'Odia (ଓଡ଼ିଆ)']

const TranslatorCanvas = () => {
  const { messages, isTyping } = useChat()
  const [selectedLang, setSelectedLang] = useState(supportedLanguages[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [translatedText, setTranslatedText] = useState("Select a language and click 'Translate' to view the AI's latest response.")
  const [isTranslating, setIsTranslating] = useState(false)

  const lastAiMessage = [...messages].reverse().find(m => m.type === 'assistant')

  useEffect(() => {
    if (lastAiMessage && lastAiMessage.id !== 1 && !isTyping) {
      setTranslatedText(`New response received! Click 'Translate'.`)
    } else if (lastAiMessage?.id === 1) {
      setTranslatedText("Select a language and click 'Translate'.")
    }
  }, [lastAiMessage?.id, isTyping])

  const handleTranslateClick = async () => {
    if (!lastAiMessage || isTyping) return;
    setIsTranslating(true)
    try {
      const result = await translateText(lastAiMessage.content, selectedLang)
      setTranslatedText(result)
    } catch (error) {
      setTranslatedText("Translation failed.")
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-emerald-900/30 overflow-hidden flex flex-col h-[500px] lg:h-[600px] w-full">
      
      <div className="px-6 py-5 border-b border-white/20 dark:border-gray-800 bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 dark:from-emerald-800 dark:via-green-700 dark:to-yellow-600 animate-gradient-x text-white flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hidden sm:flex shadow-inner border border-white/30">
            <Languages className="w-5 h-5 text-white drop-shadow-sm" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg tracking-tight drop-shadow-md">Live Translator</h3>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          
          <div className="relative group w-full sm:w-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full sm:w-44 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 rounded-full px-4 py-2 text-sm font-extrabold outline-none transition-all shadow-sm"
            >
              <span className="truncate pr-2">{selectedLang}</span>
              <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-full sm:w-48 bg-white dark:bg-emerald-950 border border-gray-100 dark:border-emerald-800 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="max-h-60 overflow-y-auto">
                    {supportedLanguages.map(lang => (
                      <button
                        key={lang}
                        onClick={() => {
                          setSelectedLang(lang);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
                          selectedLang === lang
                            ? 'bg-rose-50 dark:bg-emerald-900/80 text-rose-600 dark:text-yellow-400'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-emerald-800/50'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* 🚀 UPGRADED THEMED TRANSLATE BUTTON */}
          <button
            onClick={handleTranslateClick}
            disabled={isTranslating || isTyping || !lastAiMessage}
            className={`px-6 py-2.5 rounded-full text-sm font-extrabold transition-all duration-300 flex items-center justify-center min-w-[130px] border-none group ${
              isTranslating || isTyping || !lastAiMessage 
                ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed shadow-none' 
                : 'bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-600 dark:via-green-600 dark:to-yellow-500 hover:shadow-lg animate-gradient-x text-white hover:scale-105 active:scale-95'
            }`}
          >
            {isTranslating ? (
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            ) : (
              <div className="flex items-center space-x-1.5">
                <span>Translate</span>
                <Sparkles className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:rotate-12 text-white" />
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/30 dark:bg-gray-900/30 scroll-smooth" onClick={() => setIsDropdownOpen(false)}>
        <div className="flex justify-start">
          <div className="flex w-full">
            <div className="flex-shrink-0 mt-auto mr-3">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-md">
                <Bot className="w-4 h-4 text-rose-500 dark:text-emerald-500" />
              </div>
            </div>

            <div className="flex flex-col w-full max-w-[95%]">
              <div className={`p-5 rounded-[24px] rounded-bl-[4px] shadow-md border border-white/50 dark:border-gray-700 w-full overflow-hidden break-words transition-colors ${isTranslating ? 'bg-white/50 dark:bg-gray-800/50 animate-pulse backdrop-blur-md' : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md'}`}>
                {isTranslating ? (
                  <div className="flex flex-col items-center justify-center py-10 text-rose-400 dark:text-emerald-400">
                    <Loader2 className="w-8 h-8 animate-spin mb-4" />
                    <p className="font-bold tracking-tight">Translating...</p>
                  </div>
                ) : (
                  <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-rose-500 dark:prose-a:text-yellow-500 prose-p:leading-relaxed text-gray-800 dark:text-gray-100">
                    <ReactMarkdown>{translatedText}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TranslatorCanvas