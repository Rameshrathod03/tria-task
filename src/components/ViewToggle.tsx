import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Grid3X3, Table, Filter } from 'lucide-react'
import { GlowingEffect } from './ui/glowing-effect'
import { useContacts } from '../context/ContactsContext'
import { FilterType } from '../types/contact'

export type ViewType = 'grid' | 'table'

interface ViewToggleProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onViewChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { currentFilter, setFilter } = useContacts()
  
  const views = [
    { type: 'grid' as ViewType, icon: Grid3X3, label: 'Grid' },
    { type: 'table' as ViewType, icon: Table, label: 'Table' }
  ]

  const filterOptions = [
    { label: 'All Contacts', value: 'all' as FilterType },
    { label: 'Bookmarked', value: 'bookmarked' as FilterType },
    { label: 'Added Today', value: 'today' as FilterType },
    { label: 'Incomplete', value: 'incomplete' as FilterType }
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFilterOpen])

  return (
    <div className="flex items-center space-x-1 sm:space-x-2 h-12 w-full sm:w-auto">
      {/* Filter Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <motion.button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="relative flex items-center justify-center w-12 h-12 shadow-xs bg-gradient-to-t hover:to-muted to-background from-muted dark:from-muted/50 dark:border-border border border-zinc-300 shadow-zinc-950/10 rounded-md transition-all duration-200 hover:from-muted/80 hover:to-background/80"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GlowingEffect
            blur={0}
            borderWidth={2}
            spread={60}
            glow={true}
            disabled={false}
            proximity={80}
            inactiveZone={0.1}
          />
          <Filter className="h-4 w-4 text-foreground" />
        </motion.button>

        {/* Dropdown Menu */}
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 left-0 z-50 w-48 bg-card border border-border rounded-lg shadow-lg"
          >
            <div className="p-2">
              {filterOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    setFilter(option.value)
                    setIsFilterOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                    currentFilter === option.value
                      ? 'bg-tria-primary/20 text-tria-primary font-medium'
                      : 'text-foreground hover:bg-muted/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* View Toggle Buttons */}
      <div className="flex items-center space-x-1 h-12 flex-1 sm:flex-none">
        {views.map((view) => {
          const Icon = view.icon
          const isActive = currentView === view.type
          
          return (
            <motion.button
              key={view.type}
              onClick={() => onViewChange(view.type)}
              className={`relative flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 h-12 text-xs sm:text-sm font-medium transition-all duration-200 flex-1 sm:flex-none ${
                isActive
                  ? 'shadow-xs bg-gradient-to-t hover:to-muted to-background from-muted dark:from-muted/50 dark:border-border border border-zinc-300 shadow-zinc-950/10 rounded-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{view.label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default ViewToggle

