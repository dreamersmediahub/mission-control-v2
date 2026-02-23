# Mission Control

Kyle's Life Operating System - A comprehensive command center for Dreamers Media operations, agent management, and personal productivity.

## Features

### 🎯 Mission Control Dashboard
- Real-time stats and KPIs
- Agent status monitoring
- Today's priority tasks
- Weather and calendar integration
- Emergency "Panic Button" for overwhelm situations

### 🤖 Agent Orchestration
- Direct control over 6 AI agents
- Real-time messaging and task delegation
- Performance metrics and activity tracking
- Agent-specific role management

### ✅ Task & Project Management
- ADHD-friendly interface with visual progress
- Step-by-step task breakdown (max 3 steps per task)
- Priority-based color coding
- One-click status updates

### 💰 Financial Command Center
- Outstanding invoice tracking
- Monthly revenue and profit analysis
- Subscription audit and management
- Automated follow-up sequences

### 👥 Client & Business Intelligence
- Professional relationship management
- Communication history and notes
- Project profitability analysis
- Quick contact and proposal generation

### 🎨 Content & Creative Hub
- Production pipeline tracking
- Asset library management
- Content calendar integration
- Render progress monitoring

### 🏋️ Health & Life Tracking
- Medication reminders (Dexamphetamine, peptides)
- Habit tracking and wellness metrics
- Family call tracking
- Mental health check-ins

### ⚙️ Automation Control Panel
- System automation status
- One-click enable/disable workflows
- Performance monitoring
- Integration health checks

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **State Management**: Zustand + React Query
- **UI Components**: Custom design system with onyx black theme
- **Icons**: Lucide React
- **Analytics**: Recharts
- **Deployment**: Vercel (private)

## Design Philosophy

### ADHD-Optimized UX
- Maximum information density without overwhelming
- Visual progress indicators and clear next actions
- Dopamine-driven completion celebrations
- Minimal clicks and cognitive load reduction

### Visual Design
- **Primary Color**: Onyx Black (#0a0a0a)
- **Accent Color**: Gold (#ffd700)
- **Typography**: Inter (UI), JetBrains Mono (code/data)
- **Dark Mode Only**: Easy on the eyes for long sessions
- **Mobile-First**: Responsive design for phone use

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_ENV=development
```

## Deployment

This app is configured for private deployment on Vercel under the `dreamersmedia` account.

---

Built with 🦞 by Theo Grant for Kyle's Dreamers Media empire.