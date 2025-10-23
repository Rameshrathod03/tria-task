export interface Contact {
  id: number
  name: string
  phone: string
  email: string
  createdAt?: string
  isBookmarked?: boolean
}

export interface ContactFormData {
  name: string
  phone: string
  email: string
}

export type FilterType = 'all' | 'bookmarked' | 'today' | 'incomplete'

export interface ContactsContextType {
  contacts: Contact[]
  filteredContacts: Contact[]
  searchQuery: string
  selectedContacts: number[]
  currentFilter: FilterType
  addContact: (contact: ContactFormData) => void
  updateContact: (id: number, contact: ContactFormData) => void
  deleteContact: (id: number) => void
  deleteSelectedContacts: () => void
  toggleBookmark: (id: number) => void
  bookmarkSelectedContacts: () => void
  unbookmarkSelectedContacts: () => void
  toggleContactSelection: (id: number) => void
  selectAllContacts: () => void
  clearSelection: () => void
  setSearchQuery: (query: string) => void
  setFilter: (filter: FilterType) => void
  isLoading: boolean
}
