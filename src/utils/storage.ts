import { Contact } from '../types/contact'

const STORAGE_KEY = 'tria-contacts'

export const loadContacts = (): Contact[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading contacts from localStorage:', error)
  }
  
  // Fallback to default contacts
  return [
    { id: 1, name: "Alice Johnson", phone: "+1 202 555 0148", email: "alice@example.com", createdAt: "2024-01-15T10:30:00Z" },
    { id: 2, name: "Bob Smith", phone: "+1 202 555 0192", email: "bob@example.com", createdAt: "2024-01-16T14:20:00Z" },
    { id: 3, name: "Carla Chen", phone: "+1 202 555 0184", email: "carla@example.com", createdAt: "2024-01-17T09:15:00Z" },
    { id: 4, name: "David Wilson", phone: "+1 202 555 0123", email: "david@example.com", createdAt: "2024-01-18T16:45:00Z" },
    { id: 5, name: "Emma Davis", phone: "+1 202 555 0456", email: "emma@example.com", createdAt: "2024-01-19T11:30:00Z" }
  ]
}

export const saveContacts = (contacts: Contact[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
  } catch (error) {
    console.error('Error saving contacts to localStorage:', error)
  }
}

export const generateId = (): number => {
  return Date.now() + Math.random()
}
