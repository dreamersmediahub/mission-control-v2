import { Agent, Task, Client, Invoice, DashboardStats, CalendarEvent, WeatherData, Subscription, ContentPiece } from '@/types'

// Kyle's actual agent ecosystem
export const mockAgents: Agent[] = [
  {
    id: 'main',
    name: 'Theo Main',
    role: 'Architecture, planning, memory, integrations',
    chatId: 'DM',
    status: 'online',
    lastActivity: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
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
    lastActivity: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
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
    lastActivity: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    currentTask: 'Mission Control deployment',
    tasksCompleted: 67,
    responseTime: 3.4,
    emoji: '🛠️'
  },
  {
    id: 'money',
    name: 'Money & Tax',
    role: 'Finances, debt, ATO, bank reconciliation',
    chatId: '-5254622420',
    status: 'online',
    lastActivity: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    currentTask: 'CCC reconciliation review',
    tasksCompleted: 34,
    responseTime: 1.8,
    emoji: '📊'
  },
  {
    id: 'health',
    name: 'Health & Body',
    role: 'Peptides, gym, meals, supplements',
    chatId: '-5234477600',
    status: 'online',
    lastActivity: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    currentTask: 'Medication reminder scheduled',
    tasksCompleted: 78,
    responseTime: 1.5,
    emoji: '🏋️'
  },
  {
    id: 'brief',
    name: 'Daily Brief',
    role: 'Morning briefings, email triage, calendar',
    chatId: '-1003844311136',
    status: 'online',
    lastActivity: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    currentTask: 'Preparing tomorrow\'s briefing',
    tasksCompleted: 112,
    responseTime: 0.9,
    emoji: '📬'
  }
]

export const mockStats: DashboardStats = {
  totalTasks: 23,
  completedTasks: 15,
  pendingInvoices: 2,
  totalRevenue: 34500,
  monthlyRevenue: 8200,
  activeProjects: 4,
  agentsOnline: 5,
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
  },
  {
    id: 'task-2',
    title: 'Krissy episode 47 final edit',
    description: 'Complete final edit and upload for Tuesday release',
    status: 'pending',
    priority: 'high',
    assignedTo: 'ops',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
    steps: [
      { id: 'step-4', title: 'Color correction', completed: true, order: 1 },
      { id: 'step-5', title: 'Audio sync and cleanup', completed: true, order: 2 },
      { id: 'step-6', title: 'Final render and upload', completed: false, order: 3 }
    ],
    tags: ['krissy', 'editing', 'deadline'],
    project: 'Wildly Inappropriate Podcast'
  },
  {
    id: 'task-3',
    title: 'Call Nana Rose - morning check-in',
    description: 'Daily morning call with Nana Rose in Ireland',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    steps: [
      { id: 'step-7', title: 'Check time difference (Ireland GMT)', completed: false, order: 1 },
      { id: 'step-8', title: 'Call Nana Rose', completed: false, order: 2 }
    ],
    tags: ['family', 'daily', 'personal'],
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
  },
  {
    id: 'event-2',
    title: 'Stella podcast setup call',
    start: new Date(Date.now() + 26 * 60 * 60 * 1000),
    end: new Date(Date.now() + 27 * 60 * 60 * 1000),
    type: 'meeting',