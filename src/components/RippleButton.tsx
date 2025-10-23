import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface RippleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  rippleColor?: string
  size?: 'sm' | 'md' | 'lg'
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  rippleColor = '#ADD8E6',
  size = 'md'
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: Date.now(),
      x,
      y
    }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)

    if (onClick) {
      onClick()
    }
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        relative overflow-hidden rounded-lg font-semibold text-white
        bg-gradient-to-r from-tria-primary to-tria-secondary
        hover:shadow-lg hover:shadow-tria-primary/25
        transition-all duration-200
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: rippleColor,
            transform: 'translate(-50%, -50%)',
            width: 0,
            height: 0
          }}
          animate={{
            width: 200,
            height: 200,
            opacity: [0.6, 0]
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut'
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export default RippleButton
