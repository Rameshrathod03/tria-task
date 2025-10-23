import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Bookmark, BookmarkCheck, X } from 'lucide-react'
import { useContacts } from '../context/ContactsContext'
import toast from 'react-hot-toast'

const MassActionsBar: React.FC = () => {
  const { 
    selectedContacts, 
    deleteSelectedContacts, 
    bookmarkSelectedContacts, 
    unbookmarkSelectedContacts,
    clearSelection,
  } = useContacts()

  const selectedCount = selectedContacts.length
  const hasSelection = selectedCount > 0

  const handleDeleteSelected = () => {
    if (selectedCount === 0) return
    
    if (window.confirm(`Are you sure you want to delete ${selectedCount} contact(s)?`)) {
      deleteSelectedContacts()
      toast.success(`${selectedCount} contact(s) deleted successfully!`)
    }
  }

  const handleBookmarkSelected = () => {
    if (selectedCount === 0) return
    
    bookmarkSelectedContacts()
    toast.success(`${selectedCount} contact(s) bookmarked!`)
  }

  const handleUnbookmarkSelected = () => {
    if (selectedCount === 0) return
    
    unbookmarkSelectedContacts()
    toast.success(`${selectedCount} contact(s) unbookmarked!`)
  }

  const handleClearSelection = () => {
    clearSelection()
  }

  if (!hasSelection) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-card border border-border rounded-xl p-4 mb-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-tria-primary rounded-full"></div>
              <span className="text-sm font-medium text-foreground">
                {selectedCount} contact{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmarkSelected}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-tria-secondary/10 text-tria-secondary rounded-lg hover:bg-tria-secondary/20 transition-colors"
              title="Bookmark selected contacts"
            >
              <Bookmark className="h-4 w-4" />
              Bookmark
            </button>

            <button
              onClick={handleUnbookmarkSelected}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-tria-warning/10 text-tria-warning rounded-lg hover:bg-tria-warning/20 transition-colors"
              title="Unbookmark selected contacts"
            >
              <BookmarkCheck className="h-4 w-4" />
              Unbookmark
            </button>

            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-tria-error/10 text-tria-error rounded-lg hover:bg-tria-error/20 transition-colors"
              title="Delete selected contacts"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>

            <button
              onClick={handleClearSelection}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              title="Clear selection"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MassActionsBar
