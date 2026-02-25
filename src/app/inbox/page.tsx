import { createServerClient } from '@/lib/supabase'
import InboxClient from '@/components/inbox/InboxClient'
import type { AgentMessage, BrainDump, AgentEvent, Task } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function InboxPage() {
  const supabase = createServerClient()

  // Fetch all inbox data in parallel
  const [messagesRes, dumpsRes, eventsRes, tasksRes] = await Promise.all([
    supabase.from('agent_messages').select('*').order('created_at', { ascending: false }).limit(50),
    supabase.from('brain_dumps').select('*').eq('processed', false).order('created_at', { ascending: false }),
    supabase.from('events').select('*').order('created_at', { ascending: false }).limit(30),
    supabase.from('tasks').select('*').eq('status', 'inbox').order('created_at', { ascending: false }),
  ])

  const messages: AgentMessage[] = messagesRes.data ?? []
  const brainDumps: BrainDump[] = dumpsRes.data ?? []
  const events: AgentEvent[] = eventsRes.data ?? []
  const newTasks: Task[] = tasksRes.data ?? []

  return (
    <InboxClient
      messages={messages}
      brainDumps={brainDumps}
      events={events}
      newTasks={newTasks}
    />
  )
}
