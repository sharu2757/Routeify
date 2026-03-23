import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, Landmark, Utensils, Trees, ArrowRight } from 'lucide-react'

const cities = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073',
    icon: Landmark,
    description: 'City of Love & Lights',
    attractions: 'Eiffel Tower, Louvre, Seine River',
    cuisine: 'Croissants, Escargot, Macarons'
  },
  {
    id: 2,
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1887',
    icon: Building2,
    description: 'Tradition Meets Future',
    attractions: 'Shibuya, Senso-ji, Tokyo Tower',
    cuisine: 'Sushi, Ramen, Takoyaki'
  },
  {
    id: 3,
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070',
    icon: Building2,
    description: 'The City That Never Sleeps',
    attractions: 'Statue of Liberty, Times Square, Central Park',
    cuisine: 'Pizza, Bagels, Hot Dogs'
  },
  {
    id: 4,
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996',
    icon: Landmark,
    description: 'The Eternal City',
    attractions: 'Colosseum, Vatican, Trevi Fountain',
    cuisine: 'Pasta, Pizza, Gelato'
  },
  {
    id: 5,
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2070',
    icon: Trees,
    description: 'Gaudi\'s Masterpiece',
    attractions: 'Sagrada Familia, Park Güell, Gothic Quarter',
    cuisine: 'Paella, Tapas, Churros'
  },
  {
    id: 6,
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070',
    icon: Building2,
    description: 'City of Superlatives',
    attractions: 'Burj Khalifa, Palm Jumeirah, Desert Safari',
    cuisine: 'Shawarma, Hummus, Dates'
  }
]

const FamousCities = () => {
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
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
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
            Famous <span className="gradient-text">Cities</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the world's most iconic urban destinations
          </p>
        </motion.div>

        {/* Cities Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cities.map((city) => (
            <motion.div
              key={city.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-96">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-3"
                  >
                    <city.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* City Name */}
                  <h3 className="text-2xl font-display font-bold text-white mb-1">
                    {city.name}
                  </h3>
                  
                  {/* Country */}
                  <p className="text-white/80 text-sm mb-3">
                    {city.country} • {city.description}
                  </p>
                  
                  {/* Attractions Preview */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-white/70 text-sm">
                      <Landmark className="w-4 h-4" />
                      <span className="truncate">{city.attractions}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70 text-sm">
                      <Utensils className="w-4 h-4" />
                      <span className="truncate">{city.cuisine}</span>
                    </div>
                  </div>
                  
                  {/* Explore Button */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-2 text-white font-medium group"
                  >
                    <span>Explore City</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>

                {/* Hover Info Card (Desktop) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  <h4 className="text-white font-display font-semibold mb-2">Why visit?</h4>
                  <p className="text-white/80 text-sm mb-3">
                    Experience the perfect blend of culture, cuisine, and unforgettable moments.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">
                      #Travel
                    </span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">
                      #{city.name}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FamousCities