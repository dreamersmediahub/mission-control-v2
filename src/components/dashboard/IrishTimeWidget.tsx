// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { Phone, Heart, Clock, MapPin } from 'lucide-react'

export function IrishTimeWidget() {
  const [dublinTime, setDublinTime] = useState<Date>(new Date())
  const [sydneyTime, setSydneyTime] = useState<Date>(new Date())
  const [lastNanaCall, setLastNanaCall] = useState<Date>(new Date(Date.now() - 18 * 60 * 60 * 1000)) // 18 hours ago
  const [lastMelCall, setLastMelCall] = useState<Date>(new Date(Date.now() - 16 * 60 * 60 * 1000)) // 16 hours ago

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      
      // Sydney time (AEST/AEDT)
      setSydneyTime(now)
      
      // Dublin time (GMT/IST)
      const dublinOffset = 0 // GMT+0 (or +1 during summer)
      const sydneyOffset = 11 // GMT+11 (or +10 during winter)
      const timeDiff = sydneyOffset - dublinOffset
      const dublin = new Date(now.getTime() - (timeDiff * 60 * 60 * 1000))
      setDublinTime(dublin)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getTimeSinceCall = (callTime: Date) => {
    const hours = Math.floor((Date.now() - callTime.getTime()) / (1000 * 60 * 60))
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const isGoodTimeToCall = () => {
    const dublinHour = dublinTime.getHours()
    return dublinHour >= 8 && dublinHour <= 22 // 8 AM to 10 PM Dublin time
  }

  const getDublinTimeOfDay = () => {
    const hour = dublinTime.getHours()
    if (hour >= 5 && hour < 12) return '🌅 Morning'
    if (hour >= 12 && hour < 17) return '☀️ Afternoon'
    if (hour >= 17 && hour < 21) return '🌆 Evening'
    return '🌙 Night'
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Family Connection</h3>
        <div className="text-2xl">🇮🇪</div>
      </div>

      {/* Time Display */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 rounded-lg bg-surface/30">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <MapPin size={12} className="text-text-muted" />
            <span className="text-xs text-text-muted">SYDNEY</span>
          </div>
          <div className="text-lg font-mono font-bold text-text-primary">
            {formatTime(sydneyTime)}
          </div>
          <div className="text-xs text-text-secondary">AEST</div>
        </div>
        
        <div className="text-center p-3 rounded-lg bg-surface/30">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <MapPin size={12} className="text-text-muted" />
            <span className="text-xs text-text-muted">DUBLIN</span>
          </div>
          <div className="text-lg font-mono font-bold text-text-primary">
            {formatTime(dublinTime)}
          </div>
          <div className="text-xs text-text-secondary">
            {getDublinTimeOfDay()}
          </div>
        </div>
      </div>

      {/* Call Timing Indicator */}
      <div className={`p-3 rounded-lg border-l-4 mb-4 ${
        isGoodTimeToCall() 
          ? 'border-success bg-success/10' 
          : 'border-warning bg-warning/10'
      }`}>
        <div className="flex items-center space-x-2">
          <Phone size={16} className={isGoodTimeToCall() ? 'text-success' : 'text-warning'} />
          <span className={`text-sm font-medium ${
            isGoodTimeToCall() ? 'text-success' : 'text-warning'
          }`}>
            {isGoodTimeToCall() ? 'Good time to call!' : 'Consider the time difference'}
          </span>
        </div>
        <p className="text-xs text-text-muted mt-1">
          Best calling hours: 8 AM - 10 PM Dublin time
        </p>
      </div>

      {/* Family Call Status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">👵🏻</div>
            <div>
              <h4 className="font-medium text-text-primary">Nana Rose</h4>
              <p className="text-sm text-text-secondary">Daily check-in</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-primary font-medium">
              {getTimeSinceCall(lastNanaCall)}
            </div>
            <div className="flex items-center space-x-1">
              <Heart size={12} className="text-error" />
              <span className="text-xs text-text-muted">127 day streak</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">👩🏻</div>
            <div>
              <h4 className="font-medium text-text-primary">Melanie (Mum)</h4>
              <p className="text-sm text-text-secondary">Morning catch-up</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-primary font-medium">
              {getTimeSinceCall(lastMelCall)}
            </div>
            <div className="flex items-center space-x-1">
              <Heart size={12} className="text-success" />
              <span className="text-xs text-text-muted">89 day streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Call Actions */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button 
          className={`btn-primary text-sm flex items-center justify-center space-x-1 ${
            !isGoodTimeToCall() ? 'opacity-50' : ''
          }`}
          disabled={!isGoodTimeToCall()}
        >
          <Phone size={14} />
          <span>Call Nana</span>
        </button>
        
        <button 
          className={`btn-secondary text-sm flex items-center justify-center space-x-1 ${
            !isGoodTimeToCall() ? 'opacity-50' : ''
          }`}
          disabled={!isGoodTimeToCall()}
        >
          <Phone size={14} />
          <span>Call Mum</span>
        </button>
      </div>

      {/* Sweet Note */}
      <div className="mt-4 pt-3 border-t border-surface-hover">
        <p className="text-xs text-center text-gold italic">
          "Nana Rose skipped nights out to buy your schoolbooks 💛"
        </p>
      </div>
    </div>
  )
}