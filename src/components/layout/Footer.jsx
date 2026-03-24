import React from 'react'
import { motion } from 'framer-motion'
import { Compass, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart, ArrowUp, MessageSquare, Globe, Github } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToChat = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Press', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Safety', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
    explore: [
      { name: 'Destinations', href: '#destinations' },
      { name: 'Hotels', href: '#hotels' },
      { name: 'Routes', href: '#routes' },
      { name: 'Food Guide', href: '#food' },
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600 dark:hover:text-blue-400', label: 'Facebook' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-500 dark:hover:text-sky-400', label: 'Twitter' },
    { icon: Instagram, href: '#', color: 'hover:text-rose-500 dark:hover:text-rose-400', label: 'Instagram' },
    { icon: Youtube, href: '#', color: 'hover:text-red-600 dark:hover:text-red-500', label: 'Youtube' },
    { icon: Github, href: '#', color: 'hover:text-gray-900 dark:hover:text-white', label: 'Github' },
  ]

  return (
    <footer className="relative bg-white dark:bg-emerald-950 pt-16 pb-8 overflow-hidden border-t border-gray-200 dark:border-emerald-900/50 z-20 transition-colors duration-500">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500/5 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/5 dark:bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-500 dark:via-green-600 dark:to-yellow-500 flex items-center justify-center shadow-lg"
              >
                <Compass className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-display font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-400 dark:via-green-500 dark:to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
                  Routeify
                </span>
                <span className="ml-1.5 text-xs bg-gradient-to-r from-rose-500 to-fuchsia-600 dark:from-green-500 dark:to-yellow-500 text-white px-2 py-0.5 rounded-full shadow-sm">AI</span>
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-emerald-100/70 mb-6 max-w-md text-sm leading-relaxed font-bold">
              Your AI-powered travel companion. Get personalized recommendations for destinations, hotels, routes, and local cuisine. Plan your perfect journey with Routeify AI.
            </p>

            {/* AI Chat CTA */}
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToChat}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-600 dark:via-green-600 dark:to-yellow-500 animate-gradient-x text-white rounded-xl text-sm font-extrabold hover:shadow-lg transition-all mb-6"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Routeify AI</span>
            </motion.button>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-emerald-100/70 text-sm group">
                <Mail size={16} className="text-rose-500 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
                <a href="mailto:ai@routeify.com" className="hover:text-rose-600 dark:hover:text-yellow-300 transition-colors font-bold">
                  ai@routeify.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-emerald-100/70 text-sm group">
                <Phone size={16} className="text-rose-500 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
                <a href="tel:+1234567890" className="hover:text-rose-600 dark:hover:text-yellow-300 transition-colors font-bold">
                  +91 9876543242
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-emerald-100/70 text-sm group">
                <MapPin size={16} className="text-rose-500 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold">Hassan,KA</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-display font-extrabold text-base mb-4 text-gray-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a 
                    href={link.href}
                    className="text-gray-600 dark:text-emerald-100/70 hover:text-rose-600 dark:hover:text-yellow-400 text-sm font-bold transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-extrabold text-base mb-4 text-gray-900 dark:text-white">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a 
                    href={link.href}
                    className="text-gray-600 dark:text-emerald-100/70 hover:text-rose-600 dark:hover:text-yellow-400 text-sm font-bold transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-extrabold text-base mb-4 text-gray-900 dark:text-white">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a 
                    href={link.href}
                    className="text-gray-600 dark:text-emerald-100/70 hover:text-rose-600 dark:hover:text-yellow-400 text-sm font-bold transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-emerald-900/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 dark:text-emerald-200/50 text-xs font-bold flex items-center"
            >
              © {new Date().getFullYear()} Routeify AI. All rights reserved. Made with 
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={14} className="mx-1 text-rose-500 fill-rose-500" />
              </motion.div>
              for travelers
            </motion.p>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2.5 rounded-full bg-gray-100 dark:bg-emerald-900 text-gray-600 dark:text-emerald-300 shadow-sm hover:shadow-md transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-600 dark:via-green-600 dark:to-yellow-500 animate-gradient-x text-white rounded-xl text-sm font-extrabold hover:shadow-lg transition-all group"
            >
              <span>Back to top</span>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowUp size={16} />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mt-8 flex justify-center items-center space-x-3 text-xs font-bold text-gray-500 dark:text-emerald-200/50">
          <Globe size={14} className="text-gray-400 dark:text-emerald-400" />
          <span className="cursor-pointer hover:text-rose-500 dark:hover:text-yellow-400 transition-colors">English</span>
          <span>•</span>
          <span className="cursor-pointer hover:text-rose-500 dark:hover:text-yellow-400 transition-colors">Español</span>
          <span>•</span>
          <span className="cursor-pointer hover:text-rose-500 dark:hover:text-yellow-400 transition-colors">Français</span>
          <span>•</span>
          <span className="cursor-pointer hover:text-rose-500 dark:hover:text-yellow-400 transition-colors">日本語</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer