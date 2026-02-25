import { createServerClient } from '@/lib/supabase'
import DashboardClient from '@/components/dashboard/DashboardClient'
import type { AgentStatus, Task, Memory, AgentEvent, BrainDump } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = createServerClient()

  const [agentsRes, tasksRes, memoriesRes, eventsRes, dumpsRes] = await Promise.all([
    supabase.from('agent_status').select('*').order('status', { ascending: true }),
    supabase.from('tasks').select('*').order('created_at', { ascending: false }),
    supabase.from('memories').select('*').order('created_at', { ascending: false }).limit(10),
    supabase.from('events').select('*').order('created_at', { ascending: false }).limit(50),
    supabase.from('brain_dumps').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  const agents: AgentStatus[] = agentsRes.data ?? []
  const tasks: Task[] = tasksRes.data ?? []
  const memories: Memory[] = memoriesRes.data ?? []
  const events: AgentEvent[] = eventsRes.data ?? []
  const brainDumps: BrainDump[] = dumpsRes.data ?? []

  return (
    <DashboardClient
      agents={agents}
      tasks={tasks}
      memories={memories}
      events={events}
      brainDumps={brainDumps}
    />
  )
}