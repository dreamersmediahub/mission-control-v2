'use client'

import { useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { useDashboardStore } from '@/stores/dashboard'
import { mockAgents, mockStats, mockTodayTasks, mockTodayEvents, mockWeather } from '@/lib/mock-data'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { AgentStatus } from '@/components/dashboard/AgentStatus'
import { TaskList } from '@/components/dashboard/TaskList'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { VibeCheck } from '@/components/dashboard/VibeCheck'
import { ManifestationTracker } from '@/components/dashboard/ManifestationTracker'
import { IrishTimeWidget } from '@/components/dashboard/IrishTimeWidget'
import { RealHousewivesTracker } from '@/components/dashboard/RealHousewivesTracker'
import { ADHDHyperfocusTimer } from '@/components/dashboard/ADHDHyperfocusTimer'
import { CreativeEnergyHub } from '@/components/dashboard/CreativeEnergyHub'
import { SpotifyVibePlayer } from '@/components/dashboard/SpotifyVibePlayer'
import { getGreeting } from '@/lib/utils'
import { 
  CheckCircle2, 
  DollarSign, 
  Users, 
  Zap, 
  Calendar,
  MapPin,
  Thermometer,
  Wind,
  Eye
} from 'lucide-react'

export default function Dashboard() {
  const { 
    stats, 
    agents, 
    todayTasks, 
    todayEvents, 
    weather, 
    isLoading,
    setStats,
    setAgents,
    setTodayTasks,
    setTodayEvents,
    setWeather,
    setLoading 
  } = useDashboardStore()

  // Load mock data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      
      // Simulate API calls with delays
      setTimeout(() => {
        setStats(mockStats)
        setAgents(mockAgents)
        setTodayTasks(mockTodayTasks)
        setTodayEvents(mockTodayEvents)
        setWeather(mockWeather)
        setLoading(false)
      }, 1000)
    }

    loadData()
  }, [setStats, setAgents, setTodayTasks, setTodayEvents, setWeather, setLoading])

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading Mission Control...</p>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-surface-hover/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🎯</div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">Mission Control</h1>
                <p className="text-sm text-text-secondary">Dreamers Media Command Center</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">
                  {getGreeting()}, Kyle
                </p>
                <p className="text-xs text-text-secondary">
                  {new Date().toLocaleDateString('en-AU', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-primary font-bold">
                K
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Tasks Complete"
            value={`${completionRate}%`}
            change={{ value: 12, trend: 'up' }}
            icon={CheckCircle2}
            color="success"
          />
          <StatsCard
            title="Monthly Revenue"
            value={`$${(stats.monthlyRevenue / 1000).toFixed(1)}K`}
            change={{ value: 8, trend: 'up' }}
            icon={DollarSign}
            color="gold"
          />
          <StatsCard
            title="Active Projects"
            value={stats.activeProjects}
            icon={Users}
            color="info"
          />
          <StatsCard
            title="Agents Online"
            value={`${stats.agentsOnline}/${agents.length}`}
            icon={Zap}
            color="success"
          />
        </div>

        {/* Kyle's Special Widgets - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <VibeCheck />
          <IrishTimeWidget />
          <ManifestationTracker />
        </div>

        {/* Kyle's MEGA Widgets - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <RealHousewivesTracker />
          <ADHDHyperfocusTimer />
          <CreativeEnergyHub />
          <SpotifyVibePlayer />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Tasks & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <TaskList tasks={todayTasks} title="Today's Priorities" />
            <QuickActions />
          </div>

          {/* Right Column - Agent Status & Weather */}
          <div className="space-y-6">
            <AgentStatus agents={agents} />
            
            {/* Weather Widget */}
            {weather && (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Weather</h3>
                  <span className="text-2xl">{weather.icon}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-text-muted" />
                      <span className="text-text-secondary">{weather.location}</span>
                    </div>
                    <span className="text-2xl font-bold text-text-primary">{weather.temperature}°C</span>
                  </div>
                  
                  <p className="text-text-primary font-medium">{weather.condition}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-surface-hover">
                    <div className="flex items-center space-x-2">
                      <Eye size={14} className="text-text-muted" />
                      <span className="text-sm text-text-secondary">{weather.humidity}% humidity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wind size={14} className="text-text-muted" />
                      <span className="text-sm text-text-secondary">{weather.windSpeed} km/h</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Today's Calendar */}
            {todayEvents.length > 0 && (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Today's Schedule</h3>
                  <Calendar size={20} className="text-gold" />
                </div>
                
                <div className="space-y-3">
                  {todayEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center space-x-3 p-2 rounded-lg bg-surface/30">
                      <div className={`w-2 h-8 rounded-full ${
                        event.priority === 'high' 
                          ? 'bg-error' 
                          : event.priority === 'medium' 
                          ? 'bg-warning' 
                          : 'bg-info'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{event.title}</p>
                        <p className="text-xs text-text-muted">
                          {new Date(event.start).toLocaleTimeString('en-AU', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-text-muted text-sm">
            Mission Control v1.0 • Built with 🦞 by Theo Grant
          </p>
        </div>
      </main>
      </div>
    </Layout>
  )
}