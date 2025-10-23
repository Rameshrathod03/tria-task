import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Trash2, Edit, Copy, Star, StarOff } from 'lucide-react'
import { useContacts } from '../context/ContactsContext'
import { ViewType } from './ViewToggle'
import { Contact } from '../types/contact'
import EditContactModal from './EditContactModal'
import { ContactsDataTable } from './contacts-data-table'
import { createContactsTableColumns } from './contacts-table-columns'
import toast from 'react-hot-toast'

interface ContactCardProps {
  viewType: ViewType
}

const ContactCard: React.FC<ContactCardProps> = ({ viewType }) => {
  const { 
    filteredContacts, 
    selectedContacts,
    deleteContact, 
    toggleBookmark,
    toggleContactSelection,
    isLoading 
  } = useContacts()
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleDelete = (id: number, name: string) => {
    deleteContact(id)
    toast.success(`${name} has been deleted`)
  }

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${type} copied to clipboard`)
  }

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
    setIsEditModalOpen(true)
  }

  const handleBookmark = (id: number, name: string, isBookmarked: boolean) => {
    toggleBookmark(id)
    toast.success(`${name} ${isBookmarked ? 'unbookmarked' : 'bookmarked'}`)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (isLoading) {
    return (
      <div className={`${
        viewType === 'table' 
          ? 'w-full' 
          : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      }`}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 animate-pulse"
          >
            <div className="w-12 h-12 bg-muted rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Table View
  const renderTableView = () => {
    const columns = createContactsTableColumns({
      onEdit: handleEdit,
      onDelete: handleDelete,
      onCopy: handleCopy,
      onBookmark: handleBookmark,
      onToggleSelection: toggleContactSelection,
      selectedContacts
    })

    return (
      <ContactsDataTable
        columns={columns}
        data={filteredContacts}
      />
    )
  }


  // Grid View (default)
  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {filteredContacts.map((contact) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-card border border-border rounded-xl p-4 sm:p-6 hover:shadow-lg hover:shadow-tria-primary/5 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-tria rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm sm:text-lg">
                  {getInitials(contact.name)}
                </span>
              </div>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleBookmark(contact.id, contact.name, contact.isBookmarked || false)}
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors ${contact.isBookmarked ? 'bg-muted/20 text-tria-warning' : 'hover:bg-muted/20 text-muted-foreground hover:text-tria-warning'}`}
                  title={contact.isBookmarked ? 'Unbookmark' : 'Bookmark'}
                >
                  {contact.isBookmarked ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-3 w-3 sm:h-4 sm:w-4" />}
                </button>
                <button
                  onClick={() => handleEdit(contact)}
                  className="p-1.5 sm:p-2 hover:bg-muted/20 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  title="Edit contact"
                >
                  <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
                <button
                  onClick={() => handleCopy(contact.phone, 'Phone')}
                  className="p-1.5 sm:p-2 hover:bg-muted/20 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  title="Copy phone"
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
                <button
                  onClick={() => handleDelete(contact.id, contact.name)}
                  className="p-1.5 sm:p-2 hover:bg-muted/20 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  title="Delete contact"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-foreground truncate">
                {contact.name}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground truncate">{contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground truncate">{contact.email}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  const renderView = () => {
    if (viewType === 'table') return renderTableView()
    return renderGridView()
  }

  return (
    <>
      {renderView()}
      <EditContactModal 
        contact={editingContact}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingContact(null)
        }}
      />
    </>
  )
}

export default ContactCard
