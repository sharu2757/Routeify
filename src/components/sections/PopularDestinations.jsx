import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Star, Heart, ArrowRight } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1935',
    price: '$899',
    rating: 4.9,
    reviews: 1243,
    description: 'Whitewashed buildings with blue domes overlooking the caldera'
  },
  {
    id: 2,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996192471-5f12c6af7d5e?q=80&w=1974',
    price: '$699',
    rating: 4.8,
    reviews: 2156,
    description: 'Tropical paradise with ancient temples and lush rice terraces'
  },
  {
    id: 3,
    name: 'Swiss Alps, Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070',
    price: '$1299',
    rating: 4.9,
    reviews: 987,
    description: 'Majestic mountains and pristine lakes perfect for adventure'
  },
  {
    id: 4,
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070',
    price: '$1099',
    rating: 4.9,
    reviews: 1654,
    description: 'Ancient temples, traditional gardens, and cherry blossoms'
  }
]

const PopularDestinations = () => {
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
    <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Popular <span className="gradient-text">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore the world's most sought-after locations, handpicked by our travel experts
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Wishlist Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-colors"
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.button>

                {/* Price Tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-2xl font-bold text-white">{destination.price}</span>
                  <span className="text-white/80 text-sm ml-1">/person</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white">
                    {destination.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{destination.reviews} reviews</span>
                  </div>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium text-sm group"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:animate-pulse" />
                  </motion.button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 blur-xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
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
            <span>View All Destinations</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default PopularDestinations