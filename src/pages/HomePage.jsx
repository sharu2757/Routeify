import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Compass, Star, Heart, MessageCircle, ArrowRight, MapPin, Info, X, CheckCircle2, Car, Sun, Calendar, Maximize2, Minimize2, ArrowUp, UtensilsCrossed, Map as MapIcon } from 'lucide-react'
import ChatInterface from '../components/chatbot/ChatInterface'
import TranslatorCanvas from '../components/chatbot/TranslatorCanvas'
import FloatingReviews from '../components/ui/FloatingReviews'
import FeedbackSection from '../components/sections/FeedbackSection'
import { useChat } from '../context/ChatContext'

const destinations = [
  { id: 1, name: 'Jaipur, Rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145bcbba4e?q=80&w=2070', price: '₹15,999', rating: 4.9, description: 'The Pink City', history: 'Founded in 1727 by Jai Singh II.', famousFor: 'Hawa Mahal & Forts.', visitors: '2.5M+ Annually', bestTime: 'Oct to March', idealDuration: '3-4 Days' },
  { id: 2, name: 'Kerala Backwaters', image: 'https://images.unsplash.com/photo-1602216054374-40e5ec127f8a?q=80&w=2070', price: '₹12,999', rating: 4.8, description: 'Tropical Paradise', history: 'Ancient spice trade hub.', famousFor: 'Houseboats & Ayurveda.', visitors: '1.2M+ Annually', bestTime: 'Sep to March', idealDuration: '5-7 Days' },
  { id: 3, name: 'Goa Beaches', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974', price: '₹10,999', rating: 4.9, description: 'Sun & Sea', history: 'Former Portuguese colony.', famousFor: 'Beaches & Nightlife.', visitors: '8M+ Annually', bestTime: 'Nov to Feb', idealDuration: '4-5 Days' },
  { id: 4, name: 'Manali, Himachal', image: 'https://images.unsplash.com/photo-1626621440098-2fd0a1c9a37c?q=80&w=2070', price: '₹8,999', rating: 4.8, description: 'Mountain Peaks', history: 'Named after the sage Manu.', famousFor: 'Skiing & Rohtang Pass.', visitors: '3M+ Annually', bestTime: 'Oct to June', idealDuration: '3-4 Days' },
  { id: 5, name: 'Varanasi, UP', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2076', price: '₹7,999', rating: 4.7, description: 'Spiritual Hub', history: 'Oldest living city globally.', famousFor: 'Ganga Aarti & Ghats.', visitors: '6M+ Annually', bestTime: 'Oct to March', idealDuration: '2-3 Days' },
  { id: 6, name: 'Hampi, Karnataka', image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=2070', price: '₹9,999', rating: 4.9, description: 'Ancient Ruins', history: 'Capital of Vijayanagara Empire.', famousFor: 'Stone Chariot.', visitors: '500K+ Annually', bestTime: 'Oct to Feb', idealDuration: '2-3 Days' },
  { id: 7, name: 'Agra, UP', image: 'https://images.unsplash.com/photo-1564507592208-017ce2a370e5?q=80&w=2070', price: '₹5,999', rating: 4.8, description: 'Mughal Majesty', history: 'Former Mughal Capital.', famousFor: 'Taj Mahal & Agra Fort.', visitors: '7M+ Annually', bestTime: 'Oct to March', idealDuration: '1-2 Days' },
  { id: 8, name: 'Leh-Ladakh', image: 'https://images.unsplash.com/photo-1581793615236-5ed926955a5b?q=80&w=2070', price: '₹18,999', rating: 4.9, description: 'Altitude Desert', history: 'Ancient Silk Route.', famousFor: 'Pangong Lake.', visitors: '300K+ Annually', bestTime: 'May to Sep', idealDuration: '7-9 Days' },
  { id: 9, name: 'Andaman Islands', image: 'https://images.unsplash.com/photo-1587595431973-3f10d4c1b97b?q=80&w=2070', price: '₹25,999', rating: 4.8, description: 'Pristine Archipelago', history: 'Cellular Jail history.', famousFor: 'Scuba & Coral Reefs.', visitors: '400K+ Annually', bestTime: 'Oct to May', idealDuration: '5-7 Days' },
]

const hotels = [
  { id: 1, name: 'Taj Mahal Palace', location: 'Mumbai', image: 'https://images.unsplash.com/photo-1585596677461-8ee2227181dc?q=80&w=2070', price: 22999, rating: 4.9, amenities: ['Free WiFi', 'Valet', 'Luxury Spa'] },
  { id: 2, name: 'Oberoi Udaivilas', location: 'Udaipur', image: 'https://images.unsplash.com/photo-1582719508250-88b59358dc4b?q=80&w=2069', price: 18999, rating: 4.8, amenities: ['Boat Transfer', 'Fine Dining', 'Yoga Pavilion'] },
  { id: 3, name: 'Wildflower Hall', location: 'Shimla', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070', price: 15999, rating: 4.9, amenities: ['Heated Pool', 'Guided Trekking', 'Secure Parking'] },
  { id: 4, name: 'ITC Grand Chola', location: 'Chennai', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070', price: 14999, rating: 4.8, amenities: ['Award-Winning Dining', 'Luxury Spa', 'Airport Shuttle'] },
  { id: 5, name: 'Evolve Back', location: 'Coorg', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070', price: 17999, rating: 4.9, amenities: ['Plantation Walk', 'Private Pool Villas', 'Ayurveda'] },
  { id: 6, name: 'The Leela Palace', location: 'New Delhi', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070', price: 19999, rating: 4.9, amenities: ['Rooftop Pool', 'Butler Service', '24/7 Concierge'] },
  { id: 7, name: 'Umaid Bhawan', location: 'Jodhpur', image: 'https://images.unsplash.com/photo-1592555059503-0a774cb8d477?q=80&w=2070', price: 35000, rating: 5.0, amenities: ['Palace Tour', 'Vintage Car Ride', 'Royal Spa'] },
  { id: 8, name: 'Kumarakom Lake Resort', location: 'Kerala', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070', price: 16500, rating: 4.8, amenities: ['Infinity Pool', 'Sunset Cruise', 'Seafood Grill'] },
  { id: 9, name: 'Rambagh Palace', location: 'Jodhpur', image: 'https://images.unsplash.com/photo-1582645851411-912ab0a95de1?q=80&w=2070', price: 28000, rating: 4.9, amenities: ['Polo Bar', 'Peacock Gardens', 'Indoor Pool'] },
]

const routes = [
  { id: 1, name: 'Royal Rajasthan', duration: '12 Days', places: ['Jaipur', 'Jodhpur', 'Udaipur'], image: 'https://images.unsplash.com/photo-1535957998255-4d0f2814f01c?q=80&w=2070', price: 45999, pickup: 'Jaipur Airport', inclusions: ['4-Star Stays', 'AC Transport', 'Breakfast'] },
  { id: 2, name: 'Kerala Backwaters', duration: '8 Days', places: ['Kochi', 'Alleppey', 'Kumarakom'], image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2070', price: 32999, pickup: 'Cochin Airport', inclusions: ['Houseboat', 'Meals', 'Spa Treatment'] },
  { id: 3, name: 'Golden Triangle', duration: '7 Days', places: ['Delhi', 'Agra', 'Jaipur'], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076', price: 28999, pickup: 'Delhi Airport', inclusions: ['Guided Tours', 'Monument Entry', 'Breakfast'] },
  { id: 4, name: 'Himalayan Trek', duration: '10 Days', places: ['Manali', 'Kasol', 'Spiti'], image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2070', price: 35999, pickup: 'Chandigarh Airport', inclusions: ['Trek Guide', 'Camping Gear', 'All Meals'] },
  { id: 5, name: 'Karnataka Heritage', duration: '6 Days', places: ['Belur', 'Halebidu', 'Hampi'], image: 'https://images.unsplash.com/photo-1600011689027-0b1154f3b7ce?q=80&w=2070', price: 22999, pickup: 'Bangalore Airport', inclusions: ['Heritage Guide', 'Boutique Stays', 'Breakfast'] },
  { id: 6, name: 'Spiritual Ganges', duration: '5 Days', places: ['Varanasi', 'Sarnath', 'Prayagraj'], image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2076', price: 19999, pickup: 'Varanasi Airport', inclusions: ['Boat Ride', 'Temple Guide', 'Transfers'] },
  { id: 7, name: 'Northeast Explorer', duration: '8 Days', places: ['Guwahati', 'Shillong', 'Dawki'], image: 'https://images.unsplash.com/photo-1571536802807-30451e39b1a1?q=80&w=2070', price: 34999, pickup: 'Guwahati Airport', inclusions: ['Root Bridge Trek', 'AC Cab', 'Eco Resorts'] },
  { id: 8, name: 'Tamil Nadu Temples', duration: '7 Days', places: ['Chennai', 'Madurai', 'Rameswaram'], image: 'https://images.unsplash.com/photo-1582510003544-4d00fa3f20e7?q=80&w=2070', price: 24999, pickup: 'Chennai Airport', inclusions: ['Temple Guide', 'AC Transport', 'Veg Meals'] },
  { id: 9, name: 'Coastal Karnataka', duration: '5 Days', places: ['Mangalore', 'Udupi', 'Gokarna'], image: 'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?q=80&w=2070', price: 18999, pickup: 'Mangalore Airport', inclusions: ['Beach Resorts', 'Seafood Tours', 'Breakfast'] },
]

const foods = [
  { id: 1, name: 'Butter Chicken', location: 'Delhi', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2070', cuisine: 'North Indian', price: '₹450' },
  { id: 2, name: 'Dum Biryani', location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2070', cuisine: 'South Indian', price: '₹350' },
  { id: 3, name: 'Masala Dosa', location: 'Bangalore', image: 'https://images.unsplash.com/photo-1630383249896-1df644e78c47?q=80&w=2070', cuisine: 'South Indian', price: '₹120' },
  { id: 4, name: 'Spicy Vada Pav', location: 'Mumbai', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2071', cuisine: 'Street Food', price: '₹50' },
  { id: 5, name: 'Rogan Josh', location: 'Srinagar', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1936', cuisine: 'Kashmiri', price: '₹550' },
  { id: 6, name: 'Chole Bhature', location: 'Punjab', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=2070', cuisine: 'North Indian', price: '₹180' },
  { id: 7, name: 'Pani Puri', location: 'Kolkata', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070', cuisine: 'Street Food', price: '₹40' },
  { id: 8, name: 'Dhokla', location: 'Gujarat', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070', cuisine: 'Gujarati', price: '₹150' },
  { id: 9, name: 'Goan Fish Curry', location: 'Goa', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2013', cuisine: 'Seafood', price: '₹480' },
]

const explorerReviews = [
  { id: 1, name: 'Priya Sharma', location: 'Mumbai', review: 'The Kerala backwaters tour was magical!', rating: 5, image: 'https://images.unsplash.com/photo-1494790108777-466d853ebc3f?q=80&w=1974' },
  { id: 2, name: 'Rahul Verma', location: 'Delhi', review: 'Rajasthan royal tour exceeded expectations!', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974' },
  { id: 3, name: 'Anjali Desai', location: 'Bangalore', review: 'Manali in winter is pure magic.', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070' },
  { id: 4, name: 'Vikram Singh', location: 'Pune', review: 'Varanasi at sunrise gave me goosebumps. Incredible.', rating: 5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974' },
  { id: 5, name: 'Neha Gupta', location: 'Chennai', review: 'The food recommendations were spot on!', rating: 4, image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1974' },
  { id: 6, name: 'Aman Patel', location: 'Ahmedabad', review: 'Routeify planned my Goa trip perfectly. Loved it.', rating: 5, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974' },
]

const chatSuggestions = ["Plan a 4-day trip to Belur & Hampi", "Best time to visit Kerala", "Luxury hotels in Udaipur"]

const HomePage = () => {
  const { floatingReviews, currentQuote, sendMessage } = useChat()
  const heroRef = useRef(null)
  const mapRef = useRef(null)
  const destinationsRef = useRef(null)
  const hotelsRef = useRef(null)
  const routesRef = useRef(null)
  const foodRef = useRef(null)
  const feedbackRef = useRef(null)

  const [isMapExpanded, setIsMapExpanded] = useState(false)
  const [activeDest, setActiveDest] = useState(null)
  const [activeHotel, setActiveHotel] = useState(null)
  const [activeRoute, setActiveRoute] = useState(null)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const scrollToChat = () => heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  
  useEffect(() => { 
    if (window.scrollY !== 0) window.scrollTo(0, 0)
    window.scrollToChat = scrollToChat
    window.scrollToMap = () => scrollToSection(mapRef)
    window.scrollToDestinations = () => scrollToSection(destinationsRef)
    window.scrollToHotels = () => scrollToSection(hotelsRef)
    window.scrollToRoutes = () => scrollToSection(routesRef)
    window.scrollToFood = () => scrollToSection(foodRef)
    window.scrollToFeedback = () => scrollToSection(feedbackRef)

    const handleScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden text-gray-900 dark:text-gray-100 relative">
      
      {/* 🏔️ FIXED ANIMATED BACKGROUND */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-white/30 dark:bg-emerald-950/50 backdrop-blur-[2px]"></div>
      </div>

      <FloatingReviews reviews={floatingReviews} />
      
      {/* 🚀 FLOATING BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-[60] p-3 md:p-4 bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-500 dark:via-green-600 dark:to-yellow-500 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group"
            title="Back to Top"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 🏔️ HERO SECTION */}
      <section ref={heroRef} id="chat-section" className="relative pt-28 pb-12 px-4 min-h-[90vh] flex flex-col justify-center">
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }} 
          className="absolute top-28 left-4 lg:left-8 max-w-[220px] p-3 bg-white/80 dark:bg-emerald-900/80 backdrop-blur-xl border border-white/50 dark:border-emerald-700/50 rounded-2xl shadow-lg z-20 hidden md:flex items-start gap-2"
        >
          <Quote className="w-5 h-5 text-rose-500 dark:text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-gray-800 dark:text-white italic leading-snug">
            {currentQuote || "Travel makes one modest. You see what a tiny place you occupy in the world."}
          </p>
        </motion.div>
        
        <div className="max-w-[1400px] mx-auto relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 mt-16 md:mt-0">
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-5 tracking-tight drop-shadow-lg text-gray-900 dark:text-white">
              Your AI <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-400 dark:via-green-500 dark:to-yellow-400 animate-gradient-x">
                Indian Travel Companion
              </span>
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {chatSuggestions.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)} className="text-xs px-4 py-2 bg-white/90 dark:bg-emerald-800/90 backdrop-blur-md rounded-full hover:scale-105 hover:shadow-lg transition-all border border-white/50 font-bold text-gray-800 dark:text-white shadow-sm">{s}</button>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start w-full max-w-6xl mx-auto">
            <div className="w-full rounded-[2.5rem]"><ChatInterface /></div>
            <div className="w-full rounded-[2.5rem]"><TranslatorCanvas /></div>
          </div>
        </div>
      </section>

      {/* 🗺️ DEDICATED MAP SECTION */}
      <section id="map" ref={mapRef} className="py-12 px-4 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col space-y-8">
          
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-4 text-gray-900 dark:text-white drop-shadow-md">
              Interactive <span className="text-emerald-500 dark:text-yellow-400">Map</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Explore your destinations seamlessly without ever leaving the platform.
            </p>
          </div>
          
          <div className="relative w-full h-[50vh] md:h-[65vh] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/60 dark:border-gray-800 group bg-gray-200 dark:bg-gray-800">
            
            {/* 🚀 CUSTOM OVERLAY BUTTON */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => setIsMapExpanded(true)}
                className="bg-gray-900/80 backdrop-blur-md hover:bg-black text-white px-4 py-3 rounded-xl flex items-center space-x-2 shadow-xl transform hover:scale-105 transition-all border border-gray-700"
              >
                <Maximize2 className="w-5 h-5" />
                <span className="font-bold text-sm tracking-wide">Expand Fullscreen</span>
              </button>
            </div>

            <iframe 
              title="Interactive Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15000000!2d70!3d22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e1!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 🔍 EXPANDED MAP MODAL */}
      <AnimatePresence>
        {isMapExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-8"
          >
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-700 flex flex-col">
              
              {/* Modal Header */}
              <div className="bg-gray-900 px-6 py-4 flex items-center justify-between border-b border-gray-800 shrink-0">
                <div className="flex items-center space-x-3 text-white">
                  <MapIcon className="w-6 h-6 text-emerald-500 dark:text-yellow-400" />
                  <h3 className="font-extrabold text-xl">Routeify Map Explorer</h3>
                </div>
                <button
                  onClick={() => setIsMapExpanded(false)}
                  className="p-2 bg-gray-800 hover:bg-rose-500 rounded-full text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Expanded iframe */}
              <div className="flex-grow w-full h-full relative">
                <iframe
                  title="Expanded Interactive Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15000000!2d70!3d22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e1!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      

      {/* 🗺️ DESTINATIONS */}
      <section id="destinations" ref={destinationsRef} className="py-12 px-4 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-extrabold mb-8 text-center drop-shadow-md">Popular <span className="text-rose-500 dark:text-yellow-400">Destinations</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <motion.div key={dest.id} whileHover={{ y: -5 }} onClick={() => setActiveDest(activeDest === dest.id ? null : dest.id)} className="group relative bg-white/70 dark:bg-emerald-900/60 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-lg border border-white/40 dark:border-green-800 cursor-pointer h-72">
                <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <div className="text-xl font-extrabold">{dest.name}</div>
                  <div className="flex items-center text-xs mt-1 text-gray-300"><Info className="w-3 h-3 mr-1"/> Tap for Info</div>
                </div>
                <AnimatePresence>
                  {activeDest === dest.id && (
                    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25 }} className="absolute inset-0 bg-white/95 dark:bg-emerald-950/95 backdrop-blur-xl z-20 p-5 flex flex-col justify-center">
                      <button onClick={(e) => { e.stopPropagation(); setActiveDest(null); }} className="absolute top-3 right-3 bg-gray-200 dark:bg-emerald-800 rounded-full p-1"><X className="w-4 h-4"/></button>
                      <h3 className="text-lg font-extrabold text-rose-500 dark:text-yellow-400 mb-2">{dest.name}</h3>
                      <p className="text-xs font-bold mb-1">🏰 History: <span className="font-medium text-gray-600 dark:text-gray-300">{dest.history}</span></p>
                      <p className="text-xs font-bold mb-1">🌟 Famous: <span className="font-medium text-gray-600 dark:text-gray-300">{dest.famousFor}</span></p>
                      <p className="text-xs font-bold mb-1">👥 Visitors: <span className="font-medium text-gray-600 dark:text-gray-300">{dest.visitors}</span></p>
                      <div className="mt-2 space-y-1">
                        <p className="text-[11px] font-bold flex items-center"><Sun className="w-3 h-3 text-yellow-500 mr-1"/> Best Time: <span className="font-medium ml-1 text-gray-600 dark:text-gray-300">{dest.bestTime}</span></p>
                        <p className="text-[11px] font-bold flex items-center"><Calendar className="w-3 h-3 text-rose-500 dark:text-emerald-400 mr-1"/> Duration: <span className="font-medium ml-1 text-gray-600 dark:text-gray-300">{dest.idealDuration}</span></p>
                      </div>
                      <div className="mt-auto pt-2">
                        <span className="font-extrabold text-sm block mb-2">Est. {dest.price}</span>
                        <button className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-fuchsia-600 dark:from-emerald-500 dark:to-green-600 text-white rounded-xl font-extrabold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                          Explore Packages
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏨 HOTELS */}
      <section id="hotels" ref={hotelsRef} className="py-12 px-4 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-extrabold mb-8 text-center drop-shadow-md">Luxury <span className="text-fuchsia-600 dark:text-emerald-400">Stays</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <motion.div key={hotel.id} whileHover={{ y: -5 }} onClick={() => setActiveHotel(activeHotel === hotel.id ? null : hotel.id)} className="group relative bg-white/70 dark:bg-emerald-900/60 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-lg border border-white/40 dark:border-green-800 cursor-pointer h-64">
                <img src={hotel.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <div className="text-lg font-extrabold">{hotel.name}</div>
                  <div className="flex items-center text-xs mt-1 text-gray-300"><Info className="w-3 h-3 mr-1"/> Tap for Amenities</div>
                </div>
                <AnimatePresence>
                  {activeHotel === hotel.id && (
                    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25 }} className="absolute inset-0 bg-white/95 dark:bg-emerald-950/95 backdrop-blur-xl z-20 p-5 flex flex-col justify-center">
                      <button onClick={(e) => { e.stopPropagation(); setActiveHotel(null); }} className="absolute top-3 right-3 bg-gray-200 dark:bg-emerald-800 rounded-full p-1"><X className="w-4 h-4"/></button>
                      <h3 className="text-lg font-extrabold text-fuchsia-600 dark:text-emerald-400 mb-2">Features</h3>
                      <div className="space-y-1 mb-2">
                        {hotel.amenities.map((amenity, i) => (
                          <div key={i} className="flex items-center text-xs font-bold text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3 h-3 text-green-500 mr-2"/> {amenity}</div>
                        ))}
                      </div>
                      <div className="mt-auto pt-2">
                        <span className="font-extrabold text-sm block mb-2">₹{hotel.price}/nt</span>
                        <button className="w-full py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 dark:from-emerald-500 dark:to-yellow-500 text-white rounded-xl font-extrabold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                          Book Room
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛤️ ROUTES */}
      <section id="routes" ref={routesRef} className="py-12 px-4 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-extrabold mb-8 text-center drop-shadow-md">Curated <span className="text-amber-500 dark:text-green-400">Routes</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <motion.div key={route.id} whileHover={{ y: -5 }} onClick={() => setActiveRoute(activeRoute === route.id ? null : route.id)} className="group relative bg-white/70 dark:bg-emerald-900/60 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-lg border border-white/40 dark:border-green-800 cursor-pointer h-64">
                <img src={route.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <div className="text-xl font-extrabold">{route.name}</div>
                  <div className="text-sm font-bold text-amber-400 dark:text-green-300">{route.duration}</div>
                </div>
                <AnimatePresence>
                  {activeRoute === route.id && (
                    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25 }} className="absolute inset-0 bg-white/95 dark:bg-emerald-950/95 backdrop-blur-xl z-20 p-5 flex flex-col justify-center">
                      <button onClick={(e) => { e.stopPropagation(); setActiveRoute(null); }} className="absolute top-3 right-3 bg-gray-200 dark:bg-emerald-800 rounded-full p-1"><X className="w-4 h-4"/></button>
                      <h3 className="text-lg font-extrabold text-amber-600 dark:text-green-400 mb-2">Package Details</h3>
                      <p className="text-xs font-bold mb-2 flex items-center"><MapPin className="w-3 h-3 mr-1"/> {route.places.join(' → ')}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {route.inclusions.map((inc, i) => (
                          <span key={i} className="text-[10px] bg-amber-100 dark:bg-green-900/50 text-amber-800 dark:text-green-300 px-2 py-0.5 rounded-sm font-bold">{inc}</span>
                        ))}
                      </div>
                      <div className="mt-auto pt-2">
                        <span className="font-extrabold text-sm block mb-2">₹{route.price}</span>
                        <button className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-green-500 dark:to-emerald-600 text-white rounded-xl font-extrabold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                          Book Route
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🥘 FOODS */}
      <section id="food" ref={foodRef} className="py-12 px-4 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-extrabold mb-8 text-center drop-shadow-md">Culinary <span className="text-rose-500 dark:text-yellow-500">Delights</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foods.map((food) => (
              <motion.div key={food.id} whileHover={{ y: -5 }} className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-lg border border-white/50 dark:border-emerald-900/30 flex flex-col justify-between">
                <div className="relative h-40 overflow-hidden">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-extrabold text-base mb-1">{food.name}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-bold text-xs text-gray-500 dark:text-gray-400">{food.location}</p>
                    <span className="text-[10px] font-extrabold px-2 py-1 bg-rose-100 dark:bg-green-900/40 text-rose-700 dark:text-yellow-400 rounded-full">{food.cuisine}</span>
                  </div>
                  <button className="w-full mt-auto py-2 bg-rose-50 dark:bg-emerald-800 text-rose-600 dark:text-yellow-400 rounded-lg font-bold hover:bg-rose-100 dark:hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>Find Spots</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solid Background Wrapper for Bottom Elements */}
      <div className="relative z-20 bg-white dark:bg-emerald-950 transition-colors duration-500 border-t border-gray-200 dark:border-emerald-900/50">
        
        <section id="feedback" ref={feedbackRef} className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white">
                Traveler <span className="text-fuchsia-600 dark:text-emerald-400">Reviews</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {explorerReviews.map((review) => (
                <div key={review.id} className="bg-gray-50 dark:bg-emerald-900/30 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-emerald-800/50">
                  <div className="flex items-center space-x-3 mb-2">
                    <img src={review.image} alt={review.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">{review.name}</h3>
                      <p className="text-[10px] font-bold text-rose-500 dark:text-yellow-500">{review.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-emerald-100/80 text-xs italic font-medium leading-relaxed">"{review.review}"</p>
                </div>
              ))}
            </div>
            <FeedbackSection />
          </div>
        </section>

        <section className="py-12 px-4 pb-20">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 dark:from-emerald-800 dark:via-green-700 dark:to-yellow-600 animate-gradient-x rounded-[2rem] p-8 shadow-xl text-white">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-3">Ready for Your Indian Adventure?</h2>
            <p className="text-sm text-white/90 mb-6 font-bold">Chat with Routeify AI now.</p>
            <button onClick={() => scrollToSection(heroRef)} className="px-6 py-3 bg-white dark:bg-emerald-950 text-rose-600 dark:text-emerald-500 rounded-full font-extrabold text-sm hover:shadow-lg hover:scale-105 transition-all inline-flex items-center">
              Ask AI Now <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage