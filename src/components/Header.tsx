import React from 'react'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'

const Header: React.FC = () => {
  return (
    <header className="bg-card/90 backdrop-blur-sm border-b border-border shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo size="lg" showText={false} showBackground={false} />
          </motion.div>
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </header>
  )
}

export default Header
