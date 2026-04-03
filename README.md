# AgentForge

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Auth0](https://img.shields.io/badge/Auth0-Token_Vault-EB5424?style=for-the-badge&logo=auth0)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase)

**The App Store for AI Agents**

Deploy pre-built AI agent teams — your digital employees that work 24/7

</div>

---

## What is AgentForge?

AgentForge is an **AI agent marketplace** where users browse, purchase, and deploy pre-built AI agent companies that run on [Paperclip.ai](https://paperclip.ai) orchestration layer. We're also participating in the **Auth0 for AI Agents Hackathon** (April 2026).

### The Analogy

Think of AgentForge like an **App Store** for AI:

| App Store | AgentForge |
|-----------|------------|
| You download an app | You deploy an AI agent team |
| Apps run on your phone | Agents run on Paperclip |
| Apps access your data securely | Agents access APIs via Auth0 Token Vault |
| Apps work while you sleep | AI agents work 24/7 |

### Key Concepts

- **AgentForge** = App Store for AI agents — browse, buy, deploy
- **Paperclip** = Orchestra conductor — coordinates and runs your AI team
- **Auth0 Token Vault** = Secure keychain — safely manages API credentials for agents
- **AI agents** = Digital employees — tireless workers handling tasks around the clock

---

## How It Works

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Browse    │ → │  Purchase   │ → │   Deploy    │ → │   Monitor   │
│  Templates  │    │  Template   │    │   to Prod   │    │   Agents    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

1. **Browse** — Explore pre-built AI team templates in the marketplace
2. **Purchase** — Select a template and complete checkout
3. **Deploy** — One-click deploy initializes your AI company on Paperclip
4. **Monitor** — Your digital employees start working 24/7

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        AgentForge (Frontend)                    │
│                    Next.js 15 • React 19 • TypeScript           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────┐        ┌──────────┐        ┌──────────┐         │
│   │ Landing  │        │Dashboard │        │ Marketplace│       │
│   │   Page   │        │          │        │            │       │
│   └──────────┘        └──────────┘        └──────────┘         │
│          │                  │                  │               │
│          └──────────────────┼──────────────────┘               │
│                             │                                   │
│                      ┌──────┴──────┐                            │
│                      │  Next.js   │                            │
│                      │    API     │                            │
│                      └──────┬──────┘                            │
│                             │                                   │
│         ┌───────────────────┼───────────────────┐              │
│         │                   │                   │              │
│  ┌──────┴──────┐     ┌──────┴──────┐     ┌──────┴──────┐      │
│  │  Auth0     │     │  Supabase   │     │  Paperclip │      │
│  │ Token Vault│     │  Database  │     │     API    │      │
│  └─────────────┘     └─────────────┘     └─────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS v3 |
| **Backend** | Next.js API Routes |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Auth0 (including Token Vault for AI agents) |
| **Orchestration** | Paperclip.ai |
| **Deployment** | Vercel |

---

## Features

- **Template Marketplace** — Browse pre-configured AI team templates (SaaS Startup, Content Agency, DevOps Squad)
- **One-Click Deploy** — Launch your AI company in under 2 minutes
- **Cost Control** — Set spending limits per agent to control budget
- **Real-Time Dashboard** — Monitor agent activity, task status, and system health
- **Secure API Access** — Auth0 Token Vault gives agents secure access to external services (Stripe, GitHub, etc.)
- **24/7 Operation** — Your digital employees never sleep, handling complete project lifecycles

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/zensiuu/agent-marketplace.git
cd agent-marketplace

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env.local

# 4. Configure your environment variables (see below)
# 5. Start the development server
npm run dev
```

Visit **http://localhost:3000** to see the app.

### Building for Production

```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env.local` file with the following variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Your app's public URL | Yes |
| `AUTH0_SECRET` | Auth0 session secret (`openssl rand -hex 32`) | Yes |
| `AUTH0_BASE_URL` | Your app's base URL | Yes |
| `AUTH0_ISSUER_BASE_URL` | Auth0 tenant URL (`https://xxx.auth0.com`) | Yes |
| `AUTH0_CLIENT_ID` | Auth0 client ID | Yes |
| `AUTH0_CLIENT_SECRET` | Auth0 client secret | Yes |
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `PAPERCLIP_API_URL` | Paperclip API endpoint (`https://api.paperclip.ai`) | Yes |
| `PAPERCLIP_API_KEY` | Paperclip API key | Yes |

---

## Project Structure

```
agentforge/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── login/             # Login page
│   │   ├── signup/            # Signup page
│   │   ├── dashboard/         # Protected dashboard
│   │   │   ├── page.tsx      # Overview
│   │   │   ├── deployments/  # Deployment management
│   │   │   ├── templates/     # Template marketplace
│   │   │   └── settings/     # User settings
│   │   └── api/               # API routes
│   │       ├── agents/        # Agent management
│   │       ├── companies/     # Company management
│   │       └── marketplace/   # Marketplace endpoints
│   └── app/globals.css        # Global styles
├── db/
│   ├── schema.sql             # Database schema
│   └── seed.sql               # Sample data
├── docs/                      # Documentation
│   ├── AUTH0_SETUP.md         # Auth0 integration guide
│   ├── PAPERCLIP_GUIDE.md    # Paperclip integration
│   └── SUPABASE_SETUP.md     # Database setup
├── tailwind.config.ts         # Tailwind CSS config
└── package.json              # Workspace root
```

---

## API Endpoints

### Marketplace

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/marketplace/templates` | List available templates |
| GET | `/api/marketplace/skills` | List available skills |
| POST | `/api/marketplace/purchase` | Purchase a template |

### Agents

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/agents` | List user's agents |
| POST | `/api/agents/hire` | Hire a new agent |
| GET | `/api/agents/:id` | Get agent details |

### Companies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/companies` | List user's companies |
| POST | `/api/companies` | Create new company |
| GET | `/api/companies/:id` | Get company details |

---

## Hackathon Submission

This project is built for the **Auth0 for AI Agents Hackathon** (April 2026).

### Auth0 Token Vault Integration

AgentForge uses Auth0 Token Vault to give AI agents secure, credential-free access to external APIs:

```
User connects service → Auth0 stores token securely in Token Vault
         ↓
Agent needs access → Fetches token from Token Vault → Makes API call
```

**Why Token Vault?**
- No API keys exposed in agent code
- Tokens automatically rotate
- Granular permission control per agent
- Audit logging for compliance

### Setup Auth0

1. Create an account at [auth0.com](https://auth0.com)
2. Create a Regular Web Application
3. Create an AI Agent application with **Token Vault** enabled
4. Add credentials to your `.env.local`

See [docs/AUTH0_SETUP.md](docs/AUTH0_SETUP.md) for detailed instructions.

---

## Roadmap

### v1.0 — MVP (Current)
- [x] Landing page with template showcase
- [x] User authentication (Auth0)
- [x] Basic dashboard
- [x] Template marketplace

### v1.1 — Production
- [ ] Supabase integration with Prisma ORM
- [ ] Complete Token Vault integration
- [ ] Real Stripe payments
- [ ] Email notifications

### v2.0 — Enterprise
- [ ] Team collaboration
- [ ] Custom agent roles
- [ ] Advanced analytics
- [ ] Webhook integrations

---

## Contributing

Contributions welcome! Please read our contributing guidelines and submit pull requests.

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built for the **[Auth0 for AI Agents Hackathon](https://auth0.com/hackathons/ai-agents)** | April 2026

*AgentForge — Your AI Team, Ready to Work*

</div>