# AgentForge & PaperclipAI Vision Document

> **Last Updated:** Hackathon Day (Less than 24 hours remaining)
> **Author:** AI Assistant + Human Collaboration
> **Purpose:** Complete context for future sessions

---

## Executive Summary

This document captures the vision, architecture, and hackathon plan for **AgentForge** (AI agent marketplace) and **PaperclipAI** (agent orchestration platform with internal company management).

**Core Value Proposition:** AgentForge is an AI agent marketplace where users can browse, purchase, and deploy pre-built AI agent teams that run on Paperclip.ai orchestration layer. Token Vault provides secure credential management for AI agents.

---

## The Two Projects

### 1. AgentForge (AI Agent Marketplace)

| Attribute | Description |
|----------|-------------|
| **What** | App Store for AI agents |
| **Repo** | `agent-marketplace` (current working directory) |
| **Tech Stack** | Next.js 15, React 19, TypeScript, Tailwind CSS, Auth0, Supabase, Vercel |
| **Purpose** | Browse, purchase, and deploy AI agent templates |
| **Hackathon** | Auth0 for AI Agents Hackathon (April 2026) |

**The Analogy:**
| App Store | AgentForge |
|-----------|------------|
| Download apps | Deploy AI agents |
| Apps on phone | Agents on Paperclip |
| Apps access data securely | Agents access APIs via Token Vault |
| Apps work 24/7 | AI agents work 24/7 |

### 2. PaperclipAI (Internal Company Operations)

| Attribute | Description |
|----------|-------------|
| **What** | Zero-human company running AI agents to manage operations |
| **Repo** | `paperclip` (https://github.com/paperclipai/paperclip.git) |
| **Tech Stack** | Node.js server, React + Vite UI, PostgreSQL, pnpm workspaces |
| **Purpose** | AI agents helping manage AgentForge company |
| **Agents** | Support Agent, Dev Agent, PM Agent (minimal for now) |

---

## Core Concepts

### What is Token Vault?

**Token Vault = A secure place to store API keys/tokens**

```
BEFORE (Insecure):
❌ API keys in code → Leaked on GitHub
❌ Keys shared via Slack/Email → Exposed
❌ No audit trail → Who used what?

AFTER (With Token Vault):
✅ Keys encrypted with AES-256
✅ Agents fetch when needed
✅ Full audit trail
✅ Keys never exposed in code/chat
```

### Token Vault Integration Points

| Where | Purpose |
|-------|---------|
| **AgentForge** | Users store API keys when deploying templates |
| **PaperclipAI** | Owner (user) stores keys for their internal agents |

---

## Architecture Flow

### Token Vault in AgentForge (Marketplace)

```
User buys template
       ↓
Optional: User adds API keys to Token Vault
       ↓
Template deploys to user's Paperclip instance
       ↓
Agents link to Token Vault config (NOT actual keys)
       ↓
When agent needs OpenAI/Stripe/etc:
  → Agent fetches from user's Token Vault
  → Agent calls external API
  → Key never exposed
```

### Token Vault in PaperclipAI (Internal Operations)

```
Owner (user) adds API keys to Token Vault:
  • GitHub API key
  • Email service (AgentMail) key
  • Stripe key
  • Linear/Jira key

AI Agents fetch keys securely:
  • Support Agent → Email API → Sends customer replies
  • Dev Agent → GitHub API → Reviews PRs
  • PM Agent → Linear API → Creates tasks
```

---

## External Tools for Agents

| Agent | Primary Tool | Purpose |
|-------|--------------|---------|
| **Support Agent** | AgentMail (email) | Handle customer tickets, send replies |
| **Dev Agent** | GitHub | PR reviews, bug fixes, code changes |
| **PM Agent** | Linear | Task creation, sprint management |

---

## Current Status

### AgentForge (Current Repo)

| Component | Status | Notes |
|----------|--------|-------|
| Landing Page | ✅ Built | Stylish dark theme |
| Login | ✅ Working (bypassed) | Demo form for hackathon |
| Dashboard | ✅ Built | Shows overview, navigation |
| Token Vault UI | ✅ Built | `/dashboard/vault` |
| Token Vault API | ✅ Built | `/api/tokens` with AES-256 encryption |
| Paperclip Dashboard | ✅ Built | Will be removed later |
| Auth0 Login | ❌ Broken | Bypassed for demo |

### PaperclipAI (Separate Repo)

| Component | Status | Notes |
|----------|--------|-------|
| Platform | ✅ Running locally | Node.js + React |
| Auth | Uses Better Auth | Not Auth0 yet |
| Token Vault | ❌ Not configured | Need to set up |
| Agents | ✅ Minimal | Support, Dev, PM |

---

## Hackathon Demo Plan

### Demo Format
- **Video** (pre-recorded, edited, submitted)
- **Slides** (supplementary presentation)

### Demo Story (90 seconds)

**Scene 1: Introduction (10s)**
```
"On the left, we have AgentForge - an AI agent marketplace.
On the right, we have our own Paperclip AI company running 
24/7 to manage AgentForge."
```

**Scene 2: Token Vault in AgentForge (25s)**
```
"Let's see how Token Vault works. In AgentForge dashboard,
users can securely store API keys for their agents.

Here I'm adding an OpenAI key - it's encrypted immediately.
Users can store Stripe, GitHub, any service they need.

The key is stored safely - agents fetch from here."
```

**Scene 3: PaperclipAI Agents Using Keys (40s)**
```
"Now let's look at Paperclip AI - our company running 24/7.

Meet our Support Agent. It needs email access to help customers.

Instead of hardcoding credentials, it fetches from Token Vault.
The key never appears in code - secure!

Same for Dev Agent - fetches GitHub credentials from Vault.
PM Agent gets Linear access the same way.

Every agent has secure access to exactly what it needs."
```

**Scene 4: Closing (15s)**
```
"Token Vault - secure credential management for AI agents.
No exposed keys. Full audit trail. Zero trust security.

Check out AgentForge on Vercel. Learn more at paperclip.ai"
```

### Demo Slides Outline (5-7 slides)

| Slide | Content |
|-------|---------|
| 1 | Title: "Secure AI Agents with Token Vault" |
| 2 | Problem: API keys leaked, no audit trail |
| 3 | Solution: Token Vault - encrypted, audited, secure |
| 4 | Demo screenshot: AgentForge Token Vault UI |
| 5 | Demo screenshot: PaperclipAI agents |
| 6 | How it works: Agents fetch keys securely |
| 7 | CTA: Visit AgentForge / Learn more |

---

## Timeline (< 24 hours)

### Day 1 (Setup)
| Task | Time | Status |
|------|------|--------|
| Fix Auth0 login | 30 min | Optional |
| Verify Token Vault in AgentForge | 10 min | To do |
| Setup Auth0 Token Vault in PaperclipAI | 1 hr | To do |
| Add Token Vault UI to PaperclipAI | 1 hr | To do |
| Connect Support Agent to Token Vault | 1 hr | To do |

### Day 2 (Demo Prep)
| Task | Time | Status |
|------|------|--------|
| Record demo video | 1 hr | To do |
| Edit video | 1 hr | To do |
| Create slides | 1 hr | To do |
| Submit! | - | - |

---

## Important Notes

### What NOT to Demo
- Full deployment flow (too complex for time)
- User API keys storage (AgentForge customers)
- Paperclip dashboard in AgentForge (will be removed)

### What TO Demo
- Token Vault concept (secure key storage)
- Token Vault UI (visual demo)
- PaperclipAI agents using Token Vault (Support Agent email)
- Mention AgentForge marketplace connection

### Key Principle
**API keys are NEVER sent to Paperclip.** Only vault configuration is sent. Agents fetch keys at runtime from Token Vault.

---

## Environment Variables (AgentForge)

```env
# APP CONFIGURATION
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
AUTH0_BASE_URL=http://localhost:3000

# AUTH0
AUTH0_SECRET=use-openssl-rand-hex-32
AUTH0_DOMAIN=agentforge-hub.eu.auth0.com
AUTH0_ISSUER_BASE_URL=https://agentforge-hub.eu.auth0.com
AUTH0_CLIENT_ID=Hsrz5K78gH7xS1fY7WP8AyhfHgJub0Bg
AUTH0_CLIENT_SECRET=gMCU4dXJoivjARuF-x88JDmFrVt-7TOKbVeLUQTYynHMzeO7oYfYGIOmrq9BBEWN

# DATABASE
DATABASE_URL=postgresql://postgres.[ref]:[pass]@aws-0-...pooler.supabase.com:6543/postgres

# PAPERCLIP
PAPERCLIP_API_URL=https://api.paperclip.ing
PAPERCLIP_API_KEY=your_paperclip_api_key
PAPERCLIP_COMPANY_ID=your_paperclip_company_id

# CORS
ALLOWED_ORIGINS=http://localhost:3000
```

---

## File Structure (AgentForge)

```
agentforge/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── login/page.tsx           # Login page (demo form)
│   │   ├── signup/page.tsx           # Signup page
│   │   ├── dashboard/
│   │   │   ├── layout.tsx           # Dashboard layout
│   │   │   ├── page.tsx            # Overview
│   │   │   ├── vault/page.tsx      # Token Vault
│   │   │   ├── paperclip/          # Paperclip (will remove)
│   │   │   ├── deployments/
│   │   │   ├── templates/
│   │   │   └── settings/
│   │   └── api/
│   │       └── tokens/route.ts      # Token Vault API
│   └── middleware.ts                # Simplified middleware
├── packages/api/                    # Express API (separate)
├── db/schema.sql                  # Database schema
├── .env                           # Environment variables
└── package.json
```

---

## Key Files Modified/Created

| File | Purpose |
|------|---------|
| `src/app/login/page.tsx` | Demo login form (bypassed Auth0) |
| `src/app/dashboard/layout.tsx` | Dashboard navigation |
| `src/app/dashboard/vault/page.tsx` | Token Vault UI |
| `src/app/api/tokens/route.ts` | Token Vault API (AES-256) |
| `src/middleware.ts` | Simplified middleware |

---

## Questions & Decisions

### Decided
- ✅ Demo Token Vault with agents (not full deployment)
- ✅ Demo video + slides format
- ✅ Primary focus: PaperclipAI agents using Token Vault
- ✅ Secondary: Mention AgentForge Token Vault
- ✅ Use AgentMail for Support Agent email
- ✅ Use GitHub for Dev Agent

### Undecided
- ❓ Full Auth0 integration in PaperclipAI or minimal demo?
- ❓ Which agent to demo first?

---

## Next Steps (Immediate)

1. **Verify AgentForge Token Vault works**
   ```bash
   cd agent-marketplace
   npm run dev
   # Go to http://localhost:3000/dashboard/vault
   ```

2. **Setup Auth0 Token Vault in PaperclipAI**
   - Clone repo
   - Configure Auth0
   - Add Token Vault UI
   - Connect agents

3. **Record demo video**

4. **Create slides**

5. **Submit!**

---

## Contact / Resources

- **AgentForge Repo:** `agent-marketplace` (current)
- **PaperclipAI Repo:** https://github.com/paperclipai/paperclip.git
- **Hackathon:** Auth0 for AI Agents (April 2026)
- **Paperclip Docs:** https://docs.paperclip.ai
- **Auth0 Token Vault:** https://auth0.com/docs/security/store-credentials/secure-credential-management

---

*This document should provide complete context for any future session to understand what we're building and why.*
