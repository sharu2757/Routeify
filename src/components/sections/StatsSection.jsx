import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { MapPin, Hotel, TrendingUp, DollarSign, Globe, Users, Languages, Sparkles, Heart, Compass } from 'lucide-react'

const StatsSection = ({ stats }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (inView && !animated) {
      setAnimated(true)
    }
  }, [inView, animated])

  const statItems = [
    {
      icon: Compass,
      label: 'Destinations Explored',
      value: stats.destinationsExplored || 0,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Hotel,
      label: 'Hotels Recommended',
      value: stats.hotelsRecommended || 0,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: DollarSign,
      label: 'Budgets Calculated',
      value: stats.budgetCalculated || 0,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: TrendingUp,
      label: 'Trips Planned',
      value: stats.tripsPlanned || 0,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      icon: Sparkles,
      label: 'Hidden Gems Found',
      value: stats.hiddenGemsDiscovered || 0,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      icon: Languages,
      label: 'Languages Translated',
      value: stats.languagesTranslated || 0,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
    }
  ]

  if (stats.tripsPlanned === 0 && stats.destinationsExplored === 0) {
    return (
      <section ref={ref} className="py-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center"
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-2 text-primary-500" />
              Start chatting with Routeify AI to see your travel stats!
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h3 className="text-2xl font-display font-semibold mb-2">
            Your <span className="gradient-text">Travel Statistics</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Based on your conversations with Routeify AI
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${item.bgColor} rounded-xl p-4 text-center relative overflow-hidden group`}
            >
              {/* Animated background on hover */}
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10`}
              />
              
              <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${item.color} mb-3`}>
                <item.icon className="w-4 h-4 text-white" />
              </div>
              
              <div className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">
                {animated ? (
                  <CountUp 
                    end={item.value} 
                    duration={2}
                    separator=","
                  />
                ) : (
                  '0'
                )}
              </div>
              
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                {item.label}
              </p>

              {/* Decorative dot */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur" />
            </motion.div>
          ))}
        </div>

        {/* Recent Searches with Icons */}
        {stats.recentSearches && stats.recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Globe className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Recent explorations:</span>
              {stats.recentSearches.map((search, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center"
                >
                  <Heart className="w-3 h-3 mr-1 text-red-400" />
                  {search.length > 30 ? search.substring(0, 30) + '...' : search}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Motivational mini quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            "Every conversation brings you closer to your next adventure."
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection