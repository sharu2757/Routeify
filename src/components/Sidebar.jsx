import { Link, useLocation } from 'react-router-dom';
import { useChat } from '../context/ChatContext'; 
// 🔥 FIX: Added 'X' to the import list here!
import { LogOut, Globe, MapPin, Hotel, Map as MapIcon, Utensils, User, LayoutDashboard, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { isAuthenticated, logout } = useChat();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Map', path: '/map', icon: <Globe className="w-5 h-5" /> },
    { name: 'Destinations', path: '/destinations', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Hotels', path: '/hotels', icon: <Hotel className="w-5 h-5" /> },
    { name: 'Routes', path: '/routes', icon: <MapIcon className="w-5 h-5" /> },
    { name: 'Food', path: '/food', icon: <Utensils className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> }, 
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>}

      <div className={`fixed top-0 left-0 h-full w-64 bg-[#0B1120] border-r border-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-emerald-500 flex items-center gap-2">
            Routeify <span className="text-white text-xs px-2 py-1 bg-gray-800 rounded-md">AI</span>
          </h2>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-emerald-400 transition-colors p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => { if(window.innerWidth < 768) setIsOpen(false) }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
                ${location.pathname === item.path 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-emerald-400 hover:pl-6'}`}
            >
              <span className={`${location.pathname === item.path ? 'text-yellow-400' : 'text-emerald-500'}`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        {isAuthenticated && (
          <div className="p-4 border-t border-gray-800">
            <button 
              onClick={() => { logout(); if(window.innerWidth < 768) setIsOpen(false); }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors font-bold"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default Sidebar;