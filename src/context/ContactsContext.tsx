import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { Contact, ContactFormData, ContactsContextType, FilterType } from '../types/contact'
import { loadContacts, saveContacts, generateId } from '../utils/storage'
import { createFuseInstance, searchContacts, debounce } from '../utils/fuzzySearch'

const ContactsContext = createContext<ContactsContextType | undefined>(undefined)

export const useContacts = () => {
  const context = useContext(ContactsContext)
  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider')
  }
  return context
}

interface ContactsProviderProps {
  children: React.ReactNode
}

export const ContactsProvider: React.FC<ContactsProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContacts, setSelectedContacts] = useState<number[]>([])
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
  const [isLoading, setIsLoading] = useState(true)

  // Initialize contacts from localStorage
  useEffect(() => {
    const loadedContacts = loadContacts()
    setContacts(loadedContacts)
    setIsLoading(false)
  }, [])


  // Filter contacts based on current filter
  const filterContacts = (contacts: Contact[], filter: FilterType): Contact[] => {
    const today = new Date().toDateString()
    
    switch (filter) {
      case 'bookmarked':
        return contacts.filter(contact => contact.isBookmarked)
      case 'today':
        return contacts.filter(contact => 
          contact.createdAt && new Date(contact.createdAt).toDateString() === today
        )
      case 'incomplete':
        return contacts.filter(contact => 
          !contact.name.trim() || !contact.phone.trim() || !contact.email.trim()
        )
      case 'all':
      default:
        return contacts
    }
  }

  // Filtered contacts based on search query and current filter
  const filteredContacts = useMemo(() => {
    let filtered = filterContacts(contacts, currentFilter)
    
    if (searchQuery.trim()) {
      // Create a temporary fuse instance with the already filtered contacts
      const tempFuse = createFuseInstance(filtered)
      filtered = searchContacts(tempFuse, searchQuery)
    }
    
    return filtered
  }, [contacts, searchQuery, currentFilter])

  // Debounced search function
  const debouncedSetSearchQuery = useMemo(
    () => debounce((query: string) => setSearchQuery(query), 300),
    []
  )

  const addContact = (contactData: ContactFormData) => {
    const newContact: Contact = {
      ...contactData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      isBookmarked: false
    }
    
    const updatedContacts = [...contacts, newContact]
    setContacts(updatedContacts)
    saveContacts(updatedContacts)
  }

  const updateContact = (id: number, contactData: ContactFormData) => {
    const updatedContacts = contacts.map(contact => 
      contact.id === id 
        ? { ...contact, ...contactData }
        : contact
    )
    setContacts(updatedContacts)
    saveContacts(updatedContacts)
  }

  const deleteContact = (id: number) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id)
    setContacts(updatedContacts)
    saveContacts(updatedContacts)
    // Remove from selection if it was selected
    setSelectedContacts(prev => prev.filter(contactId => contactId !== id))
  }

  const deleteSelectedContacts = () => {
    const updatedContacts = contacts.filter(contact => !selectedContacts.includes(contact.id))
    setContacts(updatedContacts)
    saveContacts(updatedContacts)
    setSelectedContacts([])
  }

  const toggleBookmark = (id: number) => {
    const updatedContacts = contacts.map(contact => 
      contact.id === id 
        ? { ...contact, isBookmarked: !contact.isBookmarked }
        : contact
    )
    setContacts(updatedContacts)
    saveContacts(updatedContacts)
  }

  const bookmarkSelectedContacts = () => {
    const updatedContacts = contacts.map(contact => 
      selectedContacts.includes(contact.id)
        ? { ...contact, isBookmarked: true }
        : contact
    )
    setContacts(updatedContacts)
    saveContacts(updatedContacts)
    setSelectedContacts([])
  }

  const unbookmarkSelectedContacts = () => {
    const updatedContacts = contacts.map(contact => 
      selectedContacts.includes(contact.id)
        ? { ...contact, isBookmarked: false }
        : contact
    )
    setContacts(updatedContacts)
    saveContacts(updatedContacts)
    setSelectedContacts([])
  }

  const toggleContactSelection = (id: number) => {
    setSelectedContacts(prev => 
      prev.includes(id) 
        ? prev.filter(contactId => contactId !== id)
        : [...prev, id]
    )
  }

  const selectAllContacts = () => {
    setSelectedContacts(filteredContacts.map(contact => contact.id))
  }

  const clearSelection = () => {
    setSelectedContacts([])
  }

  const handleSearchQuery = (query: string) => {
    debouncedSetSearchQuery(query)
  }

  const setFilter = (filter: FilterType) => {
    setCurrentFilter(filter)
  }

  const value: ContactsContextType = {
    contacts,
    filteredContacts,
    searchQuery,
    selectedContacts,
    currentFilter,
    addContact,
    updateContact,
    deleteContact,
    deleteSelectedContacts,
    toggleBookmark,
    bookmarkSelectedContacts,
    unbookmarkSelectedContacts,
    toggleContactSelection,
    selectAllContacts,
    clearSelection,
    setSearchQuery: handleSearchQuery,
    setFilter,
    isLoading
  }

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  )
}
