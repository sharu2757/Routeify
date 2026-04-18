import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Moon, Sun, Compass, MessageSquare, MapPin, Hotel, Map as MapIcon, Utensils, Globe, Calculator } from 'lucide-react'

const Navbar = ({ toggleTheme, theme }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // 🛠️ FIX: Hides the underline completely when on the landing/hero section
      if (window.scrollY < 300) {
        setActiveSection('')
        return
      }
      
      // All sections including the new Converter
      const sections = ['map', 'converter', 'destinations', 'hotels', 'routes', 'food']
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Triggers when the section reaches the upper-middle of the screen
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    setIsOpen(false) // Close mobile menu first
    
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100) // Small delay prevents mobile browsers from cancelling the scroll
  }

  const scrollToTop = () => {
    setIsOpen(false)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection('')
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

  const navLinks = [
    { name: 'Map', section: 'map', icon: Globe },
    { name: 'Destinations', section: 'destinations', icon: MapPin },
    { name: 'Hotels', section: 'hotels', icon: Hotel },
    { name: 'Routes', section: 'routes', icon: MapIcon },
    { name: 'Food', section: 'food', icon: Utensils },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-emerald-950/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-emerald-900/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO (Clicking this also acts as a "Back to Home" button) */}
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

          {/* DESKTOP NAVIGATION LINKS */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = activeSection === link.section
              
              return (
                <button
                  key={link.section}
                  onClick={() => scrollToSection(link.section)}
                  className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center space-x-1.5 group ${
                    isActive
                      ? 'text-rose-600 dark:text-yellow-400 bg-rose-50 dark:bg-emerald-900/40'
                      : 'text-gray-700 dark:text-gray-200 hover:text-rose-500 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-emerald-800/30'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-rose-600 dark:text-yellow-400' : ''
                  }`} />
                  <span>{link.name}</span>
                  
                  {/* The active underline indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-400 dark:via-green-500 dark:to-yellow-400 rounded-t-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* DESKTOP RIGHT ACTIONS */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9, rotate: -15 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-gray-100/80 dark:bg-emerald-900/50 shadow-inner border border-gray-200 dark:border-emerald-800 transition-all"
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

          {/* MOBILE TOGGLE BUTTONS */}
          <div className="md:hidden flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-emerald-900 shadow-inner"
            >
              <motion.div animate={{ rotate: theme === 'dark' ? 360 : 0 }} transition={{ duration: 0.5 }}>
                {theme === 'light' ? <Moon className="w-5 h-5 text-indigo-600" /> : <Sun className="w-5 h-5 text-yellow-400" />}
              </motion.div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-emerald-800 transition-colors text-gray-700 dark:text-gray-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* MOBILE DROP-DOWN MENU */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white/95 dark:bg-emerald-950/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-emerald-900/50 shadow-2xl"
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-emerald-900/50 rounded-xl transition-colors"
              >
                <Icon className="w-5 h-5 text-rose-500 dark:text-yellow-500" />
                <span className="font-bold">{link.name}</span>
              </button>
            )
          })}
          
          <div className="pt-4 mt-2 border-t border-gray-200 dark:border-emerald-800/50">
            <button
              onClick={handleAskAI}
              className="w-full bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-600 dark:via-green-600 dark:to-yellow-500 text-white px-4 py-3 rounded-xl font-extrabold flex items-center justify-center space-x-2 shadow-lg animate-gradient-x"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat with Routeify AI</span>
            </button>
            <p className="text-xs text-center font-bold text-rose-500 dark:text-yellow-500 mt-4">
              ✨ Your Native AI Travel Companion
            </p>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar