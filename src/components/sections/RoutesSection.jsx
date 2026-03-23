import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Map, Clock, Users, TrendingUp, ArrowRight, CheckCircle, Globe } from 'lucide-react'

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
    name: 'Tropical Paradise',
    duration: '10 Days',
    countries: ['Maldives', 'Sri Lanka', 'Thailand'],
    image: 'https://images.unsplash.com/photo-1507525425510-1fad3fb0b9d6?q=80&w=2073',
    difficulty: 'Easy',
    rating: 4.9,
    travelers: 1876,
    highlights: ['Overwater Bungalows', 'Tea Plantations', 'Phi Phi Islands'],
    price: 2999
  }
]

const RoutesSection = () => {
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
    hidden: { y: 30, opacity: 0 },
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
    <section id="routes" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">
            Curated <span className="gradient-text">Travel Routes</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Multi-country itineraries designed by travel experts
          </p>
        </motion.div>

        {/* Routes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {routes.map((route) => (
            <motion.div
              key={route.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
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
              <div className="p-5">
                <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-3">
                  {route.name}
                </h3>

                {/* Route Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
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
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <span className="text-xl font-bold gradient-text">
                      ${route.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">
                      /person
                    </span>
                  </div>

                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
                    <span>View Route</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom Route Builder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 p-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-display font-semibold mb-2">Create Your Custom Route</h3>
              <p className="opacity-90">Tell our AI your preferences and we'll build a personalized itinerary</p>
            </div>
            <button className="px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center space-x-2">
              <Map className="w-5 h-5" />
              <span>Build Your Route</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default RoutesSection