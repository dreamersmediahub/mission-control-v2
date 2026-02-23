'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, MapPin, Phone, Video, Plus, AlertCircle, Zap } from 'lucide-react'

export function CalendarAI() {
  const [viewMode, setViewMode] = useState<'today' | 'week' | 'smart'>('smart')
  
  const events = [
    {
      id: '1',
      title: 'Krissy Episode 48 Filming',
      type: 'work-priority',
      start: new Date(2026, 1, 24, 10, 0),
      end: new Date(2026, 1, 24, 14, 0),
      location: 'Krissy\'s Studio',
      attendees: ['Krissy Marsh'],
      aiPriority: 10,
      energyRequired: 'high',
      prepTime: 30,
      travelTime: 45,
      conflictRisk: 'none',
      optimalTime: true,
      recurrence: 'weekly'
    },
    {
      id: '2',
      title: 'Stella Podcast Setup Call',
      type: 'client-call',
      start: new Date(2026, 1, 24, 15, 30),
      end: new Date(2026, 1, 24, 16, 30),
      location: 'Video Call',
      attendees: ['Ben - Stella Private'],
      aiPriority: 8,
      energyRequired: 'medium',
      prepTime: 15,
      travelTime: 0,
      conflictRisk: 'none',
      optimalTime: true,
      notes: '$24K project - high value client'
    },
    {
      id: '3',
      title: 'Call Nana Rose',
      type: 'family',
      start: new Date(2026, 1, 24, 19, 0),
      end: new Date(2026, 1, 24, 19, 30),
      location: 'Phone',
      attendees: ['Nana Rose'],
      aiPriority: 9,
      energyRequired: 'low',
      prepTime: 0,
      travelTime: 0,
      conflictRisk: 'none',
      optimalTime: true,
      recurrence: 'daily',
      timezone: 'Dublin GMT+0'
    },
    {
      id: '4',
      title: 'Josh - Dinner at Surry Hills',
      type: 'personal',
      start: new Date(2026, 1, 24, 20, 0),
      end: new Date(2026, 1, 24, 22, 0),
      location: 'Surry Hills Restaurant',
      attendees: ['Josh Inbari'],
      aiPriority: 8,
      energyRequired: 'social',
      prepTime: 15,
      travelTime: 30,
      conflictRisk: 'none',
      optimalTime: true,
      mood: 'romantic'
    },
    {
      id: '5',
      title: 'Gym Session',
      type: 'health',
      start: new Date(2026, 1, 25, 7, 0),
      end: new Date(2026, 1, 25, 8, 30),
      location: 'Local Gym',
      aiPriority: 7,
      energyRequired: 'physical',
      prepTime: 10,
      travelTime: 15,
      conflictRisk: 'low',
      optimalTime: true,
      healthImpact: 'high'
    },
    {
      id: '6',
      title: 'CCC Audition Edit Review',
      type: 'work-urgent',
      start: new Date(2026, 1, 25, 9, 0),
      end: new Date(2026, 1, 25, 12, 0),
      location: 'Home Office',
      aiPriority: 9,
      energyRequired: 'high',
      prepTime: 5,
      travelTime: 0,
      conflictRisk: 'high',
      optimalTime: false,
      deadline: 'OVERDUE',
      stress: 'high'
    }
  ]

  const aiSuggestions = [
    {
      type: 'optimization',
      icon: '⚡',
      title: 'Schedule Optimization',
      suggestion: 'Move gym to 6:30 AM for better energy throughout day',
      impact: 'high',
      reasoning: 'Morning workouts increase afternoon productivity by 23%'
    },
    {
      type: 'buffer',
      icon: '🛡️',
      title: 'Buffer Time Alert',
      suggestion: 'Add 15min buffer after Stella call',
      impact: 'medium',
      reasoning: 'High-value client calls often run over'
    },
    {
      type: 'energy',
      icon: '🔋',
      title: 'Energy Management',
      suggestion: 'Schedule CCC edit during your 10-11 AM peak focus window',
      impact: 'high',
      reasoning: 'Complex editing requires maximum cognitive capacity'
    },
    {
      type: 'conflict',
      icon: '⚠️',
      title: 'Conflict Prevention',
      suggestion: 'Krissy filming has history of running late - warn Josh about dinner timing',
      impact: 'medium',
      reasoning: 'Relationship harmony + client satisfaction balance'
    }
  ]

  const upcomingDeadlines = [
    {
      project: 'CCC Audition Edit',
      deadline: new Date(2026, 1, 23),
      status: 'overdue',
      impact: 'high',
      timeNeeded: '3 hours'
    },
    {
      project: 'Stella Social Pack',
      deadline: new Date(2026, 1, 27),
      status: 'on-track',
      impact: 'medium',
      timeNeeded: '2 hours'
    },
    {
      project: 'Krissy Episode 48',
      deadline: new Date(2026, 1, 25),
      status: 'scheduled',
      impact: 'high',
      timeNeeded: '4 hours'
    }
  ]

  const energyMap = {
    high: 'Creative/Strategic Work',
    medium: 'Client Calls/Meetings',
    low: 'Admin/Email/Family',
    social: 'Networking/Personal Time',
    physical: 'Exercise/Health Activities'
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'work-priority': return 'border-l-4 border-success bg-success/10'
      case 'work-urgent': return 'border-l-4 border-error bg-error/10 animate-pulse'
      case 'client-call': return 'border-l-4 border-gold bg-gold/10'
      case 'family': return 'border-l-4 border-pink-400 bg-pink-400/10'
      case 'personal': return 'border-l-4 border-purple-400 bg-purple-400/10'
      case 'health': return 'border-l-4 border-info bg-info/10'
      default: return 'border-l-4 border-text-muted bg-surface/20'
    }
  }

  const getDeadlineStatus = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-error/20 text-error border-error/30'
      case 'urgent': return 'bg-warning/20 text-warning border-warning/30'
      case 'on-track': return 'bg-success/20 text-success border-success/30'
      case 'scheduled': return 'bg-info/20 text-info border-info/30'
      default: return 'bg-text-muted/20 text-text-muted border-text-muted/30'
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Calendar AI</h3>
        <div className="flex items-center space-x-2">
          <select 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value as any)}
            className="input text-sm"
          >
            <option value="smart">Smart View</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
          </select>
          <Calendar className="text-gold" size={16} />
        </div>
      </div>

      {/* AI Optimization Suggestions */}
      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2 flex items-center space-x-1">
          <span>🤖</span>
          <span>AI Recommendations</span>
        </h4>
        <div className="space-y-2">
          {aiSuggestions.slice(0, 2).map((suggestion, i) => (
            <div key={i} className={`p-3 rounded-lg border ${
              suggestion.impact === 'high' 
                ? 'bg-warning/10 border-warning/30' 
                : 'bg-info/10 border-info/30'
            }`}>
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{suggestion.icon}</span>
                  <h5 className="font-medium text-text-primary text-sm">{suggestion.title}</h5>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  suggestion.impact === 'high' 
                    ? 'bg-warning/30 text-warning' 
                    : 'bg-info/30 text-info'
                }`}>
                  {suggestion.impact}
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-2">{suggestion.suggestion}</p>
              <p className="text-xs text-text-muted italic">{suggestion.reasoning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2">Today's Schedule</h4>
        <div className="space-y-2">
          {events.filter(e => e.start.getDate() === 24).map((event) => (
            <div key={event.id} className={`p-3 rounded-lg ${getEventTypeColor(event.type)} hover:scale-[1.01] transition-all cursor-pointer`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-text-primary text-sm">{event.title}</h5>
                    {event.aiPriority >= 9 && (
                      <AlertCircle className="text-error" size={12} />
                    )}
                    {event.stress === 'high' && (
                      <span className="text-error text-xs">😰</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 text-xs text-text-muted">
                    <div className="flex items-center space-x-1">
                      <Clock size={10} />
                      <span>{event.start.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>-</span>
                      <span>{event.end.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    
                    {event.location && (
                      <div className="flex items-center space-x-1">
                        {event.location.includes('Video') ? <Video size={10} /> : 
                         event.location.includes('Phone') ? <Phone size={10} /> : <MapPin size={10} />}
                        <span>{event.location}</span>
                      </div>
                    )}
                    
                    {event.attendees && event.attendees.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Users size={10} />
                        <span>{event.attendees[0]}</span>
                      </div>
                    )}
                  </div>

                  {event.energyRequired && (
                    <div className="mt-2">
                      <span className="text-xs bg-purple-400/20 text-purple-400 px-2 py-1 rounded-full">
                        Energy: {energyMap[event.energyRequired as keyof typeof energyMap]}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="text-xs font-bold text-text-primary">
                    P{event.aiPriority}/10
                  </div>
                  {event.deadline && (
                    <div className="text-xs text-error font-bold mt-1">
                      {event.deadline}
                    </div>
                  )}
                </div>
              </div>
              
              {event.notes && (
                <p className="text-xs text-gold mt-2">💡 {event.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2">Project Deadlines</h4>
        <div className="space-y-2">
          {upcomingDeadlines.map((deadline, i) => (
            <div key={i} className={`p-2 rounded-lg border ${getDeadlineStatus(deadline.status)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{deadline.project}</div>
                  <div className="text-xs opacity-80">
                    Due: {deadline.deadline.toLocaleDateString('en-AU')} • {deadline.timeNeeded} needed
                  </div>
                </div>
                <div className="text-xs font-bold uppercase">
                  {deadline.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button className="btn-primary text-sm flex items-center justify-center space-x-1">
          <Plus size={12} />
          <span>Quick Event</span>
        </button>
        <button className="btn-secondary text-sm flex items-center justify-center space-x-1">
          <Zap size={12} />
          <span>Optimize</span>
        </button>
      </div>

      {/* Smart Insights */}
      <div className="mt-4 p-3 rounded-lg bg-gold/10 border border-gold/30">
        <div className="text-sm font-medium text-gold mb-1">
          💡 Calendar Intelligence
        </div>
        <div className="text-xs text-text-secondary">
          Your peak creativity window is 10-11 AM. CCC edit is scheduled perfectly for maximum efficiency.
        </div>
      </div>
    </div>
  )
}