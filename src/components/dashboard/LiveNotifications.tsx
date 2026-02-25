// @ts-nocheck
'use client'

import { useRealTimeNotifications } from '@/hooks/useLiveData'
import { X, AlertTriangle, CheckCircle2, Info, AlertCircle } from 'lucide-react'

export function LiveNotifications() {
  const { notifications, dismissNotification } = useRealTimeNotifications()

  if (notifications.length === 0) return null

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={16} className="text-success" />
      case 'warning': return <AlertTriangle size={16} className="text-warning" />
      case 'error': return <AlertCircle size={16} className="text-error" />
      default: return <Info size={16} className="text-info" />
    }
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success': return 'border-success bg-success/10'
      case 'warning': return 'border-warning bg-warning/10'
      case 'error': return 'border-error bg-error/10'
      default: return 'border-info bg-info/10'
    }
  }

  return (
    <div className="fixed top-20 right-4 z-[100] space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`card border-l-4 ${getTypeStyles(notification.type)} animate-in slide-in-from-right duration-300`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              <div className="flex-1">
                <h4 className="font-medium text-text-primary text-sm">
                  {notification.title}
                </h4>
                <p className="text-text-secondary text-xs mt-1">
                  {notification.message}
                </p>
                <p className="text-text-muted text-xs mt-1">
                  {notification.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="text-text-muted hover:text-text-secondary p-1"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}