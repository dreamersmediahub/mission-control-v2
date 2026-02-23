import { Agent, Task, Client, DashboardStats, CalendarEvent, WeatherData } from '@/types'

export const mockAgents: Agent[] = [
  {
    id: 'main',
    name: 'Theo Main',
    role: 'Architecture, planning, memory, integrations',
    chatId: 'DM',
    status: 'online',
    lastActivity: new Date(Date.now() - 2 * 60 * 1000),
    currentTask: 'Building Mission Control system',
    tasksCompleted: 156,
    responseTime: 1.2,
    emoji: '🧠'
  },
  {
    id: 'ops',
    name: 'Dreamers Ops',
    role: 'Clients, invoicing, Xero, subscriptions',
    chatId: '-5197185221',
    status: 'online',
    lastActivity: new Date(Date.now() - 15 * 60 * 1000),
    currentTask: 'Processing Stella payment',
    tasksCompleted: 89,
    responseTime: 2.1,
    emoji: '💼'
  },
  {
    id: 'dev',
    name: 'Dev & Build',
    role: 'Apps, GitHub, Vercel, automation',
    chatId: '-5247549915',
    status: 'busy',
    lastActivity: new Date(Date.now() - 5 * 60 * 1000),
    currentTask: 'Mission Control deployment',
    tasksCompleted: 67,
    responseTime: 3.4,
    emoji: '🛠️'
  }
]

export const mockStats: DashboardStats = {
  totalTasks: 23,
  completedTasks: 15,
  pendingInvoices: 2,
  totalRevenue: 34500,
  monthlyRevenue: 8200,
  activeProjects: 4,
  agentsOnline: 3,
  automationsActive: 8
}

export const mockTodayTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Complete Mission Control deployment',
    description: 'Deploy the full application to private Vercel with all 8 modules',
    status: 'in-progress',
    priority: 'urgent',
    assignedTo: 'dev',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
    steps: [
      { id: 'step-1', title: 'Set up project structure', completed: true, order: 1 },
      { id: 'step-2', title: 'Build all 8 core modules', completed: false, order: 2 },
      { id: 'step-3', title: 'Deploy to Vercel', completed: false, order: 3 }
    ],
    tags: ['development', 'urgent', 'mission-control'],
    project: 'Mission Control'
  }
]

export const mockTodayEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Mission Control Demo',
    start: new Date(Date.now() + 6 * 60 * 60 * 1000),
    end: new Date(Date.now() + 7 * 60 * 60 * 1000),
    type: 'meeting',
    priority: 'high'
  }
]

export const mockWeather: WeatherData = {
  location: 'Sydney, NSW',
  temperature: 24,
  condition: 'Partly Cloudy',
  humidity: 68,
  windSpeed: 12,
  icon: '🌤️'
}