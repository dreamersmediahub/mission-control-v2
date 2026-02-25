// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { LiveDataManager } from '@/lib/live-data'
import { Agent, Task, DashboardStats, CalendarEvent } from '@/types'

// Custom hook for live data updates
export function useLiveData<T>(dataType: 'agents' | 'stats' | 'tasks' | 'calendar', initialFetch: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    const liveManager = LiveDataManager.getInstance()

    // Initial fetch
    initialFetch().then(result => {
      setData(result)
      setLoading(false)
      setLastUpdated(new Date())
    })

    // Subscribe to live updates
    const updateCallback = (newData: T) => {
      setData(newData)
      setLastUpdated(new Date())
    }

    liveManager.subscribe(dataType, updateCallback)

    // Start live updates on first hook usage
    if (dataType === 'agents') {
      liveManager.startLiveUpdates()
    }

    // Cleanup function
    return () => {
      // In a real implementation, we'd unsubscribe here
    }
  }, [dataType])

  return { data, loading, lastUpdated }
}

// Specific hooks for each data type
export function useLiveAgents() {
  return useLiveData('agents', () => LiveDataManager.getInstance().getLiveAgents())
}

export function useLiveStats() {
  return useLiveData('stats', () => LiveDataManager.getInstance().getLiveStats())
}

export function useLiveTasks() {
  return useLiveData('tasks', () => LiveDataManager.getInstance().getLiveTasks())
}

export function useLiveCalendar() {
  return useLiveData('calendar', () => LiveDataManager.getInstance().getLiveCalendarEvents())
}

// Real-time notification hook
export function useRealTimeNotifications() {
  const [notifications, setNotifications] = useState<Array<{
    id: string
    type: 'success' | 'warning' | 'error' | 'info'
    title: string
    message: string
    timestamp: Date
  }>>([])

  useEffect(() => {
    const liveManager = LiveDataManager.getInstance()

    // Subscribe to agent status changes for notifications
    liveManager.subscribe('agents', (agents: Agent[]) => {
      agents.forEach(agent => {
        if (agent.status === 'offline' && Math.random() > 0.9) {
          setNotifications(prev => [...prev, {
            id: `notification-${Date.now()}`,
            type: 'warning',
            title: 'Agent Status Change',
            message: `${agent.name} went offline`,
            timestamp: new Date()
          }])
        }
      })
    })

    // Subscribe to stats for threshold alerts
    liveManager.subscribe('stats', (stats: DashboardStats) => {
      if (stats.pendingInvoices > 3 && Math.random() > 0.8) {
        setNotifications(prev => [...prev, {
          id: `notification-${Date.now()}`,
          type: 'error',
          title: 'Payment Alert',
          message: `${stats.pendingInvoices} invoices pending - chase payments`,
          timestamp: new Date()
        }])
      }
    })

    // Auto-remove old notifications after 10 seconds
    const cleanup = setInterval(() => {
      setNotifications(prev => prev.filter(n => Date.now() - n.timestamp.getTime() < 10000))
    }, 5000)

    return () => clearInterval(cleanup)
  }, [])

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return { notifications, dismissNotification }
}