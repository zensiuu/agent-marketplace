import { Router } from 'express';
import { z } from 'zod';

export const marketplaceRouter = Router();

const TemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  agents: z.array(z.object({
    name: z.string(),
    role: z.string(),
    capabilities: z.string(),
  })),
  skills: z.array(z.string()),
  downloads: z.number().default(0),
  rating: z.number().min(1).max(5).default(5),
});

const PurchaseSchema = z.object({
  templateId: z.string().min(1, 'Template ID is required'),
  paymentMethod: z.enum(['stripe', 'card', 'paypal'], {
    errorMap: () => ({ message: 'Payment method must be stripe, card, or paypal' })
  }),
});

marketplaceRouter.get('/templates', (req, res) => {
  const templates = [
    {
      id: 'saas-startup',
      name: 'SaaS Startup',
      description: 'Full-stack development team for building SaaS products',
      price: 299,
      agents: [
        { name: 'CEO', role: 'ceo', capabilities: 'Vision, strategy, fundraising' },
        { name: 'CTO', role: 'cto', capabilities: 'Architecture, code review, technical decisions' },
        { name: 'Frontend Engineer', role: 'frontend', capabilities: 'React, Next.js, UI/UX' },
        { name: 'Backend Engineer', role: 'backend', capabilities: 'API, databases, infrastructure' },
        { name: 'Marketing Lead', role: 'marketing', capabilities: 'Growth, content, SEO' },
      ],
      skills: ['stripe-integration', 'auth-system', 'email-automation'],
      downloads: 1247,
      rating: 4.8,
    },
    {
      id: 'content-agency',
      name: 'Content Agency',
      description: 'Marketing and content creation team for content businesses',
      price: 199,
      agents: [
        { name: 'CEO', role: 'ceo', capabilities: 'Strategy, client management' },
        { name: 'Content Director', role: 'content', capabilities: 'Content strategy, editing' },
        { name: 'SEO Specialist', role: 'seo', capabilities: 'Keyword research, optimization' },
        { name: 'Social Media Manager', role: 'social', capabilities: 'Scheduling, engagement' },
      ],
      skills: ['blog-writer', 'seo-audit', 'social-scheduler'],
      downloads: 892,
      rating: 4.6,
    },
    {
      id: 'devops-squad',
      name: 'DevOps Squad',
      description: 'Infrastructure and CI/CD automation team',
      price: 249,
      agents: [
        { name: 'DevOps Lead', role: 'devops', capabilities: 'Infrastructure, monitoring' },
        { name: 'SRE', role: 'sre', capabilities: 'Reliability, incident response' },
        { name: 'Security Engineer', role: 'security', capabilities: 'Audits, compliance' },
      ],
      skills: ['kubernetes-deploy', 'terraform-templates', 'monitoring-stack'],
      downloads: 654,
      rating: 4.9,
    },
  ];
  
  res.json({ templates });
});

marketplaceRouter.get('/skills', (req, res) => {
  const skills = [
    { id: 'stripe-integration', name: 'Stripe Integration', price: 29, installs: 2341 },
    { id: 'auth-system', name: 'Auth System', price: 39, installs: 1892 },
    { id: 'blog-writer', name: 'Blog Writer', price: 19, installs: 3456 },
    { id: 'seo-audit', name: 'SEO Audit', price: 24, installs: 1234 },
    { id: 'kubernetes-deploy', name: 'Kubernetes Deploy', price: 49, installs: 876 },
  ];
  
  res.json({ skills });
});

marketplaceRouter.post('/purchase', (req, res) => {
  const result = PurchaseSchema.safeParse(req.body);
  
  if (!result.success) {
    res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten().fieldErrors
    });
    return;
  }
  
  const { templateId, paymentMethod } = result.data;
  
  res.status(201).json({
    orderId: crypto.randomUUID(),
    templateId,
    paymentMethod,
    status: 'processing',
    downloadUrl: `/download/${templateId}`,
    createdAt: new Date().toISOString(),
  });
});
