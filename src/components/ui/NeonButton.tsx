'use client'

import { useState } from 'react'

interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'gold' | 'blue' | 'pink' | 'green' | 'red'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  glowing?: boolean
}

export function NeonButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'gold',
  size = 'md',
  disabled = false,
  glowing = false
}: NeonButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const variants = {
    gold: {
      color: '#ffd700',
      shadow: '#ffd700',
      bg: 'rgba(255, 215, 0, 0.1)'
    },
    blue: {
      color: '#00d4ff',
      shadow: '#00d4ff', 
      bg: 'rgba(0, 212, 255, 0.1)'
    },
    pink: {
      color: '#ff1744',
      shadow: '#ff1744',
      bg: 'rgba(255, 23, 68, 0.1)'
    },
    green: {
      color: '#00ff88',
      shadow: '#00ff88',
      bg: 'rgba(0, 255, 136, 0.1)'
    },
    red: {
      color: '#ff4444',
      shadow: '#ff4444',
      bg: 'rgba(255, 68, 68, 0.1)'
    }
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base', 
    lg: 'px-6 py-3 text-lg'
  }

  const currentVariant = variants[variant]
  
  const buttonStyle = {
    color: currentVariant.color,
    borderColor: currentVariant.color,
    backgroundColor: isPressed ? currentVariant.bg : 'transparent',
    boxShadow: glowing || isPressed ? 
      `0 0 20px ${currentVariant.shadow}, inset 0 0 20px ${currentVariant.shadow}40` :
      `0 0 10px ${currentVariant.shadow}80`,
    transform: isPressed ? 'scale(0.98)' : 'scale(1)',
    filter: disabled ? 'grayscale(100%) opacity(50%)' : 'none'
  }

  return (
    <button
      className={`${className} ${sizes[size]} border-2 rounded-lg font-medium transition-all duration-200 relative overflow-hidden group ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'
      }`}
      style={buttonStyle}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled}
    >
      {/* Electric ripple effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${currentVariant.color}40 0%, transparent 70%)`
        }}
      />
      
      {/* Animated border glow */}
      <div 
        className="absolute inset-0 rounded-lg animate-pulse"
        style={{
          background: `linear-gradient(45deg, transparent, ${currentVariant.color}20, transparent)`,
          opacity: glowing ? 0.5 : 0
        }}
      />
      
      <span className="relative z-10 font-bold tracking-wide uppercase">
        {children}
      </span>
    </button>
  )
}