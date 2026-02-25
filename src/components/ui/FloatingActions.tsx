// @ts-nocheck
'use client'

import { useState } from 'react'
import { Plus, Zap, MessageCircle, Target, Settings } from 'lucide-react'
import { NeonButton } from './NeonButton'

export function FloatingActions() {
  const [isExpanded, setIsExpanded] = useState(false)

  const actions = [
    { icon: MessageCircle, label: 'Quick Message', color: 'blue' as const },
    { icon: Zap, label: 'Run Automation', color: 'gold' as const },
    { icon: Target, label: 'New Task', color: 'green' as const },
    { icon: Settings, label: 'Settings', color: 'pink' as const }
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col-reverse items-end space-y-reverse space-y-2">
        {/* Action buttons */}
        {isExpanded && actions.map((action, index) => (
          <div 
            key={action.label}
            className="flex items-center space-x-2 animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="bg-primary px-3 py-1 rounded-lg text-sm font-medium text-background whitespace-nowrap">
              {action.label}
            </span>
            <NeonButton 
              variant={action.color}
              size="md"
              className="w-12 h-12 rounded-full !p-0 flex items-center justify-center"
              glowing
            >
              <action.icon size={20} />
            </NeonButton>
          </div>
        ))}

        {/* Main toggle button */}
        <NeonButton
          variant="gold"
          size="lg" 
          className={`w-16 h-16 rounded-full !p-0 flex items-center justify-center transition-transform duration-300 ${
            isExpanded ? 'rotate-45' : 'rotate-0'
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
          glowing
        >
          <Plus size={24} />
        </NeonButton>
      </div>

      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  )
}