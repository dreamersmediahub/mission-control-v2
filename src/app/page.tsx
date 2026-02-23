'use client'

import { useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { useDashboardStore } from '@/stores/dashboard'
import { mockTodayEvents, mockWeather } from '@/lib/mock-data'
import { useLiveStats, useLiveAgents, useLiveTasks, useRealTimeNotifications } from '@/hooks/useLiveData'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { AgentStatus } from '@/components/dashboard/AgentStatus'
import { TaskList } from '@/components/dashboard/TaskList'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { VibeCheck } from '@/components/dashboard/VibeCheck'
import { ManifestationTracker } from '@/components/dashboard/ManifestationTracker'
import { IrishTimeWidget } from '@/components/dashboard/IrishTimeWidget'
import { RealHousewivesTracker } from '@/components/dashboard/RealHousewivesTracker'
import { TwitterFeed } from '@/components/dashboard/TwitterFeed'
import { BirthdayCalendar } from '@/components/dashboard/BirthdayCalendar'
import { AstrologySection } from '@/components/dashboard/AstrologySection'
import { ADHDHyperfocusTimer } from '@/components/dashboard/ADHDHyperfocusTimer'
import { CreativeEnergyHub } from '@/components/dashboard/CreativeEnergyHub'
import { SpotifyVibePlayer } from '@/components/dashboard/SpotifyVibePlayer'
import { EmailIntelligence } from '@/components/dashboard/EmailIntelligence'
import { SocialMediaCommand } from '@/components/dashboard/SocialMediaCommand'
import { CalendarAI } from '@/components/dashboard/CalendarAI'
import { BusinessIntelligence } from '@/components/dashboard/BusinessIntelligence'
import { AIAssistant } from '@/components/dashboard/AIAssistant'
import { PredictiveAnalytics } from '@/components/dashboard/PredictiveAnalytics'
import { AutomationHub } from '@/components/dashboard/AutomationHub'
import { MusicStudio } from '@/components/dashboard/MusicStudio'
import { LiveNotifications } from '@/components/dashboard/LiveNotifications'
import { ParticleBackground } from '@/components/ui/ParticleBackground'
import { GlitchText } from '@/components/ui/GlitchText'
import { HologramCard } from '@/components/ui/HologramCard'
import { NeonButton } from '@/components/ui/NeonButton'
import { CyberGrid } from '@/components/ui/CyberGrid'
import { MatrixRain } from '@/components/ui/MatrixRain'
import { FloatingActions } from '@/components/ui/FloatingActions'
import { TheoCharacter } from '@/components/ui/TheoCharacter'
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

  // Live data hooks
  const { data: liveStats, loading: statsLoading, lastUpdated: statsUpdated } = useLiveStats()
  const { data: liveAgents, loading: agentsLoading } = useLiveAgents()
  const { data: liveTasks, loading: tasksLoading } = useLiveTasks()
  const { notifications, dismissNotification } = useRealTimeNotifications()

  // Load live data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      
      // Set initial events and weather (non-live for now)
      setTodayEvents(mockTodayEvents)
      setWeather(mockWeather)
      setLoading(false)
      
      console.log('🔴 Mission Control: Live data streams active!')
    }

    loadData()
  }, [setTodayEvents, setWeather, setLoading])

  // Update store with live data when available
  useEffect(() => {
    if (liveStats && !statsLoading) {
      setStats(liveStats)
    }
  }, [liveStats, statsLoading, setStats])

  useEffect(() => {
    if (liveAgents && !agentsLoading) {
      setAgents(liveAgents)
    }
  }, [liveAgents, agentsLoading, setAgents])

  useEffect(() => {
    if (liveTasks && !tasksLoading) {
      setTodayTasks(liveTasks)
    }
  }, [liveTasks, tasksLoading, setTodayTasks])

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        <ParticleBackground />
        <CyberGrid />
        <MatrixRain />
        
        <div className="text-center relative z-10">
          <div className="mb-8">
            <div className="text-6xl mb-4 animate-float">🎯</div>
            <GlitchText 
              text="MISSION CONTROL" 
              className="text-4xl font-bold neon-text mb-2" 
              glitchIntensity={0.3}
            />
            <p className="text-text-secondary text-lg">
              <span className="animate-pulse">Initializing systems...</span>
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-64 h-2 bg-surface rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold via-blue-400 to-gold animate-pulse"></div>
            </div>
            
            <div className="flex justify-center space-x-4 text-sm text-text-muted">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Agents Online</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span>Live Data Active</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-info rounded-full animate-pulse"></div>
                <span>Systems Ready</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background relative">
      {/* Animated Backgrounds */}
      <ParticleBackground />
      <CyberGrid />
      <MatrixRain />
      
      {/* Header */}
      <header className="glass border-b border-surface-hover/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl animate-spin-slow">🎯</div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">
                  <GlitchText text="Mission Control" className="text-xl font-bold" />
                </h1>
                <p className="text-sm text-text-secondary">
                  <span className="text-gold animate-pulse">●</span> Dreamers Media Command Center
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {statsUpdated && (
                <div className="flex items-center space-x-1 text-xs px-2 py-1 bg-success/20 rounded-full">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-success">
                    Live
                  </span>
                </div>
              )}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <HologramCard intensity={0.8}>
            <StatsCard
              title="Tasks Complete"
              value={`${completionRate}%`}
              change={{ value: 12, trend: 'up' }}
              icon={CheckCircle2}
              color="success"
            />
          </HologramCard>
          <HologramCard intensity={0.8}>
            <StatsCard
              title="Monthly Revenue"
              value={`$${(stats.monthlyRevenue / 1000).toFixed(1)}K`}
              change={{ value: 8, trend: 'up' }}
              icon={DollarSign}
              color="gold"
            />
          </HologramCard>
          <HologramCard intensity={0.8}>
            <StatsCard
              title="Active Projects"
              value={stats.activeProjects}
              icon={Users}
              color="info"
            />
          </HologramCard>
          <HologramCard intensity={0.8}>
            <StatsCard
              title="Agents Online"
              value={`${stats.agentsOnline}/${agents.length}`}
              icon={Zap}
              color="success"
            />
          </HologramCard>
        </div>

        {/* Kyle's Special Widgets - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <VibeCheck />
          <IrishTimeWidget />
          <ManifestationTracker />
          <AstrologySection />
        </div>

        {/* Kyle's MEGA Widgets - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-8">
          <RealHousewivesTracker />
          <TwitterFeed />
          <BirthdayCalendar />
          <MusicStudio />
          <ADHDHyperfocusTimer />
          <CreativeEnergyHub />
          <SpotifyVibePlayer />
        </div>

        {/* ULTIMATE Business & Productivity Suite - Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <EmailIntelligence />
          <SocialMediaCommand />
          <CalendarAI />
          <BusinessIntelligence />
        </div>

        {/* AI REVOLUTION - Row 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <AIAssistant />
          <PredictiveAnalytics />
          <AutomationHub />
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
      
      {/* Live notifications overlay */}
      <LiveNotifications />
      
      {/* Floating actions */}
      <FloatingActions />
      
      {/* Theo Character - The Digital Conscience */}
      <TheoCharacter />
      </div>
    </Layout>
  )
}