import { create } from 'zustand'
import { Agent, Task, DashboardStats, CalendarEvent, WeatherData } from '@/types'

interface DashboardStore {
  stats: DashboardStats
  agents: Agent[]
  todayTasks: Task[]
  todayEvents: CalendarEvent[]
  weather: WeatherData | null
  isLoading: boolean
  lastUpdated: Date | null
  
  // Actions
  setStats: (stats: DashboardStats) => void
  setAgents: (agents: Agent[]) => void
  setTodayTasks: (tasks: Task[]) => void
  setTodayEvents: (events: CalendarEvent[]) => void
  setWeather: (weather: WeatherData) => void
  setLoading: (loading: boolean) => void
  updateAgent: (agentId: string, updates: Partial<Agent>) => void
  updateTaskStatus: (taskId: string, status: Task['status']) => void
  refresh: () => void
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  stats: {
    totalTasks: 0,
    completedTasks: 0,
    pendingInvoices: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    activeProjects: 0,
    agentsOnline: 0,
    automationsActive: 0,
  },
  agents: [],
  todayTasks: [],
  todayEvents: [],
  weather: null,
  isLoading: true,
  lastUpdated: null,

  setStats: (stats) => set({ stats, lastUpdated: new Date() }),
  setAgents: (agents) => set({ agents, lastUpdated: new Date() }),
  setTodayTasks: (todayTasks) => set({ todayTasks, lastUpdated: new Date() }),
  setTodayEvents: (todayEvents) => set({ todayEvents, lastUpdated: new Date() }),
  setWeather: (weather) => set({ weather, lastUpdated: new Date() }),
  setLoading: (isLoading) => set({ isLoading }),
  
  updateAgent: (agentId, updates) => {
    const agents = get().agents.map(agent => 
      agent.id === agentId ? { ...agent, ...updates } : agent
    )
    set({ agents, lastUpdated: new Date() })
  },
  
  updateTaskStatus: (taskId, status) => {
    const todayTasks = get().todayTasks.map(task => 
      task.id === taskId ? { ...task, status, updatedAt: new Date() } : task
    )
    set({ todayTasks, lastUpdated: new Date() })
  },
  
  refresh: () => {
    set({ isLoading: true })
    // Trigger refetch of all data
    setTimeout(() => set({ isLoading: false, lastUpdated: new Date() }), 1000)
  },
}))