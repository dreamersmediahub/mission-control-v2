import { createServerClient } from '@/lib/supabase'
import AgentsClient from '@/components/agents/AgentsClient'
import type { AgentStatus, AgentEvent, AgentMessage } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function AgentsPage() {
  const supabase = createServerClient()
  const [agentsRes, eventsRes, messagesRes] = await Promise.all([
    supabase.from('agent_status').select('*').order('status'),
    supabase.from('events').select('*').order('created_at', { ascending: false }).limit(100),
    supabase.from('agent_messages').select('*').order('created_at', { ascending: false }).limit(50),
  ])
  const agents: AgentStatus[] = agentsRes.data ?? []
  const events: AgentEvent[] = eventsRes.data ?? []
  const messages: AgentMessage[] = messagesRes.data ?? []
  return <AgentsClient agents={agents} events={events} messages={messages} />
}