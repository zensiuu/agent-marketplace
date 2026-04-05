import { Router } from 'express';
import { z } from 'zod';

export const companiesRouter = Router();

const CreateDeploymentSchema = z.object({
  templateId: z.string().uuid(),
  name: z.string().min(1),
  paperclipCompanyId: z.string().min(1),
});

const UpdateDeploymentSchema = z.object({
  status: z.enum(['provisioning', 'active', 'paused', 'suspended', 'deleted']).optional(),
  config: z.record(z.unknown()).optional(),
});

const inMemoryDeployments: Map<string, {
  id: string;
  customerId: string;
  templateId: string;
  name: string;
  paperclipCompanyId: string;
  status: string;
  config: Record<string, unknown>;
  deployedAt: string | null;
  createdAt: string;
  updatedAt: string;
}> = new Map();

companiesRouter.get('/deployments', (req, res) => {
  const deployments = Array.from(inMemoryDeployments.values());
  res.json({ deployments });
});

companiesRouter.get('/deployments/:id', (req, res) => {
  const deployment = inMemoryDeployments.get(req.params.id);
  if (!deployment) {
    res.status(404).json({ error: 'Deployment not found' });
    return;
  }
  res.json(deployment);
});

companiesRouter.post('/deployments', (req, res) => {
  const result = CreateDeploymentSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Validation failed', details: result.error.flatten().fieldErrors });
    return;
  }

  const deployment = {
    id: crypto.randomUUID(),
    customerId: 'current-user',
    templateId: result.data.templateId,
    name: result.data.name,
    paperclipCompanyId: result.data.paperclipCompanyId,
    status: 'provisioning',
    config: {},
    deployedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  inMemoryDeployments.set(deployment.id, deployment);
  res.status(201).json(deployment);
});

companiesRouter.patch('/deployments/:id', (req, res) => {
  const deployment = inMemoryDeployments.get(req.params.id);
  if (!deployment) {
    res.status(404).json({ error: 'Deployment not found' });
    return;
  }

  const result = UpdateDeploymentSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Validation failed', details: result.error.flatten().fieldErrors });
    return;
  }

  const updated = {
    ...deployment,
    ...result.data,
    deployedAt: result.data.status === 'active' ? new Date().toISOString() : deployment.deployedAt,
    updatedAt: new Date().toISOString(),
  };

  inMemoryDeployments.set(deployment.id, updated);
  res.json(updated);
});

companiesRouter.delete('/deployments/:id', (req, res) => {
  const deployment = inMemoryDeployments.get(req.params.id);
  if (!deployment) {
    res.status(404).json({ error: 'Deployment not found' });
    return;
  }

  deployment.status = 'deleted';
  inMemoryDeployments.set(deployment.id, deployment);
  res.json({ success: true });
});
