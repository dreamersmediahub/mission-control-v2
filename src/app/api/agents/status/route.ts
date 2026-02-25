// @ts-nocheck
import { NextResponse } from 'next/server'

export async function GET() {
  // Simulate live agent data - in production this would connect to OpenClaw API
  const liveAgents = [
    {
      id: 'main',
      name: 'Theo Main',
      role: 'Architecture, planning, memory, integrations',
      chatId: 'DM',
      status: Math.random() > 0.1 ? 'online' : 'busy',
      lastActivity: new Date(Date.now() - Math.random() * 300000),
      currentTask: [
        'Processing user request',
        'Analyzing business metrics',  
        'Optimizing system performance',
        'Planning strategic initiatives'
      ][Math.floor(Math.random() * 4)],
      tasksCompleted: 156 + Math.floor(Math.random() * 10),
      responseTime: 1.2 + Math.random() * 0.8,
      emoji: '🧠'
    },
    {
      id: 'ops',
      name: 'Dreamers Ops',
      role: 'Clients, invoicing, Xero, subscriptions',
      chatId: '-5197185221',
      status: Math.random() > 0.2 ? 'online' : Math.random() > 0.5 ? 'busy' : 'offline',
      lastActivity: new Date(Date.now() - Math.random() * 600000),
      currentTask: [
        'Processing client payments',
        'Updating CRM records',
        'Generating invoices',
        'Managing subscriptions'
      ][Math.floor(Math.random() * 4)],
      tasksCompleted: 89 + Math.floor(Math.random() * 8),
      responseTime: 2.1 + Math.random() * 1.5,
      emoji: '💼'
    },
    {
      id: 'dev',
      name: 'Dev & Build',
      role: 'Apps, GitHub, Vercel, automation',
      chatId: '-5247549915',
      status: 'online', // Always show dev as online for demo
      lastActivity: new Date(Date.now() - Math.random() * 120000),
      currentTask: [
        'Mission Control enhancements',
        'GitHub repository management',
        'Deployment optimization',
        'Bug fixes and improvements'
      ][Math.floor(Math.random() * 4)],
      tasksCompleted: 67 + Math.floor(Math.random() * 6),
      responseTime: 3.4 + Math.random() * 2.0,
      emoji: '🛠️'
    }
  ]

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    agents: liveAgents,
    summary: {
      totalAgents: liveAgents.length,
      onlineAgents: liveAgents.filter(a => a.status === 'online').length,
      busyAgents: liveAgents.filter(a => a.status === 'busy').length,
      averageResponseTime: liveAgents.reduce((acc, a) => acc + a.responseTime, 0) / liveAgents.length
    }
  })
}