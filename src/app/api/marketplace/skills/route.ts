import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/get-server-session';

// Skill schema for validation
const SkillSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z.number().positive(),
  version: z.string().optional(),
  tags: z.array(z.string()).optional(),
  capabilities: z.record(z.string(), z.any()).optional(),
  documentationUrl: z.string().url().optional().or(z.literal('')),
  demoUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
});

// Type for skill from database
interface Skill {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number;
  version: string | null;
  tags: string[] | null;
  capabilities: Record<string, unknown> | null;
  seller_name: string | null;
  rating: number | null;
  purchases: number | null;
  documentation_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  is_active: boolean;
  created_at: string;
}

// Transform database skill to API response
function transformSkill(skill: Skill) {
  return {
    id: skill.id,
    name: skill.name,
    description: skill.description,
    category: skill.category || 'general',
    price: skill.price,
    version: skill.version || '1.0.0',
    tags: skill.tags || [],
    capabilities: skill.capabilities || {},
    sellerName: skill.seller_name || 'AgentForge',
    rating: skill.rating || 0,
    purchases: skill.purchases || 0,
    documentationUrl: skill.documentation_url || null,
    demoUrl: skill.demo_url || null,
    githubUrl: skill.github_url || null,
  };
}

// Mock skills as fallback when database is unavailable
// Includes 2 real GitHub repos: Paperclip AI, GStack
const mockSkills: Array<{
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  version: string;
  tags: string[];
  capabilities: Record<string, unknown>;
  sellerName: string;
  rating: number;
  purchases: number;
  documentationUrl: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
}> = [
  {
    id: '1',
    name: 'Paperclip AI',
    description: 'AI-powered user interface builder for rapid prototyping',
    category: 'development',
    price: 0,
    version: '1.0.0',
    tags: ['ui', 'prototyping', 'ai'],
    capabilities: { ai: true, design: true, code: true },
    sellerName: 'Paperclip',
    rating: 4.9,
    purchases: 5420,
    documentationUrl: 'https://paperclip.claude.dev',
    demoUrl: null,
    githubUrl: 'https://github.com/paperclipai/paperclip.git',
  },
  {
    id: '2',
    name: 'GStack',
    description: 'Headless browser automation and QA testing framework',
    category: 'testing',
    price: 0,
    version: '2.0.0',
    tags: ['browser', 'automation', 'qa', 'testing'],
    capabilities: { playwright: true, automation: true, qa: true },
    sellerName: 'GStack',
    rating: 4.8,
    purchases: 3200,
    documentationUrl: 'https://gstack.dev',
    demoUrl: null,
    githubUrl: 'https://github.com/garrytan/gstack.git',
  },
  {
    id: '3',
    name: 'Web Search Agent',
    description: 'Search the web for current information, news, and updates',
    category: 'research',
    price: 29.99,
    version: '1.0.0',
    tags: ['search', 'research', 'web'],
    capabilities: { search: true, filters: true, recent: true },
    sellerName: 'AgentForge',
    rating: 4.8,
    purchases: 1247,
    documentationUrl: null,
    demoUrl: null,
    githubUrl: null,
  },
  {
    id: '4',
    name: 'Data Analysis',
    description: 'Analyze datasets and generate insights with charts',
    category: 'analytics',
    price: 49.99,
    version: '2.1.0',
    tags: ['analytics', 'data', 'charts'],
    capabilities: { charts: true, export: true, pivot: true },
    sellerName: 'AgentForge',
    rating: 4.9,
    purchases: 892,
    documentationUrl: null,
    demoUrl: null,
    githubUrl: null,
  },
  {
    id: '5',
    name: 'Email Writer',
    description: 'Compose professional emails with AI-powered templates',
    category: 'productivity',
    price: 19.99,
    version: '1.2.0',
    tags: ['email', 'writing', 'productivity'],
    capabilities: { templates: true, tone: true, followup: true },
    sellerName: 'AgentForge',
    rating: 4.7,
    purchases: 2156,
    documentationUrl: null,
    demoUrl: null,
    githubUrl: null,
  },
  {
    id: '6',
    name: 'Code Reviewer',
    description: 'Automated code review with security and performance suggestions',
    category: 'development',
    price: 39.99,
    version: '1.5.0',
    tags: ['code', 'review', 'security'],
    capabilities: { security: true, performance: true, style: true },
    sellerName: 'DevTools Inc',
    rating: 4.6,
    purchases: 654,
    documentationUrl: null,
    demoUrl: null,
    githubUrl: null,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Try to fetch from Supabase
    let dbSkills: Skill[] = [];
    let useDatabase = false;

    try {
      const supabase = await createSupabaseServerClient();
      
      let query = supabase
        .from('skills')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
      }

      const { data, error } = await query;
      
      if (!error && data) {
        dbSkills = data as Skill[];
        useDatabase = true;
      }
    } catch (dbError) {
      console.warn('Database unavailable, using mock data:', dbError);
    }

    // Use database if available, otherwise fallback to mock
    let filteredSkills = useDatabase 
      ? dbSkills.map(transformSkill)
      : [...mockSkills];

    if (category && category !== 'all' && !useDatabase) {
      filteredSkills = filteredSkills.filter(s => s.category === category);
    }

    if (search && !useDatabase) {
      const searchLower = search.toLowerCase();
      filteredSkills = filteredSkills.filter(s => 
        s.name.toLowerCase().includes(searchLower) ||
        (s.description && s.description.toLowerCase().includes(searchLower)) ||
        s.tags?.some(t => t.toLowerCase().includes(searchLower))
      );
    }

    return NextResponse.json({ skills: filteredSkills });
  } catch (error) {
    console.error('Skills API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get current user for authentication
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const result = SkillSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Try to insert into Supabase
    try {
      const supabase = await createSupabaseServerClient();
      
      const { data, error } = await supabase
        .from('skills')
        .insert({
          name: result.data.name,
          description: result.data.description || null,
          category: result.data.category || 'general',
          price: result.data.price,
          version: result.data.version || '1.0.0',
          tags: result.data.tags || [],
          capabilities: result.data.capabilities || {},
          seller_name: user.name || user.email || 'You',
          seller_id: user.id,
          rating: 0,
          purchases: 0,
documentation_url: result.data.documentationUrl || null,
           demo_url: result.data.demoUrl || null,
           github_url: result.data.githubUrl || null,
           is_active: true,
        })
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ skill: transformSkill(data as Skill) }, { status: 201 });
      }
    } catch (dbError) {
      console.warn('Database unavailable, using fallback:', dbError);
    }

    // Fallback to mock data if database fails
    const newSkill = {
      id: String(mockSkills.length + 1),
      ...result.data,
      sellerName: user.name || user.email || 'You',
      rating: 0,
      purchases: 0,
    };

    mockSkills.push(newSkill as typeof mockSkills[0]);

    return NextResponse.json({ skill: newSkill }, { status: 201 });
  } catch (error) {
    console.error('Skills POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
