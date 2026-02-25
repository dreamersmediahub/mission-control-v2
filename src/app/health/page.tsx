import { createServerClient } from '@/lib/supabase'
import HealthClient from '@/components/health/HealthClient'
import type { HealthLog } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function HealthPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('health_logs')
    .select('*')
    .order('date', { ascending: false })
    .limit(30)

  const logs: HealthLog[] = data ?? []
  return <HealthClient logs={logs} />
}