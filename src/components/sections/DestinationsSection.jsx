import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Star, Heart, ArrowRight, Globe } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1935',
    price: '$899',
    rating: 4.9,
    reviews: 1243,
    description: 'Whitewashed buildings with blue domes overlooking the caldera',
    type: 'Beach & Romance'
  },
  {
    id: 2,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996192471-5f12c6af7d5e?q=80&w=1974',
    price: '$699',
    rating: 4.8,
    reviews: 2156,
    description: 'Tropical paradise with ancient temples and lush rice terraces',
    type: 'Adventure & Culture'
  },
  {
    id: 3,
    name: 'Swiss Alps, Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070',
    price: '$1299',
    rating: 4.9,
    reviews: 987,
    description: 'Majestic mountains and pristine lakes perfect for adventure',
    type: 'Mountain & Adventure'
  },
  {
    id: 4,
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070',
    price: '$1099',
    rating: 4.9,
    reviews: 1654,
    description: 'Ancient temples, traditional gardens, and cherry blossoms',
    type: 'Culture & History'
  },
  {
    id: 5,
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073',
    price: '$999',
    rating: 4.8,
    reviews: 3241,
    description: 'City of Love with iconic landmarks and world-class cuisine',
    type: 'Romance & Culture'
  },
  {
    id: 6,
    name: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070',
    price: '$1199',
    rating: 4.7,
    reviews: 2876,
    description: 'The city that never sleeps with endless attractions',
    type: 'Urban & Entertainment'
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
      transition: {
        staggerChildren: 0.1
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
    <section id="destinations" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">
            Popular <span className="gradient-text">Destinations</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Explore handpicked destinations recommended by our AI travel advisor
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs">
                    {destination.type}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors">
                  <Heart className="w-4 h-4 text-white" />
                </button>

                {/* Price Tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-2xl font-bold text-white">{destination.price}</span>
                  <span className="text-white/80 text-sm ml-1">/person</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
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

                  <button className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium text-sm group">
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
          className="text-center mt-10"
        >
          <button className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow">
            <Globe className="w-5 h-5 text-primary-500" />
            <span className="font-medium">View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default DestinationsSection