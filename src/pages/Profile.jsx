import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Map, Settings, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

const Profile = () => {
  const { user, logout } = useChat(); // Pulling user and logout from your context
  const navigate = useNavigate();

  // If someone tries to visit /profile without being logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-emerald-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">You are not logged in</h2>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      if (logout) await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-emerald-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-emerald-900 rounded-[2rem] p-8 shadow-xl border border-gray-100 dark:border-emerald-800 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

          <img 
            src={user.photoURL || "https://ui-avatars.com/api/?name=" + (user.displayName || "User") + "&background=10b981&color=fff"} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-emerald-100 dark:border-emerald-700 shadow-md object-cover z-10"
          />
          
          <div className="flex-1 text-center md:text-left z-10">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {user.displayName || "Traveler"}
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center justify-center md:justify-start gap-2">
              {user.email}
            </p>
          </div>

          <button 
            onClick={handleLogout}
            className="z-10 flex items-center gap-2 px-6 py-3 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl font-bold hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </motion.div>

        {/* Saved Trips Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-emerald-900 rounded-[2rem] p-8 shadow-xl border border-gray-100 dark:border-emerald-800"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-xl text-emerald-600 dark:text-emerald-300">
              <Map className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Itineraries</h2>
          </div>

          {/* Placeholder for future trips from MongoDB */}
          <div className="grid gap-4">
            <div className="p-5 border border-dashed border-gray-300 dark:border-emerald-700 rounded-2xl flex items-center justify-between group hover:border-emerald-500 transition-colors cursor-pointer bg-gray-50/50 dark:bg-emerald-950/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-emerald-800 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-gray-400 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Start planning your first trip!</h3>
                  <p className="text-sm text-gray-500 dark:text-emerald-200/70">Your saved AI itineraries will appear here.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;