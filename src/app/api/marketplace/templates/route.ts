import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

// Type for template from database
interface Template {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  features: unknown[] | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  seller_name: string | null;
  rating: number | null;
  downloads: number | null;
}

// Transform database template to API response
function transformTemplate(template: Template) {
  return {
    id: template.id,
    name: template.name,
    description: template.description,
    price: template.price,
    category: template.category,
    features: template.features || [],
    imageUrl: template.image_url,
    isActive: template.is_active,
    sellerName: template.seller_name || 'AgentForge',
    rating: template.rating || 0,
    downloads: template.downloads || 0,
    agents: (template.features || []).map((f: any, idx: number) => ({
      name: f.name || `Agent ${idx + 1}`,
      role: f.role || 'agent',
      capabilities: f.role || 'General capabilities',
    })),
    skills: [], // Could be linked via a separate table
  };
}

// Mock templates as fallback
const mockTemplates = [
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
  try {
    // Try to fetch from Supabase
    let dbTemplates: Template[] = [];
    let useDatabase = false;

    try {
      const supabase = await createSupabaseServerClient();
      
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        dbTemplates = data as Template[];
        useDatabase = true;
      }
    } catch (dbError) {
      console.warn('Database unavailable, using mock data:', dbError);
    }

    // Use database if available, otherwise fallback to mock
    const templates = useDatabase 
      ? dbTemplates.map(transformTemplate)
      : mockTemplates;

    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Templates API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
