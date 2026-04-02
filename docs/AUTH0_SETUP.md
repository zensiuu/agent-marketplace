# Auth0 for AI Agents Integration Guide

## Hackathon Requirement
This project uses Auth0 Token Vault for AI agents to securely access external APIs (Stripe, GitHub, etc.).

## Setup Steps

### 1. Create Auth0 Account
1. Go to https://auth0.com and sign up (free tier available)
2. Verify your email

### 2. Create a Regular Web Application
1. In Auth0 Dashboard, go to **Applications** → **Create Application**
2. Select **Regular Web Applications**
3. Name it: `AgentForge`
4. Configure:
   - **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback`
   - **Allowed Logout URLs**: `http://localhost:3000/`
   - **Allowed Web Origins**: `http://localhost:3000`

### 3. Create an AI Agent Application (for Token Vault)
1. Go to **Applications** → **Create Application**
2. Select **Machine to Machine** (or **CLI**)
3. Name it: `AgentForge AI Agents`
4. Authorize the `Token Vault` API:
   - Go to **APIs** → find **Token Vault** → **Authorize**
5. This gives agents ability to fetch tokens for connected accounts

### 4. Get Your Credentials
From the Application settings, copy:
- **Domain**: `your-tenant.auth0.com`
- **Client ID**: `xxxxxxxxxxxxxxxx`
- **Client Secret**: `xxxxxxxxxxxxxxxx`

### 5. Enable Token Vault
1. Go to **APIs** → **Create API**
2. Name: `Token Vault`
3. Identifier: `https://token-vault.auth0.com`
4. Enable **Token Vault** feature in the API settings

### 6. Connect External Services
In Auth0 Dashboard:
1. Go to **Users** → select a user
2. Go to **Authorized Apps** tab
3. Users can connect their Stripe, GitHub, etc. accounts
4. These tokens are stored securely in Token Vault

### 7. Environment Variables
Add to `.env.local`:

```bash
# Auth0
AUTH0_SECRET='use-openssl-rand-hex-32'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_TENANT.auth0.com'
AUTH0_CLIENT_ID='YOUR_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_CLIENT_SECRET'

# For AI Agent Token Vault
AUTH0_A2A_CLIENT_ID='YOUR_AI_AGENT_CLIENT_ID'
AUTH0_A2A_CLIENT_SECRET='YOUR_AI_AGENT_CLIENT_SECRET'
```

### 8. Install Dependencies
```bash
npm install @auth0/nextjs-auth0
```

### 9. Create Auth0 Route Handler
Create `src/app/api/auth/[auth0]/route.ts`:

```typescript
import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();
```

## How It Works for Hackathon Demo

### For Users:
1. User logs in via Auth0
2. User can connect external services (Stripe, GitHub)
3. Connected tokens stored in Token Vault

### For AI Agents:
1. Agent authenticates using its own credentials
2. Agent calls Token Vault API to get user's tokens
3. Agent uses tokens to access external services on user's behalf

### Demo Flow:
```
User logs in → Connects Stripe → Agent accesses Stripe API via Token Vault
```

## Testing Locally

1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/login`
3. Test login/logout flow
4. Check Auth0 Dashboard for active sessions

## Resources
- [Auth0 Next.js SDK Docs](https://auth0.com/docs/quickstart/webapp/nextjs)
- [Token Vault for AI Agents](https://auth0.com/ai/docs/intro/token-vault)
- [Hackathon Submission Guide](./HACKATHON_SUBMISSION.md)
