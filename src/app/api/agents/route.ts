import { NextResponse } from 'next/server';
import { z } from 'zod';

const HireAgentSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  title: z.string().optional(),
  capabilities: z.string().optional(),
  adapterType: z.enum(['claude_local', 'codex_local', 'openclaw_gateway', 'http', 'process']).default('claude_local'),
  monthlyBudget: z.number().positive().optional(),
  reportsTo: z.string().optional(),
});

export async function GET() {
  return NextResponse.json({ agents: [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = HireAgentSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      id: crypto.randomUUID(),
      ...result.data,
      status: 'pending_approval',
      createdAt: new Date().toISOString()
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
