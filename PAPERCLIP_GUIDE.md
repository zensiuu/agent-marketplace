# AgentForge - Paperclip Coding Agents Guide

**The marketplace for AI agent companies**

---

## What is AgentForge?

AgentForge is built on top of **Paperclip** - the open-source orchestration layer for AI agent companies.

Think of it as:
- **Paperclip** = The operating system (manages agents, tasks, budgets)
- **AgentForge** = The app store (buying/selling agent companies)

---

## Understanding Paperclip Architecture

### Core Concepts

```
┌─────────────────────────────────────────────────────────────┐
│                    PAPERCLIP LAYERS                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │    CEO     │    │    CTO      │    │   MARKETING │    │
│  │   Agent    │    │   Agent     │    │    Agent    │    │
│  └──────┬─────┘    └──────┬─────┘    └──────┬─────┘    │
│         │                   │                   │          │
│         └───────────────────┼───────────────────┘          │
│                             │                              │
│                     ┌───────▼───────┐                      │
│                     │   ORCHESTRATOR │                     │
│                     │   (Paperclip)  │                     │
│                     └───────┬───────┘                      │
│                             │                              │
│         ┌───────────────────┼───────────────────┐          │
│         │                   │                   │          │
│  ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐ │
│  │   TASKS     │    │   BUDGETS   │    │   GOVERNANCE │ │
│  │  (Ticketing)│    │  (Cost Ctrl)│    │ (Approvals)  │ │
│  └─────────────┘    └─────────────┘    └─────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Supported Coding Agents

| Agent | Type | Best For |
|-------|------|----------|
| **Claude Code** | Anthropic | General coding, reasoning |
| **Codex** | OpenAI | Code completion, GitHub integration |
| **Cursor** | Cursor AI | IDE-based coding |
| **OpenClaw** | VRSEN/Agency | Multi-agent orchestration |
| **Bash** | Shell | DevOps, CI/CD |
| **HTTP** | API | External tool integration |

---

## How to Configure a Coding Agent

### Step 1: Set Environment Variables

```bash
# Paperclip API
PAPERCLIP_API_URL=http://localhost:3100
PAPERCLIP_API_KEY=your-agent-api-key
PAPERCLIP_COMPANY_ID=your-company-id

# For Claude Code agent
ANTHROPIC_API_KEY=sk-ant-...

# For Codex agent
OPENAI_API_KEY=sk-...

# For OpenClaw agent
AGENT_API_URL=https://api.agency.ai
```

### Step 2: Create a Coding Agent (CTO Example)

```bash
curl -X POST "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/agent-hires" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CTO",
    "role": "cto",
    "title": "Chief Technology Officer",
    "icon": "crown",
    "reportsTo": "<ceo-agent-id>",
    "capabilities": "Owns technical roadmap, architecture, staffing, execution",
    "desiredSkills": ["vercel-labs/agent-browser/agent-browser"],
    "adapterType": "claude_code",
    "adapterConfig": {
      "model": "claude-sonnet-4-20250514",
      "maxTokens": 8192
    },
    "runtimeConfig": {
      "heartbeat": {
        "enabled": true,
        "intervalSec": 300,
        "wakeOnDemand": true
      }
    }
  }'
```

### Step 3: Create a Coding Task

```bash
curl -X POST "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/issues" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build user authentication system",
    "body": "## Task\n\nImplement JWT-based authentication with:\n- Login/logout\n- Password reset\n- Session management\n\n## Acceptance Criteria\n- [ ] Login works with email/password\n- [ ] JWT tokens are validated\n- [ ] Sessions expire after 24h",
    "priority": "high",
    "assigneeId": "<cto-agent-id>",
    "labels": ["backend", "auth"]
  }'
```

---

## Coding Agent Workflow

### 1. Task Assignment

```
Human/CEO → Creates Issue → Assigns to CTO Agent
                                    │
                                    ▼
                            CTO reads task
                            Plans implementation
                                    │
                                    ▼
                            Creates sub-tasks
                                    │
                                    ▼
                            Assigns to Engineers
```

### 2. Agent Heartbeat Cycle

```bash
# Every 5 minutes (configurable)
1. Agent checks for new tasks
2. Agent checks out task (atomic lock)
3. Agent does work
4. Agent commits results
5. Agent reports progress
6. Agent waits for next heartbeat
```

### 3. Cost Control

```bash
# Set monthly budget per agent
curl -X PUT "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/agents/<agent-id>" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "monthlyBudget": 500.00,
    "currency": "USD"
  }'

# Agent auto-pauses when budget exceeded
```

---

## Building AgentForge on Paperclip

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      AGENTFORGE                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   MARKETPLACE                        │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │   │
│  │  │  Skills  │  │  Agents  │  │  Templates       │ │   │
│  │  │  Store   │  │  Store   │  │  (Companies)     │ │   │
│  │  └──────────┘  └──────────┘  └──────────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   PAPERCLIP CORE                    │   │
│  │  (Orchestration, Tasks, Budgets, Governance)       │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              AGENT ADAPTERS                          │   │
│  │  (Claude, Codex, OpenClaw, Cursor, Custom)          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Key Extensions for AgentForge

1. **Template System** - Pre-built agent companies
2. **Skill Marketplace** - Buy/sell agent skills
3. **Agent Registry** - Discover and hire agents
4. **Analytics** - Track agent performance

---

## Common Commands

```bash
# Run paperclip locally
npx paperclipai run

# Check health
curl http://localhost:3100/api/health

# List companies
curl http://localhost:3100/api/companies

# List agents
curl http://localhost:3100/api/companies/<id>/agents

# List tasks
curl http://localhost:3100/api/companies/<id>/issues

# Get agent status
curl http://localhost:3100/api/agents/me
```

---

## Resources

- [Paperclip Docs](https://paperclip.ing/docs)
- [GitHub](https://github.com/paperclipai/paperclip)
- [Discord](https://discord.gg/m4HZY7xNG3)
