'use client'

import { Layout } from '@/components/Layout'
import { formatTime } from '@/lib/utils'
import { Pill, Heart, Waves, Phone, Calendar, TrendingUp, Activity } from 'lucide-react'

export default function HealthPage() {
  // Kyle's actual health data
  const medications = [
    {
      name: 'Dexamphetamine',
      dosage: '5mg',
      frequency: '2x daily',
      nextDue: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      taken: false,
      type: 'ADHD'
    },
    {
      name: 'Retatrutide (Reta)',
      dosage: '4mg',
      frequency: 'Weekly',
      nextDue: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      taken: true,
      type: 'Peptide'
    },
    {
      name: 'GHK-Cu',
      dosage: '2mg',
      frequency: '3x weekly',
      nextDue: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // tomorrow
      taken: true,
      type: 'Peptide'
    },
    {
      name: 'KPV',
      dosage: '500mcg',
      frequency: 'As needed',
      nextDue: null,
      taken: false,
      type: 'Peptide'
    }
  ]

  const habits = [
    {
      name: 'Ocean Swimming',
      target: '3x weekly',
      thisWeek: 2,
      streak: 4,
      icon: <Waves size={20} />,
      color: 'text-info'
    },
    {
      name: 'Call Nana Rose',
      target: 'Daily',
      thisWeek: 6,
      streak: 127,
      icon: <Phone size={20} />,
      color: 'text-success'
    },
    {
      name: 'Call Melanie',
      target: 'Daily',
      thisWeek: 7,
      streak: 89,
      icon: <Phone size={20} />,
      color: 'text-success'
    },
    {
      name: 'Meal Breaks',
      target: '3x daily',
      thisWeek: 15,
      streak: 2,
      icon: <Heart size={20} />,
      color: 'text-warning'
    }
  ]

  const healthMetrics = [
    { label: 'Energy Level', value: 8, max: 10, color: 'bg-success' },
    { label: 'Focus Quality', value: 7, max: 10, color: 'bg-info' },
    { label: 'Sleep Quality', value: 6, max: 10, color: 'bg-warning' },
    { label: 'Stress Level', value: 4, max: 10, color: 'bg-error' }
  ]

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Health & Life Tracking</h1>
          <p className="text-text-secondary">Supporting Kyle's wellness systems and family connections</p>
        </div>

        {/* Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric) => (
            <div key={metric.label} className="card">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">{metric.label}</span>
                  <span className="text-sm font-medium text-text-primary">{metric.value}/{metric.max}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${metric.color}`}
                    style={{ width: `${(metric.value / metric.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medications */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Medications & Peptides</h3>
              <Pill className="text-gold" size={20} />
            </div>
            
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div key={index} className="p-3 rounded-lg bg-surface/30 border border-surface-hover">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-text-primary">{med.name}</h4>
                      <p className="text-sm text-text-secondary">{med.dosage} • {med.frequency}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      med.type === 'ADHD' ? 'bg-info/20 text-info' : 'bg-gold/20 text-gold'
                    }`}>
                      {med.type}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-text-muted">
                      {med.nextDue ? (
                        <>Next: {formatTime(med.nextDue)}</>
                      ) : (
                        'As needed'
                      )}
                    </div>
                    <button 
                      className={`text-sm px-3 py-1 rounded-full ${
                        med.taken 
                          ? 'bg-success/20 text-success' 
                          : 'bg-warning/20 text-warning hover:bg-warning hover:text-primary'
                      }`}
                    >
                      {med.taken ? 'Taken ✓' : 'Mark Taken'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Habits Tracking */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Daily Habits</h3>
              <Activity className="text-gold" size={20} />
            </div>
            
            <div className="space-y-3">
              {habits.map((habit, index) => (
                <div key={index} className="p-3 rounded-lg bg-surface/30 border border-surface-hover">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={habit.color}>
                        {habit.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">{habit.name}</h4>
                        <p className="text-sm text-text-secondary">Target: {habit.target}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-text-primary">{habit.thisWeek}</div>
                      <div className="text-xs text-text-muted">this week</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-text-muted">
                      🔥 {habit.streak} day streak
                    </div>
                    <button className="btn-secondary text-sm px-3 py-1">
                      Log Activity
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Family Calls</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary flex items-center justify-center space-x-2">
                <Phone size={16} />
                <span>Call Nana Rose</span>
              </button>
              <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <Phone size={16} />
                <span>Call Melanie</span>
              </button>
              <p className="text-xs text-text-muted text-center">
                Daily morning check-ins • Ireland GMT+0
              </p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Meal Reminders</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Breakfast</span>
                <span className="text-success">✓ 8:30 AM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Lunch</span>
                <span className="text-warning">⏰ Due now</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Dinner</span>
                <span className="text-text-muted">7:00 PM</span>
              </div>
              <button className="w-full mt-3 btn-primary text-sm">
                Take Break & Eat
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Wellness Check</h3>
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-2xl mb-2">🌊</p>
                <p className="text-sm text-text-secondary">How are you feeling today?</p>
              </div>
              <div className="flex justify-center space-x-2">
                <button className="text-2xl hover:scale-110 transition-transform">😫</button>
                <button className="text-2xl hover:scale-110 transition-transform">😔</button>
                <button className="text-2xl hover:scale-110 transition-transform">😐</button>
                <button className="text-2xl hover:scale-110 transition-transform">🙂</button>
                <button className="text-2xl hover:scale-110 transition-transform">😊</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}