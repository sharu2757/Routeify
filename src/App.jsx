import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ChatProvider } from './context/ChatContext'
import { useTheme } from './hooks/useTheme'
import './styles/globals.css'

// Layout & UI Imports
import HomePage from './pages/HomePage'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Sidebar from './components/Sidebar'
import Loader from './components/ui/Loader'

// 🔥 Section Component Imports
import MapSection from './components/sections/MapSection'
import DestinationsSection from './components/sections/DestinationsSection'
import HotelsSection from './components/sections/HotelsSection'
import RoutesSection from './components/sections/RoutesSection'
import FoodSection from './components/sections/FoodSection'
import ProfileSection from './components/sections/ProfileSection' // <-- NEW!

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  componentDidCatch(error, errorInfo) { console.error('Error:', error, errorInfo) }
  render() {
    if (this.state.hasError) return (
      <div className="p-10 text-center text-red-500 font-bold">
        Something went wrong. Please reload the page.
      </div>
    )
    return this.props.children
  }
}

function ScrollToTop() {
  useEffect(() => { if (!window.location.hash) window.scrollTo(0, 0) }, [])
  return null
}

function GlobalChatWrapper({ children }) {
  return children
}

function AppContent() {
  const [loading, setLoading] = useState(true)
  const { theme, toggleTheme } = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />

  return (
    <Router>
      <ScrollToTop />
      
      <div className={`flex min-h-screen bg-gray-50 dark:bg-[#0B1120] ${theme === 'dark' ? 'dark' : ''}`}>
        
        {/* Sidebar Component */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Wrapper */}
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 w-full overflow-hidden ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
          
          <Navbar 
            toggleTheme={toggleTheme} 
            theme={theme} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            isSidebarOpen={isSidebarOpen} 
          />
          
          {/* Main Content Area */}
          <main className="flex-1 p-6 md:p-10 pt-24">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                
                {/* 🔥 REAL COMPONENTS */}
                <Route path="/destinations" element={<DestinationsSection />} />
                <Route path="/hotels" element={<HotelsSection />} />
                <Route path="/routes" element={<RoutesSection />} />
                <Route path="/food" element={<FoodSection />} />
                
                {/* 🗺️ MAP & PROFILE */}
                <Route path="/map" element={<MapSection />} />
                <Route path="/profile" element={<ProfileSection />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          <Footer />
        </div>
      </div>
    </Router>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <ChatProvider>
        <GlobalChatWrapper>
          <AppContent />
        </GlobalChatWrapper>
      </ChatProvider>
    </ErrorBoundary>
  )
}

export default App