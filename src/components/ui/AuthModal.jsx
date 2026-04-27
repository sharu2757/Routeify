import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const AuthModal = () => {
  const { showAuthModal, setShowAuthModal, login } = useChat();

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white dark:bg-emerald-950 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden border border-gray-200 dark:border-emerald-800 relative"
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-emerald-900 rounded-full hover:bg-rose-100 dark:hover:bg-rose-500 hover:text-rose-600 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-rose-500 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg transform rotate-12">
                <Lock className="w-8 h-8 text-white -rotate-12" />
              </div>
              
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                Save Your Itinerary
              </h2>
              <p className="text-sm font-bold text-gray-500 dark:text-emerald-100/70 mb-8">
                You've reached the guest limit! Create a free account to unlock unlimited AI planning and save your trips forever.
              </p>

              {/* 🔥 UPDATED: Professional Google Login Button */}
              <button 
                onClick={login}
                className="w-full py-3.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl font-extrabold shadow-md hover:shadow-xl transition-all flex items-center justify-center space-x-3"
              >
                {/* Official Google SVG Logo */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Continue with Google</span>
              </button>
              
              <p className="text-xs font-bold text-gray-400 mt-6">
                By continuing, you agree to Routeify's Terms of Service.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;