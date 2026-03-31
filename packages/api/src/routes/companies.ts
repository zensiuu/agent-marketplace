import { Router } from 'express';

export const companiesRouter = Router();

companiesRouter.get('/', (req, res) => {
  res.json({
    companies: [],
    message: 'AgentForge API - Companies endpoint'
  });
});

companiesRouter.post('/', (req, res) => {
  res.status(201).json({
    id: crypto.randomUUID(),
    ...req.body,
    createdAt: new Date().toISOString()
  });
});
