import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-fuchsia-50 dark:from-emerald-950 dark:via-green-950 dark:to-yellow-950 animate-gradient-x transition-colors duration-500">
      
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-500 dark:via-green-500 dark:to-yellow-500 flex items-center justify-center shadow-2xl mb-6"
      >
        <Compass className="w-10 h-10 text-white" />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display font-extrabold text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-400 dark:via-green-500 dark:to-yellow-400"
      >
        Routeify
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 dark:text-gray-300 font-bold mt-2"
      >
        Loading your premium experience...
      </motion.p>
    </div>
  );
};

export default Loader;