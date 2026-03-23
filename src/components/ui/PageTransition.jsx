import React from 'react'
import { motion } from 'framer-motion'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
}

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition