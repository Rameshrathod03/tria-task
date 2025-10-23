import Fuse from 'fuse.js'
import { Contact } from '../types/contact'

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'email', weight: 0.3 },
    { name: 'phone', weight: 0.3 }
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 1
}

export const createFuseInstance = (contacts: Contact[]) => {
  return new Fuse(contacts, fuseOptions)
}

export const searchContacts = (fuse: Fuse<Contact>, query: string): Contact[] => {
  if (!query.trim()) {
    return []
  }
  
  const results = fuse.search(query)
  return results.map(result => result.item)
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
