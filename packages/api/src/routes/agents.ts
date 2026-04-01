import { Router } from 'express';
import { z } from 'zod';

export const agentsRouter = Router();

const HireAgentSchema = z.object({
  name: z.string().min(1, 'Agent name is required'),
  role: z.string().min(1, 'Agent role is required'),
  title: z.string().optional(),
  capabilities: z.string().optional(),
  adapterType: z.enum(['claude_local', 'codex_local', 'openclaw_gateway', 'http', 'process']).default('claude_local'),
  monthlyBudget: z.number().positive().optional(),
  reportsTo: z.string().optional(),
});

agentsRouter.get('/', (req, res) => {
  res.json({
    agents: [],
    message: 'AgentForge API - Agents endpoint'
  });
});

agentsRouter.post('/hire', (req, res) => {
  const result = HireAgentSchema.safeParse(req.body);
  
  if (!result.success) {
    res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten().fieldErrors
    });
    return;
  }
  
  res.status(201).json({
    id: crypto.randomUUID(),
    ...result.data,
    status: 'pending_approval',
    createdAt: new Date().toISOString()
  });
});
