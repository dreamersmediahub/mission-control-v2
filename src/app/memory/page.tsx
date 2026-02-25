import { createServerClient } from '@/lib/supabase'
import { MemoryClient } from '@/components/memory/MemoryClient'

export const revalidate = 30

export default async function MemoryPage() {
  const supabase = createServerClient()
  const { data: memories } = await supabase.from('memories').select('*').order('created_at', { ascending: false }).limit(100)
  return <MemoryClient memories={memories ?? []} />
}