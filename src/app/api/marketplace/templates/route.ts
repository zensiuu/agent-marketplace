import { NextResponse } from 'next/server';

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

export async function GET() {
  return NextResponse.json({ templates });
}
