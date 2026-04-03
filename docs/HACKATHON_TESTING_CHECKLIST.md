# AgentForge Hackathon Testing Checklist

> **Project:** Next.js 15 AI Agent Marketplace  
> **Tech Stack:** Next.js 15, Auth0, Supabase PostgreSQL, Paperclip  
> **Date:** April 3, 2026

---

## Section 1: Environment Setup Verification

### 1.1 Environment Variables Check

**Objective:** Verify all required `.env` variables are set correctly before starting the application.

| # | Task | Command/Action | Expected Outcome |
|---|------|----------------|------------------|
| 1.1.1 | □ Check if `.env` file exists | `ls -la .env` | File exists |
| 1.1.2 | □ Verify Auth0 variables | `grep "AUTH0" .env` | All 6 Auth0 vars present (ISSUER, CLIENT_ID, SECRET, BASE_URL, A2A_DOMAIN, A2A_CLIENT_ID, A2A_CLIENT_SECRET) |
| 1.1.3 | □ Verify App URLs | `grep "NEXT_PUBLIC" .env` | API_URL and APP_URL set to `http://localhost:3000` |
| 1.1.4 | □ Verify Paperclip config | `grep "PAPERCLIP" .env` | API_URL and API_KEY present |
| 1.1.5 | □ Check database URL | `grep "DATABASE" .env` | DATABASE_URL present (can be local or Neon) |

**Manual Verification:**
```bash
# View all environment variables (masked values)
cat .env
```

**Expected Env File Contents:**
```env
# APP CONFIGURATION
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AUTH0 - User Authentication
AUTH0_SECRET='use-openssl-rand-hex-32'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='agentforge-hub.eu.auth0.com'
AUTH0_CLIENT_ID='Hsrz5K78gH7xS1fY7WP8AyhfHgJub0Bg'
AUTH0_CLIENT_SECRET='gMCU4dXJoivjARuF-x88JDmFrVt-7TOKbVeLUQTYynHMzeO7oYfYGIOmrq9BBEWN'

# AUTH0 - M2M Token Vault
AUTH0_A2A_DOMAIN='agentforge-hub.auth0.com'
AUTH0_A2A_CLIENT_ID='t0ETzvCOxxuAlC0pEYUO2wEw2cE8H3eY'
AUTH0_A2A_CLIENT_SECRET='CimJKTlikeFxs-YasJ0gG5qEUPsNb0vI_FjkJki0PzPN40gjWZA5Ea9unxvGTjVp'

# PAPERCLIP
PAPERCLIP_API_URL=https://api.paperclip.ing
PAPERCLIP_API_KEY=your-paperclip-api-key

# DATABASE
DATABASE_URL=postgresql://user:password@localhost:5432/agentforge
```

---

### 1.2 Service Connectivity Check

**Objective:** Verify each external service is reachable before testing the app.

| # | Task | Command | Expected Outcome |
|---|------|---------|------------------|
| 1.2.1 | □ Test Auth0 connectivity | `curl -I https://agentforge-hub.eu.auth0.com/.well-known/openid-configuration` | 200 OK response with OIDC config |
| 1.2.2 | □ Test Auth0 Token Vault API | `curl -I https://agentforge-hub.auth0.com/` | Connection successful |
| 1.2.3 | □ Test Paperclip API | `curl -I https://api.paperclip.ing` | API reachable |
| 1.2.4 | □ Test local Next.js server | `curl -I http://localhost:3000` | 200 OK or 302 redirect |
| 1.2.5 | □ Test PostgreSQL (if configured) | `pg_isready -h localhost -p 5432` or connection test | "accepting connections" |

**Quick Connectivity Test Script:**
```bash
#!/bin/bash
echo "=== Testing Service Connectivity ==="

echo -n "Auth0: "
curl -s -o /dev/null -w "%{http_code}" https://agentforge-hub.eu.auth0.com/.well-known/openid-configuration

echo -n " | Paperclip: "
curl -s -o /dev/null -w "%{http_code}" https://api.paperclip.ing

echo -n " | Local Server: "
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000

echo ""
```

---

### 1.3 Dependencies Check

| # | Task | Command | Expected Outcome |
|---|------|---------|------------------|
| 1.3.1 | □ Verify Node.js version | `node --version` | `v20.x.x` or higher |
| 1.3.2 | □ Verify npm dependencies installed | `ls node_modules/@auth0/nextjs-auth0` | Directory exists |
| 1.3.3 | □ Check package.json scripts | `cat package.json \| grep scripts` | "dev", "build", "start" scripts present |
| 1.3.4 | □ Verify build works | `npm run build` | Build completes without errors |

---

## Section 2: Frontend Testing (Manual)

### 2.1 Landing Page Verification

| # | Task | Action | Expected Result |
|---|------|--------|-----------------|
| 2.1.1 | □ Load landing page | Navigate to `http://localhost:3000` | Page loads with cyberpunk design |
| 2.1.2 | □ Check hero section | Verify "Build Your AI Team" headline visible | Text present |
| 2.1.3 | □ Check stats bar | Verify "500+ TEMPLATES", "10K+ AGENTS" visible | Stats display correctly |
| 2.1.4 | □ Check template cards | Verify 3 template cards (SaaS, Content, DevOps) | Cards render with images |
| 2.1.5 | □ Check navigation | Verify nav shows LOGIN, GET STARTED buttons | Links present |
| 2.1.6 | □ Check footer | Verify social links, copyright | Footer renders |
| 2.1.7 | □ Check console for errors | Open DevTools → Console tab | No red error messages |

**Console Error Check:**
- Open browser DevTools (F12)
- Go to Console tab
- Refresh page
- Filter for errors (red)
- **Expected:** No errors (warnings OK)

---

### 2.2 Authentication Flow - Login

| # | Task | Action | Expected Result |
|---|------|--------|-----------------|
| 2.2.1 | □ Click LOGIN button | Click LOGIN in nav | Redirects to `/api/auth/login` |
| 2.2.2 | □ Verify Auth0 redirect | Should redirect to Auth0 Universal Login | Auth0 login page appears |
| 2.2.3 | □ Check Auth0 domain | URL contains `agentforge-hub.eu.auth0.com` | Correct tenant |
| 2.2.4 | □ Login with test account | Enter credentials (or use signup) | Successful login |
| 2.2.5 | □ Verify callback redirect | After login, redirects to dashboard | URL shows `/dashboard` |
| 2.2.6 | □ Check user session | Visit `/api/auth/me` | Returns user JSON with email, name |

**Login Test Credentials:**
```
# If using Auth0 test user:
Email: test@example.com
Password: [Use Auth0 dashboard to create test user]
```

**API Response Check:**
```bash
# After login, test session endpoint
curl -c cookies.txt -b cookies.txt http://localhost:3000/api/auth/me
# Expected: {"user": {"email": "...", "name": "..."}}
```

---

### 2.3 Post-Login Dashboard Access

| # | Task | Action | Expected Result |
|---|------|--------|-----------------|
| 2.3.1 | □ Dashboard loads | Navigate to `/dashboard` | Dashboard page renders |
| 2.3.2 | □ Check dashboard layout | Verify sidebar navigation present | Sidebar with nav items |
| 2.3.3 | □ Verify user info | Check for user email/name display | User info visible |
| 2.3.4 | □ Check console errors | Refresh dashboard, check console | No authentication errors |

---

### 2.4 Navigation & Page Flow

| # | Task | Action | Expected Result |
|---|------|--------|-----------------|
| 2.4.1 | □ Navigate to Overview | Click "Overview" in sidebar | `/dashboard` page loads |
| 2.4.2 | □ Navigate to Templates | Click "Templates" | `/dashboard/templates` loads |
| 2.4.3 | □ Navigate to Deployments | Click "Deployments" | `/dashboard/deployments` loads |
| 2.4.4 | □ Navigate to Settings | Click "Settings" | `/dashboard/settings` loads |
| 2.4.5 | □ Test logout | Click logout | Redirects to home, session cleared |
| 2.4.6 | □ Verify protected routes | Visit `/dashboard` while logged out | Redirects to login |

---

### 2.5 Mobile Responsiveness (Optional - Do if time permits)

| # | Task | Action | Expected Result |
|---|------|--------|-----------------|
| 2.5.1 | □ Resize to mobile | Set DevTools to 375px width | Layout adjusts |
| 2.5.2 | □ Check hamburger menu | Click menu icon | Menu opens/closes |
| 2.5.3 | □ Test touch interactions | Tap buttons | All buttons work |

---

## Section 3: Backend Testing (Manual)

### 3.1 Auth0 Callback & Session

| # | Task | Command/Action | Expected Result |
|---|------|----------------|-----------------|
| 3.1.1 | □ Test auth callback route | `curl -v http://localhost:3000/api/auth/callback` | Returns 302 redirect or 200 |
| 3.1.2 | □ Verify session cookie | Check browser DevTools → Application → Cookies | `appSession` cookie present |
| 3.1.3 | □ Test session persistence | Log in, close tab, reopen `/dashboard` | Still logged in |
| 3.1.4 | □ Test logout endpoint | `curl -v -X POST http://localhost:3000/api/auth/logout` | Session cleared, redirect to home |

---

### 3.2 API Routes Response

| # | Task | Command | Expected Result |
|---|------|---------|-----------------|
| 3.2.1 | □ Test health check | `curl http://localhost:3000/api/health` | 200 OK |
| 3.2.2 | □ Test agents API | `curl http://localhost:3000/api/agents` | Returns agents list (or mock data) |
| 3.2.3 | □ Test marketplace API | `curl http://localhost:3000/api/marketplace/templates` | Returns templates list |
| 3.2.4 | □ Test companies API | `curl http://localhost:3000/api/companies` | Returns companies/deployments |

---

### 3.3 Database Connection (If Supabase Configured)

| # | Task | Command | Expected Result |
|---|------|---------|-----------------|
| 3.3.1 | □ Verify DATABASE_URL format | Check `.env` | Valid PostgreSQL connection string |
| 3.3.2 | □ Test connection | Run app, check logs | "Database connected" or similar |
| 3.3.3 | □ Check schema exists | Query `pg_tables` if accessible | Tables created |

**Note:** If Supabase not configured, skip this section. Mock data is acceptable for hackathon.

---

## Section 4: Token Vault Demo Testing

### 4.1 M2M Application Setup

| # | Task | Action | Expected Result |
|---|------|--------|-----------------|
| 4.1.1 | □ Verify M2M app in Auth0 | Check Auth0 Dashboard → Applications | "AgentForge AI Agents" M2M app exists |
| 4.1.2 | □ Check M2M credentials in .env | Verify `AUTH0_A2A_CLIENT_ID` and `AUTH0_A2A_CLIENT_SECRET` | Credentials present |
| 4.1.3 | □ Verify Token Vault API access | Check M2M app → APIs | Token Vault API enabled |

---

### 4.2 Token Vault UI Components

| # | Task | Action | Expected Result |
|---|------|--------|-----------------|
| 4.2.1 | □ Navigate to Settings | Click Settings in dashboard | Settings page loads |
| 4.2.2 | □ Find Connected Services section | Look for "Connected Services" | Section visible |
| 4.2.3 | □ Check service buttons | Look for Stripe, GitHub, Slack icons | 3 service buttons present |
| 4.2.4 | □ Verify "Connect" UI | Check if clicking service shows connect option | UI allows connection initiation |

---

### 4.3 Token Vault API Endpoint

| # | Task | Command | Expected Result |
|---|------|---------|-----------------|
| 4.3.1 | □ Test token-vault route | `curl http://localhost:3000/api/token-vault` | Returns 200 or mock data |
| 4.3.2 | □ Test POST connect | `curl -X POST http://localhost:3000/api/token-vault/connect -d '{"service":"stripe"}'` | Returns connection response |
| 4.3.3 | □ Test agent token fetch | `curl http://localhost:3000/api/agents/[id]/token` | Returns token or mock response |

---

### 4.4 Mock Token Storage Verification

| # | Task | Action | Expected Result |
|---|------|--------|-----------------|
| 4.4.1 | □ Simulate service connection | Click "Connect Stripe" in UI | OAuth flow initiates (or mock) |
| 4.4.2 | □ Verify token stored | Check dashboard for "Stripe Connected" | Success message displays |
| 4.4.3 | □ Check token in settings | View Connected Services | Stripe shows as connected |
| 4.4.4 | □ Test disconnect | Click "Disconnect" for service | Service removed from list |

---

## Section 5: Hackathon Demo Flow

### 5.1 Pre-Demo Checklist (Run Before Presentation)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 5.1.1 | □ Dev server running on port 3000 | `npm run dev` | Terminal shows "ready" |
| 5.1.2 | □ All env variables set | Verified in Section 1 | No missing vars |
| 5.1.3 | □ Auth0 account active | Logged in to Auth0 Dashboard | Can access settings |
| 5.1.4 | □ Test user exists | Have test credentials ready | Can log in |
| 5.1.5 | □ Demo account logged out | Clear session before demo | Fresh login |
| 5.1.6 | □ Browser cleared | Clear cookies/cache | Fresh state |
| 5.1.7 | □ Screenshots captured | Backup if live demo fails | Saved to `docs/screenshots/` |

---

### 5.2 Demo Script - Step by Step (3 Minutes)

#### Opening (30 seconds)
> **Say:** "AgentForge is the app store for AI agent companies. But here's the problem: when AI agents need to access your tools—like Stripe, GitHub, Slack—how do you keep their API keys secure?"

#### The Problem (30 seconds)
> **Say:** "Current solutions: put API keys in environment variables. But AI agents run on external infrastructure. You can't give them your keys—that's a security nightmare."

#### The Solution (1 minute)
> **Say:** "AgentForge uses Auth0 Token Vault. Here's how it works:
> 1. User connects their Stripe account → Auth0 handles OAuth, stores token securely
> 2. AI agent needs Stripe access → Calls Auth0 with just its own credentials
> 3. Auth0 returns scoped token → Agent uses it, never stores it
> 4. Every action is logged → User sees exactly what each agent accessed"

#### Demo Walkthrough (2 minutes)

**Step 1: Landing Page**
| Action | What to Show |
|--------|--------------|
| Navigate to `http://localhost:3000` | Cyberpunk landing page with stats |
| Point to "500+ TEMPLATES" | Show marketplace variety |

**Step 2: Login**
| Action | What to Show |
|--------|--------------|
| Click "GET STARTED" | Navigate to signup/login |
| Click "LOGIN" or sign up | Auth0 redirect |
| Complete Auth0 login | Redirect back to dashboard |

**Step 3: Dashboard Tour**
| Action | What to Show |
|--------|--------------|
| Overview page | Mock deployments and agents |
| Navigate to Templates | Browse available templates |
| Navigate to Deployments | Active agent teams |

**Step 4: Token Vault Demo**
| Action | What to Show |
|--------|--------------|
| Click Settings | Connected Services section |
| Click "Connect Stripe" | OAuth flow or mock |
| Show success message | "Stripe Connected ✓" |
| Point to activity log | "Agent accessed Stripe" |

**Step 5: Revoke Access**
| Action | What to Show |
|--------|--------------|
| Click "Disconnect Stripe" | Confirmation dialog |
| Confirm disconnect | Service removed |
| Explain | "User controls access instantly" |

#### Closing (30 seconds)
> **Say:** "AgentForge + Auth0 Token Vault = Secure AI agents that can work with your tools without ever seeing your keys. This is the missing piece for enterprise AI agent adoption. Thank you!"

---

### 5.3 Fallback Procedures (If Things Break)

#### Scenario A: Login Not Working
```
Fallback: 
1. Show pre-captured screenshots of logged-in dashboard
2. Explain the auth flow verbally
3. Focus demo on Token Vault features instead
```

#### Scenario B: Auth0 Tenant Issues
```
Fallback:
1. Check .env AUTH0_ISSUER_BASE_URL is correct
2. Restart dev server: Ctrl+C → npm run dev
3. Try incognito browser window
```

#### Scenario C: Dashboard Not Loading
```
Fallback:
1. Check dev server running: curl http://localhost:3000
2. If 404, rebuild: npm run build && npm run start
3. Show static screenshots from docs/
```

#### Scenario D: Token Vault UI Missing
```
Fallback:
1. Show screenshots of Token Vault from docs/
2. Explain the feature conceptually
3. Demo the flow with mock data
```

#### Scenario E: Complete Failure - No Internet
```
Fallback:
1. Use local-only demo (landing page works offline)
2. Show architecture diagrams from docs/
3. Walk through demo script conceptually
4. Have video recording as last resort
```

---

### 5.4 Quick Recovery Commands

```bash
# Restart dev server
Ctrl+C
npm run dev

# Clear session/cookies
# Browser: DevTools → Application → Cookies → Delete All

# Rebuild from scratch
npm run build
npm run start

# Check server health
curl http://localhost:3000/api/health
```

---

## Section 6: Quality Gates (Final Check)

### Before Submitting, Verify:

- [ ] Landing page loads at `http://localhost:3000`
- [ ] Login redirects to Auth0 successfully
- [ ] After login, dashboard is accessible
- [ ] Navigation between all dashboard pages works
- [ ] Settings page shows Connected Services section
- [ ] Console has no critical errors (warnings OK)
- [ ] API routes return valid responses
- [ ] Demo flow completes in under 3 minutes

### Screenshots to Capture:

| # | Page | Location to Save |
|----|------|------------------|
| 1 | Landing page hero | `docs/screenshots/01-landing-hero.png` |
| 2 | Login/Auth0 | `docs/screenshots/02-login.png` |
| 3 | Dashboard Overview | `docs/screenshots/03-dashboard-overview.png` |
| 4 | Settings Connected | `docs/screenshots/04-settings-connected.png` |
| 5 | Template Marketplace | `docs/screenshots/05-templates.png` |

**Screenshot Command (if available):**
```bash
./qa-playwright-capture.sh http://localhost:3000 public/qa-screenshots
```

---

## Quick Reference: Demo Day Commands

```bash
# Start the app
npm run dev

# Check health
curl http://localhost:3000/api/health

# Test auth
curl http://localhost:3000/api/auth/me

# Test APIs
curl http://localhost:3000/api/agents
curl http://localhost:3000/api/marketplace/templates

# Production build (if needed)
npm run build && npm run start
```

---

**Good luck with your presentation! 🚀**

> **Remember:** The judges care most about the Token Vault demonstration. Focus your narrative on the security story—agents can access your tools without ever seeing API keys.
