import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock } from 'lucide-react';
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

              <button 
                onClick={login}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-extrabold shadow-md hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Continue with Email (Demo)</span>
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