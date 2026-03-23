import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ChatProvider } from './context/ChatContext'
import HomePage from './pages/HomePage'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Loader from './components/ui/Loader'
import { useTheme } from './hooks/useTheme'
import './styles/globals.css'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {this.state.error?.toString()}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// ScrollToTop component
function ScrollToTop() {
  useEffect(() => {
    // Don't scroll to top on initial load if there's a hash
    if (!window.location.hash) {
      window.scrollTo(0, 0)
    }
  }, [])
  
  return null
}

// Wrapper component to expose chat functions globally
function GlobalChatWrapper({ children }) {
  return children
}

function AppContent() {
  const [loading, setLoading] = useState(true)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
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