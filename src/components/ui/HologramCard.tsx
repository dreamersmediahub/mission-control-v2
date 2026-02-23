'use client'

import { useState, useRef, useEffect } from 'react'

interface HologramCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function HologramCard({ children, className = '', intensity = 1 }: HologramCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    setMousePosition({ x, y })
  }

  const hologramStyle = {
    transform: isHovered ? 
      `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 20 * intensity}deg) rotateX(${(mousePosition.y - 0.5) * -20 * intensity}deg) translateZ(20px)` :
      'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)',
    background: isHovered ?
      `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 215, 0, 0.1), transparent 50%)` :
      'transparent',
    boxShadow: isHovered ?
      `0 20px 40px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.1)` :
      '0 4px 8px rgba(0, 0, 0, 0.1)'
  }

  return (
    <div
      ref={cardRef}
      className={`${className} card transition-all duration-300 cursor-pointer relative overflow-hidden`}
      style={hologramStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Holographic scanlines */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-20' : 'opacity-0'
        }`}
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 215, 0, 0.1) 2px,
            rgba(255, 215, 0, 0.1) 4px
          )`
        }}
      />
      
      {/* Shimmer effect */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          background: `linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 215, 0, 0.2) 50%,
            transparent 70%
          )`,
          animation: isHovered ? 'shimmer 2s infinite' : 'none'
        }}
      />
      
      {children}
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}