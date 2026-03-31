# AgentForge - Code Review & Paperclip Architecture Guide

**Date:** March 31, 2026  
**Project:** AgentForge - The Marketplace for AI Agent Companies  
**Status:** Early-stage codebase

---

## Part 1: Code Review

### 1.1 Code Quality Issues

#### 🔴 High Severity

| File | Issue | Line(s) | Recommendation |
|------|-------|---------|----------------|
| `packages/api/src/routes/marketplace.ts` | No input validation on POST `/purchase` endpoint | 85-94 | Validate `templateId` exists, `paymentMethod` is enum |
| `packages/api/src/routes/marketplace.ts` | Hardcoded template data in route handlers | 22-68 | Move to database or at least separate data file |
| `packages/api/src/routes/agents.ts` | No validation of `req.body` in `/hire` endpoint | 12-18 | Use Zod schema to validate required fields |
| `packages/api/src/routes/companies.ts` | No validation of company creation payload | 12-17 | Validate required fields (name, etc.) |

#### 🟡 Medium Severity

| File | Issue | Line(s) | Recommendation |
|------|-------|---------|----------------|
| `src/app/page.tsx` | Undefined components used without imports | 27-42, 47-65 | FeatureCard and TemplateCard need to be imported or defined |
| `tailwind.config.ts` | `content` paths include non-existent `src/pages` and `src/components` | 5-7 | Remove non-existent paths to avoid Tailwind purge issues |
| `package.json` | Tailwind v4 uses `@tailwindcss/postcss` but config references v3 API | tailwind.config.ts | Tailwind v4 doesn't need `theme.extend` pattern - update config |
| `packages/api/src/index.ts` | No error handling middleware | 1-23 | Add Express error handling middleware |
| `packages/api/src/index.ts` | No request logging | - | Add `morgan` or similar for request logging |

#### 🟢 Low Severity

| File | Issue | Line(s) | Recommendation |
|------|-------|---------|----------------|
| `src/app/page.tsx` | Using emojis directly in code | 28-40 | Consider using icon components for consistency |
| `packages/api/src/index.ts` | Console.log for startup message | 22 | Use proper logging library (pino, winston) |
| `package.json` | No `"engines"` check for pnpm | - | Add `"packageManager": "pnpm@9.x.x"` |
| `tailwind.config.ts` | No custom font family defined | - | Add Google Fonts configuration |

---

### 1.2 Potential Bugs

| Bug | Location | Description |
|-----|----------|-------------|
| **Missing error boundary** | `src/app/layout.tsx` | React 19 requires error boundaries for streaming |
| **TypeScript errors likely** | `src/app/page.tsx` | FeatureCard and TemplateCard are used but not imported - will cause build failure |
| **Zod schema unused** | `packages/api/src/routes/marketplace.ts:6-19` | TemplateSchema defined but never used for validation |
| **No CORS configuration** | `packages/api/src/index.ts:13` | CORS allows all origins by default - too permissive |
| **crypto.randomUUID may fail** | `packages/api/src/routes/*` | Using global `crypto` without polyfill for older Node versions |

---

### 1.3 Security Vulnerabilities

| Vulnerability | Severity | Location | Fix |
|---------------|----------|----------|-----|
| **CORS wildcard** | 🔴 High | `packages/api/src/index.ts:13` | Configure specific allowed origins via env var |
| **No rate limiting** | 🟡 Medium | `packages/api/src/index.ts` | Add `express-rate-limit` to prevent abuse |
| **No Helmet CSP** | 🟡 Medium | `packages/api/src/index.ts:12` | Configure Content-Security-Policy headers |
| **No authentication** | 🔴 High | All routes | Add JWT/session auth middleware |
| **No SQL injection protection** | 🟡 Medium | Future DB queries | Use parameterized queries via Drizzle ORM |
| **Secrets in environment** | 🟡 Medium | All configs | Ensure `.env` is in `.gitignore` and document required vars |

---

### 1.4 Performance Concerns

| Concern | Location | Recommendation |
|---------|----------|----------------|
| **No database connection pooling** | `packages/api` | Configure Drizzle with connection pool settings |
| **No caching layer** | Marketplace routes | Add Redis or in-memory cache for templates/skills |
| **Large bundle potential** | Next.js config | Add `next/font` for optimized font loading |
| **No image optimization** | Template cards | Use `next/image` for optimized images |
| **No API response compression** | Express | Add `compression` middleware |

---

### 1.5 Issues Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    CODE HEALTH SUMMARY                       │
├─────────────────────────────────────────────────────────────┤
│  🔴 Critical: 4  (Auth missing, broken imports, CORS)      │
│  🟡 Medium:   8  (Validation, logging, error handling)      │
│  🟢 Low:      5  (Code style, configuration)               │
│  ⚠️  Total:   17 issues found                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Part 2: How Paperclip Can Help Build AgentForge

### 2.1 Why Paperclip is the Perfect Foundation

AgentForge is essentially an **app store for AI agent companies**. Paperclip provides:

```
┌─────────────────────────────────────────────────────────────┐
│                    PAPERCLIP CORE PROVIDES                  │
├─────────────────────────────────────────────────────────────┤
│  ✅ Agent orchestration (CEO, CTO, Engineers, etc.)         │
│  ✅ Task management with delegation and handoffs             │
│  ✅ Budget control per agent and per company                │
│  ✅ Board governance (human approval gates)                 │
│  ✅ Heartbeat-based agent execution cycles                 │
│  ✅ Org chart and reporting structure                      │
│  ✅ Cost tracking and attribution                         │
│  ✅ Company-scoped data isolation                          │
│  ✅ Agent adapters (Claude, Codex, OpenClaw, HTTP, etc.)   │
│  ✅ Exportable company templates                           │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Architecture: AgentForge on Paperclip

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           AGENTFORGE LAYERS                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    MARKETPLACE LAYER                               │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  │  │
│  │  │ Templates  │  │   Skills   │  │   Agents   │  │  Payments  │  │  │
│  │  │   Store    │  │   Store    │  │  Registry  │  │  (Stripe)  │  │  │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                     │
│                                   ▼                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    PAPERCLIP ORCHESTRATION                        │  │
│  │                                                                    │  │
│  │  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐        │  │
│  │  │  CEO    │    │   CTO   │    │ MARKETING│    │   CFO   │        │  │
│  │  │ Agent   │    │  Agent  │    │  Agent   │    │  Agent  │        │  │
│  │  └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘        │  │
│  │       │              │              │              │              │  │
│  │       └──────────────┼──────────────┼──────────────┘              │  │
│  │                      │              │                               │  │
│  │              ┌───────▼───────┐      │                               │  │
│  │              │   ORCHESTRATOR │◄─────┘                               │  │
│  │              │   (Heartbeats)  │                                     │  │
│  │              └───────┬───────┘                                       │  │
│  │                      │                                               │  │
│  │       ┌──────────────┼──────────────┐                               │  │
│  │       │              │              │                               │  │
│  │  ┌────▼────┐  ┌─────▼─────┐  ┌────▼────┐                          │  │
│  │  │  Tasks  │  │  Budgets   │  │Governance│                          │  │
│  │  │ System  │  │  Control   │  │  (Board) │                          │  │
│  │  └─────────┘  └───────────┘  └─────────┘                          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Integration Points

| Paperclip Feature | AgentForge Integration |
|-------------------|------------------------|
| **Company Templates** | Core feature - export/import full agent companies |
| **Agent Adapters** | Support multiple AI providers (Claude, Codex, OpenClaw) |
| **Task System** | Use for order fulfillment, support tickets, development |
| **Budget Control** | Per-agent spending limits for marketplace operations |
| **Board Governance** | Human oversight for template purchases, agent hiring |
| **Skill System** | Package and sell agent capabilities as "skills" |

### 2.4 Technical Requirements

#### Environment Variables

```bash
# Paperclip Connection
PAPERCLIP_API_URL=https://api.paperclip.ai
PAPERCLIP_API_KEY=pc_live_xxx
PAPERCLIP_COMPANY_ID=your_company_uuid

# AgentForge Specific
DATABASE_URL=postgresql://user:pass@host:5432/agentforge
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_PAPERCLIP_URL=https://app.paperclip.ai
```

#### Required Paperclip API Endpoints

```typescript
// Agent Management
POST   /api/companies/{id}/agent-hires     // Hire new agent
GET    /api/companies/{id}/agents          // List agents
PUT    /api/companies/{id}/agents/{id}     // Update agent config

// Task Management  
POST   /api/companies/{id}/issues           // Create task
GET    /api/companies/{id}/issues          // List tasks
PUT    /api/companies/{id}/issues/{id}     // Update task

// Budget Control
PUT    /api/companies/{id}/agents/{id}     // Set monthly budget
GET    /api/companies/{id}/costs           // View cost breakdown

// Template Export/Import
GET    /api/companies/{id}/export           // Export as template
POST   /api/companies/import               // Import from template

// Skills
GET    /api/skills                          // Browse available skills
POST   /api/companies/{id}/agents/{id}/skills  // Install skill
```

---

## Part 3: Agent Architecture for AgentForge

### 3.1 Core Agent Types

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      AGENTFORGE AGENT ECOSYSTEM                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                     MARKETPLACE AGENTS                            │    │
│  │                                                                   │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │    │
│  │  │  CATALOG    │  │  SUPPORT    │  │   LISTING   │              │    │
│  │  │  MANAGER    │  │   AGENT     │  │   REVIEWER   │              │    │
│  │  │             │  │             │  │             │              │    │
│  │  │ • Curates   │  │ • Handles   │  │ • Reviews   │              │    │
│  │  │   templates │  │   tickets   │  │   new       │              │    │
│  │  │ • Updates   │  │ • Resolves  │  │   listings  │              │    │
│  │  │   pricing  │  │   issues    │  │ • Enforces  │              │    │
│  │  │ • Analytics│  │ • Refunds   │  │   quality   │              │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘              │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                   PAPERCLIP AGENTS (Customer)                    │    │
│  │                                                                   │    │
│  │     "AgentForge sells Paperclip company templates to customers"    │    │
│  │                                                                   │    │
│  │  When customer purchases:                                         │    │
│  │                                                                   │    │
│  │  ┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐ │    │
│  │  │   CEO   │ ───► │   CTO   │ ───► │ ENGINEER│ ───► │DESIGNER │ │    │
│  │  │         │      │         │      │         │      │         │ │    │
│  │  │ Vision  │      │ Arch    │      │ Code    │      │ UI/UX   │ │    │
│  │  │ Strategy│      │ Review  │      │ Tests   │      │ Assets  │ │    │
│  │  └─────────┘      └─────────┘      └─────────┘      └─────────┘ │    │
│  │                                                                   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Agent Specifications

#### 3.2.1 Marketplace Catalog Manager Agent

```yaml
agent:
  name: CatalogManager
  role: catalog_manager
  title: Marketplace Catalog Manager
  icon: package
  adapter_type: claude_local
  reports_to: ceo

capabilities: |
  Manages the AgentForge template and skill catalog:
  - Reviews and approves new template submissions
  - Updates pricing based on market analysis
  - Monitors download metrics and user ratings
  - Curates featured templates for homepage
  - Archives outdated or low-quality listings

desired_skills:
  - paperclip/metrics-analyst
  - paperclip/content-reviewer

runtime_config:
  heartbeat:
    enabled: true
    intervalSec: 3600  # Every hour
    wakeOnAssignment: true
```

#### 3.2.2 Support Agent

```yaml
agent:
  name: SupportAgent
  role: support
  title: Customer Support Agent
  icon: headphones
  adapter_type: claude_local
  reports_to: ceo

capabilities: |
  Handles customer support for AgentForge:
  - Responds to help desk tickets within SLA
  - Processes refund requests
  - Assists with template installation issues
  - Escalates technical issues to engineering
  - Collects user feedback and feature requests

desired_skills:
  - paperclip/ticket-handler
  - paperclip/sentiment-analyzer

runtime_config:
  heartbeat:
    enabled: true
    intervalSec: 1800  # Every 30 minutes
    wakeOnAssignment: true
```

#### 3.2.3 Listing Reviewer Agent

```yaml
agent:
  name: ListingReviewer
  role: listing_reviewer
  title: Quality Assurance Agent
  icon: shield-check
  adapter_type: claude_local
  reports_to: ceo

capabilities: |
  Ensures quality of marketplace listings:
  - Reviews template submissions for completeness
  - Validates agent configurations and skills
  - Checks for policy violations (spam, IP issues)
  - Tests template deployment on Paperclip
  - Maintains quality standards and guidelines

desired_skills:
  - paperclip/test-automation
  - paperclip/compliance-checker

runtime_config:
  heartbeat:
    enabled: true
    intervalSec: 7200  # Every 2 hours
    wakeOnAssignment: true
```

### 3.3 Customer-Facing Agent Templates

These are the templates AgentForge sells:

#### SaaS Startup Template

```json
{
  "id": "saas-startup",
  "name": "SaaS Startup",
  "description": "Full-stack development team for building SaaS products",
  "price": 299,
  "agents": [
    {
      "name": "CEO",
      "role": "ceo",
      "title": "Chief Executive Officer",
      "capabilities": "Vision, strategy, fundraising, team leadership",
      "adapter_type": "claude_local",
      "monthly_budget": 500
    },
    {
      "name": "CTO",
      "role": "cto",
      "title": "Chief Technology Officer",
      "capabilities": "Architecture, code review, technical decisions",
      "adapter_type": "claude_local",
      "reports_to": "CEO",
      "monthly_budget": 400
    },
    {
      "name": "FrontendEngineer",
      "role": "frontend_engineer",
      "title": "Frontend Engineer",
      "capabilities": "React, Next.js, UI/UX implementation",
      "adapter_type": "claude_local",
      "reports_to": "CTO",
      "monthly_budget": 300
    },
    {
      "name": "BackendEngineer",
      "role": "backend_engineer",
      "title": "Backend Engineer",
      "capabilities": "API design, databases, infrastructure",
      "adapter_type": "claude_local",
      "reports_to": "CTO",
      "monthly_budget": 300
    },
    {
      "name": "MarketingLead",
      "role": "marketing",
      "title": "Marketing Lead",
      "capabilities": "Growth strategy, content marketing, SEO",
      "adapter_type": "claude_local",
      "reports_to": "CEO",
      "monthly_budget": 250
    }
  ],
  "skills": [
    "stripe-integration",
    "auth-system", 
    "email-automation",
    "seo-toolkit"
  ],
  "default_goals": [
    "Build and launch MVP",
    "Achieve product-market fit",
    "Grow to 100 paying customers"
  ]
}
```

#### Content Agency Template

```json
{
  "id": "content-agency",
  "name": "Content Agency",
  "description": "Marketing and content creation team for content businesses",
  "price": 199,
  "agents": [
    {
      "name": "CEO",
      "role": "ceo",
      "title": "Agency Director",
      "capabilities": "Strategy, client management, business development",
      "adapter_type": "claude_local",
      "monthly_budget": 400
    },
    {
      "name": "ContentDirector",
      "role": "content_director",
      "title": "Content Director",
      "capabilities": "Content strategy, editorial calendar, editing",
      "adapter_type": "claude_local",
      "reports_to": "CEO",
      "monthly_budget": 300
    },
    {
      "name": "SEOSpecialist",
      "role": "seo",
      "title": "SEO Specialist",
      "capabilities": "Keyword research, on-page optimization, technical SEO",
      "adapter_type": "claude_local",
      "reports_to": "ContentDirector",
      "monthly_budget": 200
    },
    {
      "name": "SocialMediaManager",
      "role": "social",
      "title": "Social Media Manager",
      "capabilities": "Content scheduling, community engagement, analytics",
      "adapter_type": "claude_local",
      "reports_to": "ContentDirector",
      "monthly_budget": 200
    }
  ],
  "skills": [
    "blog-writer",
    "seo-audit",
    "social-scheduler",
    "analytics-dashboard"
  ]
}
```

#### DevOps Squad Template

```json
{
  "id": "devops-squad",
  "name": "DevOps Squad",
  "description": "Infrastructure and CI/CD automation team",
  "price": 249,
  "agents": [
    {
      "name": "DevOpsLead",
      "role": "devops_lead",
      "title": "DevOps Lead",
      "capabilities": "Infrastructure design, AWS/GCP, Kubernetes",
      "adapter_type": "claude_local",
      "monthly_budget": 400
    },
    {
      "name": "SRE",
      "role": "sre",
      "title": "Site Reliability Engineer",
      "capabilities": "Monitoring, incident response, SLA management",
      "adapter_type": "claude_local",
      "reports_to": "DevOpsLead",
      "monthly_budget": 350
    },
    {
      "name": "SecurityEngineer",
      "role": "security",
      "title": "Security Engineer",
      "capabilities": "Security audits, compliance, vulnerability scanning",
      "adapter_type": "claude_local",
      "reports_to": "DevOpsLead",
      "monthly_budget": 350
    }
  ],
  "skills": [
    "kubernetes-deploy",
    "terraform-templates",
    "monitoring-stack",
    "security-scanner"
  ]
}
```

### 3.4 Agent Communication Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PURCHASE TO DEPLOYMENT FLOW                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Customer buys template                                                       │
│         │                                                                    │
│         ▼                                                                    │
│  ┌─────────────────┐                                                         │
│  │ AgentForge      │                                                         │
│  │ Checkout        │                                                         │
│  └────────┬────────┘                                                         │
│           │                                                                   │
│           ▼                                                                   │
│  ┌─────────────────┐     ┌─────────────────┐                                 │
│  │ CatalogManager  │────►│ ListingReviewer │                                 │
│  │ Prepares        │     │ Validates       │                                 │
│  │ template        │     │ listing         │                                 │
│  └────────┬────────┘     └────────┬────────┘                                 │
│           │                        │                                           │
│           │    ┌───────────────────┘                                           │
│           │    │                                                                 │
│           ▼    ▼                                                                 │
│  ┌─────────────────────────────────────────────────────────┐                  │
│  │              PAPERCLIP DEPLOYMENT                        │                  │
│  │                                                          │                  │
│  │  1. Create new Company in Paperclip                      │                  │
│  │  2. Import agent configurations from template           │                  │
│  │  3. Hire agents (CEO first, then reports)               │                  │
│  │  4. Install skills on appropriate agents                │                  │
│  │  5. Set budgets per agent                               │                  │
│  │  6. Create initial tasks/goals                          │                  │
│  │  7. Enable heartbeats and let them work!                │                  │
│  │                                                          │                  │
│  └─────────────────────────────────────────────────────────┘                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.5 Skills Marketplace

Skills extend agent capabilities:

```json
{
  "skills": [
    {
      "id": "stripe-integration",
      "name": "Stripe Integration",
      "description": "Payment processing with Stripe for SaaS products",
      "price": 29,
      "target_roles": ["backend_engineer", "cto"],
      "capabilities": [
        "Implement Stripe Checkout",
        "Handle webhooks",
        "Manage subscriptions",
        "Process refunds"
      ],
      "paperclip_skill_id": "stripe-payments-v2"
    },
    {
      "id": "auth-system",
      "name": "Auth System",
      "description": "Complete authentication system with SSO support",
      "price": 39,
      "target_roles": ["backend_engineer", "frontend_engineer"],
      "capabilities": [
        "JWT authentication",
        "OAuth 2.0 providers",
        "Session management",
        "Password reset flow"
      ]
    },
    {
      "id": "blog-writer",
      "name": "Blog Writer",
      "description": "SEO-optimized blog content generation",
      "price": 19,
      "target_roles": ["content_director", "marketing"],
      "capabilities": [
        "Research topics",
        "Write SEO content",
        "Generate meta descriptions",
        "Create content briefs"
      ]
    },
    {
      "id": "kubernetes-deploy",
      "name": "Kubernetes Deploy",
      "description": "Kubernetes deployment and management",
      "price": 49,
      "target_roles": ["devops_lead", "sre"],
      "capabilities": [
        "Write Kubernetes manifests",
        "Helm chart templates",
        "Auto-scaling configs",
        "Multi-environment deploys"
      ]
    }
  ]
}
```

---

## Part 4: Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Fix critical code issues (auth, validation, imports)
- [ ] Set up database schema with Drizzle
- [ ] Integrate Paperclip API client
- [ ] Implement user authentication

### Phase 2: Marketplace Core (Week 3-4)
- [ ] Template browsing and search
- [ ] Template detail pages
- [ ] Cart and checkout flow
- [ ] Stripe payment integration

### Phase 3: Paperclip Integration (Week 5-6)
- [ ] Paperclip company creation API
- [ ] Agent hiring workflow
- [ ] Template deployment automation
- [ ] Skills installation system

### Phase 4: Agent Ecosystem (Week 7-8)
- [ ] Catalog Manager agent
- [ ] Support Agent
- [ ] Listing Reviewer agent
- [ ] Agent heartbeat monitoring

### Phase 5: Polish & Launch (Week 9-10)
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Documentation
- [ ] Beta testing and feedback

---

## Appendix: Quick Reference

### Paperclip Adapter Types

| Adapter | Use Case | Example |
|---------|----------|---------|
| `claude_local` | General coding with Claude CLI | Engineers, CTOs |
| `codex_local` | GitHub-integrated coding | Open source projects |
| `openclaw_gateway` | Multi-agent orchestration | Complex workflows |
| `http` | External API agents | Webhooks, integrations |
| `process` | Custom scripts | DevOps, automation |

### Heartbeat Configuration

```typescript
const heartbeatConfig = {
  enabled: true,
  intervalSec: 300,        // 5 minutes default
  wakeOnAssignment: true, // Wake when assigned work
  wakeOnOnDemand: true,   // Allow manual wake
  cooldownSec: 10         // Min time between runs
};
```

### Budget Structure

```typescript
const budgetConfig = {
  monthlyBudget: 500.00,  // USD per agent
  currency: 'USD',
  alerts: {
    warningThreshold: 0.8,  // Alert at 80%
    hardStop: true          // Auto-pause at 100%
  }
};
```

---

*Document generated for AgentForge project review - March 2026*
