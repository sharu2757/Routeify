import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Loader2, Layers, Map as MapIcon, Globe, Moon } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 

// 🔥 Glowing Custom Blue Dot
const blueDotIcon = new L.divIcon({
  className: 'bg-transparent border-none',
  html: `
    <div class="relative flex items-center justify-center w-6 h-6 -ml-3 -mt-3">
      <div class="w-4 h-4 bg-blue-500 rounded-full border-[2.5px] border-white shadow-[0_0_15px_rgba(59,130,246,0.9)] z-20"></div>
      <div class="absolute w-12 h-12 bg-blue-400 rounded-full animate-ping opacity-40 z-10"></div>
    </div>
  `,
  iconSize: [0, 0],
});

// 🔥 RENAMED: "Street View" is now "Default Map"
const MAP_LAYERS = {
  default: {
    name: 'Default Map',
    icon: MapIcon,
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  },
  satellite: {
    name: 'Satellite',
    icon: Globe,
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri'
  },
  dark: {
    name: 'Dark Mode',
    icon: Moon,
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; CARTO'
  }
};

const MapSection = () => {
  const defaultCenter = [20.5937, 78.9629];
  const [position, setPosition] = useState(null); 
  const [locating, setLocating] = useState(false);
  
  const [activeLayerKey, setActiveLayerKey] = useState('default');
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const menuRef = useRef(null);
  
  // 🔥 NEW: Storing the map instance so we can control the camera without resetting React state
  const [map, setMap] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLayerMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const handleLocateMe = () => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPos);
          setLocating(false);
          
          // Smoothly fly to location directly using the Leaflet instance
          if (map) {
            map.flyTo(newPos, 15, { duration: 1.5, easeLinearity: 0.25 });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please check browser permissions.");
          setLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLocating(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] -mt-6 md:-mt-10 pt-10">
      
      <div 
        className="absolute top-0 left-0 w-full h-96 bg-cover bg-center z-0 opacity-40 dark:opacity-30 pointer-events-none rounded-b-[3rem]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070&auto=format&fit=crop')" }} 
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-[#0B1120]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto w-full px-4"
      >
        <div className="mb-6 text-center pt-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3 drop-shadow-lg tracking-tight">
            Interactive <span className="text-yellow-400">Map</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto font-medium drop-shadow-md">
            Explore your destinations seamlessly without ever leaving the platform.
          </p>
        </div>

        <div className="w-full h-[65vh] min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 relative ring-1 ring-black/10 bg-gray-100 dark:bg-[#0B1120] z-0">
          
          <MapContainer 
            center={defaultCenter} 
            zoom={5} 
            ref={setMap} // Captures the map instance for smooth flying
            style={{ width: '100%', height: '100%', zIndex: 10 }}
            zoomControl={true} 
          >
            {/* 🔥 FIX: Removed the 'key' property so the map doesn't destroy itself when switching layers! */}
            <TileLayer
              attribution={MAP_LAYERS[activeLayerKey].attribution}
              url={MAP_LAYERS[activeLayerKey].url}
            />
            
            {position && (
              <Marker position={position} icon={blueDotIcon} />
            )}
          </MapContainer>
          
          <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-3 items-end" ref={menuRef}>
            
            <AnimatePresence>
              {showLayerMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="mb-2 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl rounded-2xl p-2 w-48 flex flex-col gap-1 overflow-hidden"
                >
                  <div className="px-3 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Map Layers
                  </div>
                  {Object.entries(MAP_LAYERS).map(([key, layer]) => {
                    const Icon = layer.icon;
                    const isActive = activeLayerKey === key;
                    return (
                      <button 
                        key={key}
                        onClick={() => {
                          setActiveLayerKey(key);
                          setShowLayerMenu(false);
                        }}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl font-bold transition-all ${
                          isActive 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-500' : 'text-gray-500 dark:text-gray-400'}`} />
                        {layer.name}
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              title="Change Map Layer"
              className={`flex items-center justify-center p-3.5 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 active:scale-90 group
                ${showLayerMenu 
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                  : 'bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:text-emerald-500'
                }`}
            >
              <Layers className="w-6 h-6" />
            </button>

            <button 
              onClick={handleLocateMe}
              disabled={locating}
              title="Locate Me"
              className="flex items-center justify-center p-3.5 rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:border-blue-500/50 hover:text-blue-500 transition-all duration-300 active:scale-90 disabled:opacity-70 group"
            >
              {locating ? (
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              ) : (
                <Navigation className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="absolute top-4 left-4 z-20 pointer-events-none">
             <motion.div 
                key={activeLayerKey}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md text-gray-800 dark:text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2"
              >
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               {MAP_LAYERS[activeLayerKey].name}
             </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default MapSection;