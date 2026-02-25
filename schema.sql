-- ============================================
-- MISSION CONTROL — FULL SCHEMA
-- dreamersmediahub / mission-control-v2
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- TABLE: agent_status
-- Upserted by agents on heartbeat (curl)
-- ============================================
create table if not exists agent_status (
  agent_id        text primary key,
  name            text not null,
  status          text default 'offline' check (status in ('active','idle','offline','error')),
  current_task    text,
  model           text,
  last_seen       timestamptz,
  sessions_today  int default 0,
  tokens_used     int default 0,
  updated_at      timestamptz default now()
);

-- ============================================
-- TABLE: tasks
-- Created by agents or Kyle, displayed on Tasks Board
-- ============================================
create table if not exists tasks (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  title           text not null,
  description     text,
  status          text default 'todo' check (status in ('todo','in_progress','blocked','done')),
  priority        text default 'medium' check (priority in ('urgent','high','medium','low')),
  assignee        text default 'kyle',
  source_agent    text,
  due_date        date,
  tags            text[],
  position        int default 0
);

-- ============================================
-- TABLE: memories
-- Agent notes, brain dumps, search-indexed
-- ============================================
create table if not exists memories (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  content         text not null,
  tag             text default 'note',
  source          text not null,
  agent_name      text,
  search_vector   tsvector generated always as (to_tsvector('english', content)) stored
);

create index if not exists memories_fts on memories using gin(search_vector);
create index if not exists memories_created on memories(created_at desc);

-- ============================================
-- TABLE: content_items
-- YouTube videos, posts, content pipeline
-- ============================================
create table if not exists content_items (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  title           text not null,
  type            text default 'youtube' check (type in ('youtube','short','post','email','podcast')),
  status          text default 'idea' check (status in ('idea','scripted','filmed','edited','published')),
  platform        text,
  script          text,
  thumbnail_url   text,
  publish_date    date,
  views           int default 0,
  assignee        text,
  source_agent    text,
  tags            text[],
  position        int default 0
);

-- ============================================
-- TABLE: events
-- Calendar events, deadlines, health protocols
-- ============================================
create table if not exists events (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  title           text not null,
  start_time      timestamptz not null,
  end_time        timestamptz,
  type            text default 'meeting' check (type in ('meeting','deadline','health','personal','content')),
  description     text,
  all_day         boolean default false
);

-- ============================================
-- TABLE: financial_entries
-- Revenue, expenses, invoices
-- ============================================
create table if not exists financial_entries (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  date            date not null default current_date,
  description     text not null,
  amount          numeric(12,2) not null,
  type            text not null check (type in ('income','expense')),
  category        text,
  client          text,
  invoice_status  text check (invoice_status in ('draft','sent','paid','overdue'))
);

-- ============================================
-- TABLE: health_logs
-- Injections, supplements, mood, energy
-- ============================================
create table if not exists health_logs (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  date            date not null default current_date,
  type            text not null check (type in ('injection','medication','supplement','mood','energy','sleep','exercise')),
  name            text not null,
  dose            text,
  notes           text,
  value           numeric,
  unit            text
);

-- ============================================
-- RLS: Enable on all tables
-- ============================================
alter table agent_status    enable row level security;
alter table tasks           enable row level security;
alter table memories        enable row level security;
alter table content_items   enable row level security;
alter table events          enable row level security;
alter table financial_entries enable row level security;
alter table health_logs     enable row level security;

-- ============================================
-- RLS POLICIES: anon can read/write all (agents use anon key)
-- In production, tighten to service_role for writes
-- ============================================

-- agent_status
create policy "anon_read_agent_status" on agent_status for select to anon using (true);
create policy "anon_write_agent_status" on agent_status for insert to anon with check (true);
create policy "anon_update_agent_status" on agent_status for update to anon using (true);

-- tasks
create policy "anon_read_tasks" on tasks for select to anon using (true);
create policy "anon_write_tasks" on tasks for insert to anon with check (true);
create policy "anon_update_tasks" on tasks for update to anon using (true);

-- memories
create policy "anon_read_memories" on memories for select to anon using (true);
create policy "anon_write_memories" on memories for insert to anon with check (true);

-- content_items
create policy "anon_read_content" on content_items for select to anon using (true);
create policy "anon_write_content" on content_items for insert to anon with check (true);
create policy "anon_update_content" on content_items for update to anon using (true);

-- events
create policy "anon_read_events" on events for select to anon using (true);
create policy "anon_write_events" on events for insert to anon with check (true);
create policy "anon_update_events" on events for update to anon using (true);

-- financial_entries
create policy "anon_read_finances" on financial_entries for select to anon using (true);
create policy "anon_write_finances" on financial_entries for insert to anon with check (true);

-- health_logs
create policy "anon_read_health" on health_logs for select to anon using (true);
create policy "anon_write_health" on health_logs for insert to anon with check (true);

-- ============================================
-- REALTIME: Enable on key tables
-- ============================================
alter publication supabase_realtime add table agent_status;
alter publication supabase_realtime add table tasks;
alter publication supabase_realtime add table memories;
alter publication supabase_realtime add table content_items;

-- ============================================
-- SEED: Initial agent_status rows for known agents
-- ============================================
insert into agent_status (agent_id, name, status, model) values
  ('main', 'Main', 'offline', 'claude-opus-4-5'),
  ('researcher', 'Researcher', 'offline', 'claude-sonnet-4-5'),
  ('writer', 'Writer', 'offline', 'claude-sonnet-4-5'),
  ('editor', 'Editor', 'offline', 'claude-haiku-4-5'),
  ('publisher', 'Publisher', 'offline', 'claude-haiku-4-5'),
  ('social', 'Social', 'offline', 'claude-haiku-4-5'),
  ('email', 'Email', 'offline', 'claude-haiku-4-5'),
  ('analytics', 'Analytics', 'offline', 'claude-sonnet-4-5'),
  ('scheduler', 'Scheduler', 'offline', 'claude-haiku-4-5'),
  ('finance', 'Finance', 'offline', 'claude-sonnet-4-5')
on conflict (agent_id) do nothing;