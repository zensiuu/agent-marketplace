import { Router } from 'express';

export const agentsRouter = Router();

agentsRouter.get('/', (req, res) => {
  res.json({
    agents: [],
    message: 'AgentForge API - Agents endpoint'
  });
});

agentsRouter.post('/hire', (req, res) => {
  res.status(201).json({
    id: crypto.randomUUID(),
    ...req.body,
    status: 'pending_approval',
    createdAt: new Date().toISOString()
  });
});
