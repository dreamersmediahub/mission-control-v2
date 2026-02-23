'use client'

import { useState, useEffect } from 'react'
import { Star, Moon, Sun, Sparkles, Zap, Target, Heart } from 'lucide-react'

interface AstrologyReading {
  id: string
  type: 'daily' | 'weekly' | 'moon' | 'business' | 'love'
  title: string
  message: string
  intensity: number
  color: string
  icon: any
}

export function AstrologySection() {
  const [currentPhase, setCurrentPhase] = useState('Waxing Gibbous')
  const [readings, setReadings] = useState<AstrologyReading[]>([])

  // Kyle's birth details: November 6, 1997, 13:13, Tralee, Kerry, Ireland
  const kyleBirthChart = {
    sun: 'Scorpio ♏',
    moon: 'Gemini ♊', // Approximate based on birth time
    rising: 'Aquarius ♒', // Approximate based on birth time and location
    venus: 'Libra ♎',
    mars: 'Virgo ♍',
    mercury: 'Scorpio ♏',
    birthLocation: 'Tralee, County Kerry, Ireland',
    birthTime: '13:13 (1:13 PM)',
    age: 28
  }

  const scorpioReadings: AstrologyReading[] = [
    {
      id: '1',
      type: 'daily',
      title: 'Daily Scorpio Energy',
      message: "Your Scorpio intensity is your superpower today. That laser focus you're known for? Channel it into Mission Control and watch your business transform. Trust your intuition - it's rarely wrong.",
      intensity: 8,
      color: 'text-red-500',
      icon: Sun
    },
    {
      id: '2', 
      type: 'business',
      title: 'Business & Career Focus',
      message: "Mars energy is supporting your entrepreneurial drive. Perfect time to negotiate those invoices or pitch new ideas. Your Scorpio determination makes you unstoppable in business meetings.",
      intensity: 9,
      color: 'text-gold',
      icon: Target
    },
    {
      id: '3',
      type: 'moon',
      title: 'Gemini Moon Influence',
      message: "Your Gemini moon craves variety and mental stimulation - exactly why you juggle multiple clients and projects! Today's the day to embrace that scattered energy and let ideas flow.",
      intensity: 7,
      color: 'text-blue-400',
      icon: Moon
    },
    {
      id: '4',
      type: 'love',
      title: 'Relationship Energy (Josh)',
      message: "Venus in Libra brings harmony to your relationship. Plan something beautiful with Josh - your natural Scorpio passion combined with Libra's love of luxury is *chef's kiss*.",
      intensity: 8,
      color: 'text-pink-500',
      icon: Heart
    },
    {
      id: '5',
      type: 'weekly',
      title: 'Weekly Scorpio Forecast',
      message: "This week is about transformation - very on-brand for you, Scorpio! Expect major shifts in your business. That project you've been obsessing over? Time to release it into the world.",
      intensity: 9,
      color: 'text-purple-500',
      icon: Sparkles
    }
  ]

  const moonPhases = [
    'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
    'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'
  ]

  useEffect(() => {
    setReadings(scorpioReadings)
    
    // Simulate moon phase changes
    const interval = setInterval(() => {
      const randomPhase = moonPhases[Math.floor(Math.random() * moonPhases.length)]
      setCurrentPhase(randomPhase)
    }, 60000) // Change every minute for demo

    return () => clearInterval(interval)
  }, [])

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 9) return 'border-red-500 bg-red-500/10'
    if (intensity >= 7) return 'border-gold bg-gold/10'
    return 'border-blue-500 bg-blue-500/10'
  }

  const getMoonPhaseEmoji = (phase: string) => {
    switch (phase) {
      case 'New Moon': return '🌑'
      case 'Waxing Crescent': return '🌒'
      case 'First Quarter': return '🌓'
      case 'Waxing Gibbous': return '🌔'
      case 'Full Moon': return '🌕'
      case 'Waning Gibbous': return '🌖'
      case 'Last Quarter': return '🌗'
      case 'Waning Crescent': return '🌘'
      default: return '🌙'
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Kyle's Astrology</h3>
        <div className="flex items-center space-x-1">
          <Star className="text-gold animate-pulse" size={16} />
          <span className="text-sm text-gold">Scorpio Rising</span>
        </div>
      </div>

      {/* Birth Chart Summary */}
      <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-red-500/20 border border-purple-500/30">
        <div className="text-center mb-3">
          <div className="text-3xl mb-1">♏</div>
          <div className="font-bold text-text-primary">Scorpio Sun</div>
          <div className="text-sm text-text-secondary">Born Nov 6, 1997 • Tralee, Ireland</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="font-medium text-red-400">♏ Sun</div>
            <div className="text-text-muted">Scorpio</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-blue-400">♊ Moon</div>
            <div className="text-text-muted">Gemini</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-purple-400">♒ Rising</div>
            <div className="text-text-muted">Aquarius</div>
          </div>
        </div>
      </div>

      {/* Current Moon Phase */}
      <div className="mb-4 p-3 rounded-lg bg-surface/30 border border-surface-hover">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-text-primary">Current Moon Phase</div>
            <div className="text-sm text-text-secondary">{currentPhase}</div>
          </div>
          <div className="text-2xl">{getMoonPhaseEmoji(currentPhase)}</div>
        </div>
      </div>

      {/* Astrology Readings */}
      <div className="space-y-3">
        {readings.slice(0, 3).map((reading) => {
          const IconComponent = reading.icon
          
          return (
            <div
              key={reading.id}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${getIntensityColor(reading.intensity)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <IconComponent className={reading.color} size={16} />
                  <div className="font-medium text-text-primary text-sm">
                    {reading.title}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={
                        i < Math.floor(reading.intensity / 2)
                          ? 'text-gold fill-current'
                          : 'text-surface-hover'
                      }
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {reading.message}
              </p>

              {/* Reading Type Badge */}
              <div className="mt-2 flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${reading.color} bg-current/10`}>
                  {reading.type.charAt(0).toUpperCase() + reading.type.slice(1)}
                </span>
                
                <div className="text-xs text-text-muted">
                  Intensity: {reading.intensity}/10
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Scorpio Traits for Kyle */}
      <div className="mt-4 pt-4 border-t border-surface-hover/50">
        <div className="text-sm font-medium text-text-primary mb-2">Your Scorpio Superpowers</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-1 text-xs">
            <Zap size={12} className="text-red-500" />
            <span className="text-text-secondary">Intense Focus</span>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <Target size={12} className="text-purple-500" />
            <span className="text-text-secondary">Business Intuition</span>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <Heart size={12} className="text-pink-500" />
            <span className="text-text-secondary">Passionate</span>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <Sparkles size={12} className="text-gold" />
            <span className="text-text-secondary">Transformative</span>
          </div>
        </div>
      </div>

      {/* Weekly Scorpio Mantra */}
      <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20">
        <div className="text-center">
          <div className="text-sm font-medium text-red-400 mb-1">This Week's Mantra</div>
          <div className="text-sm text-text-secondary italic">
            "I transform challenges into opportunities with Scorpio intensity"
          </div>
        </div>
      </div>

      {/* Lucky Elements for Today */}
      <div className="mt-4 pt-3 border-t border-surface-hover/50">
        <div className="grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <div className="font-medium text-red-500">Lucky Color</div>
            <div className="text-text-muted">Deep Red</div>
          </div>
          <div>
            <div className="font-medium text-gold">Lucky Number</div>
            <div className="text-text-muted">8</div>
          </div>
          <div>
            <div className="font-medium text-purple-400">Power Hour</div>
            <div className="text-text-muted">1:13 PM</div>
          </div>
        </div>
      </div>
    </div>
  )
}