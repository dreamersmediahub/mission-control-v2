import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(amount: number, currency: string = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatDistanceToNow(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return `${diffInSeconds}s`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
  return `${Math.floor(diffInSeconds / 86400)}d`
}

export function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 21) return 'evening'
  return 'night'
}

export function getGreeting(): string {
  const timeOfDay = getTimeOfDay()
  const greetings = {
    morning: 'Good morning',
    afternoon: 'Good afternoon', 
    evening: 'Good evening',
    night: 'Good evening'
  }
  return greetings[timeOfDay]
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

export function getPriorityColor(priority: 'low' | 'medium' | 'high' | 'urgent'): string {
  const colors = {
    low: 'text-text-muted',
    medium: 'text-info',
    high: 'text-warning',
    urgent: 'text-error'
  }
  return colors[priority]
}

export function getStatusColor(status: string): string {
  const statusColors: { [key: string]: string } = {
    completed: 'text-success',
    'in-progress': 'text-warning',
    pending: 'text-info',
    cancelled: 'text-error',
    active: 'text-success',
    inactive: 'text-text-muted',
    online: 'text-success',
    offline: 'text-error',
    busy: 'text-warning'
  }
  return statusColors[status] || 'text-text-secondary'
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}