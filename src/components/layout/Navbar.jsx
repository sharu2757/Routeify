import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Menu, X, Moon, Sun, Compass, MessageSquare, 
  LogOut, User, MapPin, Hotel, Map as MapIcon, Utensils, Globe 
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useChat } from '../../context/ChatContext'

const Navbar = ({ toggleTheme, theme, toggleSidebar, isSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  // Destructured all needed auth variables securely from the context
  const { isAuthenticated, user, userEmail, logout, setShowAuthModal } = useChat()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    setIsOpen(false)
    navigate('/') // Ensures we go to dashboard
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const handleAskAI = () => {
    setIsOpen(false)
    setTimeout(() => {
      if (window.scrollToChat) {
        window.scrollToChat()
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50' 
          : 'bg-transparent'
      }`}
    >
      {/* Container configured to push elements to absolute viewport boundaries */}
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT SIDE: Sidebar Toggle + Logo */}
          <div className="flex items-center gap-2 md:gap-4">
            {!isSidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                aria-label="Open Sidebar"
              >
                <Menu className="w-7 h-7" />
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 group"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-500 dark:via-green-600 dark:to-yellow-500 flex items-center justify-center shadow-lg"
              >
                <Compass className="w-6 h-6 text-white" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white/20 rounded-full blur-md -z-10"
                />
              </motion.div>
              <div className="flex items-center">
                <span className="text-2xl font-display font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-400 dark:via-green-500 dark:to-yellow-400">
                  Routeify
                </span>
                <span className="ml-1.5 text-[10px] bg-gradient-to-r from-rose-500 to-fuchsia-600 dark:from-green-500 dark:to-yellow-500 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                  AI
                </span>
              </div>
            </button>
          </div>

          {/* RIGHT SIDE (Desktop): Theme, Auth, Ask AI */}
          <div className="hidden md:flex items-center gap-3 lg:gap-5">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9, rotate: -15 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-gray-100/80 dark:bg-gray-800/50 shadow-inner border border-gray-200 dark:border-gray-700 transition-all"
              aria-label="Toggle theme"
            >
              <motion.div 
                initial={false} 
                animate={{ rotate: theme === 'dark' ? 360 : 0 }} 
                transition={{ duration: 0.6, ease: "backOut" }}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-indigo-600 drop-shadow-sm" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                )}
              </motion.div>
            </motion.button>

            {/* Auth & Profile Component Routing Logic */}
            {!isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAuthModal(true)}
                className="px-6 py-2.5 rounded-full text-sm font-extrabold text-white bg-gray-800 dark:bg-emerald-800 hover:bg-black dark:hover:bg-emerald-700 transition-all flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </motion.button>
            ) : (
              <Link to="/profile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pl-2 pr-4 py-1.5 rounded-full text-sm font-extrabold text-emerald-800 dark:text-emerald-100 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-800/60 transition-all flex items-center space-x-3 shadow-sm"
                >
                  <img 
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${userEmail?.split('@')[0] || 'User'}&background=10b981&color=fff`} 
                    alt="Profile" 
                    className="w-7 h-7 rounded-full border border-emerald-200 dark:border-emerald-600 object-cover"
                  />
                  <span className="max-w-[100px] truncate">{user?.displayName?.split(' ')[0] || userEmail?.split('@')[0]}</span>
                </motion.button>
              </Link>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAskAI}
              className="px-6 py-2.5 rounded-full text-sm font-extrabold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-600 dark:via-green-600 dark:to-yellow-500 hover:shadow-lg transition-all animate-gradient-x flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask AI</span>
            </motion.button>
          </div>

          {/* RIGHT SIDE (Mobile Menu Toggle) */}
          <div className="md:hidden flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-inner border border-gray-200 dark:border-gray-700"
            >
              <motion.div animate={{ rotate: theme === 'dark' ? 360 : 0 }} transition={{ duration: 0.5 }}>
                {theme === 'light' ? <Moon className="w-5 h-5 text-indigo-600" /> : <Sun className="w-5 h-5 text-yellow-400" />}
              </motion.div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
            >
              {isOpen ? <X size={26} /> : <User size={26} />} 
            </motion.button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 shadow-2xl"
      >
        <div className="px-4 py-4 space-y-2">
          
          {/* MOBILE PROFILE LINK (Only visible when logged in) */}
          {isAuthenticated && (
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 w-full px-4 py-3 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 rounded-xl transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="font-bold">My Profile</span>
            </Link>
          )}

          {/* MOBILE LOGIN / LOGOUT BUTTON */}
          <button
            onClick={() => {
              setIsOpen(false);
              isAuthenticated ? logout() : setShowAuthModal(true);
            }}
            className="flex items-center justify-center space-x-3 w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl transition-colors border border-gray-200 dark:border-gray-700"
          >
            {isAuthenticated ? <LogOut className="w-5 h-5 text-rose-500" /> : <User className="w-5 h-5 text-emerald-500" />}
            <span className="font-bold">{isAuthenticated ? 'Logout' : 'Login'}</span>
          </button>

          <div className="pt-2">
            <button
              onClick={handleAskAI}
              className="w-full bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-600 dark:via-green-600 dark:to-yellow-500 text-white px-4 py-3 rounded-xl font-extrabold flex items-center justify-center space-x-2 shadow-lg animate-gradient-x"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat with Routeify AI</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar