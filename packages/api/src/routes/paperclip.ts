import { Router } from 'express';
import { z } from 'zod';
import { paperclip } from '../lib/paperclip.js';

export const paperclipRouter = Router();

const HireAgentSchema = z.object({
  companyId: z.string(),
  name: z.string().min(1),
  role: z.string().min(1),
  title: z.string().optional(),
  capabilities: z.string().optional(),
  adapterType: z.enum(['claude_local', 'codex_local', 'openclaw_gateway', 'http', 'process']).default('claude_local'),
  adapterConfig: z.record(z.unknown()).optional(),
  runtimeConfig: z.object({
    heartbeat: z.object({
      enabled: z.boolean().default(true),
      intervalSec: z.number().default(300),
      wakeOnAssignment: z.boolean().default(true),
      wakeOnOnDemand: z.boolean().default(true),
    }).optional(),
  }).optional(),
  monthlyBudget: z.number().positive().optional(),
  reportsTo: z.string().optional(),
});

const CreateCompanySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

const CreateIssueSchema = z.object({
  companyId: z.string(),
  title: z.string().min(1),
  body: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  assigneeId: z.string().optional(),
  labels: z.array(z.string()).optional(),
});

paperclipRouter.get('/health', async (req, res) => {
  try {
    const healthy = await paperclip.healthCheck();
    res.json({ status: healthy ? 'connected' : 'disconnected' });
  } catch (error) {
    res.json({ status: 'disconnected', error: (error as Error).message });
  }
});

paperclipRouter.post('/companies', async (req, res) => {
  try {
    const result = CreateCompanySchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: 'Validation failed', details: result.error.flatten().fieldErrors });
      return;
    }
    
    const company = await paperclip.createCompany(result.data.name);
    res.status(201).json(company);
  } catch (error) {
    console.error('Failed to create company:', error);
    res.status(500).json({ error: 'Failed to create company in Paperclip' });
  }
});

paperclipRouter.get('/companies', async (req, res) => {
  try {
    const companies = await paperclip.listCompanies();
    res.json({ companies });
  } catch (error) {
    console.error('Failed to list companies:', error);
    res.status(500).json({ error: 'Failed to list companies' });
  }
});

paperclipRouter.post('/companies/:companyId/agents', async (req, res) => {
  try {
    const { companyId } = req.params;
    const result = HireAgentSchema.safeParse({ ...req.body, companyId });
    
    if (!result.success) {
      res.status(400).json({ error: 'Validation failed', details: result.error.flatten().fieldErrors });
      return;
    }
    
    const agent = await paperclip.hireAgent(companyId, result.data);
    res.status(201).json(agent);
  } catch (error) {
    console.error('Failed to hire agent:', error);
    res.status(500).json({ error: 'Failed to hire agent in Paperclip' });
  }
});

paperclipRouter.get('/companies/:companyId/agents', async (req, res) => {
  try {
    const { companyId } = req.params;
    const agents = await paperclip.listAgents(companyId);
    res.json({ agents });
  } catch (error) {
    console.error('Failed to list agents:', error);
    res.status(500).json({ error: 'Failed to list agents' });
  }
});

paperclipRouter.put('/companies/:companyId/agents/:agentId', async (req, res) => {
  try {
    const { companyId, agentId } = req.params;
    const updates = req.body;
    
    const agent = await paperclip.updateAgent(companyId, agentId, updates);
    res.json(agent);
  } catch (error) {
    console.error('Failed to update agent:', error);
    res.status(500).json({ error: 'Failed to update agent' });
  }
});

paperclipRouter.post('/companies/:companyId/issues', async (req, res) => {
  try {
    const { companyId } = req.params;
    const result = CreateIssueSchema.safeParse({ ...req.body, companyId });
    
    if (!result.success) {
      res.status(400).json({ error: 'Validation failed', details: result.error.flatten().fieldErrors });
      return;
    }
    
    const issue = await paperclip.createIssue(companyId, result.data);
    res.status(201).json(issue);
  } catch (error) {
    console.error('Failed to create issue:', error);
    res.status(500).json({ error: 'Failed to create issue in Paperclip' });
  }
});

paperclipRouter.get('/companies/:companyId/issues', async (req, res) => {
  try {
    const { companyId } = req.params;
    const issues = await paperclip.listIssues(companyId);
    res.json({ issues });
  } catch (error) {
    console.error('Failed to list issues:', error);
    res.status(500).json({ error: 'Failed to list issues' });
  }
});

paperclipRouter.post('/agents/:agentId/wakeup', async (req, res) => {
  try {
    const { agentId } = req.params;
    const result = await paperclip.triggerHeartbeat(agentId);
    res.json(result);
  } catch (error) {
    console.error('Failed to trigger heartbeat:', error);
    res.status(500).json({ error: 'Failed to trigger agent heartbeat' });
  }
});

paperclipRouter.post('/deploy-template', async (req, res) => {
  try {
    const { companyName, templateId, templateData } = req.body;
    
    const company = await paperclip.createCompany(companyName);
    
    const deployedAgents = [];
    for (const agent of templateData.agents) {
      const hiredAgent = await paperclip.hireAgent(company.id, {
        name: agent.name,
        role: agent.role,
        title: agent.title || agent.name,
        capabilities: agent.capabilities,
        adapterType: agent.adapterType || 'claude_local',
        reportsTo: agent.reportsTo,
        monthlyBudget: agent.monthlyBudget,
        runtimeConfig: {
          heartbeat: {
            enabled: true,
            intervalSec: 300,
            wakeOnAssignment: true,
          },
        },
      });
      deployedAgents.push(hiredAgent);
    }

    await paperclip.createIssue(company.id, {
      title: `Initial goals for ${companyName}`,
      body: templateData.defaultGoals?.join('\n') || 'Welcome! Your AI company is now set up.',
      priority: 'high',
    });
    
    res.status(201).json({
      company,
      agents: deployedAgents,
      status: 'deployed',
    });
  } catch (error) {
    console.error('Failed to deploy template:', error);
    res.status(500).json({ error: 'Failed to deploy template' });
  }
});
