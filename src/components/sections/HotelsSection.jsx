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

const HotelsSection = () => {
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
    <section id="hotels" ref={ref} className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">
            Recommended <span className="gradient-text">Hotels</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Curated accommodations based on your preferences
          </p>
        </motion.div>

        {/* Hotels Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors">
                    <Heart className="w-4 h-4 text-white" />
                  </button>

                  {/* Rating Badge */}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-white/20 backdrop-blur-md rounded-full">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-white text-xs font-semibold">{hotel.rating}</span>
                      <span className="text-white/80 text-xs">({hotel.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-5">
                  <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-1">
                    {hotel.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {hotel.description}
                  </p>

                  {/* Amenities */}
                  <div className="flex items-center space-x-2 mb-4">
                    {hotel.amenities.map((Amenity, index) => (
                      <div
                        key={index}
                        className="p-2 bg-white dark:bg-gray-800 rounded-lg"
                      >
                        <Amenity className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold gradient-text">
                        ${hotel.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">
                        /night
                      </span>
                    </div>

                    <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
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
            <span className="font-medium">View All Hotels</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default HotelsSection