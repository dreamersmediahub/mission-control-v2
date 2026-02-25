import { createServerClient } from '@/lib/supabase'
import type { AgentStatus, Task, Memory, ContentItem } from '@/types'
import { DashboardClient } from '@/components/dashboard/DashboardClient'

export const revalidate = 30

export default async function DashboardPage() {
  const supabase = createServerClient()

  const [
    { data: agentsData },
    { data: tasksData },
    { data: memoriesData },
    { data: contentData },
  ] = await Promise.all([
    supabase.from('agent_status').select('*').order('updated_at', { ascending: false }),
    supabase.from('tasks').select('*').order('position'),
    supabase.from('memories').select('*').order('created_at', { ascending: false }).limit(6),
    supabase.from('content_items').select('*').order('position').limit(5),
  ])

  const agents: AgentStatus[]   = agentsData ?? []
  const tasks: Task[]           = tasksData ?? []
  const memories: Memory[]      = memoriesData ?? []
  const content: ContentItem[]  = contentData ?? []

  const activeAgents = agents.filter(a => a.status === 'active').length
  const totalAgents  = agents.length
  const todayTasks   = tasks.filter(t => t.status !== 'done').length
  const doneTasks    = tasks.filter(t => t.status === 'done').length

  return (
    <DashboardClient
      agents={agents}
      tasks={tasks}
      memories={memories}
      content={content}
      stats={{ activeAgents, totalAgents, todayTasks, doneTasks }}
    />
  )
}