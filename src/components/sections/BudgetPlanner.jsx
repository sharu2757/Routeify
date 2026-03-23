import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { Wallet, Plane, Hotel, Utensils, Car, Camera, Coffee, Calculator, ArrowRight } from 'lucide-react'

const BudgetPlanner = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [budget, setBudget] = useState(5000)
  const [expenses, setExpenses] = useState({
    flights: 1200,
    hotel: 2000,
    food: 800,
    transport: 400,
    activities: 400,
    misc: 200
  })

  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0)
    setRemaining(budget - totalExpenses)
  }, [budget, expenses])

  const updateExpense = (category, value) => {
    setExpenses(prev => ({
      ...prev,
      [category]: Math.max(0, parseInt(value) || 0)
    }))
  }

  const expenseCategories = [
    { key: 'flights', label: 'Flights', icon: Plane, color: 'from-blue-500 to-cyan-500' },
    { key: 'hotel', label: 'Hotel', icon: Hotel, color: 'from-purple-500 to-pink-500' },
    { key: 'food', label: 'Food', icon: Utensils, color: 'from-orange-500 to-red-500' },
    { key: 'transport', label: 'Transport', icon: Car, color: 'from-green-500 to-emerald-500' },
    { key: 'activities', label: 'Activities', icon: Camera, color: 'from-yellow-500 to-amber-500' },
    { key: 'misc', label: 'Misc', icon: Coffee, color: 'from-indigo-500 to-purple-500' },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Plan Your <span className="gradient-text">Budget</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Interactive budget planner to help you manage your travel expenses
          </p>
        </motion.div>

        {/* Budget Planner Card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            {/* Total Budget Input */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Budget (USD)
              </label>
              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-xl font-semibold"
                  min="0"
                  step="100"
                />
              </div>
            </div>

            {/* Expenses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {expenseCategories.map((category) => (
                <motion.div
                  key={category.key}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {category.label}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={expenses[category.key]}
                    onChange={(e) => updateExpense(category.key, e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary-500"
                    min="0"
                    step="50"
                  />
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Expenses */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white"
              >
                <p className="text-sm opacity-90 mb-1">Total Expenses</p>
                <div className="text-3xl font-bold">
                  $<CountUp 
                    end={Object.values(expenses).reduce((a, b) => a + b, 0)} 
                    duration={2}
                    separator=","
                  />
                </div>
              </motion.div>

              {/* Remaining Budget */}
              <motion.div
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-r rounded-2xl p-6 text-white ${
                  remaining >= 0 
                    ? 'from-green-500 to-emerald-500' 
                    : 'from-red-500 to-pink-500'
                }`}
              >
                <p className="text-sm opacity-90 mb-1">Remaining</p>
                <div className="text-3xl font-bold">
                  $<CountUp 
                    end={Math.abs(remaining)} 
                    duration={2}
                    separator=","
                  />
                  {remaining < 0 && ' Over'}
                </div>
              </motion.div>

              {/* Daily Budget */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white"
              >
                <p className="text-sm opacity-90 mb-1">Daily Budget (7 days)</p>
                <div className="text-3xl font-bold">
                  $<CountUp 
                    end={Math.max(0, remaining / 7)} 
                    duration={2}
                    decimals={0}
                  />
                </div>
              </motion.div>
            </div>

            {/* Budget Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl"
            >
              <h4 className="font-display font-semibold text-lg mb-3 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-blue-500" />
                Budget Tips
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <span>Book flights 2-3 months in advance for best prices</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <span>Consider staying in hostels or Airbnb for longer trips</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <span>Eat where locals eat - better food, better prices</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <span>Use public transport instead of taxis</span>
                </li>
              </ul>
            </motion.div>

            {/* Save Plan Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 w-full py-4 gradient-bg text-white rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3 hover-glow"
            >
              <span>Save Budget Plan</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BudgetPlanner