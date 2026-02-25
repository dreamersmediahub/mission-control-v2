import { createServerClient } from '@/lib/supabase'
import TasksClient from '@/components/tasks/TasksClient'
import type { Task } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function TasksPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })
  const tasks: Task[] = data ?? []
  return <TasksClient tasks={tasks} />
}