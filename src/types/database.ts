export type Database = {
  public: {
    Tables: {
      agent_status: {
        Row: {
          agent_id: string
          name: string
          role: string | null
          status: 'active' | 'idle' | 'offline'
          current_task: string | null
          model: string | null
          last_seen: string | null
          sessions_today: number
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['agent_status']['Row'], 'updated_at'>
        Update: Partial<Database['public']['Tables']['agent_status']['Row']>
      }
      tasks: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          assignee: string
          status: 'inbox' | 'assigned' | 'in_progress' | 'review' | 'done'
          priority: 'urgent' | 'high' | 'medium' | 'low'
          project: string | null
          due_date: string | null
          original_request: string | null
          skill_prompt: string | null
          source_agent: string | null
          completed_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['tasks']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['tasks']['Row']>
      }
      memories: {
        Row: {
          id: string
          created_at: string
          content: string
          tag: string
          source: string
          agent_name: string | null
        }
        Insert: Omit<Database['public']['Tables']['memories']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['memories']['Row']>
      }
      brain_dumps: {
        Row: {
          id: string
          created_at: string
          content: string
          tag: 'idea' | 'task' | 'note' | 'feeling'
          processed: boolean
          notion_synced: boolean
        }
        Insert: Omit<Database['public']['Tables']['brain_dumps']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['brain_dumps']['Row']>
      }
      events: {
        Row: {
          id: string
          created_at: string
          agent_id: string
          agent_name: string | null
          type: string
          detail: string | null
          task_id: string | null
          metadata: Record<string, unknown> | null
        }
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['events']['Row']>
      }
      content: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          platform: string | null
          stage: 'idea' | 'research' | 'script' | 'thumbnail' | 'filming' | 'editing' | 'published'
          script: string | null
          thumbnail_url: string | null
          publish_date: string | null
          assigned_agent: string | null
          notes: string | null
          rss_guid: string | null
        }
        Insert: Omit<Database['public']['Tables']['content']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['content']['Row']>
      }
      health_logs: {
        Row: {
          id: string
          date: string
          injections: Record<string, boolean> | null
          supplements: Record<string, boolean> | null
          energy_rating: number | null
          gym_done: boolean
          weight_kg: number | null
          sleep_quality: number | null
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['health_logs']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['health_logs']['Row']>
      }
      calendar_events: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          start_time: string
          end_time: string | null
          type: string
          all_day: boolean
          color: string | null
          agent_id: string | null
          recurrence: string | null
        }
        Insert: Omit<Database['public']['Tables']['calendar_events']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['calendar_events']['Row']>
      }
      agent_messages: {
        Row: {
          id: string
          created_at: string
          from_agent_id: string
          from_agent_name: string | null
          to_agent_id: string | null
          to_agent_name: string | null
          message: string | null
          session_id: string | null
          type: string
        }
        Insert: Omit<Database['public']['Tables']['agent_messages']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['agent_messages']['Row']>
      }
    }
  }
}

export type AgentStatus = Database['public']['Tables']['agent_status']['Row']
export type Task = Database['public']['Tables']['tasks']['Row']
export type Memory = Database['public']['Tables']['memories']['Row']
export type BrainDump = Database['public']['Tables']['brain_dumps']['Row']
export type AgentEvent = Database['public']['Tables']['events']['Row']
export type ContentItem = Database['public']['Tables']['content']['Row']
export type HealthLog = Database['public']['Tables']['health_logs']['Row']
export type CalendarEvent = Database['public']['Tables']['calendar_events']['Row']
export type AgentMessage = Database['public']['Tables']['agent_messages']['Row']