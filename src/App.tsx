import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { ContactsProvider } from './context/ContactsContext'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import ContactCard from './components/ContactCard'
import AddContactModal from './components/AddContactModal'
import EmptyState from './components/EmptyState'
import StatsBar from './components/StatsBar'
import ViewToggle, { ViewType } from './components/ViewToggle'
import MassActionsBar from './components/MassActionsBar'

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('grid')

  return (
    <ContactsProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          {/* Stats Cards at the top */}
          <StatsBar />
          
          {/* Search and Controls Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex-1 max-w-md w-full">
              <SearchBar />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 h-12 w-full sm:w-auto">
              <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
              <AddContactModal variant="inline" />
            </div>
          </div>
          
          {/* Mass Actions Bar */}
          <MassActionsBar />
          
          {/* Contacts Display */}
          <ContactCard viewType={currentView} />
          <EmptyState />
          
          {/* Floating Add Button for Mobile */}
          <AddContactModal variant="floating" />
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.75rem',
            },
          }}
        />
      </div>
    </ContactsProvider>
  )
}

export default App
