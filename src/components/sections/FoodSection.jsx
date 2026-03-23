import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'
import { Utensils, Star, MapPin, Heart, ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react'

const foods = [
  {
    id: 1,
    name: 'Authentic Italian Pasta',
    location: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2132',
    rating: 4.9,
    reviews: 1243,
    description: 'Hand-made pasta with authentic Italian recipes',
    cuisine: 'Italian',
    price: '$$',
    type: 'Dinner',
    timeToTry: 'Evening',
    recommendedBy: 'Local Chefs'
  },
  {
    id: 2,
    name: 'Fresh Sushi Platter',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=2125',
    rating: 4.8,
    reviews: 2156,
    description: 'Premium fresh fish and traditional Japanese techniques',
    cuisine: 'Japanese',
    price: '$$$',
    type: 'Lunch/Dinner',
    timeToTry: 'Lunch',
    recommendedBy: 'Michelin Guide'
  },
  {
    id: 3,
    name: 'French Croissant',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2026',
    rating: 4.9,
    reviews: 987,
    description: 'Buttery, flaky perfection from local bakeries',
    cuisine: 'French',
    price: '$',
    type: 'Breakfast',
    timeToTry: 'Morning',
    recommendedBy: 'Locals'
  },
  {
    id: 4,
    name: 'Thai Street Food',
    location: 'Bangkok, Thailand',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2070',
    rating: 4.8,
    reviews: 1654,
    description: 'Spicy and aromatic traditional Thai dishes',
    cuisine: 'Thai',
    price: '$',
    type: 'Street Food',
    timeToTry: 'Evening',
    recommendedBy: 'Food Bloggers'
  },
  {
    id: 5,
    name: 'Spanish Paella',
    location: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=2070',
    rating: 4.9,
    reviews: 1432,
    description: 'Traditional saffron rice dish with seafood',
    cuisine: 'Spanish',
    price: '$$',
    type: 'Lunch',
    timeToTry: 'Afternoon',
    recommendedBy: 'Local Families'
  },
  {
    id: 6,
    name: 'Indian Curry Feast',
    location: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1936',
    rating: 4.8,
    reviews: 1876,
    description: 'Rich and aromatic Indian curries with naan',
    cuisine: 'Indian',
    price: '$$',
    type: 'Dinner',
    timeToTry: 'Evening',
    recommendedBy: 'Street Food Vendors'
  }
]

const FoodSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: true
  })

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <section id="food" ref={ref} className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">
            Food to <span className="gradient-text">Try</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Discover authentic local cuisines recommended by our AI
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {foods.map((food, index) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 first:pl-0"
                >
                  <div className="group bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 mx-2">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Cuisine Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs">
                          {food.cuisine}
                        </span>
                      </div>

                      {/* Price Tag */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold">
                          {food.price}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute bottom-3 left-3 flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-white text-xs font-semibold">{food.rating}</span>
                        <span className="text-white/80 text-xs">({food.reviews})</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-base font-display font-semibold text-gray-900 dark:text-white mb-1">
                        {food.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{food.location}</span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">
                        {food.description}
                      </p>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{food.timeToTry}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                          <Users className="w-3 h-3" />
                          <span>{food.recommendedBy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Food Quiz */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <button className="inline-flex items-center space-x-2 px-6 py-3 gradient-bg text-white rounded-xl font-semibold hover:shadow-lg transition-shadow">
            <Utensils className="w-5 h-5" />
            <span>Take Food Quiz</span>
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            Get personalized food recommendations based on your taste
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default FoodSection