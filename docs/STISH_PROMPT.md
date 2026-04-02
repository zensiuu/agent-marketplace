# AgentForge - Stish Prompt

**Build a stunning landing page for the AI Agent Marketplace**

---

## 1. PROJECT OVERVIEW

### What is AgentForge?

**AgentForge** is a marketplace where you can **buy, deploy, and manage pre-built AI agent companies**.

Think of it as the **"App Store for AI Companies"**:
- Instead of buying apps → You buy AI agent teams (companies)
- Instead of installing apps → You deploy them to your Paperclip instance
- The AI agents work autonomously → CEO assigns tasks to CTO who assigns to engineers

### Core Value Proposition

| Traditional | AgentForge |
|-------------|-----------|
| Hire a team | Deploy an AI company |
| $50K+ monthly | Starting at $199/month |
| 2-6 months to hire | Ready in minutes |
| Human management | Autonomous operation |

### Primary Mission

**Selling "Zero-Human" Companies as Templates**

Each template is a pre-configured AI company with:
- CEO agent (strategy, delegation)
- Specialized agents (CTO, Engineers, Marketing, etc.)
- Skills and capabilities
- Working autonomously 24/7

### Future Expansion

- **Phase 1 (Now):** Zero-human companies (AI agents only)
- **Phase 2:** Human + AI hybrid teams
- **Phase 3:** Full marketplace for all agent types

---

## 2. DESIGN DIRECTION

### Vibe: "FUTURE TECH MARKETPLACE"

**NOT:** Military, war, combat, weapons, or aggressive military language
**YES:** Sleek, futuristic, marketplace, professional tech

### Visual Identity

```
┌─────────────────────────────────────────────────────────────────┐
│                    DESIGN PRINCIPLES                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ✅ Sleek & Professional                                        │
│  ✅ Dark theme with neon accents                                 │
│  ✅ Marketplace feel (showcase, browse, purchase)              │
│  ✅ Tech-forward but not aggressive                              │
│  ✅ Clean, minimal, modern                                       │
│                                                                 │
│  ❌ Military/war metaphors (army, combat, weapons)            │
│  ❌ Overly aggressive language                                  │
│  ❌ Radar/scanner decorations that feel military                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Color Palette

```css
--bg-primary: #0a0a0a        /* Deep black */
--bg-secondary: #111111       /* Slightly lighter */
--bg-card: rgba(255,255,255,0.03)  /* Subtle glass */
--accent-cyan: #00d4ff        /* Primary accent - electric blue */
--accent-purple: #8b5cf6      /* Secondary accent - purple */
--accent-green: #22c55e       /* Success/online states */
--text-primary: #ffffff       /* Main text */
--text-secondary: #888888     /* Subdued text */
--text-muted: #555555        /* Very subdued */
```

### Typography

| Element | Font | Style |
|---------|------|-------|
| Headlines | **Orbitron** | Tech, futuristic, clean |
| Body/UI | **Rajdhani** | Modern, readable, slightly tech |
| Fallback | System sans-serif | - |

**Google Fonts:**
```
Orbitron: 400, 500, 600, 700, 800, 900
Rajdhani: 300, 400, 500, 600, 700
```

---

## 3. LANGUAGE & MICROCOPY

### Approved Vocabulary

| Instead of... | Use... |
|--------------|--------|
| Command your AI army | Deploy autonomous AI teams |
| Combat readiness | System status |
| Tactical overview | Dashboard overview |
| Intelligence | Analytics / Insights |
| Active operations | Running deployments |
| Stage team | Preview template |
| Deploy operation | Purchase & deploy |
| Mission success | Success rate |
| Combat | Work / Operations |

### Recommended Terms

```
✅ Marketplace, Store, Catalog
✅ Templates, Packages, Solutions
✅ Deploy, Launch, Go Live
✅ Agents, Team, Workforce
✅ Dashboard, Analytics, Insights
✅ Pricing, Plans, Packages
✅ Features, Capabilities
✅ Get Started, Sign Up, Login
```

### Forbidden Terms

```
❌ Army, Military, Combat, War, Fight
❌ Mission, Tactical, Strike, Attack
❌ Combat readiness, Battle station
❌ Weapon, Arsenal, Ammunition
❌ Enemy, Target, Eliminate
```

---

## 4. REQUIRED SECTIONS

### 4.1 Navigation Bar

**Layout:**
```
[LOGO]          [MARKETPLACE] [TEMPLATES] [SKILLS] [DOCS]        [LOGIN] [GET STARTED]
```

**Specs:**
- Sticky top, blur background
- Logo: "AGENTFORGE" (Orbitron, cyan)
- Links: uppercase, Rajdhani font
- Auth buttons on right side
- Mobile: hamburger menu

### 4.2 Hero Section

**Headline options (pick one):**
- "Deploy Your AI Workforce in Minutes"
- "The Marketplace for AI Agent Companies"
- "Build Your Autonomous Business"
- "AI Teams That Work 24/7"

**Subheadline:**
"Your go-to marketplace for pre-built AI companies. Deploy a CEO, CTO, and specialized agents—ready to work, no hiring required."

**CTAs:**
- Primary: "Explore Templates" or "Get Started"
- Secondary: "See How It Works" or "View Marketplace"

**Visual:** Grid background (subtle, not radar)

### 4.3 Social Proof / Stats Bar

```
┌─────────────────────────────────────────────────────────────┐
│  500+ TEMPLATES    │  10K+ AGENTS    │  99.9% UPTIME  │ 24/7 AUTONOMOUS │
└─────────────────────────────────────────────────────────────┘
```

### 4.4 Featured Templates Section

**Section Title:** "Popular Templates" or "Featured Companies"

**Template Cards should show:**
- Template name (e.g., "SaaS Development Team")
- Agent count (e.g., "5 Agents")
- Price (e.g., "$299/month")
- Key capabilities (icons + text)
- Status badge ("Popular", "New", "Pro")
- CTA button: "View Details" or "Deploy"

**3 Example Templates:**
1. **SaaS Development Team** - $299 - CEO, CTO, Frontend, Backend, Marketing
2. **Content Agency** - $199 - CEO, Content Director, SEO, Social Media
3. **DevOps Squad** - $249 - DevOps Lead, SRE, Security Engineer

### 4.5 How It Works Section

**3 Steps:**
```
1. BROWSE         →        2. DEPLOY           →        3. MONITOR
Choose a template         One-click install           Watch your AI
from the marketplace      to your account             team work autonomously
```

### 4.6 Features / Capabilities Grid

**Section Title:** "Platform Capabilities" or "Why AgentForge"

**3 Cards:**
1. **Autonomous Operations** - "AI agents work 24/7 with zero human intervention"
2. **Budget Control** - "Set spending limits, track costs per agent"
3. **Easy Monitoring** - "Real-time dashboard for all your deployments"

### 4.7 Pricing Section (Optional for MVP)

Simple pricing tiers or "Starting at $199/month"

### 4.8 CTA Section

"Ready to build your AI workforce?"
- Primary CTA: "Get Started Free"
- Secondary: "Schedule a Demo"

### 4.9 Footer

```
[Logo]  [Links]  [Links]  [Links]           © 2026 AgentForge
         Marketplace | Templates | Skills | Docs
         Privacy | Terms | Contact
         status: all systems operational
```

---

## 5. AUTHENTICATION SECTION (IMPORTANT)

### Login Modal/Page Elements

**Fields:**
- Email address
- Password
- "Remember me" checkbox
- Forgot password link

**Actions:**
- "Log In" button
- "Don't have an account? Sign up" link

**Social Login (optional):**
- Continue with Google
- Continue with GitHub

### Sign Up Modal/Page Elements

**Fields:**
- Full name
- Email address
- Password
- Confirm password

**Actions:**
- "Create Account" button
- "Already have an account? Log in" link

**Marketing checkbox:**
- ☐ I agree to Terms of Service and Privacy Policy

---

## 6. TECHNICAL SPECIFICATIONS

### File Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with nav + footer
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles
│   ├── login/
│   │   └── page.tsx       # Login page
│   └── signup/
│       └── page.tsx        # Signup page
```

### Tailwind Classes Reference

```css
/* Colors */
bg-[#0a0a0a]          /* Dark background */
bg-[#111111]           /* Card backgrounds */
text-cyan-400          /* Accent text */
text-purple-400        /* Secondary accent */
bg-cyan-500            /* Primary buttons */
bg-purple-500          /* Secondary buttons */

/* Effects */
backdrop-blur-xl        /* Glass effect */
border-white/10        /* Subtle borders */
shadow-lg              /* Card shadows */
.shadow-cyan          /* Cyan glow */
.shadow-purple         /* Purple glow */

/* Typography */
font-orbitron          /* Headers */
font-rajdhani          /* Body text */
tracking-wider         /* Letter spacing */
uppercase             /* All caps nav */
```

### CSS Animations

```css
/* Fade in up animation */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }

/* Subtle glow pulse */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.2); }
  50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.4); }
}
```

### Glass Card Effect

```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}
```

---

## 7. COMPONENT LIBRARY

### Navigation Bar
```tsx
<nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
  {/* Logo, links, auth buttons */}
</nav>
```

### Hero Section
```tsx
<section className="relative min-h-[80vh] flex items-center justify-center">
  {/* Grid background, headline, CTAs */}
</section>
```

### Template Card
```tsx
<div className="glass-card p-6 hover:border-cyan-500/50 transition-all">
  {/* Name, agents, price, description, CTA */}
</div>
```

### Stats Bar
```tsx
<div className="grid grid-cols-4 gap-8 border-y border-white/5 py-8">
  {/* 4 metric cards */}
</div>
```

### Feature Card
```tsx
<div className="glass-card p-8">
  {/* Icon, title, description */}
</div>
```

### CTA Section
```tsx
<section className="py-20 text-center">
  {/* Headline, subtext, buttons */}
</section>
```

### Footer
```tsx
<footer className="border-t border-white/5 py-12">
  {/* Links, copyright, status */}
</footer>
```

---

## 8. MOBILE RESPONSIVENESS

**Breakpoints:**
- Mobile: < 640px (stack everything)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (full layout)

**Mobile Navigation:**
- Hamburger menu icon
- Slide-out or dropdown menu
- Full-screen overlay with links

---

## 9. LAYOUT MISTAKES TO FIX

### Current Issues to Address:

1. **Navigation** - Keep it marketplace-focused, not military
2. **Hero** - More marketplace copy, less "command/army"
3. **Stats** - Use marketplace metrics (templates, agents deployed, etc.)
4. **Template Cards** - Should look like products in a store
5. **CTAs** - "Explore Templates" not "Deploy Operation"
6. **Footer** - Professional marketplace footer, not "SECURITY CLEARANCE"

### Mobile Fixes:
- Hamburger menu for mobile nav
- Stack template cards vertically on mobile
- Reduce font sizes proportionally
- Ensure touch targets are 44px minimum

---

## 10. QUALITY CHECKLIST

Before finalizing, verify:

- [ ] No military/combat language anywhere
- [ ] All buttons have hover states
- [ ] All links are functional (even if placeholder)
- [ ] Mobile responsive at 320px, 375px, 768px
- [ ] Login/Signup links work
- [ ] Template cards show proper pricing
- [ ] Navigation is clear and intuitive
- [ ] Footer has proper links
- [ ] No console errors
- [ ] Fonts load correctly (Orbitron, Rajdhani)

---

## 11. DELIVERABLES

Create/modify these files:

1. `src/app/layout.tsx` - Updated nav with login/signup
2. `src/app/page.tsx` - Refined landing page with marketplace vibe
3. `src/app/globals.css` - Updated styles (remove radar/military decorations)
4. `src/app/login/page.tsx` - Login page (basic)
5. `src/app/signup/page.tsx` - Signup page (basic)

---

## 12. FINAL NOTES

**Remember:**
- This is a **MARKETPLACE** first, tech product second
- Think Shopify, LemonSquez, or App Store vibes
- Dark theme is fine, but keep it professional
- The future includes humans too - keep it inclusive
- Primary goal: Make people want to BUY and DEPLOY templates

**Tagline suggestions:**
- "Deploy Your AI Workforce"
- "The AI Company Marketplace"
- "Build, Deploy, Scale - Zero Hiring Required"
