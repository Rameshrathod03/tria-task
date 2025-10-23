import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { useContacts } from '../context/ContactsContext'

const SearchBar: React.FC = () => {
  const { setSearchQuery } = useContacts()
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setSearchQuery(value)
  }

  const clearSearch = () => {
    setInputValue('')
    setSearchQuery('')
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search contacts..."
        value={inputValue}
        onChange={handleInputChange}
        className="w-full h-12 pl-10 pr-10 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground text-sm"
      />
      {inputValue && (
        <button
          onClick={clearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-accent rounded-md transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
