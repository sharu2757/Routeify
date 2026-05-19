import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'
import { Utensils, Star, MapPin, ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react'

const foods = [
  {
    id: 1,
    name: 'Hyderabadi Biryani',
    location: 'Hyderabad, Telangana',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2010',
    rating: 4.9,
    reviews: 5243,
    description: 'Aromatic basmati rice layered with marinated meat and rich spices.',
    cuisine: 'Mughlai',
    price: '₹₹',
    type: 'Lunch/Dinner',
    timeToTry: 'Afternoon',
    recommendedBy: 'Local Chefs'
  },
  {
    id: 2,
    name: 'Crispy Masala Dosa',
    location: 'Bangalore & Chennai',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9de?q=80&w=2070',
    rating: 4.8,
    reviews: 4156,
    description: 'Thin rice crepe filled with spiced potato curry, served with chutneys.',
    cuisine: 'South Indian',
    price: '₹',
    type: 'Breakfast',
    timeToTry: 'Morning',
    recommendedBy: 'Street Vendors'
  },
  {
    id: 3,
    name: 'Authentic Butter Chicken',
    location: 'Delhi, NCR',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070',
    rating: 4.9,
    reviews: 3987,
    description: 'Tender chicken simmered in a rich, creamy tomato and butter gravy.',
    cuisine: 'Punjabi',
    price: '₹₹₹',
    type: 'Dinner',
    timeToTry: 'Evening',
    recommendedBy: 'Food Critics'
  },
  {
    id: 4,
    name: 'Spicy Pani Puri',
    location: 'Mumbai & Kolkata',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070',
    rating: 4.8,
    reviews: 6654,
    description: 'Crispy hollow puris filled with tangy, spicy tamarind water.',
    cuisine: 'Street Food',
    price: '₹',
    type: 'Snack',
    timeToTry: 'Evening',
    recommendedBy: 'Locals'
  },
  {
    id: 5,
    name: 'Kashmiri Rogan Josh',
    location: 'Srinagar, J&K',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1936',
    rating: 4.9,
    reviews: 1432,
    description: 'Aromatic lamb dish cooked with bold spices and Kashmiri chilies.',
    cuisine: 'Kashmiri',
    price: '₹₹₹',
    type: 'Dinner',
    timeToTry: 'Night',
    recommendedBy: 'Heritage Cooks'
  },
  {
    id: 6,
    name: 'Mumbai Vada Pav',
    location: 'Mumbai, Maharashtra',
    image: 'https://images.unsplash.com/photo-1567333126229-ea2a014e2154?q=80&w=2070',
    rating: 4.8,
    reviews: 8876,
    description: 'Spicy potato fritter sandwiched in a soft bun with garlic chutney.',
    cuisine: 'Street Food',
    price: '₹',
    type: 'Snack',
    timeToTry: 'Anytime',
    recommendedBy: 'Everyone'
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
    <section id="food" ref={ref} className="py-20 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Culinary <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Journey</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the rich, diverse flavors of incredible Indian cuisine.
          </p>
        </motion.div>

        {/* Embla Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4"> {/* Negative margin to offset padding */}
              {foods.map((food, index) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                >
                  <div className="group bg-white dark:bg-[#111827] rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 h-full flex flex-col">
                    
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      
                      {/* Cuisine Tag */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-bold shadow-sm">
                          {food.cuisine}
                        </span>
                      </div>

                      {/* Price Tag (₹₹₹) */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-orange-500/90 backdrop-blur-md rounded-full text-white text-xs font-black shadow-sm tracking-widest">
                          {food.price}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white text-sm font-bold">{food.rating}</span>
                        <span className="text-white/70 text-xs font-medium">({food.reviews})</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {food.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2 text-rose-500 mb-3 font-medium text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{food.location}</span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1 line-clamp-2">
                        {food.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
                          <Clock className="w-4 h-4 text-orange-400" />
                          <span>{food.timeToTry}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
                          <Users className="w-4 h-4 text-blue-400" />
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
            className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl items-center justify-center hover:scale-110 hover:text-orange-500 transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl items-center justify-center hover:scale-110 hover:text-orange-500 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Food Quiz CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full font-bold hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-105 transition-all">
            <Utensils className="w-5 h-5" />
            <span>Take the AI Food Quiz</span>
          </button>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4">
            Get personalized regional dish recommendations based on your spice tolerance!
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default FoodSection