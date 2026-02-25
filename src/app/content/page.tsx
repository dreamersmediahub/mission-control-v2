import { createServerClient } from '@/lib/supabase'
import ContentClient from '@/components/content/ContentClient'
import type { ContentItem } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function ContentPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('content')
    .select('*')
    .order('created_at', { ascending: false })
  const content: ContentItem[] = data ?? []
  return <ContentClient content={content} />
}