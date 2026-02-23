'use client'

import { useEffect, useRef } from 'react'

export function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGrid = () => {
      const gridSize = 50
      const time = Date.now() * 0.001
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const opacity = 0.1 + Math.sin(time + x * 0.01) * 0.05
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      
      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const opacity = 0.1 + Math.sin(time + y * 0.01) * 0.05
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      
      // Moving data streams
      for (let i = 0; i < 5; i++) {
        const x = (time * 50 + i * 200) % (canvas.width + 200) - 200
        const y = Math.sin(time + i) * 100 + canvas.height / 2
        
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, 0.8)`
        ctx.fill()
        
        // Trail effect
        for (let j = 1; j < 10; j++) {
          const trailX = x - j * 10
          const trailY = y + Math.sin(time + i + j * 0.1) * 2
          const trailOpacity = (10 - j) / 10 * 0.3
          
          ctx.beginPath()
          ctx.arc(trailX, trailY, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 212, 255, ${trailOpacity})`
          ctx.fill()
        }
      }
      
      requestAnimationFrame(drawGrid)
    }

    resizeCanvas()
    drawGrid()

    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{ background: 'transparent' }}
    />
  )
}