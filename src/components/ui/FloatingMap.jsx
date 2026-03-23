import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map as MapIcon, Minimize2, Maximize2 } from 'lucide-react';

const FloatingMap = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* EXPANDED STATE: Full Screen Centered Modal */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Dark Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            
            {/* The Huge Map */}
            <motion.div
              layoutId="map-widget"
              className="relative w-full max-w-6xl h-[85vh] bg-gray-100 dark:bg-emerald-950 rounded-[2.5rem] shadow-2xl overflow-hidden z-10 border border-white/20 flex flex-col"
            >
              {/* Header Bar */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/70 to-transparent z-10 flex items-start pt-4 px-5 pointer-events-none">
                <div className="flex items-center space-x-2 text-white drop-shadow-md">
                  <div className="bg-rose-500 dark:bg-yellow-500 p-1.5 rounded-full shadow-sm">
                    <MapIcon className="w-4 h-4 text-white dark:text-emerald-900" />
                  </div>
                  <span className="font-extrabold text-base tracking-wide">Explore India Layers</span>
                </div>
              </div>

              {/* Close / Minimize Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 z-20 p-3 bg-rose-500 hover:bg-rose-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-full transition-all shadow-2xl hover:scale-110 active:scale-95"
                title="Minimize Map"
              >
                <Minimize2 className="w-5 h-5" />
              </button>

              {/* Interactive Google Map Embed (With Native Layers!) */}
              <div className="w-full h-full flex-1 bg-gray-200 dark:bg-gray-800">
                <iframe 
                  src="https://maps.google.com/maps?q=India&t=&z=5&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MINIMIZED STATE: Static in the Landing Page */}
      <motion.div
        layoutId="map-widget"
        className={`absolute top-28 right-4 lg:right-8 w-36 h-28 md:w-64 md:h-40 bg-white/90 dark:bg-emerald-950/90 backdrop-blur-xl shadow-xl rounded-2xl md:rounded-3xl overflow-hidden border-2 border-white/80 dark:border-emerald-700 z-30 group ${
          isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/60 to-transparent z-10 flex items-start pt-2 px-3 pointer-events-none">
          <div className="flex items-center space-x-1.5 text-white drop-shadow-md">
            <div className="bg-rose-500 dark:bg-yellow-500 p-1 rounded-full">
              <MapIcon className="w-3 h-3 text-white dark:text-emerald-900" />
            </div>
            <span className="font-extrabold text-xs tracking-wide hidden md:inline">Explore Map</span>
          </div>
        </div>

        {/* Map Iframe - Disabled pointer events so it doesn't trap scrolling */}
        <div className="w-full h-full pointer-events-none opacity-90">
          <iframe 
            src="https://maps.google.com/maps?q=India&t=&z=5&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            loading="lazy" 
            className="w-full h-full object-cover scale-[1.2]"
          ></iframe>
        </div>

        {/* BOTTOM RIGHT EXPAND BUTTON (The ONLY way to expand the map) */}
        <button
          onClick={() => setIsExpanded(true)}
          className="absolute bottom-2 right-2 z-20 p-2 md:p-2.5 bg-white dark:bg-emerald-900 hover:bg-rose-500 dark:hover:bg-yellow-500 hover:text-white text-gray-800 dark:text-gray-100 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
          title="Expand Map"
        >
          <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </motion.div>
    </>
  );
};

export default FloatingMap;