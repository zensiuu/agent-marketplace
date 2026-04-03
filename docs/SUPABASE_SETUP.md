# Supabase Setup Guide for AgentForge

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **New Project**
3. Give it a name like `AgentForge`
4. Set a strong database password (save this!)
5. Choose a region closest to you
6. Wait for the project to be created (~2 minutes)

## 2. Get Your Connection String

1. In Supabase dashboard, go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Copy the **URI** format:
   ```
   postgresql://postgres.[YOUR_PROJECT_REF]:[YOUR_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

## 3. Add to .env.local

```bash
# Supabase connection
DATABASE_URL=postgresql://postgres.your-project-ref:your-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# Optional pool settings
DB_POOL_MAX=5
DB_IDLE_TIMEOUT=30000
DB_CONNECTION_TIMEOUT=10000
```

## 4. Run the Schema

You can run the schema in two ways:

### Option A: Supabase SQL Editor (Recommended)
1. Go to **SQL Editor** in Supabase dashboard
2. Click **New query**
3. Paste the contents of `db/schema.sql`
4. Click **Run**

### Option B: psql CLI
```bash
# Install psql if needed
# Windows: Download from postgresql.org or use pgAdmin

# Run schema
psql "postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres" -f db/schema.sql

# Add seed data (optional)
psql "postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres" -f db/seed.sql
```

## 5. Enable Row Level Security (RLS)

Supabase has RLS enabled by default. For development, you may want to disable it or set up policies:

```sql
-- Disable RLS for development (NOT for production)
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE purchases DISABLE ROW LEVEL SECURITY;
ALTER TABLE deployments DISABLE ROW LEVEL SECURITY;
ALTER TABLE interactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tokens DISABLE ROW LEVEL SECURITY;
```

## 6. Install pg Package

```bash
npm install pg @types/pg
```

## 7. Test the Connection

Add this to a test route:

```typescript
// src/app/api/test-db/route.ts
import { checkConnection } from '@/lib/db';

export async function GET() {
  const connected = await checkConnection();
  return Response.json({ connected });
}
```

## Troubleshooting

### Connection Refused
- Make sure your Supabase IP allowlist includes your server's IP
- Or enable **Connection Pooling** in Supabase settings

### Authentication Failed
- Double-check your password in the connection string
- The password is the one you set when creating the project, NOT your Supabase account password

### SSL Required
- Supabase requires SSL connections
- The `ssl: { rejectUnauthorized: false }` in db.ts handles this

## Next Steps

Once Supabase is set up:
1. Update `.env.local` with your `DATABASE_URL`
2. Install `pg` package
3. Run `npm run typecheck` to verify everything works
4. Test the login flow with Auth0
