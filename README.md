# AgentForge

**The Marketplace for AI Agent Companies** - Built on Paperclip

## Overview

AgentForge is a platform for buying, selling, and deploying pre-built AI agent companies. It's built on top of [Paperclip](https://github.com/paperclipai/paperclip) - the open-source orchestration layer for zero-human companies.

## Features

- **Template Marketplace**: Pre-built AI companies ready to deploy
- **Skill Store**: Buy and sell specialized agent skills
- **Agent Registry**: Discover and hire AI agents
- **Built on Paperclip**: Enterprise-grade orchestration with budget control and governance

## Quick Start

```bash
# Install dependencies
npm install

# Start the web app
npm run dev

# In another terminal, start the API
cd packages/api && npm run dev
```

## Project Structure

```
agentforge/
├── src/                    # Next.js web app
│   ├── app/               # App router pages
│   └── components/        # React components
├── packages/
│   ├── api/              # Express API server
│   └── web/              # Standalone web package
├── .paperclip-reference/  # Paperclip source for reference
└── docs/                  # Documentation
```

## Documentation

- [Paperclip Coding Agents Guide](./PAPERCLIP_GUIDE.md)
- [API Reference](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL (via Paperclip)
- **Deployment**: Vercel

## Deployment

### Vercel Preview

```bash
# Preview your changes
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

```env
PAPERCLIP_API_URL=https://your-paperclip-instance.com
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## License

MIT
