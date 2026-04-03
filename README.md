# AgentForge

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Auth0](https://img.shields.io/badge/Auth0-Token_Vault-EB5424?style=for-the-badge&logo=auth0)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)

**The Marketplace for AI Agent Teams**

*Deploy pre-built AI companies with CEOs, CTOs, and specialists — ready to work 24/7*

</div>

---

## What is AgentForge?

AgentForge is a marketplace where you can browse, purchase, and deploy **AI agent teams** that run autonomously on the Paperclip.ai orchestration layer.

Think of it like buying a **restaurant franchise** — but for AI:

| Traditional Business | AgentForge |
|---------------------|------------|
| McDonald's franchise | A "Company Template" (e.g., SaaS Startup Team) |
| You buy the franchise | You purchase/deploy a template |
| They send you workers | Agents wake up and start working |
| Workers complete tasks | Agents execute tasks autonomously |
| You manage via dashboard | You monitor via AgentForge dashboard |

### Why AgentForge?

- **Fast Setup** — Deploy a complete AI team in under 2 minutes
- **Always Working** — Agents run 24/7, handling complete project lifecycles
- **Cost Control** — Set hard limits on spending per agent
- **Easy Monitoring** — Real-time dashboard shows agent activity and health
- **Secure by Design** — Powered by Auth0 Token Vault for secure API access

---

## Key Features

### 🤖 Template Marketplace
Pre-configured AI company templates ready to deploy. Choose from:
- **SaaS Development Team** — CTO, Frontend, Backend, QA agents
- **Content Agency** — Marketing, SEO, Social media agents
- **DevOps Squad** — Infrastructure, Security, Automation agents

### 💰 Cost Control
Set monthly spending limits for each agent. Never surprise bills — your team stays within budget.

### 📊 Unified Dashboard
Monitor all your agents from one place. See activity logs, task status, and system health in real-time.

### 🔐 Auth0 Token Vault Integration
AI agents can securely access external APIs (Stripe, GitHub, etc.) through Auth0's Token Vault — no credentials exposed.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         AgentForge                               │
│                    (Marketplace Frontend)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐ │
│   │   Landing    │      │   Dashboard  │      │  Marketplace │ │
│   │    Page      │      │              │      │              │ │
│   └──────────────┘      └──────────────┘      └──────────────┘ │
│          │                     │                     │           │
│          └─────────────────────┼─────────────────────┘           │
│                                │                                 │
│                         ┌──────┴──────┐                          │
│                         │  Next.js   │                          │
│                         │    API      │                          │
│                         └──────┬──────┘                          │
│                                │                                 │
│          ┌─────────────────────┼─────────────────────┐         │
│          │                     │                     │         │
│   ┌──────┴──────┐      ┌──────┴──────┐      ┌──────┴──────┐ │
│   │   Auth0     │      │  PostgreSQL │      │  Paperclip  │ │
│   │ Token Vault │      │   Database  │      │     API      │ │
│   └─────────────┘      └─────────────┘      └─────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### How It Works

1. **Browse** — Explore AI team templates in the marketplace
2. **Purchase** — Select a template and complete checkout
3. **Deploy** — One-click deploy initializes your AI company
4. **Monitor** — Watch your agents work via the dashboard

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS v3 |
| **Backend** | Next.js API Routes, Express.js (packages/api) |
| **Database** | PostgreSQL 16 |
| **Authentication** | Auth0 (including Token Vault for AI agents) |
| **Orchestration** | Paperclip.ai |
| **Deployment** | Vercel |
| **Validation** | Zod |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- PostgreSQL (local or cloud)
- Auth0 account (free tier)
- Paperclip.ai account

### Installation

```bash
# Clone the repository
git clone https://github.com/zensiuu/agent-marketplace.git
cd agent-marketplace

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your credentials:
# - AUTH0_* variables
# - PAPERCLIP_API_URL and PAPERCLIP_API_KEY
# - DATABASE_URL
```

### Running Locally

```bash
# Start the development server
npm run dev

# Visit http://localhost:3000
```

### Building for Production

```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env.local` file with:

```env
# App
NEXT_PUBLIC_API_URL=http://localhost:3000

# Auth0 (Authentication)
AUTH0_SECRET='use-openssl-rand-hex-32'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_TENANT.auth0.com'
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'

# Paperclip (AI Orchestration)
PAPERCLIP_API_URL=https://api.paperclip.ai
PAPERCLIP_API_KEY=your-paperclip-api-key

# PostgreSQL (Database)
DATABASE_URL=postgresql://user:password@localhost:5432/agentforge
```

---

## Project Structure

```
agentforge/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── login/             # Login page
│   │   ├── signup/            # Signup page
│   │   ├── dashboard/         # Dashboard (protected)
│   │   │   ├── page.tsx      # Overview
│   │   │   ├── deployments/  # Deployment management
│   │   │   ├── templates/     # Template marketplace
│   │   │   └── settings/     # User settings
│   │   └── api/               # API routes
│   │       ├── auth/          # Auth0 endpoints
│   │       ├── agents/        # Agent management
│   │       ├── companies/     # Company management
│   │       └── marketplace/   # Marketplace endpoints
│   ├── components/            # React components (future)
│   └── app/globals.css        # Global styles
├── packages/
│   └── api/                   # Express API server
│       └── src/
│           ├── lib/           # Utilities (Paperclip client)
│           ├── routes/       # API routes
│           └── middleware/    # Express middleware
├── docs/                      # Documentation
│   ├── API.md                 # API reference
│   ├── ARCHITECTURE_CLARIFIED.md
│   ├── AUTH0_SETUP.md        # Auth0 integration guide
│   ├── PAPERCLIP_GUIDE.md    # Paperclip integration
│   └── SPEC.md                # Project specification
├── tailwind.config.ts         # Tailwind CSS configuration
└── package.json              # Workspace root
```

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/app/` | Next.js pages and API routes |
| `src/app/dashboard/` | Protected dashboard pages |
| `src/app/api/` | Backend API endpoints |
| `packages/api/` | Express server for additional endpoints |
| `docs/` | Project documentation |
| `stish_export/` | Design system exports |

---

## API Reference

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

## Auth0 Hackathon Integration

This project is built for the **Auth0 for AI Agents** hackathon (April 2026).

### Token Vault for AI Agents

AgentForge uses Auth0 Token Vault to give AI agents secure access to external APIs:

```
User logs in → Connects Stripe via Auth0 → Token stored in Token Vault
                                    ↓
Agent needs Stripe access → Fetches token from Token Vault → Uses token securely
```

### Setup

1. Create an Auth0 account at [auth0.com](https://auth0.com)
2. Create a Regular Web Application
3. Create an AI Agent application with Token Vault enabled
4. Configure the application credentials in `.env.local`

See [docs/AUTH0_SETUP.md](docs/AUTH0_SETUP.md) for detailed setup instructions.

---

## Future Vision Roadmap

### Version 1.0 — MVP (Current)
- [x] Landing page with template showcase
- [x] User authentication (Auth0)
- [x] Basic dashboard
- [x] Template marketplace
- [ ] Real PostgreSQL integration
- [ ] Actual Paperclip deployment
- [ ] Working purchase flow

### Version 1.1 — Production Ready
- [ ] Complete Auth0 Token Vault integration
- [ ] PostgreSQL database with Prisma ORM
- [ ] Real Stripe payments
- [ ] Email notifications
- [ ] User onboarding flow
- [ ] Error handling and loading states

### Version 2.0 — Enterprise Features
- [ ] Team collaboration (multi-user companies)
- [ ] Custom agent roles and permissions
- [ ] Advanced analytics dashboard
- [ ] Webhook integrations (Slack, Discord)
- [ ] API rate limiting
- [ ] Usage billing and invoicing

### Version 2.1 — Scale & Intelligence
- [ ] Agent-to-agent communication protocols
- [ ] Machine learning for task optimization
- [ ] Custom agent training
- [ ] Knowledge base integration
- [ ] Multi-cloud deployment options

### Version 3.0 — Platform Ecosystem
- [ ] Agent template marketplace (user-submitted)
- [ ] Skill marketplace with revenue sharing
- [ ] White-label options for enterprises
- [ ] Mobile app (iOS/Android)
- [ ] Desktop app for power users
- [ ] API marketplace for third-party integrations

---

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

## License

MIT License - see LICENSE file for details.

---

<div align="center">

**Built for the [Auth0 for AI Agents Hackathon](https://auth0.com/hackathons/ai-agents)** | April 2026

*AgentForge — Your AI Team, Ready to Work*

</div>
