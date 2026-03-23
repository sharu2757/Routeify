import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Languages, X, ChevronDown, Copy, Check, Volume2 } from 'lucide-react'

const languages = [
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
]

const commonPhrases = [
  { english: "Hello", hindi: "नमस्ते" },
  { english: "Thank you", hindi: "धन्यवाद" },
  { english: "How much?", hindi: "कितना?" },
  { english: "Where is...?", hindi: "कहाँ है...?" },
  { english: "Delicious!", hindi: "स्वादिष्ट!" },
  { english: "Help!", hindi: "मदद!" },
  { english: "Good morning", hindi: "सुप्रभात" },
  { english: "Good evening", hindi: "शुभ संध्या" },
]

const LanguageTranslator = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('hi')
  const [showSourceDropdown, setShowSourceDropdown] = useState(false)
  const [showTargetDropdown, setShowTargetDropdown] = useState(false)
  const [copied, setCopied] = useState(false)

  // Simulate translation (in real app, this would call an API)
  const handleTranslate = () => {
    if (!sourceText.trim()) return
    
    // This is a mock translation - in production, you'd use Google Translate API or similar
    const mockTranslations = {
      hello: "नमस्ते",
      "thank you": "धन्यवाद",
      "how are you": "आप कैसे हैं",
      good: "अच्छा",
      bad: "बुरा",
      yes: "हाँ",
      no: "नहीं",
    }
    
    const lowerText = sourceText.toLowerCase().trim()
    let translation = mockTranslations[lowerText]
    
    if (!translation) {
      // Default mock translation
      translation = `[${targetLang === 'hi' ? 'हिन्दी' : 'Translated'}] ${sourceText}`
    }
    
    setTranslatedText(translation)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSpeak = (text, lang) => {
    // In production, use Web Speech API
    console.log('Speaking:', text, 'in', lang)
    // const utterance = new SpeechSynthesisUtterance(text)
    // utterance.lang = lang
    // window.speechSynthesis.speak(utterance)
  }

  return (
    <>
      {/* Translator Button - Always visible */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        title="Translate"
      >
        <Languages className="w-5 h-5" />
      </motion.button>

      {/* Translator Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute bottom-16 left-0 z-50 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Languages className="w-5 h-5" />
                <span className="font-medium">Language Translator</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Language Selection */}
            <div className="p-4 space-y-4">
              {/* Source Language */}
              <div className="relative">
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">From</label>
                <button
                  onClick={() => setShowSourceDropdown(!showSourceDropdown)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-between text-sm"
                >
                  <span>English</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showSourceDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSourceLang(lang.code)
                            setShowSourceDropdown(false)
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                        >
                          <span>{lang.name}</span>
                          <span className="ml-2 text-gray-500">{lang.native}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Target Language */}
              <div className="relative">
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">To</label>
                <button
                  onClick={() => setShowTargetDropdown(!showTargetDropdown)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-between text-sm"
                >
                  <span>Hindi</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showTargetDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setTargetLang(lang.code)
                            setShowTargetDropdown(false)
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                        >
                          <span>{lang.name}</span>
                          <span className="ml-2 text-gray-500">{lang.native}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input Text */}
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />

              {/* Translate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleTranslate}
                disabled={!sourceText.trim()}
                className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${
                  sourceText.trim()
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Translate
              </motion.button>

              {/* Translated Text */}
              {translatedText && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <p className="text-sm pr-16">{translatedText}</p>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      onClick={handleCopy}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleSpeak(translatedText, targetLang)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Common Phrases */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Common Phrases</p>
                <div className="flex flex-wrap gap-2">
                  {commonPhrases.slice(0, 4).map((phrase, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSourceText(phrase.english)
                        setTranslatedText(phrase.hindi)
                      }}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-full transition-colors"
                    >
                      {phrase.english}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Translate text to help you communicate better during your travels
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LanguageTranslator