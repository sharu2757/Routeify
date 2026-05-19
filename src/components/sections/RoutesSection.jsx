import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Map, Clock, Users, TrendingUp, ArrowRight, CheckCircle, Navigation } from 'lucide-react'

const routes = [
  {
    id: 1,
    name: 'The Golden Triangle',
    duration: '5 Days',
    locations: ['Delhi', 'Agra', 'Jaipur'],
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076',
    difficulty: 'Easy',
    rating: 4.9,
    travelers: 1243,
    highlights: ['Taj Mahal', 'Amber Fort', 'India Gate', 'Hawa Mahal'],
    price: '24,999'
  },
  {
    id: 2,
    name: 'Spiti Valley Circuit',
    duration: '9 Days',
    locations: ['Shimla', 'Kaza', 'Manali'],
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070',
    difficulty: 'Challenging',
    rating: 4.8,
    travelers: 856,
    highlights: ['Key Monastery', 'Chandratal Lake', 'Kunzum Pass', 'Pin Valley'],
    price: '18,500'
  },
  {
    id: 3,
    name: 'Malabar Coast Cruise',
    duration: '6 Days',
    locations: ['Kochi', 'Alleppey', 'Varkala'],
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070',
    difficulty: 'Relaxing',
    rating: 4.9,
    travelers: 1876,
    highlights: ['Houseboat Stay', 'Fort Kochi', 'Cliff Beaches', 'Tea Gardens'],
    price: '15,000'
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
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  }

  return (
    <section id="routes" ref={ref} className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Travel Routes</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Iconic Indian itineraries expertly designed to maximize your adventure.
          </p>
        </motion.div>

        {/* Routes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {routes.map((route) => (
            <motion.div
              key={route.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group bg-white dark:bg-[#111827] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Locations Path */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {route.locations.map((loc, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-bold shadow-lg"
                    >
                      {loc} {index < route.locations.length - 1 && '→'}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {route.name}
                </h3>

                {/* Route Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{route.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{route.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{route.travelers}+ Booked</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-4 h-4 text-rose-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{route.locations.length} Cities</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Top Highlights</p>
                  <div className="space-y-2">
                    {route.highlights.slice(0, 3).map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-black text-gray-900 dark:text-white">
                        ₹{route.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-1 font-medium">
                        /person
                      </span>
                    </div>
                  </div>

                  <button className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-md">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom Route Builder CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between relative z-10">
            <div className="mb-6 lg:mb-0 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">Create Your Custom Route</h3>
              <p className="opacity-90 text-blue-100 text-lg max-w-xl">Tell our AI your exact preferences, dates, and budget, and we'll build a perfectly personalized Indian itinerary.</p>
            </div>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-extrabold hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 transition-all flex items-center space-x-2">
              <Map className="w-5 h-5" />
              <span>Ask AI to Build Route</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default RoutesSection