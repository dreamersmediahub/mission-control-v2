'use client'

import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { NeonButton } from '@/components/ui/NeonButton'
import { Settings, CheckCircle2, AlertCircle, ExternalLink, Key, Link2, Database } from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  status: 'connected' | 'disconnected' | 'optional'
  icon: any
  setupUrl?: string
  instructions: string[]
  priority: 'critical' | 'high' | 'medium' | 'low'
}

export default function SetupPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'google',
      name: 'Google Workspace',
      description: 'Gmail, Calendar, and Drive integration for business operations',
      status: 'disconnected',
      icon: '🔍',
      setupUrl: 'https://console.cloud.google.com',
      instructions: [
        'Go to Google Cloud Console',
        'Create new project: "Mission Control"',
        'Enable Gmail API, Calendar API, Drive API',
        'Create OAuth 2.0 credentials',
        'Add authorized redirect URIs',
        'Copy Client ID and Client Secret to environment variables'
      ],
      priority: 'critical'
    },
    {
      id: 'onepassword',
      name: '1Password',
      description: 'Secure credential management for all integrations',
      status: 'disconnected',
      icon: '🔐',
      setupUrl: 'https://1password.com/integrations/',
      instructions: [
        'Install 1Password CLI',
        'Create service account for Mission Control',
        'Generate access token',
        'Create "Theo" vault for Mission Control secrets',
        'Add ONEPASSWORD_TOKEN to environment variables'
      ],
      priority: 'high'
    },
    {
      id: 'notion',
      name: 'Notion Database',
      description: 'CRM and business data storage',
      status: 'disconnected',
      icon: '📊',
      setupUrl: 'https://www.notion.so/my-integrations',
      instructions: [
        'Go to Notion Integrations page',
        'Create new integration: "Mission Control"',
        'Copy internal integration token',
        'Share Dreamers Media HQ workspace with integration',
        'Add NOTION_API_KEY to environment variables'
      ],
      priority: 'high'
    },
    {
      id: 'spotify',
      name: 'Spotify API',
      description: 'Music streaming and playlist management',
      status: 'optional',
      icon: '🎵',
      setupUrl: 'https://developer.spotify.com/dashboard',
      instructions: [
        'Go to Spotify for Developers',
        'Create new app: "Mission Control"',
        'Add redirect URIs for authentication',
        'Copy Client ID and Client Secret',
        'Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to environment'
      ],
      priority: 'medium'
    },
    {
      id: 'youtube',
      name: 'YouTube Data API',
      description: 'Watch history analysis and content tracking',
      status: 'optional',
      icon: '📺',
      setupUrl: 'https://console.cloud.google.com',
      instructions: [
        'In Google Cloud Console (same project as above)',
        'Enable YouTube Data API v3',
        'Create API key for YouTube access',
        'Configure API key restrictions',
        'Add YOUTUBE_API_KEY to environment variables'
      ],
      priority: 'low'
    }
  ])

  const [envVars, setEnvVars] = useState({
    GOOGLE_CLIENT_ID: '',
    GOOGLE_CLIENT_SECRET: '',
    ONEPASSWORD_TOKEN: '',
    NOTION_API_KEY: '',
    SPOTIFY_CLIENT_ID: '',
    SPOTIFY_CLIENT_SECRET: '',
    YOUTUBE_API_KEY: ''
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle2 className="text-success" size={20} />
      case 'disconnected': return <AlertCircle className="text-error" size={20} />
      case 'optional': return <Settings className="text-warning" size={20} />
      default: return <Settings className="text-text-secondary" size={20} />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-500/10'
      case 'high': return 'border-gold bg-gold/10'
      case 'medium': return 'border-blue-500 bg-blue-500/10'
      case 'low': return 'border-green-500 bg-green-500/10'
      default: return 'border-surface bg-surface/10'
    }
  }

  const handleEnvVarChange = (key: string, value: string) => {
    setEnvVars(prev => ({ ...prev, [key]: value }))
  }

  const copyEnvVars = () => {
    const envString = Object.entries(envVars)
      .filter(([_, value]) => value.trim())
      .map(([key, value]) => `${key}="${value}"`)
      .join('\n')
    
    navigator.clipboard.writeText(envString)
    alert('Environment variables copied to clipboard!')
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Mission Control Setup
            </h1>
            <p className="text-text-secondary">
              Connect your integrations to unlock the full power of your command center
            </p>
          </div>

          {/* Setup Progress */}
          <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Setup Progress</h2>
              <div className="text-sm text-text-secondary">
                {(integrations || []).filter(i => i.status === 'connected').length} / {(integrations || []).filter(i => i.priority !== 'low').length} Essential
              </div>
            </div>
            <div className="w-full bg-surface rounded-full h-3">
              <div 
                className="h-3 bg-gradient-to-r from-gold to-success rounded-full transition-all duration-1000"
                style={{
                  width: `${((integrations || []).filter(i => i.status === 'connected').length / (integrations || []).filter(i => i.priority !== 'low').length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Integrations */}
          <div className="space-y-6 mb-8">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className={`p-6 rounded-lg border-2 transition-all ${getPriorityColor(integration.priority)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{integration.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        {integration.name}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {integration.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {getStatusIcon(integration.status)}
                    <span className={`px-3 py-1 rounded text-xs font-medium uppercase ${
                      integration.priority === 'critical' ? 'bg-red-500/20 text-red-300' :
                      integration.priority === 'high' ? 'bg-gold/20 text-gold' :
                      integration.priority === 'medium' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {integration.priority}
                    </span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mb-4">
                  <h4 className="font-medium text-text-primary mb-2">Setup Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-text-secondary">
                    {integration.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  {integration.setupUrl && (
                    <NeonButton
                      variant="blue"
                      size="sm"
                      onClick={() => window.open(integration.setupUrl, '_blank')}
                      className="flex items-center space-x-2"
                    >
                      <ExternalLink size={16} />
                      <span>Open Setup</span>
                    </NeonButton>
                  )}

                  <div className="flex space-x-2">
                    <NeonButton
                      variant={integration.status === 'connected' ? 'green' : 'gold'}
                      size="sm"
                      onClick={() => {
                        setIntegrations(prev => prev.map(i => 
                          i.id === integration.id 
                            ? { ...i, status: i.status === 'connected' ? 'disconnected' : 'connected' }
                            : i
                        ))
                      }}
                    >
                      {integration.status === 'connected' ? 'Connected' : 'Mark Connected'}
                    </NeonButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Environment Variables Section */}
          <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30">
            <div className="flex items-center space-x-2 mb-4">
              <Key className="text-success" size={20} />
              <h2 className="text-xl font-semibold text-text-primary">Environment Variables</h2>
            </div>
            
            <p className="text-text-secondary text-sm mb-4">
              Add these to your Vercel deployment or local .env file:
            </p>

            <div className="space-y-3">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-text-primary w-48">
                    {key}:
                  </label>
                  <input
                    type="password"
                    value={value}
                    onChange={(e) => handleEnvVarChange(key, e.target.value)}
                    placeholder="Enter your API key/secret"
                    className="flex-1 px-3 py-2 bg-surface border border-surface-hover rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-gold"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex space-x-3">
              <NeonButton
                variant="success"
                size="sm"
                onClick={copyEnvVars}
                className="flex items-center space-x-2"
              >
                <Database size={16} />
                <span>Copy Environment Variables</span>
              </NeonButton>
            </div>
          </div>

          {/* Dashboard Status */}
          <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-gold/20 to-orange-500/20 border border-gold/30">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle2 className="text-gold" size={20} />
              <h2 className="text-xl font-semibold text-text-primary">Dashboard Status</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">✓</div>
                <div className="text-sm font-medium text-text-primary">Core Features</div>
                <div className="text-xs text-text-muted">All dashboard components working</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gold">
                  {(integrations || []).filter(i => i.status === 'connected').length}/{(integrations || []).length}
                </div>
                <div className="text-sm font-medium text-text-primary">Integrations</div>
                <div className="text-xs text-text-muted">Connected services</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">🚀</div>
                <div className="text-sm font-medium text-text-primary">Ready to Deploy</div>
                <div className="text-xs text-text-muted">All systems operational</div>
              </div>
            </div>
          </div>

          {/* Quick Start Guide */}
          <div className="p-6 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <h2 className="text-xl font-semibold text-text-primary mb-4">🚀 Quick Start Guide</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-background font-bold text-xs">1</div>
                <div>
                  <div className="font-medium text-text-primary">Start with Critical Integrations</div>
                  <div className="text-text-secondary">Google Workspace for calendar and email access</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-background font-bold text-xs">2</div>
                <div>
                  <div className="font-medium text-text-primary">Add Security Layer</div>
                  <div className="text-text-secondary">1Password for secure credential management</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-background font-bold text-xs">3</div>
                <div>
                  <div className="font-medium text-text-primary">Connect Business Data</div>
                  <div className="text-text-secondary">Notion for CRM and business operations</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-background font-bold text-xs">4</div>
                <div>
                  <div className="font-medium text-text-primary">Add Entertainment Features</div>
                  <div className="text-text-secondary">Spotify and YouTube for personal interests</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-surface/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">🦞</span>
                <span className="font-medium text-gold">Theo's Setup Advice</span>
              </div>
              <p className="text-sm text-text-secondary italic">
                "Start with the critical stuff first - Google and 1Password will unlock most features. 
                The entertainment integrations are nice-to-have but won't break anything if you skip them initially. 
                Just don't blame me when your reality TV consumption goes untracked! 😏"
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <NeonButton
              variant="gold"
              size="lg"
              onClick={() => window.location.href = '/'}
              className="mr-4"
            >
              Back to Dashboard
            </NeonButton>
            
            <NeonButton
              variant="blue"
              size="lg"
              onClick={() => window.open('https://vercel.com', '_blank')}
            >
              Deploy to Production
            </NeonButton>
          </div>
        </main>
      </div>
    </Layout>
  )
}
