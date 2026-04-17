# Implementation Plan: P0 Fixes + Skills Marketplace

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix critical TypeScript errors, implement proper Auth session handling, and add Skills Marketplace feature for selling AI skills

**Architecture:** 
- Fix auth route with proper type definitions
- Replace hardcoded 'demo-user' with real session-based user ID
- Add new Skills section to marketplace with buy/sell functionality

**Tech Stack:** Next.js 15, React 19, TypeScript, Supabase, NextAuth

---

## Task 1: Fix TypeScript Errors in Auth Route

**Files:**
- Modify: `src/app/api/auth/[...nextauth]/route.ts`

- [ ] **Step 1: Read and understand current file**

```typescript
// Current issues:
// 1. Line 8: process.env.GITHUB_CLIENT_ID may be undefined
// 2. Line 9: process.env.GITHUB_CLIENT_SECRET may be undefined  
// 3. Line 12: process.env.GOOGLE_CLIENT_ID may be undefined
// 4. Line 13: process.env.GOOGLE_CLIENT_SECRET may be undefined
// 5. Line 18: 'signUp' doesn't exist in PagesOptions
// 6. Line 29: session.user possibly undefined
// 7. Line 29: 'id' doesn't exist on User type
```

- [ ] **Step 2: Fix the auth route with proper types**

```typescript
import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { Adapter } from 'next-auth/adapters';

const handler: NextAuthOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export { handler as GET, handler as POST };
```

- [ ] **Step 3: Run typecheck to verify fix**

```bash
npm run typecheck 2>&1
```

Expected: No errors in auth route file

- [ ] **Step 4: Commit**

```bash
git add src/app/api/auth/[...nextauth]/route.ts
git commit -m "fix(auth): resolve TypeScript errors in nextauth route"
```

---

## Task 2: Implement Proper Auth Session Handling

**Files:**
- Create: `src/types/next-auth.d.ts` (type augmentation)
- Modify: `src/app/api/tokens/route.ts`
- Modify: `src/app/api/marketplace/templates/route.ts`
- Modify: `src/app/api/marketplace/skills/route.ts`

- [ ] **Step 1: Create NextAuth type augmentation**

Create `src/types/next-auth.d.ts`:

```typescript
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
  }
}
```

- [ ] **Step 2: Create auth utility function**

Create `src/lib/get-server-session.ts`:

```typescript
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getCurrentUser() {
  const session = await getServerSession(nextAuthOptions);
  
  if (!session?.user) {
    return null;
  }
  
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
  };
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
}
```

- [ ] **Step 3: Export nextAuthOptions**

Modify `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
// Add at the end of the file
export const nextAuthOptions = handler;
```

- [ ] **Step 4: Fix tokens route to use real user ID**

Modify `src/app/api/tokens/route.ts` - Replace `'demo-user'` with proper session:

```typescript
// In GET function, replace:
const userId = 'demo-user';

// With:
import { getCurrentUser } from '@/lib/get-server-session';

async function getUserId() {
  const user = await getCurrentUser();
  if (!user) {
    return 'demo-user'; // Fallback for demo mode
  }
  return user.id;
}

// Then in GET/POST/DELETE:
const userId = await getUserId();
```

- [ ] **Step 5: Fix marketplace routes similarly**

- [ ] **Step 6: Run typecheck**

```bash
npm run typecheck 2>&1
```

- [ ] **Step 7: Commit**

```bash
git add src/types/ src/lib/ src/app/api/
git commit -m "feat(auth): add proper session handling with type augmentation"
```

---

## Task 3: Add Skills Marketplace Feature

**Files:**
- Create: `src/app/api/marketplace/skills/route.ts`
- Create: `src/app/dashboard/skills/page.tsx`
- Modify: `src/app/dashboard/templates/page.tsx` (add skills navigation)
- Create: `db/skills.sql` (database schema)
- Modify: `src/lib/db.ts` (add skills queries)

- [ ] **Step 1: Create database schema**

Create `db/skills.sql`:

```sql
-- Skills table for marketplace
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES auth.users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  version VARCHAR(50),
  tags TEXT[],
  capabilities JSONB,
  documentation_url VARCHAR(500),
  demo_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skill purchases table
CREATE TABLE IF NOT EXISTS skill_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES auth.users(id),
  skill_id UUID REFERENCES skills(id),
  price_paid DECIMAL(10,2) NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skill reviews
CREATE TABLE IF NOT EXISTS skill_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  skill_id UUID REFERENCES skills(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

- [ ] **Step 2: Create Skills API route**

Create `src/app/api/marketplace/skills/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseClient } from '@/lib/supabase/server';

const SkillSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z.number().positive(),
  version: z.string().optional(),
  tags: z.array(z.string()).optional(),
  capabilities: z.record(z.any()).optional(),
  documentationUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const supabase = createSupabaseClient();
    
    let query = supabase
      .from('skills')
      .select('*')
      .eq('is_active', true);

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data: skills, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Skills fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
    }

    return NextResponse.json({ skills: skills || [] });
  } catch (error) {
    console.error('Skills API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = SkillSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // For demo: use demo user ID
    const sellerId = 'demo-user'; // TODO: Get from session
    
    const supabase = createSupabaseClient();
    const { data: skill, error } = await supabase
      .from('skills')
      .insert({
        seller_id: sellerId,
        name: result.data.name,
        description: result.data.description,
        category: result.data.category,
        price: result.data.price,
        version: result.data.version,
        tags: result.data.tags,
        capabilities: result.data.capabilities,
        documentation_url: result.data.documentationUrl,
        demo_url: result.data.demoUrl,
      })
      .select()
      .single();

    if (error) {
      console.error('Skill creation error:', error);
      return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
    }

    return NextResponse.json({ skill }, { status: 201 });
  } catch (error) {
    console.error('Skills POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

- [ ] **Step 3: Create mock skills data for demo mode**

Modify `src/app/api/marketplace/skills/route.ts` - Add mock data fallback:

```typescript
// Add at the top of GET function
const useMockData = true; // Toggle for demo

if (useMockData) {
  const mockSkills = [
    {
      id: '1',
      name: 'Web Search Agent',
      description: 'Search the web for current information',
      category: 'research',
      price: 29.99,
      version: '1.0.0',
      tags: ['search', 'research', 'web'],
      capabilities: { search: true, filters: true },
      sellerName: 'AgentForge',
      rating: 4.8,
      purchases: 1247,
    },
    {
      id: '2',
      name: 'Data Analysis',
      description: 'Analyze datasets and generate insights',
      category: 'analytics',
      price: 49.99,
      version: '2.1.0',
      tags: ['analytics', 'data', 'charts'],
      capabilities: { charts: true, export: true },
      sellerName: 'AgentForge',
      rating: 4.9,
      purchases: 892,
    },
    {
      id: '3',
      name: 'Email Writer',
      description: 'Compose professional emails with AI',
      category: 'productivity',
      price: 19.99,
      version: '1.2.0',
      tags: ['email', 'writing', 'productivity'],
      capabilities: { templates: true, tone: true },
      sellerName: 'AgentForge',
      rating: 4.7,
      purchases: 2156,
    },
  ];
  return NextResponse.json({ skills: mockSkills });
}
```

- [ ] **Step 4: Create Skills page component**

Create `src/app/dashboard/skills/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  version?: string;
  tags?: string[];
  capabilities?: Record<string, boolean>;
  sellerName?: string;
  rating?: number;
  purchases?: number;
}

const categories = ['all', 'research', 'analytics', 'productivity', 'development', 'communication'];

const categoryColors: Record<string, string> = {
  research: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  analytics: 'bg-green-500/20 text-green-400 border-green-500/30',
  productivity: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  development: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  communication: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    try {
      const res = await fetch('/api/marketplace/skills');
      const data = await res.json();
      setSkills(data.skills || []);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
        >
          SKILLS
        </h1>
        <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Browse and purchase AI agent skills to enhance your team
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300
              ${selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-white/5 text-gray-400 hover:text-white border border-transparent hover:bg-white/10'
              }
            `}
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="text-gray-400">Loading skills...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px' }}
                >
                  {skill.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded border ${categoryColors[skill.category] || 'bg-gray-500/20 text-gray-400'}`}
                >
                  {skill.category}
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {skill.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-center mb-4">
                <div>
                  <div className="text-xs text-gray-500">RATING</div>
                  <div className="text-lg font-bold text-yellow-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    ★{skill.rating || 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">PURCHASES</div>
                  <div className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {skill.purchases || 0}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {skill.tags?.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs bg-white/5 text-gray-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                  <span className="text-2xl font-bold text-purple-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    ${skill.price}
                  </span>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 text-sm">
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Add navigation link to dashboard layout**

Modify `src/app/dashboard/layout.tsx` - Add Skills to navigation:

```typescript
// Add to the sidebar navigation items:
{
  name: 'Skills',
  href: '/dashboard/skills',
  icon: <IconStar className="w-5 h-5" />,
},
```

- [ ] **Step 6: Run typecheck**

```bash
npm run typecheck 2>&1
```

- [ ] **Step 7: Commit**

```bash
git add src/app/api/marketplace/skills/ src/app/dashboard/skills/
git commit -m "feat(marketplace): add skills marketplace feature"
```

---

## Task 4: Verify Build and Final Testing

**Files:**
- All modified files from previous tasks

- [ ] **Step 1: Run full typecheck**

```bash
npm run typecheck 2>&1
```

Expected: No TypeScript errors

- [ ] **Step 2: Run lint**

```bash
npm run lint 2>&1
```

Expected: No linting errors (or only minor warnings)

- [ ] **Step 3: Test the dev server**

```bash
npm run dev
```

Then navigate to:
- http://localhost:3000 - Landing page
- http://localhost:3000/dashboard/templates - Templates
- http://localhost:3000/dashboard/skills - Skills (new!)

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "fix: resolve P0 issues and add skills marketplace"
```

---

## Summary of Changes

| Task | Files Changed | Description |
|------|---------------|-------------|
| 1 | `src/app/api/auth/[...nextauth]/route.ts` | Fix TypeScript errors |
| 2 | `src/types/next-auth.d.ts`, `src/lib/get-server-session.ts`, API routes | Proper auth session |
| 3 | New skills API, skills page, db schema | Skills marketplace |
| 4 | All | Verify build |

---

**Plan complete and saved.** 

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
