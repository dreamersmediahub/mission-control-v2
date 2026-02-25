import { createServerClient } from '@/lib/supabase'
import MemoryClient from '@/components/memory/MemoryClient'
import type { Memory, BrainDump } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function MemoryPage() {
  const supabase = createServerClient()
  const [memoriesRes, dumpsRes] = await Promise.all([
    supabase.from('memories').select('*').order('created_at', { ascending: false }).limit(200),
    supabase.from('brain_dumps').select('*').order('created_at', { ascending: false }).limit(100),
  ])
  const memories: Memory[] = memoriesRes.data ?? []
  const dumps: BrainDump[] = dumpsRes.data ?? []
  return <MemoryClient memories={memories} dumps={dumps} />
}