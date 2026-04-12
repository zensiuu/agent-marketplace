# Agent Development Guide

This guide is for agents operating in the agent-marketplace repository.

## Project Overview

- **Type**: Next.js 15 monorepo with API packages
- **Stack**: Next.js, React 19, TypeScript, Supabase, Auth0, Zod, Vitest
- **Node**: >=20.0.0

## Commands

### Development
```bash
npm run dev              # Start Next.js dev server
npm run dev:api          # Start API package dev server
```

### Build & Type Check
```bash
npm run build            # Next.js production build
npm run typecheck        # TypeScript check only (tsc --noEmit)
npm run lint             # Run Next.js ESLint
```

### Testing
```bash
npm run test             # Run Vitest tests
npm run test -- <file>   # Run single test file (e.g., src/lib/auth.test.ts)
npm run test:coverage    # Run with coverage report
npm run test:ui          # Run Vitest UI
```

## Code Style Guidelines

### TypeScript
- Use strict mode enabled in tsconfig.json
- Define types properly; avoid `any`
- Use `interface` for public APIs, `type` for unions/intersections

### Imports
- Use path aliases: `@/*` for src, `@agentforge/api` for packages/api
- Order: external libs → internal aliases → relative imports
- Example:
  ```typescript
  import { NextResponse } from 'next/server';
  import { z } from 'zod';
  import { getSession } from '@/lib/auth';
  import { supabase } from '@/lib/supabase';
  ```

### Naming Conventions
- Files: kebab-case for routes (`agents/route.ts`), PascalCase for components
- Functions: camelCase
- Interfaces: PascalCase with descriptive names (e.g., `HireAgentSchema`)
- Constants: SCREAMING_SNAKE_CASE

### API Routes (Next.js App Router)
- Use `NextResponse` for responses
- Validate input with Zod schemas
- Return appropriate HTTP status codes (200, 201, 400, 401, 500)
- Wrap try/catch for error handling
- Example pattern:
  ```typescript
  export async function POST(request: Request) {
    try {
      const body = await request.json();
      const result = Schema.safeParse(body);
      if (!result.success) {
        return NextResponse.json({ error: '...' }, { status: 400 });
      }
      // ... process
      return NextResponse.json(data, { status: 201 });
    } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
  }
  ```

### Error Handling
- Use Zod for input validation with descriptive error messages
- Return structured error responses: `{ error: string, details?: ... }`
- Log errors server-side appropriately

### React Components
- Use functional components with TypeScript props
- Define component types explicitly
- Follow React 19 conventions

### Database
- Use Supabase client (`@supabase/ssr` for server-side)
- Access via `@/lib/supabase` or `@/lib/supabase/server`

### Testing (Vitest)
- Test files: `*.test.ts` or `*.spec.ts` co-located with source
- Use `@testing-library/react` and `@testing-library/jest-dom`
- Mock environment variables as needed

### Configuration Files
- `tsconfig.json`: ES2022, strict, bundler module resolution
- Path aliases defined in tsconfig.json
- ESLint via `eslint-config-next`

## Project Structure

```
src/
  app/api/          # Next.js API routes
  lib/              # Utilities (auth, supabase, db)
  types/            # TypeScript definitions
packages/api/       # Separate API package (Express-based)
```

## Environment Variables

Required vars documented elsewhere. Access via `process.env` with proper typing in `src/env.d.ts`.

## Working with Auth0

- Auth0 configuration via `@auth0/nextjs-auth0`
- Session management via `getServerSession`
- Protected routes check session before processing
- User data access via `session.user`

## Database Queries

- Use parameterized queries to prevent SQL injection
- Access Supabase via `@/lib/supabase` (client) or `@/lib/supabase/server` (server)
- Row-level security enforced at database level
- Environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`

## File Organization

- API routes in `src/app/api/[resource]/route.ts`
- Lib utilities in `src/lib/[utility].ts`
- Types in `src/types/[type].ts`
- Components in `src/components/` (PascalCase)
- Tests co-located: `src/lib/auth.test.ts`

## Common Patterns

### GET Request with Pagination
```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  // ... fetch and return paginated results
}
```

### Zod Schema Best Practices
```typescript
const CreateSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1).max(100),
  metadata: z.record(z.string()).optional(),
});
type CreateInput = z.infer<typeof CreateSchema>;
```

### Error Response Pattern
```typescript
// Validation errors
return NextResponse.json(
  { error: 'Validation failed', details: result.error.flatten().fieldErrors },
  { status: 400 }
);
// Server errors
return NextResponse.json(
  { error: 'Internal server error' },
  { status: 500 }
);
```
