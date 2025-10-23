# Tria Contact Manager

A modern, responsive contact management application built with React, TypeScript, and TailwindCSS. Features real-time fuzzy search, multiple view modes, advanced filtering, dark mode, smooth animations, and local storage persistence.

## 🚀 Live Demo

👉 [https://tria-contact-list.vercel.app](https://tria-contact-list.vercel.app)

---

## 💡 Features

### 🔍 Search & Filter
- **Real-time fuzzy search** using Fuse.js with debounced input
- **Advanced filtering** with dropdown (All, Bookmarked, Added Today, Incomplete)
- **Smart search** across name, email, and phone fields

### 📱 Multiple View Modes
- **Grid View** - Card-based layout with hover effects
- **List View** - Compact horizontal layout
- **Table View** - Full data table with sorting and pagination

### ✨ Contact Management
- **Add new contacts** with form validation
- **Edit existing contacts** with inline modal
- **Delete contacts** with confirmation
- **Bookmark contacts** for quick access
- **Mass operations** - select multiple contacts for bulk actions

### 🎨 UI/UX Features
- **Dark/Light mode** toggle with system preference detection
- **Rainbow glow effects** on interactive elements
- **Smooth animations** powered by Framer Motion
- **Responsive design** optimized for mobile and desktop
- **Toast notifications** for user feedback
- **Statistics dashboard** with trend indicators
- **Empty states** with helpful messaging
- **Accessible UI** with proper ARIA attributes

### 💾 Data Management
- **Persistent storage** using localStorage
- **Data validation** with TypeScript interfaces
- **Error handling** for storage failures

---

## 🧠 Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: TailwindCSS with custom Tria brand colors
- **UI Components**: Custom shadcn/ui inspired components
- **Icons**: Lucide React + Tabler Icons
- **Animations**: Framer Motion + Motion (v12)
- **Search**: Fuse.js for fuzzy search
- **Table**: TanStack Table for advanced data table
- **Notifications**: React Hot Toast
- **State Management**: React Context API
- **Storage**: localStorage with fallback data
- **Utilities**: clsx, class-variance-authority

---

## 🧩 Product Design Choices

- **Tria Brand Integration**: Custom color scheme and logo integration
- **Multiple View Modes**: Grid, List, and Table views for different user preferences
- **Advanced Filtering**: Smart filtering system with visual feedback
- **Fuse.js Integration**: Provides intuitive search experience with fuzzy matching
- **Rainbow Glow Effects**: Interactive elements with mouse-tracking glow effects
- **TanStack Table**: Professional data table with sorting and pagination
- **localStorage Persistence**: Simulates backend functionality for demo purposes
- **Dark/Light Mode**: Enhances user experience and accessibility
- **Modular Architecture**: Clean component structure with reusable UI components
- **Mobile-First Design**: Ensures great experience across all devices
- **Smooth Animations**: Creates polished, professional feel with Framer Motion
- **Form Validation**: Prevents invalid data entry with real-time feedback
- **Mass Operations**: Bulk actions for efficient contact management

---

## ⚙️ Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd tria-contact-list

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ContactCard.tsx           # Contact display with multiple views
│   ├── contacts-data-table.tsx   # TanStack table implementation
│   ├── contacts-table-columns.tsx # Table column definitions
│   ├── SearchBar.tsx             # Search input with debouncing
│   ├── AddContactModal.tsx       # Modal for adding new contacts
│   ├── EditContactModal.tsx      # Modal for editing contacts
│   ├── EmptyState.tsx            # Empty state illustrations
│   ├── Header.tsx                # App header with logo and theme toggle
│   ├── Logo.tsx                  # Tria logo component
│   ├── StatsBar.tsx              # Statistics dashboard with trends
│   ├── ThemeToggle.tsx           # Dark/light mode toggle
│   ├── ViewToggle.tsx            # View switching + filter dropdown
│   ├── MassActionsBar.tsx        # Bulk operations bar
│   ├── RainbowButton.tsx         # Rainbow gradient button
│   ├── RippleButton.tsx          # Ripple effect button
│   └── ui/                       # Reusable UI components
│       ├── badge.tsx             # Badge component
│       ├── button.tsx            # Button component
│       ├── card.tsx              # Card components
│       ├── checkbox.tsx          # Checkbox component
│       ├── dropdown-menu.tsx     # Dropdown menu
│       ├── glowing-effect.tsx    # Rainbow glow effect
│       ├── input.tsx             # Input component
│       └── table.tsx             # Table components
├── context/
│   └── ContactsContext.tsx       # Global state management
├── lib/
│   └── utils.ts                  # Utility functions (clsx)
├── utils/
│   ├── storage.ts                # localStorage utilities
│   └── fuzzySearch.ts            # Fuse.js search configuration
├── types/
│   └── contact.ts                # TypeScript interfaces
├── App.tsx                       # Main application component
├── main.tsx                      # Application entry point
└── index.css                     # Global styles and Tria brand colors
```

---

## 🎨 Design System

The application uses a custom design system built on TailwindCSS with Tria brand colors and CSS custom properties for theming:

### 🎨 Brand Colors
- **Primary**: Tria brand orange (#FF6B35)
- **Secondary**: Tria brand purple (#8B5CF6)
- **Accent**: Tria brand blue (#3B82F6)
- **Error**: Tria brand red (#EF4444)
- **Warning**: Tria brand yellow (#F59E0B)

### 🎯 Design Principles
- **Dark-First**: Pitch black theme with vibrant accents
- **Consistent Spacing**: 4px base unit with responsive scaling
- **Typography**: Inter font family with semantic sizing
- **Components**: Reusable UI component library
- **Animations**: Smooth transitions with Framer Motion
- **Glow Effects**: Interactive rainbow borders on hover
- **Gradients**: Subtle gradients for depth and elegance

---

## 🔧 Key Features Implementation

### 🔍 Advanced Search & Filtering
- **Fuzzy Search**: Uses Fuse.js for intelligent search across name, email, and phone
- **Debounced Input**: 300ms debounce for optimal performance
- **Smart Filtering**: Filter by All, Bookmarked, Added Today, or Incomplete contacts
- **Combined Logic**: Search works within filtered results

### 📊 Multiple View Modes
- **Grid View**: Card-based layout with hover effects and glow
- **List View**: Compact horizontal layout for quick scanning
- **Table View**: Full TanStack table with sorting, pagination, and selection

### ✨ Contact Management
- **CRUD Operations**: Create, Read, Update, Delete contacts
- **Bookmark System**: Star/unstar contacts for quick access
- **Mass Operations**: Select multiple contacts for bulk actions
- **Form Validation**: Real-time validation with TypeScript interfaces

### 🎨 UI/UX Enhancements
- **Rainbow Glow Effects**: Mouse-tracking gradient borders on interactive elements
- **Smooth Animations**: Framer Motion for polished interactions
- **Theme System**: Dark/light mode with system preference detection
- **Responsive Design**: Mobile-first approach with breakpoint optimization

### 💾 Data Management
- **Local Storage**: Automatic persistence with error handling
- **Type Safety**: Full TypeScript coverage with strict interfaces
- **State Management**: React Context for global state
- **Performance**: Optimized re-renders with useMemo and useCallback

---

## 🧭 AI Usage

AI tools (Cursor + ChatGPT) were used for:
- Project scaffolding and initial setup
- Component generation and styling
- TypeScript interface definitions
- Documentation and README creation

All logic, architecture, and design choices were verified and implemented manually to ensure code quality and understanding.

---

## 🔮 Future Improvements

- [ ] Integrate with mock API using `json-server`
- [ ] Add contact photo uploads
- [ ] Implement contact categories/tags
- [ ] Add contact import/export features (CSV, JSON)
- [ ] Implement contact sharing via links
- [ ] Add contact search history
- [ ] Add keyboard shortcuts (Ctrl+K for search, Ctrl+N for new contact)
- [ ] Implement contact grouping (A–Z, by date, by category)
- [ ] Add contact duplicate detection
- [ ] Implement contact merge functionality
- [ ] Add contact activity timeline
- [ ] Implement contact notes and comments
- [ ] Add contact birthday reminders
- [ ] Implement contact backup/restore

---

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 📄 License

This project is created as part of the Tria React assignment and is for demonstration purposes.

---

## 🎯 Project Achievements

✅ **Complete Contact Management System** - Full CRUD operations with advanced features  
✅ **Multiple View Modes** - Grid, List, and Table views for different user preferences  
✅ **Advanced Search & Filtering** - Fuzzy search with smart filtering options  
✅ **Modern UI/UX** - Tria brand integration with rainbow glow effects  
✅ **Responsive Design** - Mobile-first approach with perfect desktop experience  
✅ **Type Safety** - Full TypeScript coverage with strict interfaces  
✅ **Performance Optimized** - Efficient re-renders and smooth animations  
✅ **Accessibility** - Proper ARIA attributes and keyboard navigation  
✅ **Clean Architecture** - Modular components with reusable UI library  

**Goal Achieved**: A production-ready, polished, and feature-rich React contact management application that showcases modern web development best practices! 🎉
