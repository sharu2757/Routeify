import React from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users, ArrowRight } from 'lucide-react'

const HeroSection = () => {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-secondary-900/90 mix-blend-multiply" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070"
        >
          <source src="https://player.vimeo.com/external/370331467.sd.mp4?s=9635fdbd1e2b2a3f6b5c6b5d9b9b8b8b&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
          >
            <span className="text-white/90 text-sm">✨ AI-Powered Travel Assistant</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-display font-bold text-white max-w-4xl mx-auto leading-tight"
          >
            Discover Your Next
            <span className="block gradient-text">Adventure</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Personalized travel recommendations powered by AI. 
            Explore destinations, find hotels, plan your budget, and more.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={fadeInUp}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                {/* Destination */}
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                  <MapPin className="w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="bg-transparent border-none focus:outline-none text-white placeholder-white/60 w-full"
                  />
                </div>

                {/* Date */}
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                  <Calendar className="w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Dates"
                    className="bg-transparent border-none focus:outline-none text-white placeholder-white/60 w-full"
                  />
                </div>

                {/* Travelers */}
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                  <Users className="w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Travelers"
                    className="bg-transparent border-none focus:outline-none text-white placeholder-white/60 w-full"
                  />
                </div>

                {/* Search Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gradient-bg text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 hover-glow"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            {[
              { value: '500+', label: 'Destinations' },
              { value: '10k+', label: 'Happy Travelers' },
              { value: '4.9', label: 'Rating' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-display font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center"
        >
          <motion.div
            animate={{ height: [0, 15, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection