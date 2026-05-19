import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Star, Heart, ArrowRight, Globe } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070',
    price: '₹12,499',
    rating: 4.9,
    reviews: 3420,
    description: 'The Pink City offering majestic forts, vibrant bazaars, and royal palaces.',
    type: 'Heritage & Royal'
  },
  {
    id: 2,
    name: 'Munnar, Kerala',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2069',
    price: '₹8,999',
    rating: 4.8,
    reviews: 2156,
    description: 'Endless tea estates, misty hills, and tranquil backwaters of God’s Own Country.',
    type: 'Nature & Serenity'
  },
  {
    id: 3,
    name: 'Leh Ladakh',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070',
    price: '₹18,999',
    rating: 4.9,
    reviews: 1897,
    description: 'High-altitude deserts, crystal-clear lakes, and thrilling mountain passes.',
    type: 'Mountain & Adventure'
  },
  {
    id: 4,
    name: 'Varanasi, UP',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2076',
    price: '₹5,499',
    rating: 4.8,
    reviews: 4521,
    description: 'The spiritual capital of India, famous for its sacred ghats and Ganga Aarti.',
    type: 'Culture & History'
  },
  {
    id: 5,
    name: 'Andaman Islands',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2071',
    price: '₹22,999',
    rating: 4.9,
    reviews: 1243,
    description: 'Pristine white-sand beaches, coral reefs, and world-class scuba diving.',
    type: 'Beach & Romance'
  },
  {
    id: 6,
    name: 'Hampi, Karnataka',
    image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=2000',
    price: '₹6,499',
    rating: 4.7,
    reviews: 2876,
    description: 'Explore the mesmerizing boulder-strewn landscape and Vijayanagara ruins.',
    type: 'Ancient Ruins'
  }
]

const DestinationsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
    <section id="destinations" ref={ref} className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Destinations</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Explore handpicked Indian destinations recommended by our AI travel advisor.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group bg-white dark:bg-[#111827] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-bold shadow-lg">
                    {destination.type}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 p-2.5 bg-black/30 backdrop-blur-md rounded-full hover:bg-rose-500 hover:scale-110 transition-all duration-300 shadow-lg">
                  <Heart className="w-4 h-4 text-white" />
                </button>

                {/* Price Tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-2xl font-black text-white drop-shadow-md">{destination.price}</span>
                  <span className="text-white/80 text-sm font-medium ml-1">/person</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {destination.name}
                  </h3>
                  <div className="flex items-center space-x-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                    <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center space-x-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>{destination.reviews} reviews</span>
                  </div>

                  <button className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm group-hover:text-emerald-500 transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center space-x-2 px-8 py-3.5 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-full hover:shadow-xl hover:border-emerald-500/30 transition-all group">
            <Globe className="w-5 h-5 text-emerald-500" />
            <span className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">View All Destinations</span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default DestinationsSection