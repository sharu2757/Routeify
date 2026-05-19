import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Map, Heart, Settings, Calendar, MapPin, Camera } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const ProfileSection = () => {
  const { isAuthenticated, userEmail, setShowAuthModal } = useChat();
  const [activeTab, setActiveTab] = useState('itineraries');

  // Extract a display name from the email (e.g., suzain@email.com -> Suzain)
  const displayName = userEmail ? userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1) : 'Traveler';

  // Mock data for the UI
  const savedTrips = [
    { id: 1, title: '4-Day Heritage Tour', location: 'Belur & Hampi', date: 'Oct 12, 2026', image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, title: 'Monsoon Escape', location: 'Munnar, Kerala', date: 'Aug 05, 2026', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1000&auto=format&fit=crop' }
  ];

  if (!isAuthenticated) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <User className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Sign in to view your profile</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">Save your AI-generated itineraries, track your favorite destinations, and manage your travel preferences.</p>
        <button 
          onClick={() => setShowAuthModal(true)}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold shadow-lg transition-all active:scale-95"
        >
          Login / Sign Up
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto min-h-[80vh]">
      {/* Header Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-8 mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-20"></div>
        
        <div className="relative group cursor-pointer z-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 p-1 shadow-lg">
            <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold text-gray-700 dark:text-gray-200">
              {displayName.charAt(0)}
            </div>
          </div>
          <div className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full text-white shadow-md border-2 border-white dark:border-gray-900 group-hover:scale-110 transition-transform">
            <Camera className="w-4 h-4" />
          </div>
        </div>

        <div className="text-center md:text-left z-10">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Hi, {displayName}!</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{userEmail}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl font-semibold text-sm border border-emerald-100 dark:border-emerald-800">
              🗺️ 2 Trips Planned
            </div>
            <div className="px-4 py-2 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded-xl font-semibold text-sm border border-rose-100 dark:border-rose-800">
              ❤️ 12 Places Saved
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
        {[
          { id: 'itineraries', label: 'Saved Itineraries', icon: Map },
          { id: 'favorites', label: 'Favorite Spots', icon: Heart },
          { id: 'settings', label: 'Account Settings', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap
              ${activeTab === tab.id 
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md' 
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
      >
        {activeTab === 'itineraries' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTrips.map((trip) => (
              <div key={trip.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 group cursor-pointer hover:-translate-y-1 transition-all">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-gray-200 shadow-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {trip.date}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{trip.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-emerald-500" /> {trip.location}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Create New Trip Card */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border-2 border-dashed border-emerald-200 dark:border-emerald-800/50 flex flex-col items-center justify-center min-h-[300px] cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-colors group">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-800/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Map className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">Plan a New Route</h3>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
           <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
             <Heart className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No favorites yet</h3>
             <p className="text-gray-500 dark:text-gray-400">Save hotels, restaurants, and destinations while exploring the map.</p>
           </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 max-w-2xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
                <input type="text" defaultValue={displayName} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input type="email" defaultValue={userEmail} disabled className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed" />
              </div>
              <button className="mt-4 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:shadow-lg transition-all">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileSection;