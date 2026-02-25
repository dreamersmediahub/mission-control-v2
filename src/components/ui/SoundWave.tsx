// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'

interface SoundWaveProps {
  bars?: number
  color?: string
  height?: number
  isActive?: boolean
}

export function SoundWave({ 
  bars = 20,
  color = '#ffd700',
  height = 60,
  isActive = true
}: SoundWaveProps) {
  const [waveData, setWaveData] = useState<number[]>([])

  useEffect(() => {
    if (!isActive) {
      setWaveData(Array(bars).fill(0.1))
      return
    }

    const generateWave = () => {
      const newWave = Array(bars).fill(0).map((_, i) => {
        const baseHeight = Math.sin(Date.now() * 0.005 + i * 0.3) * 0.3 + 0.4
        const randomVariation = Math.random() * 0.3
        return Math.max(0.1, baseHeight + randomVariation)
      })
      setWaveData(newWave)
    }

    const interval = setInterval(generateWave, 100)
    generateWave()

    return () => clearInterval(interval)
  }, [bars, isActive])

  return (
    <div className="flex items-end space-x-1" style={{ height: `${height}px` }}>
      {waveData.map((amplitude, index) => (
        <div
          key={index}
          className="transition-all duration-100 ease-out rounded-t-sm"
          style={{
            width: `${100 / bars}%`,
            height: `${amplitude * height}px`,
            backgroundColor: color,
            boxShadow: `0 0 5px ${color}`,
            opacity: 0.7 + amplitude * 0.3
          }}
        />
      ))}
    </div>
  )
}