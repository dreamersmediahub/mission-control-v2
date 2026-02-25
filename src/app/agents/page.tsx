import { createServerClient } from '@/lib/supabase'
import { AgentsClient } from '@/components/agents/AgentsClient'

export const revalidate = 10

export default async function AgentsPage() {
  const supabase = createServerClient()
  const { data: agents } = await supabase.from('agent_status').select('*').order('name')
  return <AgentsClient agents={agents ?? []} />
}