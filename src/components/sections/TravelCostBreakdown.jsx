import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Calendar, Map } from 'lucide-react'

const costBreakdown = [
  { name: 'Accommodation', value: 1200, color: '#3b82f6' },
  { name: 'Flights', value: 800, color: '#8b5cf6' },
  { name: 'Food', value: 600, color: '#ec4899' },
  { name: 'Activities', value: 400, color: '#f59e0b' },
  { name: 'Transport', value: 300, color: '#10b981' },
  { name: 'Misc', value: 200, color: '#6b7280' }
]

const monthlyTrends = [
  { month: 'Jan', cost: 2100, bookings: 120 },
  { month: 'Feb', cost: 2300, bookings: 150 },
  { month: 'Mar', cost: 2800, bookings: 200 },
  { month: 'Apr', cost: 2600, bookings: 180 },
  { month: 'May', cost: 3200, bookings: 240 },
  { month: 'Jun', cost: 3800, bookings: 300 },
  { month: 'Jul', cost: 4200, bookings: 380 },
  { month: 'Aug', cost: 4100, bookings: 360 },
  { month: 'Sep', cost: 3500, bookings: 280 },
  { month: 'Oct', cost: 2900, bookings: 220 },
  { month: 'Nov', cost: 2400, bookings: 160 },
  { month: 'Dec', cost: 3900, bookings: 320 }
]

const cityComparisons = [
  { city: 'Paris', cost: 2800, savings: 300 },
  { city: 'Tokyo', cost: 3200, savings: 200 },
  { city: 'New York', cost: 3500, savings: 400 },
  { city: 'Bali', cost: 1800, savings: 500 },
  { city: 'Rome', cost: 2400, savings: 350 },
  { city: 'Bangkok', cost: 1600, savings: 600 }
]

const TravelCostBreakdown = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const totalCost = costBreakdown.reduce((sum, item) => sum + item.value, 0)

  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Travel Cost <span className="gradient-text">Breakdown</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Detailed analytics to help you understand and optimize your travel expenses
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart - Cost Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-display font-semibold mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-primary-500" />
              Cost Distribution
            </h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {costBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.9)', 
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {costBreakdown.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                  <span className="text-sm font-semibold ml-auto">${item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Cost</span>
                <span className="text-3xl font-bold gradient-text">${totalCost}</span>
              </div>
            </div>
          </motion.div>

          {/* Bar Chart - City Comparisons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-display font-semibold mb-6 flex items-center">
              <Map className="w-6 h-6 mr-2 text-primary-500" />
              City Cost Comparison
            </h3>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityComparisons}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="city" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="cost" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="savings" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Average Cost</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Potential Savings</span>
              </div>
            </div>
          </motion.div>

          {/* Line Chart - Monthly Trends */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-display font-semibold mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-primary-500" />
              Monthly Travel Trends
            </h3>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis yAxisId="left" stroke="#9CA3AF" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="cost"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="bookings"
                    stroke="#ec4899"
                    strokeWidth={3}
                    dot={{ fill: '#ec4899', r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center space-x-8 mt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Peak Season: July-August</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Best Deals: January-February</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Insights Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 p-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl text-white"
        >
          <h4 className="text-2xl font-display font-semibold mb-4">💡 Smart Travel Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold mb-2">32%</p>
              <p className="opacity-90">Average savings when booking 3 months in advance</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-2">$450</p>
              <p className="opacity-90">Average daily budget for luxury travelers</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-2">15+</p>
              <p className="opacity-90">Cities analyzed for best value stays</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TravelCostBreakdown