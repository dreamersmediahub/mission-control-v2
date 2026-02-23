'use client'

import { useState, useEffect } from 'react'
import { Calendar, Gift, Cake, Heart, Phone, MessageCircle, Clock } from 'lucide-react'

interface Birthday {
  id: string
  name: string
  nickname?: string
  birthday: string // MM-DD format
  relationship: string
  importance: 'critical' | 'high' | 'medium'
  emoji: string
  giftIdeas?: string[]
  lastCalled?: string
  notes?: string
  age?: number
}

export function BirthdayCalendar() {
  const [currentDate] = useState(new Date())
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<Birthday[]>([])

  const birthdays: Birthday[] = [
    {
      id: '1',
      name: 'Rose Cronin',
      nickname: 'Nana Rose',
      birthday: '08-15', // August 15th
      relationship: 'Grandmother',
      importance: 'critical',
      emoji: '👵🏻',
      age: 75,
      giftIdeas: ['Irish tea set', 'Photo album', 'Flowers', 'Handwritten letter'],
      lastCalled: '2 days ago',
      notes: 'Calls every morning. Loves stories about business success.'
    },
    {
      id: '2', 
      name: 'Melanie Mc Auliffe',
      nickname: 'Mum',
      birthday: '03-22', // March 22nd
      relationship: 'Mother',
      importance: 'critical',
      emoji: '👩‍🦰',
      giftIdeas: ['Spa day', 'Wine', 'Weekend trip', 'Jewelry'],
      lastCalled: '1 day ago',
      notes: 'Lives between Ireland and Sydney. Loves being spoiled.'
    },
    {
      id: '3',
      name: 'Josh Inbari',
      nickname: 'Fiancé',
      birthday: '11-08', // November 8th
      relationship: 'Partner',
      importance: 'critical',
      emoji: '👨‍❤️‍👨',
      giftIdeas: ['Designer cologne', 'Weekend getaway', 'Fine dining', 'Tech gadgets'],
      lastCalled: 'This morning',
      notes: 'Brand Manager at Smirnoff. Loves luxury experiences.'
    },
    {
      id: '4',
      name: 'Krissy Marsh',
      nickname: 'Top Client',
      birthday: '09-12', // September 12th
      relationship: 'Client',
      importance: 'high',
      emoji: '🎙️',
      giftIdeas: ['Podcast equipment upgrade', 'Business book', 'Premium headphones'],
      notes: 'Main podcast client. Always professional but personal touch matters.'
    },
    {
      id: '5',
      name: 'Stella Private',
      nickname: 'VIP Client',
      birthday: '06-28', // June 28th
      relationship: 'Client',
      importance: 'high',
      emoji: '💎',
      giftIdeas: ['Luxury gift box', 'High-end stationery', 'Exclusive experience'],
      notes: 'Ultra-high-net-worth. Appreciates thoughtful, exclusive gestures.'
    },
    {
      id: '6',
      name: 'Alex Thompson',
      nickname: 'Best Mate',
      birthday: '04-17', // April 17th
      relationship: 'Friend',
      importance: 'high',
      emoji: '🤝',
      giftIdeas: ['Concert tickets', 'Craft beer', 'Adventure experience'],
      notes: 'Childhood friend. Loves music and outdoor activities.'
    },
    {
      id: '7',
      name: 'Sarah Chen',
      nickname: 'Work Wife',
      birthday: '07-03', // July 3rd
      relationship: 'Colleague',
      importance: 'medium',
      emoji: '💼',
      giftIdeas: ['Coffee subscription', 'Desk plants', 'Productivity planner'],
      notes: 'Creative collaborator. Coffee addict and plant lover.'
    },
    {
      id: '8',
      name: 'David Mills',
      nickname: 'Mentor',
      birthday: '12-14', // December 14th
      relationship: 'Mentor',
      importance: 'high',
      emoji: '🎓',
      giftIdeas: ['Quality whiskey', 'Business biography', 'Golf accessories'],
      notes: 'Business mentor. Guided me through early career decisions.'
    }
  ]

  const calculateDaysUntil = (birthday: string): number => {
    const [month, day] = birthday.split('-').map(Number)
    const thisYear = currentDate.getFullYear()
    let birthdayThisYear = new Date(thisYear, month - 1, day)
    
    // If birthday has passed this year, calculate for next year
    if (birthdayThisYear < currentDate) {
      birthdayThisYear = new Date(thisYear + 1, month - 1, day)
    }
    
    const diffTime = birthdayThisYear.getTime() - currentDate.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const formatBirthdayDate = (birthday: string): string => {
    const [month, day] = birthday.split('-').map(Number)
    const date = new Date(2024, month - 1, day)
    return date.toLocaleDateString('en-AU', { month: 'long', day: 'numeric' })
  }

  useEffect(() => {
    const upcoming = birthdays
      .map(person => ({
        ...person,
        daysUntil: calculateDaysUntil(person.birthday)
      }))
      .sort((a, b) => a.daysUntil - b.daysUntil)
      .slice(0, 6) // Show next 6 birthdays

    setUpcomingBirthdays(upcoming)
  }, [currentDate])

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'border-red-500 bg-red-500/10 text-red-300'
      case 'high': return 'border-gold bg-gold/10 text-gold'
      default: return 'border-blue-500 bg-blue-500/10 text-blue-300'
    }
  }

  const getUrgencyStatus = (days: number) => {
    if (days === 0) return { text: 'TODAY!', color: 'text-red-500 animate-pulse font-bold' }
    if (days === 1) return { text: 'Tomorrow', color: 'text-orange-500 font-bold' }
    if (days <= 7) return { text: `${days} days`, color: 'text-warning font-medium' }
    if (days <= 14) return { text: `${days} days`, color: 'text-gold' }
    return { text: `${days} days`, color: 'text-text-secondary' }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Birthday Calendar</h3>
        <div className="flex items-center space-x-1">
          <Cake className="text-pink-500 animate-bounce" size={16} />
          <span className="text-sm text-pink-500">Never Forget</span>
        </div>
      </div>

      {/* Today's Birthday Alert */}
      {upcomingBirthdays.some(person => person.daysUntil === 0) && (
        <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-pink-500/20 to-red-500/20 border border-pink-500/50 animate-pulse">
          <div className="flex items-center space-x-2 mb-2">
            <Gift className="text-pink-500 animate-bounce" size={20} />
            <span className="font-bold text-pink-300">🎉 BIRTHDAY TODAY! 🎉</span>
          </div>
          {upcomingBirthdays
            .filter(person => person.daysUntil === 0)
            .map(person => (
              <div key={person.id} className="text-pink-200">
                <span className="text-lg">{person.emoji}</span> {person.nickname || person.name} is celebrating today!
              </div>
            ))
          }
        </div>
      )}

      {/* Upcoming Birthdays List */}
      <div className="space-y-3">
        {upcomingBirthdays.map((person) => {
          const urgency = getUrgencyStatus(person.daysUntil)
          
          return (
            <div
              key={person.id}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${getImportanceColor(person.importance)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{person.emoji}</div>
                  <div>
                    <div className="font-semibold text-text-primary">
                      {person.nickname || person.name}
                      {person.age && (
                        <span className="text-sm text-text-muted ml-2">
                          (turning {person.age + 1})
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {person.relationship} • {formatBirthdayDate(person.birthday)}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-sm ${urgency.color}`}>
                    {urgency.text}
                  </div>
                  {person.importance === 'critical' && (
                    <div className="text-xs text-red-400 mt-1">
                      ⚠️ Critical
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 px-2 py-1 bg-surface/50 hover:bg-surface rounded text-xs text-text-secondary hover:text-text-primary transition-colors">
                    <Phone size={12} />
                    <span>Call</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 bg-surface/50 hover:bg-surface rounded text-xs text-text-secondary hover:text-text-primary transition-colors">
                    <Gift size={12} />
                    <span>Ideas</span>
                  </button>
                </div>

                {person.lastCalled && (
                  <div className="flex items-center space-x-1 text-xs text-text-muted">
                    <Clock size={10} />
                    <span>Last: {person.lastCalled}</span>
                  </div>
                )}
              </div>

              {/* Gift Ideas Preview */}
              {person.giftIdeas && person.daysUntil <= 14 && (
                <div className="mt-2 pt-2 border-t border-surface-hover/50">
                  <div className="text-xs text-text-muted mb-1">Gift Ideas:</div>
                  <div className="flex flex-wrap gap-1">
                    {person.giftIdeas.slice(0, 2).map((idea, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-surface/30 rounded text-xs text-text-secondary"
                      >
                        {idea}
                      </span>
                    ))}
                    {person.giftIdeas.length > 2 && (
                      <span className="px-2 py-1 text-xs text-text-muted">
                        +{person.giftIdeas.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Notes for critical people */}
              {person.importance === 'critical' && person.notes && (
                <div className="mt-2 pt-2 border-t border-surface-hover/50">
                  <div className="text-xs text-text-muted italic">
                    💡 {person.notes}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-surface-hover/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-pink-500">
              {upcomingBirthdays.filter(p => p.daysUntil <= 7).length}
            </div>
            <div className="text-xs text-text-muted">This Week</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gold">
              {upcomingBirthdays.filter(p => p.importance === 'critical').length}
            </div>
            <div className="text-xs text-text-muted">Critical</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-400">
              {birthdays.length}
            </div>
            <div className="text-xs text-text-muted">Total</div>
          </div>
        </div>
      </div>
    </div>
  )
}