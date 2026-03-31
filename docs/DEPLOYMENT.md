# AgentForge Deployment Guide

## Vercel Commands

### Preview Your Changes

```bash
# Install Vercel CLI globally (first time)
npm install -g vercel

# Login to Vercel
vercel login

# Preview locally (creates temporary preview URL)
vercel

# Preview with specific project
vercel --scope your-team-name agentforge
```

### Deploy to Production

```bash
# Deploy to production
vercel --prod

# With alias (for zero-downtime deploys)
vercel --prod --alias your-domain.com
```

### Environment Variables

```bash
# Set environment variables
vercel env add PAPERCLIP_API_URL
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_API_URL

# Pull environment variables from Vercel
vercel env pull .env.local
```

### Useful Vercel Flags

```bash
vercel --help              # Show all commands
vercel logs                # View deployment logs
vercel inspect <url>      # Inspect deployment
vercel teams              # Manage teams
vercel domains             # Manage domains
```

## Local Development

```bash
# Start web app
npm run dev

# Start API (in another terminal)
cd packages/api && npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Paperclip API URL set
- [ ] Database connection configured
- [ ] Build passes (`npm run build`)
- [ ] Type checking passes (`npm run typecheck`)
