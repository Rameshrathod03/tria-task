import React from 'react'
import { motion } from 'framer-motion'
import { Users, Search } from 'lucide-react'
import { useContacts } from '../context/ContactsContext'

const EmptyState: React.FC = () => {
  const { filteredContacts, searchQuery, isLoading } = useContacts()

  if (isLoading) return null

  if (filteredContacts.length === 0 && !searchQuery) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mb-6">
          <Users className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No contacts yet
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Get started by adding your first contact. Click the "Add Contact" button to begin.
        </p>
      </motion.div>
    )
  }

  if (filteredContacts.length === 0 && searchQuery) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mb-6">
          <Search className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No results found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          No contacts match your search for "{searchQuery}". Try adjusting your search terms.
        </p>
      </motion.div>
    )
  }

  return null
}

export default EmptyState
