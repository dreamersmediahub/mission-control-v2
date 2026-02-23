'use client'

interface PulsatingDotProps {
  color?: string
  size?: 'sm' | 'md' | 'lg'
  intensity?: 'low' | 'medium' | 'high'
}

export function PulsatingDot({ 
  color = '#ffd700',
  size = 'md',
  intensity = 'medium'
}: PulsatingDotProps) {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3', 
    lg: 'w-4 h-4'
  }

  const intensities = {
    low: 'animate-pulse',
    medium: 'animate-pulse-glow',
    high: 'animate-ping'
  }

  return (
    <div className="relative flex items-center justify-center">
      <div 
        className={`${sizes[size]} rounded-full ${intensities[intensity]}`}
        style={{ 
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`
        }}
      />
      {intensity === 'high' && (
        <div 
          className={`absolute ${sizes[size]} rounded-full animate-ping`}
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  )
}