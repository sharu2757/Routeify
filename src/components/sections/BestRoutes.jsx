import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Map, Globe, Clock, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react'

const routes = [
  {
    id: 1,
    name: 'European Explorer',
    duration: '14 Days',
    countries: ['France', 'Italy', 'Switzerland', 'Spain'],
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070',
    difficulty: 'Moderate',
    rating: 4.9,
    travelers: 1243,
    highlights: ['Eiffel Tower', 'Colosseum', 'Swiss Alps', 'Sagrada Familia'],
    price: 2499
  },
  {
    id: 2,
    name: 'Asian Adventure',
    duration: '12 Days',
    countries: ['Thailand', 'Japan', 'Singapore', 'Vietnam'],
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2092',
    difficulty: 'Challenging',
    rating: 4.8,
    travelers: 2156,
    highlights: ['Bangkok Temples', 'Tokyo Tower', 'Marina Bay', 'Halong Bay'],
    price: 1999
  },
  {
    id: 3,
    name: 'American Odyssey',
    duration: '21 Days',
    countries: ['USA', 'Canada', 'Mexico'],
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070',
    difficulty: 'Moderate',
    rating: 4.9,
    travelers: 987,
    highlights: ['Grand Canyon', 'Niagara Falls', 'Chichen Itza', 'New York City'],
    price: 3299
  }
]

const BestRoutes = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <section className="py-24 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Best <span className="gradient-text">Travel Routes</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Curated multi-country itineraries for unforgettable adventures
          </p>
        </motion.div>

        {/* Routes Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {routes.map((route) => (
            <motion.div
              key={route.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Countries */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
                  {route.countries.map((country, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-3">
                  {route.name}
                </h3>

                {/* Route Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{route.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{route.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{route.travelers}+</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{route.countries.length} countries</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Highlights:</p>
                  <div className="space-y-1">
                    {route.highlights.slice(0, 3).map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <span className="text-3xl font-bold gradient-text">
                      ${route.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">
                      /person
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-full text-sm font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                  >
                    <span>View Route</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Interactive Route Map Preview */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: 80 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-500/90 to-transparent p-4 overflow-hidden"
              >
                <div className="flex items-center space-x-2 text-white">
                  <Map className="w-5 h-5" />
                  <span className="text-sm font-medium">Interactive route map available</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Routes Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center space-x-3 px-8 py-4 gradient-bg text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <span>Explore All Routes</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default BestRoutes