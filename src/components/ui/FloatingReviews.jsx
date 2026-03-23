import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const FloatingReviews = ({ reviews }) => {
  const [currentReview, setCurrentReview] = useState(null);

  useEffect(() => {
    // If no reviews are passed, do nothing
    if (!reviews || reviews.length === 0) return;

    const showRandomReview = () => {
      const randomReview = reviews[Math.floor(Math.random() * reviews.length)];
      setCurrentReview(randomReview);

      // Hide the review after 6 seconds
      setTimeout(() => {
        setCurrentReview(null);
      }, 6000);
    };

    // Trigger a random review popup every 20 seconds
    const interval = setInterval(showRandomReview, 20000);
    
    // Initial popup after 5 seconds
    const initialTimeout = setTimeout(showRandomReview, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [reviews]);

  return (
    <div className="fixed bottom-8 right-4 md:right-8 z-40 pointer-events-none flex flex-col items-end">
      <AnimatePresence>
        {currentReview && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white/90 dark:bg-emerald-950/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/50 dark:border-emerald-800 max-w-[280px] pointer-events-auto"
          >
            <div className="flex items-center space-x-3 mb-2">
              <img 
                src={currentReview.image} 
                alt={currentReview.name} 
                className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200 dark:border-emerald-700" 
              />
              <div>
                <h4 className="text-sm font-extrabold text-gray-900 dark:text-white leading-tight">
                  {currentReview.name}
                </h4>
                <div className="flex items-center mt-0.5 text-yellow-500">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current drop-shadow-sm" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-700 dark:text-emerald-100/90 font-bold italic leading-relaxed">
              "{currentReview.review}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingReviews;