// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  glitchIntensity?: number
}

export function GlitchText({ text, className = '', glitchIntensity = 0.1 }: GlitchTextProps) {
  const [glitchedText, setGlitchedText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    const glitch = () => {
      if (Math.random() < glitchIntensity) {
        setIsGlitching(true)
        
        let corrupted = text.split('').map(char => {
          if (Math.random() < 0.1) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          }
          return char
        }).join('')
        
        setGlitchedText(corrupted)
        
        setTimeout(() => {
          setGlitchedText(text)
          setIsGlitching(false)
        }, 100)
      }
    }

    const interval = setInterval(glitch, 3000)
    return () => clearInterval(interval)
  }, [text, glitchIntensity])

  return (
    <span 
      className={`${className} ${isGlitching ? 'animate-pulse text-red-500' : ''} transition-all duration-100`}
      style={{
        textShadow: isGlitching ? 
          '2px 0 #ff0000, -2px 0 #00ff00, 0 2px #0000ff' : 
          'none'
      }}
    >
      {glitchedText}
    </span>
  )
}