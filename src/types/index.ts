export interface Agent {
  id: string
  name: string
  role: string
  chatId: string
  status: 'online' | 'busy' | 'offline'
  lastActivity: Date
  currentTask?: string
  tasksCompleted: number
  responseTime: number
  emoji: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
  steps: TaskStep[]
  tags: string[]
  project?: string
}

export interface TaskStep {
  id: string
  title: string
  completed: boolean
  order: number
}

export interface Client {
  id: string
  name: string
  company?: string
  email: string
  phone?: string
  status: 'active' | 'inactive' | 'prospect'
  totalValue: number
  outstandingBalance: number
  lastContact: Date
  projects: Project[]
  notes: string
}

export interface Project {
  id: string
  name: string
  clientId: string
  status: 'planning' | 'active' | 'review' | 'completed' | 'cancelled'
  value: number
  startDate: Date
  endDate?: Date
  progress: number
  tasks: Task[]
}

export interface Invoice {
  id: string
  number: string
  clientId: string
  amount: number
  status: 'draft' | 'sent' | 'overdue' | 'paid' | 'cancelled'
  issueDate: Date
  dueDate: Date
  paidDate?: Date
  items: InvoiceItem[]
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export interface HealthMetric {
  id: string
  type: 'medication' | 'exercise' | 'sleep' | 'mood' | 'weight' | 'call'
  value: string | number
  timestamp: Date
  notes?: string
}

export interface Automation {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'error'
  lastRun: Date
  nextRun?: Date
  successRate: number
  totalRuns: number
  triggers: AutomationTrigger[]
  actions: AutomationAction[]
}

export interface AutomationTrigger {
  id: string
  type: 'schedule' | 'email' | 'webhook' | 'manual'
  config: Record<string, any>
}

export interface AutomationAction {
  id: string
  type: 'email' | 'task' | 'notification' | 'webhook'
  config: Record<string, any>
}

export interface DashboardStats {
  totalTasks: number
  completedTasks: number
  pendingInvoices: number
  totalRevenue: number
  monthlyRevenue: number
  activeProjects: number
  agentsOnline: number
  automationsActive: number
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: 'meeting' | 'deadline' | 'reminder' | 'block'
  priority: 'low' | 'medium' | 'high'
}

export interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
}

export interface Subscription {
  id: string
  name: string
  provider: string
  amount: number
  currency: string
  billing: 'monthly' | 'yearly' | 'quarterly'
  nextBilling: Date
  status: 'active' | 'cancelled' | 'expired'
  category: string
}

export interface ContentPiece {
  id: string
  title: string
  type: 'episode' | 'social' | 'blog' | 'asset'
  status: 'planning' | 'recording' | 'editing' | 'review' | 'published'
  project: string
  dueDate?: Date
  progress: number
  files: ContentFile[]
}

export interface ContentFile {
  id: string
  name: string
  type: 'video' | 'audio' | 'image' | 'document'
  size: number
  url: string
  thumbnail?: string
}