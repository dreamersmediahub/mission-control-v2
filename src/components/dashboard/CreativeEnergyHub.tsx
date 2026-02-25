// @ts-nocheck
'use client'

import { useState } from 'react'
import { Palette, Camera, Mic, Video, Sparkles, Lightbulb, Flame, Moon } from 'lucide-react'

export function CreativeEnergyHub() {
  const [creativeMode, setCreativeMode] = useState<string>('')
  const [currentProject, setCurrentProject] = useState('Krissy Episode 47')
  
  const creativeModes = [
    {
      name: 'Visionary',
      description: 'Big picture thinking, strategy, concepts',
      icon: <Lightbulb className="text-gold" size={20} />,
      energy: 'high',
      tasks: ['Podcast network strategy', 'Brand positioning', 'Content pillars'],
      color: 'from-gold to-yellow-400'
    },
    {
      name: 'Producer',
      description: 'Hands-on creation, editing, execution',
      icon: <Video className="text-success" size={20} />,
      energy: 'focused',
      tasks: ['Episode editing', 'Social media creation', 'Asset production'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Storyteller',
      description: 'Narrative, vulnerability, connection',
      icon: <Mic className="text-purple-400" size={20} />,
      energy: 'emotional',
      tasks: ['Personal content', 'Coming out stories', 'Mental health advocacy'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Designer',
      description: 'Visual aesthetics, branding, beautiful things',
      icon: <Palette className="text-info" size={20} />,
      energy: 'aesthetic',
      tasks: ['Client branding', 'Social templates', 'Website design'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Director',
      description: 'Vision execution, team coordination, leadership',
      icon: <Camera className="text-error" size={20} />,
      energy: 'commanding',
      tasks: ['Photoshoot direction', 'Team briefs', 'Client presentations'],
      color: 'from-red-500 to-pink-500'
    },
    {
      name: 'Dreamer',
      description: 'Future self, manifestation, possibility',
      icon: <Sparkles className="text-purple-300" size={20} />,
      energy: 'expansive',
      tasks: ['Vision boarding', 'Goal setting', 'Network building'],
      color: 'from-purple-400 to-indigo-400'
    }
  ]

  const currentInspiration = [
    '✨ Alex Cooper\'s podcast empire blueprint',
    '🎬 A24 film aesthetics and storytelling',
    '🏆 Joe Rogan\'s media independence model',
    '💫 Shawn Mendes\' vulnerability as strength',
    '🎨 Apple\'s design philosophy',
    '🚀 MrBeast\'s systematic content approach'
  ]

  const creativeBoosts = {
    'Visionary': ['Listen to Naval Ravikant', 'Take a walk', 'Mind map session'],
    'Producer': ['Put on focus playlist', 'Clear desk space', 'Set 90-min timer'],
    'Storyteller': ['Journal for 10 minutes', 'Call someone you trust', 'Read poetry'],
    'Designer': ['Browse Dribbble/Behance', 'Change environment', 'Study great brands'],
    'Director': ['Review past wins', 'Plan the shoot', 'Get in character'],
    'Dreamer': ['Meditation/visualization', 'Watch inspiring content', 'Future self exercise']
  }

  const getEnergyRing = (energy: string) => {
    switch (energy) {
      case 'high': return 'ring-gold ring-2 shadow-lg shadow-gold/20'
      case 'focused': return 'ring-success ring-2 shadow-lg shadow-success/20'
      case 'emotional': return 'ring-purple-400 ring-2 shadow-lg shadow-purple-400/20'
      case 'aesthetic': return 'ring-info ring-2 shadow-lg shadow-info/20'
      case 'commanding': return 'ring-error ring-2 shadow-lg shadow-error/20'
      case 'expansive': return 'ring-purple-300 ring-2 shadow-lg shadow-purple-300/20'
      default: return ''
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Creative Energy Hub</h3>
        <div className="flex items-center space-x-1">
          <Flame className="text-gold animate-pulse" size={16} />
          <span className="text-sm text-gold">Artist Mode</span>
        </div>
      </div>

      {/* Current Project Context */}
      <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gold font-medium">Active Project</p>
            <p className="text-text-primary font-semibold">{currentProject}</p>
          </div>
          <select 
            value={currentProject}
            onChange={(e) => setCurrentProject(e.target.value)}
            className="input text-sm w-40"
          >
            <option>Krissy Episode 47</option>
            <option>Stella Social Pack</option>
            <option>Anusa Property Site</option>
            <option>Personal Brand 2.0</option>
            <option>Podcast Network Vision</option>
          </select>
        </div>
      </div>

      {/* Creative Mode Selection */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {creativeModes.map((mode) => (
          <button
            key={mode.name}
            onClick={() => setCreativeMode(mode.name)}
            className={`p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
              creativeMode === mode.name
                ? `${getEnergyRing(mode.energy)} bg-gradient-to-r ${mode.color} bg-opacity-20`
                : 'border-surface-hover bg-surface/30 hover:border-gold/50'
            }`}
          >
            <div className="text-center">
              <div className="mb-2 flex justify-center">
                {mode.icon}
              </div>
              <div className="font-semibold text-text-primary text-sm">{mode.name}</div>
              <div className="text-xs text-text-muted mt-1">{mode.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Mode-Specific Recommendations */}
      {creativeMode && (
        <div className="mb-4 p-4 rounded-lg bg-surface/20 border border-surface-hover">
          <h4 className="font-semibold text-text-primary mb-2 flex items-center space-x-2">
            {creativeModes.find(m => m.name === creativeMode)?.icon}
            <span>{creativeMode} Mode Activated</span>
          </h4>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-text-secondary mb-1">Recommended Tasks:</p>
              <div className="space-y-1">
                {creativeModes.find(m => m.name === creativeMode)?.tasks.map((task, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-gold rounded-full"></div>
                    <span className="text-sm text-text-primary">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-text-secondary mb-1">Creative Boost:</p>
              <div className="space-y-1">
                {(creativeBoosts[creativeMode as keyof typeof creativeBoosts] || []).map((boost, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-info rounded-full"></div>
                    <span className="text-sm text-info">{boost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Inspiration Feed */}
      <div className="mb-4">
        <h4 className="font-semibold text-text-primary mb-2 flex items-center space-x-1">
          <Lightbulb size={14} className="text-gold" />
          <span>Current Inspiration</span>
        </h4>
        <div className="space-y-2">
          {currentInspiration.map((inspiration, i) => (
            <div key={i} className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
              {inspiration}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Creative Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button className="btn-primary text-sm flex items-center justify-center space-x-1">
          <Sparkles size={12} />
          <span>Idea Dump</span>
        </button>
        <button className="btn-secondary text-sm flex items-center justify-center space-x-1">
          <Camera size={12} />
          <span>Visual Board</span>
        </button>
      </div>

      {/* Creative Quote */}
      <div className="mt-4 text-center border-t border-surface-hover pt-3">
        <p className="text-xs text-gold italic">
          "You're not here to be chosen. You're here to choose yourself and create something beautiful." ✨
        </p>
      </div>
    </div>
  )
}