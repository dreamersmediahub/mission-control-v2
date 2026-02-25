import { createServerClient } from '@/lib/supabase'
import { TasksClient } from '@/components/tasks/TasksClient'

export const revalidate = 15

export default async function TasksPage() {
  const supabase = createServerClient()
  const { data: tasks } = await supabase.from('tasks').select('*').order('position')
  return <TasksClient tasks={tasks ?? []} />
}