import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, User, Phone, Mail } from 'lucide-react'
import { useContacts } from '../context/ContactsContext'
import { ContactFormData } from '../types/contact'
import toast from 'react-hot-toast'
import { RainbowButton } from './RainbowButton'
import RippleButton from './RippleButton'
import { GlowingEffect } from './ui/glowing-effect'

interface AddContactModalProps {
  variant?: 'floating' | 'inline'
}

const AddContactModal: React.FC<AddContactModalProps> = ({ variant = 'floating' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: ''
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const { addContact } = useContacts()

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      addContact(formData)
      toast.success('Contact added successfully!')
      setFormData({ name: '', phone: '', email: '' })
      setErrors({})
      setIsOpen(false)
    }
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setFormData({ name: '', phone: '', email: '' })
    setErrors({})
  }

  return (
    <>
      {/* Add Contact Button */}
      {variant === 'floating' ? (
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <RainbowButton
            onClick={() => setIsOpen(true)}
            className="p-4 rounded-full group"
            size="icon"
          >
            <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-200" />
          </RainbowButton>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="relative hidden lg:flex items-center gap-2 px-3 h-12 text-sm font-medium transition-all duration-200 shadow-xs bg-gradient-to-t hover:to-muted to-background from-muted dark:from-muted/50 dark:border-border border border-zinc-300 shadow-zinc-950/10 rounded-md hover:from-muted/80 hover:to-background/80 text-foreground"
        >
          <GlowingEffect
            blur={0}
            borderWidth={2}
            spread={60}
            glow={true}
            disabled={false}
            proximity={80}
            inactiveZone={0.1}
          />
          <Plus className="h-4 w-4" />
          Add Contact
        </button>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card border border-border rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Add New Contact</h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-ring ${
                      errors.name ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-ring ${
                      errors.phone ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-ring ${
                      errors.email ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <RippleButton
                    type="submit"
                    rippleColor="#ADD8E6"
                    className="flex-1"
                    size="md"
                  >
                    Add Contact
                  </RippleButton>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AddContactModal
