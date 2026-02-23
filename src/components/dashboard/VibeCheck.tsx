'use client'

import { useState } from 'react'
import { Brain, Zap, Coffee, Sparkles, Moon, Sun } from 'lucide-react'

export function VibeCheck() {
  const [currentMood, setCurrentMood] = useState<string>('')
  const [energyLevel, setEnergyLevel] = useState(7)
  
  const vibes = [
    { emoji: '🔥', label: 'On Fire', color: 'from-orange-500 to-red-500', energy: 10 },
    { emoji: '🚀', label: 'Locked In', color: 'from-blue-500 to-purple-600', energy: 9 },
    { emoji: '✨', label: 'Creative Flow', color: 'from-gold to-yellow-400', energy: 8 },
    { emoji: '🌊', label: 'Balanced', color: 'from-teal-500 to-blue-500', energy: 7 },
    { emoji: '🌱', label: 'Building', color: 'from-green-500 to-emerald-500', energy: 6 },
    { emoji: '🧠', label: 'Thinking', color: 'from-indigo-500 to-purple-500', energy: 5 },
    { emoji: '☕', label: 'Need Fuel', color: 'from-amber-600 to-orange-500', energy: 4 },
    { emoji: '😴', label: 'Low Energy', color: 'from-gray-500 to-slate-600', energy: 3 },
    { emoji: '🌧️', label: 'Off Day', color: 'from-gray-600 to-gray-800', energy: 2 }
  ]

  const getVibeRecommendation = (vibe: any) => {
    const recommendations = {
      '🔥': ['Tackle your biggest project', 'Record content', 'Make important decisions'],
      '🚀': ['Deep work session', 'Handle complex tasks', 'Strategic planning'],
      '✨': ['Create content', 'Design work', 'Brainstorm ideas'],
      '🌊': ['Regular workflow', 'Client calls', 'Administrative tasks'],
      '🌱': ['Learning mode', 'Skill building', 'Research'],
      '🧠': ['Planning session', 'Problem solving', 'Analysis work'],
      '☕': ['Take a break', 'Light tasks only', 'Fuel up first'],
      '😴': ['Rest mode', 'Delegate everything', 'Self-care'],
      '🌧️': ['Minimum viable day', 'Cancel non-essentials', 'Be kind to yourself']
    }
    return recommendations[vibe.emoji] || ['Take it easy']
  }

  const handleVibeSelect = (vibe: any) => {
    setCurrentMood(vibe.label)
    setEnergyLevel(vibe.energy)
    // TODO: Save to health tracking and adjust daily priorities
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Vibe Check</h3>
        <div className="flex items-center space-x-1">
          <Sparkles className="text-gold animate-pulse" size={16} />
          <span className="text-sm text-gold">Daily Reset</span>
        </div>
      </div>

      {/* Current Vibe Display */}
      {currentMood && (
        <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gold font-medium">Current Vibe</p>
              <p className="text-text-primary font-semibold">{currentMood}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-gold">
                <Zap size={14} />
                <span className="text-sm font-medium">{energyLevel}/10</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vibe Selection Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {vibes.map((vibe) => (
          <button
            key={vibe.label}
            onClick={() => handleVibeSelect(vibe)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 active:scale-95 ${
              currentMood === vibe.label 
                ? 'border-gold bg-gold/20' 
                : 'border-surface-hover bg-surface/30 hover:border-gold/50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">{vibe.emoji}</div>
              <div className="text-xs text-text-secondary">{vibe.label}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Recommendations */}
      {currentMood && (
        <div className="border-t border-surface-hover pt-4">
          <p className="text-sm font-medium text-text-primary mb-2">Recommended for this vibe:</p>
          <div className="space-y-1">
            {getVibeRecommendation(vibes.find(v => v.label === currentMood))?.map((rec, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                <div className="w-1 h-1 bg-gold rounded-full"></div>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions based on energy */}
      <div className="mt-4 flex space-x-2">
        {energyLevel >= 8 && (
          <button className="flex-1 btn-primary text-sm flex items-center justify-center space-x-1">
            <Coffee size={14} />
            <span>Beast Mode</span>
          </button>
        )}
        {energyLevel <= 4 && (
          <button className="flex-1 btn-secondary text-sm flex items-center justify-center space-x-1">
            <Moon size={14} />
            <span>Delegate All</span>
          </button>
        )}
        <button className="flex-1 btn-secondary text-sm flex items-center justify-center space-x-1">
          <Brain size={14} />
          <span>Adjust Day</span>
        </button>
      </div>
    </div>
  )
}