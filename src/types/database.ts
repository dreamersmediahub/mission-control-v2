export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      agent_status: {
        Row: {
          agent_id: string
          name: string
          status: 'active' | 'idle' | 'offline' | 'error'
          current_task: string | null
          model: string | null
          last_seen: string | null
          sessions_today: number
          tokens_used: number
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['agent_status']['Row'], 'updated_at'> & { updated_at?: string }
        Update: Partial<Database['public']['Tables']['agent_status']['Row']>
      }
      tasks: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          status: 'todo' | 'in_progress' | 'blocked' | 'done'
          priority: 'urgent' | 'high' | 'medium' | 'low'
          assignee: string
          source_agent: string | null
          due_date: string | null
          tags: string[] | null
          position: number
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
        Update: Partial<Omit<Database['public']['Tables']['memories']['Row'], 'id'>>
      }
      content_items: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          type: 'youtube' | 'short' | 'post' | 'email' | 'podcast'
          status: 'idea' | 'scripted' | 'filmed' | 'edited' | 'published'
          platform: string | null
          script: string | null
          thumbnail_url: string | null
          publish_date: string | null
          views: number
          assignee: string | null
          source_agent: string | null
          tags: string[] | null
          position: number
        }
        Insert: Omit<Database['public']['Tables']['content_items']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['content_items']['Row']>
      }
      events: {
        Row: {
          id: string
          created_at: string
          title: string
          start_time: string
          end_time: string | null
          type: 'meeting' | 'deadline' | 'health' | 'personal' | 'content'
          description: string | null
          all_day: boolean
        }
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['events']['Row']>
      }
      financial_entries: {
        Row: {
          id: string
          created_at: string
          date: string
          description: string
          amount: number
          type: 'income' | 'expense'
          category: string | null
          client: string | null
          invoice_status: 'draft' | 'sent' | 'paid' | 'overdue' | null
        }
        Insert: Omit<Database['public']['Tables']['financial_entries']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['financial_entries']['Row']>
      }
      health_logs: {
        Row: {
          id: string
          created_at: string
          date: string
          type: 'injection' | 'medication' | 'supplement' | 'mood' | 'energy' | 'sleep' | 'exercise'
          name: string
          dose: string | null
          notes: string | null
          value: number | null
          unit: string | null
        }
        Insert: Omit<Database['public']['Tables']['health_logs']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['health_logs']['Row']>
      }
    }
  }
}

// Convenience row types
export type AgentStatus = Database['public']['Tables']['agent_status']['Row']
export type Task = Database['public']['Tables']['tasks']['Row']
export type Memory = Database['public']['Tables']['memories']['Row']
export type ContentItem = Database['public']['Tables']['content_items']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type FinancialEntry = Database['public']['Tables']['financial_entries']['Row']
export type HealthLog = Database['public']['Tables']['health_logs']['Row']