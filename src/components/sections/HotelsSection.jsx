import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, MapPin, Wifi, Coffee, ParkingCircle, Waves, Heart, ArrowRight } from 'lucide-react'

const hotels = [
  {
    id: 1,
    name: 'Taj Lake Palace',
    location: 'Udaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=2070',
    rating: 5.0,
    reviews: 1243,
    price: '35,000',
    amenities: [Wifi, Coffee, ParkingCircle, Waves],
    description: 'A magnificent marble palace floating on the serene waters of Lake Pichola.'
  },
  {
    id: 2,
    name: 'The Oberoi Amarvilas',
    location: 'Agra, UP',
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?q=80&w=2070',
    rating: 4.9,
    reviews: 2156,
    price: '28,500',
    amenities: [Wifi, Coffee, Waves, ParkingCircle],
    description: 'Unrivaled luxury offering uninterrupted views of the iconic Taj Mahal.'
  },
  {
    id: 3,
    name: 'Evolve Back Resort',
    location: 'Coorg, Karnataka',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
    rating: 4.8,
    reviews: 987,
    price: '18,200',
    amenities: [Wifi, Coffee, ParkingCircle, Waves],
    description: 'Set amidst 300 acres of working coffee and spice plantations.'
  },
  {
    id: 4,
    name: 'Kumarakom Lake Resort',
    location: 'Kerala Backwaters',
    image: 'https://images.unsplash.com/photo-1582719508250-88b59358dc4b?q=80&w=2069',
    rating: 4.9,
    reviews: 1654,
    price: '22,000',
    amenities: [Wifi, Coffee, Waves, ParkingCircle],
    description: 'Heritage luxury featuring traditional Kerala architecture and private pools.'
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
      transition: { staggerChildren: 0.15 }
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
    <section id="hotels" ref={ref} className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">Stays</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Rest in luxury with our highly-rated hotel partners across India.
          </p>
        </motion.div>

        {/* Hotels Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-[#111827] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300"
            >
              <div className="flex flex-col xl:flex-row h-full">
                {/* Image Section */}
                <div className="relative xl:w-2/5 h-56 xl:h-auto overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-md rounded-full hover:bg-rose-500 hover:scale-110 transition-all shadow-lg z-10">
                    <Heart className="w-4 h-4 text-white" />
                  </button>

                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="flex items-center space-x-1 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-white text-sm font-bold">{hotel.rating}</span>
                      <span className="text-white/70 text-xs">({hotel.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent xl:hidden" />
                </div>

                {/* Content Section */}
                <div className="xl:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                      {hotel.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-4 font-medium text-sm">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      <span>{hotel.location}</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">
                      {hotel.description}
                    </p>

                    {/* Amenities */}
                    <div className="flex items-center space-x-3 mb-6">
                      {hotel.amenities.map((Amenity, index) => (
                        <div
                          key={index}
                          className="p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50"
                        >
                          <Amenity className="w-4 h-4 text-amber-500" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-end justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Starting from</p>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-black text-gray-900 dark:text-white">
                          ₹{hotel.price}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm ml-1 font-medium">
                          /night
                        </span>
                      </div>
                    </div>

                    <button className="flex items-center space-x-2 px-5 py-2.5 bg-gray-900 dark:bg-amber-600 text-white rounded-xl text-sm font-bold hover:bg-black dark:hover:bg-amber-500 transition-colors shadow-md">
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
          className="text-center mt-12"
        >
          <button className="inline-flex items-center space-x-2 px-8 py-3.5 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-full hover:shadow-xl transition-all group">
            <span className="font-bold text-gray-900 dark:text-white">Explore All Stays</span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default HotelsSection