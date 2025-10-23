import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  showBackground?: boolean
  className?: string
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  showBackground = false,
  className = '' 
}) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check if dark mode is active
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme()
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  }


  const logoSizeClasses = {
    sm: 'w-16 h-10',   // Small but visible
    md: 'w-20 h-12',   // Medium size
    lg: 'w-24 h-14'    // Large and prominent for header
  }

  return (
    <motion.div 
      className={`flex items-center space-x-3 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Tria Logo - Theme aware */}
      {showBackground ? (
        <div className={`${sizeClasses[size]} bg-gradient-tria rounded-xl flex items-center justify-center shadow-lg relative p-2`}>
          <img 
            src={isDark ? "/tria-logo-dark.svg" : "/tria-logo-light.svg"}
            alt="Tria Logo" 
            className={`${logoSizeClasses[size]} object-contain`}
          />
        </div>
      ) : (
        <img 
          src={isDark ? "/tria-logo-dark.svg" : "/tria-logo-light.svg"}
          alt="Tria Logo" 
          className={`${logoSizeClasses[size]} object-contain`}
        />
      )}
      
      {/* Logo Text - Only show if explicitly requested */}
      {showText && (
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Contact Manager
          </h1>
        </div>
      )}
    </motion.div>
  )
}

export default Logo
