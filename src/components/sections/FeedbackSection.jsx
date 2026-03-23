import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Star, MessageSquareQuote } from 'lucide-react';

const FeedbackSection = () => {
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(null);

  return (
    <section className="py-8 px-4 bg-transparent flex justify-center relative z-20">
      <div className="max-w-2xl w-full bg-white/90 dark:bg-emerald-900/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/50 dark:border-emerald-800/50 shadow-xl">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600 dark:from-emerald-500 dark:via-green-600 dark:to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
            <MessageSquareQuote className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white">
            How was your experience?
          </h2>
          <p className="text-sm text-gray-500 dark:text-emerald-100/70 font-bold mt-1">
            Help us improve Routeify AI
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Star Rating */}
          <div className="flex justify-center space-x-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 transition-colors duration-200 ${
                    (hoveredStar || rating) >= star
                      ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea
              rows="3"
              placeholder="Tell us what you loved, or what we can do better..."
              className="w-full px-5 py-4 bg-gray-50/50 dark:bg-emerald-950/50 border border-gray-200 dark:border-emerald-800/50 rounded-2xl focus:ring-2 focus:ring-rose-500 dark:focus:ring-yellow-500 outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 text-sm font-medium resize-none transition-all shadow-inner"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-600 dark:via-green-600 dark:to-yellow-500 animate-gradient-x text-white rounded-xl font-extrabold text-sm shadow-lg flex items-center justify-center space-x-2 transition-all"
          >
            <span>Send Feedback</span>
            <Send className="w-4 h-4 ml-1" />
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackSection;