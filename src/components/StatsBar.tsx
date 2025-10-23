import React from 'react'
import { motion } from 'framer-motion'
import { Users, Bookmark, Calendar, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { useContacts } from '../context/ContactsContext'
import { GlowingEffect } from './ui/glowing-effect'
import { Card, CardHeader, CardTitle, CardAction, CardFooter } from './ui/card'
import { Badge } from './ui/badge'

const StatsBar: React.FC = () => {
  const { contacts } = useContacts()

  const today = new Date().toDateString()
  const contactsAddedToday = contacts.filter(contact => {
    if (!contact.createdAt) return false
    return new Date(contact.createdAt).toDateString() === today
  }).length

  const bookmarkedContacts = contacts.filter(contact => contact.isBookmarked).length
  
  const incompleteContacts = contacts.filter(contact => 
    !contact.name || !contact.phone || !contact.email
  ).length

  const stats = [
    {
      label: 'Total Contacts',
      value: contacts.length,
      icon: Users,
      color: 'text-tria-primary',
      bgColor: 'bg-tria-primary/10',
      gradient: 'from-tria-primary to-tria-primary/80',
      trend: '+12.5%',
      trendIcon: TrendingUp,
      description: 'All contacts in your database',
      footerText: 'Current contact count'
    },
    {
      label: 'Bookmarked',
      value: bookmarkedContacts,
      icon: Bookmark,
      color: 'text-tria-secondary',
      bgColor: 'bg-tria-secondary/10',
      gradient: 'from-tria-secondary to-tria-secondary/80',
      trend: '+8.2%',
      trendIcon: TrendingUp,
      description: 'Important contacts marked',
  footerText: 'Bookmarked contacts'
    },
    {
      label: 'Added Today',
      value: contactsAddedToday,
      icon: Calendar,
      color: 'text-tria-success',
      bgColor: 'bg-tria-success/10',
      gradient: 'from-tria-success to-tria-success/80',
      trend: contactsAddedToday > 0 ? '+100%' : '0%',
      trendIcon: contactsAddedToday > 0 ? TrendingUp : TrendingDown,
      description: 'New contacts today',
      footerText: 'Contacts added today'
    },
    {
      label: 'Incomplete',
      value: incompleteContacts,
      icon: AlertCircle,
      color: 'text-tria-warning',
      bgColor: 'bg-tria-warning/10',
      gradient: 'from-tria-warning to-tria-warning/80',
      trend: incompleteContacts > 0 ? '-5.2%' : '0%',
      trendIcon: TrendingDown,
      description: 'Contacts missing information',
      footerText: 'Incomplete contacts'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative group shadow-xs">
            {/* Main Card Background with Vertical Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-card to-muted/20 rounded-lg" />
            
            {/* Shading Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent rounded-lg" />
            
            {/* Noise Texture */}
            <div
              className="absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
              style={{
                backgroundImage: "url(/noise.webp)",
                backgroundSize: "30%",
              }}
            />
            
            {/* Glow Effect */}
            <GlowingEffect
              blur={0}
              borderWidth={2}
              spread={80}
              glow={true}
              disabled={false}
              proximity={100}
              inactiveZone={0.01}
            />
            
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {stat.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline" className="flex items-center gap-1">
                  <stat.trendIcon className="h-3 w-3" />
                  {stat.trend}
                </Badge>
              </CardAction>
            </CardHeader>
            
            <CardFooter className="relative z-10 flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {stat.footerText} <stat.trendIcon className="size-4" />
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default StatsBar
