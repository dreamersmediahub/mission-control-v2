// @ts-nocheck
'use client'

import { useState } from 'react'
import { Target, Sparkles, TrendingUp, Calendar, Star, Flame } from 'lucide-react'

export function ManifestationTracker() {
  const [activeGoals] = useState([
    {
      id: '1',
      title: 'Household Name Status',
      description: 'Alex Cooper / Shawn Mendes level recognition',
      timeframe: '5 years',
      progress: 12,
      energy: 'high',
      lastAction: 'Mission Control launch',
      nextAction: 'Podcast network strategy',
      category: 'fame'
    },
    {
      id: '2',
      title: 'Financial Freedom',
      description: 'Take care of family, clear debt, build wealth',
      timeframe: '3 years',
      progress: 28,
      energy: 'medium',
      lastAction: 'Stella Private project',
      nextAction: 'Recurring revenue streams',
      category: 'money'
    },
    {
      id: '3',
      title: 'Media Empire',
      description: 'Own the network, creative visionary role',
      timeframe: '7 years',
      progress: 8,
      energy: 'building',
      lastAction: 'Krissy podcast success',
      nextAction: 'Original content development',
      category: 'empire'
    },
    {
      id: '4',
      title: 'Acting Career',
      description: 'Lead roles, film premieres, industry recognition',
      timeframe: '4 years',
      progress: 5,
      energy: 'visioning',
      lastAction: 'Vulnerability storytelling',
      nextAction: 'Acting classes + headshots',
      category: 'acting'
    }
  ])

  const getEnergyColor = (energy: string) => {
    switch (energy) {
      case 'high': return 'text-success border-success/30 bg-success/10'
      case 'medium': return 'text-warning border-warning/30 bg-warning/10'
      case 'building': return 'text-info border-info/30 bg-info/10'
      case 'visioning': return 'text-purple-400 border-purple-400/30 bg-purple-400/10'
      default: return 'text-text-muted border-text-muted/30 bg-text-muted/10'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fame': return <Star className="text-gold" size={16} />
      case 'money': return <TrendingUp className="text-success" size={16} />
      case 'empire': return <Flame className="text-error" size={16} />
      case 'acting': return <Target className="text-purple-400" size={16} />
      default: return <Sparkles className="text-info" size={16} />
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Manifestation Tracker</h3>
        <div className="flex items-center space-x-1">
          <Sparkles className="text-gold animate-pulse" size={16} />
          <span className="text-sm text-gold">Universe Aligned</span>
        </div>
      </div>

      <div className="space-y-4">
        {activeGoals.map((goal) => (
          <div key={goal.id} className="border border-surface-hover rounded-lg p-4 hover:border-gold/50 transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(goal.category)}
                <div>
                  <h4 className="font-semibold text-text-primary">{goal.title}</h4>
                  <p className="text-sm text-text-secondary">{goal.description}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getEnergyColor(goal.energy)}`}>
                {goal.energy}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text-secondary">Progress</span>
                <span className="text-sm font-medium text-text-primary">{goal.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill bg-gradient-to-r from-gold to-gold/80" 
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Timeline & Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <div className="flex items-center space-x-1 text-text-muted mb-1">
                  <Calendar size={12} />
                  <span>Timeline: {goal.timeframe}</span>
                </div>
                <div className="text-text-secondary">
                  Last: {goal.lastAction}
                </div>
              </div>
              <div>
                <div className="text-gold font-medium mb-1">Next Action:</div>
                <div className="text-text-secondary">
                  {goal.nextAction}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Manifestation Input */}
      <div className="mt-6 border-t border-surface-hover pt-4">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="text-gold" size={16} />
          <span className="text-sm font-medium text-text-primary">Daily Intention</span>
        </div>
        <div className="flex space-x-2">
          <input 
            type="text" 
            placeholder="I am grateful for..."
            className="input flex-1 text-sm"
          />
          <button className="btn-primary text-sm px-4">
            Set
          </button>
        </div>
        <p className="text-xs text-text-muted mt-2">
          "I'm not here to be chosen. I'm here to choose myself." - Kyle
        </p>
      </div>
    </div>
  )
}