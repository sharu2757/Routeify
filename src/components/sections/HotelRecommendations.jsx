import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, MapPin, Wifi, Coffee, ParkingCircle, Waves, Heart, ArrowRight } from 'lucide-react'

const hotels = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
    rating: 4.9,
    reviews: 1243,
    price: 299,
    amenities: [Wifi, Coffee, ParkingCircle, Waves],
    description: 'Luxury hotel in the heart of Paris with Eiffel Tower views'
  },
  {
    id: 2,
    name: 'Royal Orchid Resort',
    location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1582719508250-88b59358dc4b?q=80&w=2069',
    rating: 4.8,
    reviews: 2156,
    price: 189,
    amenities: [Wifi, Coffee, Waves, ParkingCircle],
    description: 'Beachfront paradise with private pools and spa'
  },
  {
    id: 3,
    name: 'Mountain View Lodge',
    location: 'Swiss Alps, Switzerland',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070',
    rating: 4.9,
    reviews: 987,
    price: 399,
    amenities: [Wifi, Coffee, ParkingCircle, Waves],
    description: 'Alpine retreat with breathtaking mountain views'
  },
  {
    id: 4,
    name: 'Zen Garden Ryokan',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070',
    rating: 4.9,
    reviews: 1654,
    price: 259,
    amenities: [Wifi, Coffee, Waves, ParkingCircle],
    description: 'Traditional Japanese inn with authentic experiences'
  }
]

const HotelRecommendations = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Luxury <span className="gradient-text">Hotel</span> Recommendations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Curated selection of the finest accommodations for your perfect stay
          </p>
        </motion.div>

        {/* Hotels Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-colors z-10"
                  >
                    <Heart className="w-5 h-5 text-white" />
                  </motion.button>

                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-semibold">{hotel.rating}</span>
                      <span className="text-white/80 text-sm">({hotel.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-6">
                  <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-2">
                    {hotel.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {hotel.description}
                  </p>

                  {/* Amenities */}
                  <div className="flex items-center space-x-3 mb-4">
                    {hotel.amenities.map((Amenity, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -2 }}
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                      >
                        <Amenity className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold gradient-text">
                        ${hotel.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">
                        /night
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-2 px-6 py-3 gradient-bg text-white rounded-full font-semibold hover-glow"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
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
            className="group inline-flex items-center space-x-3 px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-primary-500/20"
          >
            <span>View All Hotels</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default HotelRecommendations