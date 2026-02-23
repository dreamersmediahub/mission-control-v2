'use client'

import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    trend: 'up' | 'down'
  }
  icon: LucideIcon
  color?: string
}

export function StatsCard({ title, value, change, icon: Icon, color = 'gold' }: StatsCardProps) {
  const colorClasses = {
    gold: 'text-gold',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-info'
  }

  return (
    <div className="card group hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-secondary text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-text-primary mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              change.trend === 'up' ? 'text-success' : 'text-error'
            }`}>
              <span>{change.trend === 'up' ? '↗' : '↘'}</span>
              <span className="ml-1">{Math.abs(change.value)}%</span>
            </div>
          )}
        </div>
        <div className={`${colorClasses[color]} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
          <Icon size={32} />
        </div>
      </div>
    </div>
  )
}