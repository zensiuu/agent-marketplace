import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Skill schema for validation
const SkillSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z.number().nonnegative(),
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

// Mock skills with all required fields for frontend interface
const mockSkills = [
  {
    id: 'forrestchang',
    name: 'andrej-karpathy-skills',
    description: 'A single CLAUDE.md file to improve Claude Code behavior, derived from Andrej Karpathy\'s observations on LLM coding pitfalls.',
    category: 'AI Engineering',
    price: 0,
    version: '2026-01-27',
    tags: ['claude', 'prompt-engineering', 'llm'],
    rating: 4.435,
    purchases: 377.27,
    downloads: 6884,
    lastUpdated: '2026-04-17',
    compatibility: ['Claude Code', 'Claude API'],
    performance: { speed: 95, accuracy: 92, efficiency: 88 },
    features: ['Prompt engineering', 'Code optimization', 'Best practices'],
    documentation: 'https://github.com/andrej-karpathy/claude-code',
    examples: 12,
    githubUrl: 'https://github.com/forrestchang/andrej-karpathy-skills'
  },
  {
    id: 'back1ply',
    name: 'HOLYKEYZ',
    description: 'NousResearch hermes-agent',
    category: 'AI Engineering',
    price: 0,
    version: '2026-01-27',
    tags: ['nous', 'hermes', 'agent'],
    rating: 3.499,
    purchases: 46.724,
    downloads: 95.75,
    lastUpdated: '2026-04-17',
    compatibility: ['Python', 'TypeScript'],
    performance: { speed: 88, accuracy: 94, efficiency: 91 },
    features: ['Agent framework', 'Multi-tool', 'Research'],
    documentation: 'https://github.com/nousresearch/hermes-agent',
    examples: 4,
    githubUrl: 'https://github.com/nousresearch/hermes-agent'
  },
  {
    id: 'teknium1',
    name: '0xbyt4',
    description: 'kshitijk4poor',
    category: 'AI Engineering',
    price: 0,
    version: '2026-01-27',
    tags: ['claude', 'code', 'assistant'],
    rating: 3,
    purchases: 0,
    downloads: 0,
    lastUpdated: '2026-04-17',
    compatibility: ['VS Code', 'Cursor'],
    performance: { speed: 50, accuracy: 80, efficiency: 60 },
    features: ['Code assistance', 'Multi-language', 'IDE integration'],
    documentation: 'https://github.com/0xbyt4/kshitijk4poor',
    examples: 1,
    githubUrl: 'https://github.com/0xbyt4/kshitijk4poor'
  },
  {
    id: 'voltagent',
    name: 'awesome-design-md',
    description: 'A collection of DESIGN.md files inspired by popular brand design systems. Drop one into your project and let coding agents generate a matching UI.',
    category: 'Lists',
    price: 0,
    version: '2026-01-27',
    tags: ['design', 'ui', 'branding', 'documentation'],
    rating: 2.388,
    purchases: 17.180,
    downloads: 42.66,
    lastUpdated: '2026-04-17',
    compatibility: ['Figma', 'Sketch', 'Adobe XD'],
    performance: { speed: 85, accuracy: 90, efficiency: 89 },
    features: ['Design system', 'Brand guidelines', 'Component library'],
    documentation: 'https://github.com/awesome-design-md',
    examples: 7,
    githubUrl: 'https://github.com/awesome-design-md'
  },
  {
    id: 'necatiozmen',
    name: 'doanbactam',
    description: 'LeeDoYup',
    category: 'Tool collections',
    price: 0,
    version: '2026-01-27',
    tags: ['tools', 'utilities', 'development'],
    rating: 4.01,
    purchases: 13.923,
    downloads: 29.64,
    lastUpdated: '2026-04-17',
    compatibility: ['Node.js', 'Python'],
    performance: { speed: 78, accuracy: 85, efficiency: 80 },
    features: ['Tool collection', 'Development utilities'],
    documentation: 'https://github.com/doanbactam/leedoyup',
    examples: 5,
    githubUrl: 'https://github.com/doanbactam/leedoyup'
  },
  {
    id: 'thedotmack',
    name: 'claude-mem',
    description: 'A Claude Code plugin that automatically captures everything Claude does during your coding sessions, compresses it with AI (using Claude\'s agent-sdk), and injects relevant context back into future sessions.',
    category: 'Applications',
    price: 0,
    version: '2026-01-27',
    tags: ['claude', 'memory', 'context', 'plugin'],
    rating: 2.346,
    purchases: 9.811,
    downloads: 6.56,
    lastUpdated: '2026-04-17',
    compatibility: ['VS Code', 'Cursor', 'Claude Code'],
    performance: { speed: 70, accuracy: 85, efficiency: 75 },
    features: ['Session capture', 'Context injection', 'AI compression'],
    documentation: 'https://github.com/thedotmack/claude-mem',
    examples: 24,
    githubUrl: 'https://github.com/thedotmack/claude-mem'
  },
  {
    id: 'affaan-m',
    name: 'everything-claude-code',
    description: 'The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.',
    category: 'Applications',
    price: 0,
    version: '2026-01-27',
    tags: ['claude', 'performance', 'optimization', 'development'],
    rating: 1.162,
    purchases: 24.769,
    downloads: 272.32,
    lastUpdated: '2026-04-17',
    compatibility: ['VS Code', 'IntelliJ', 'WebStorm'],
    performance: { speed: 95, accuracy: 96, efficiency: 89 },
    features: ['Performance optimization', 'Code analysis', 'Multi-IDE'],
    documentation: 'https://github.com/affaan-m/everything-claude-code',
    examples: 8,
    githubUrl: 'https://github.com/affaan-m/everything-claude-code'
  },
  {
    id: 'juliusbrussee',
    name: 'caveman',
    description: '🪨 why use many token when few token do trick — Claude Code skill that cuts 65% of tokens by talking like caveman',
    category: 'Applications',
    price: 0,
    version: '2026-01-27',
    tags: ['claude', 'tokens', 'optimization', 'efficiency'],
    rating: 4,
    purchases: 0,
    downloads: 0,
    lastUpdated: '2026-04-17',
    compatibility: ['Claude Code', 'Claude API'],
    performance: { speed: 60, accuracy: 70, efficiency: 50 },
    features: ['Token optimization', 'Cost reduction', 'Efficiency tips'],
    documentation: 'https://github.com/juliusbrussee/caveman',
    examples: 1,
    githubUrl: 'https://github.com/juliusbrussee/caveman'
  },
  {
    id: 'obra',
    name: 'superpowers',
    description: 'An agentic skills framework & software development methodology that works.',
    category: 'Applications',
    price: 0,
    version: '2026-01-27',
    tags: ['agents', 'framework', 'development', 'methodology'],
    rating: 1.08,
    purchases: 12.174,
    downloads: 8.41,
    lastUpdated: '2026-04-17',
    compatibility: ['TypeScript', 'JavaScript', 'Python'],
    performance: { speed: 92, accuracy: 96, efficiency: 89 },
    features: ['Agent framework', 'Multi-agent', 'Development tools'],
    documentation: 'https://github.com/obra/superpowers',
    examples: 13,
    githubUrl: 'https://github.com/obra/superpowers'
  },
  {
    id: 'lordog',
    name: 'dive-into-llms',
    description: 'The hands-on LLM programming tutorial series',
    category: 'Tutorials',
    price: 0,
    version: '2026-01-27',
    tags: ['llm', 'tutorial', 'machine-learning', 'education'],
    rating: 3.15,
    purchases: 4.689,
    downloads: 17.69,
    lastUpdated: '2026-04-17',
    compatibility: ['Python', 'Jupyter', 'Colab'],
    performance: { speed: 85, accuracy: 90, efficiency: 88 },
    features: ['Hands-on tutorials', 'ML fundamentals', 'Code examples'],
    documentation: 'https://github.com/lordog/dive-into-llms',
    examples: 11,
    githubUrl: 'https://github.com/lordog/dive-into-llms'
  },
  {
    id: 'microsoft',
    name: 'markitdown',
    description: 'Python tool for converting files and office documents to Markdown.',
    category: 'AI Engineering',
    price: 0,
    version: '2026-01-27',
    tags: ['markdown', 'conversion', 'documents', 'python'],
    rating: 0.87,
    purchases: 12.967,
    downloads: 13.25,
    lastUpdated: '2026-04-17',
    compatibility: ['Python', 'Windows', 'Mac', 'Linux'],
    performance: { speed: 88, accuracy: 92, efficiency: 85 },
    features: ['Document conversion', 'Multiple formats', 'High accuracy'],
    documentation: 'https://github.com/microsoft/markitdown',
    examples: 77,
    githubUrl: 'https://github.com/microsoft/markitdown'
  },
  {
    id: 'multica-ai',
    name: 'multica',
    description: 'The open-source managed agents platform. Turn coding agents into real teammates.',
    category: 'Applications',
    price: 0,
    version: '2026-01-27',
    tags: ['agents', 'management', 'teamwork', 'platform'],
    rating: 6.62,
    purchases: 10.060,
    downloads: 200.28,
    lastUpdated: '2026-04-17',
    compatibility: ['Web', 'Desktop', 'Mobile'],
    performance: { speed: 82, accuracy: 88, efficiency: 80 },
    features: ['Agent management', 'Task tracking', 'Team collaboration'],
    documentation: 'https://github.com/multica-ai/multica',
    examples: 51,
    githubUrl: 'https://github.com/multica-ai/multica'
  },
  {
    id: 'google',
    name: 'magika',
    description: 'Fast and accurate AI powered file content types detection',
    category: 'Applications',
    price: 0,
    version: '2026-01-27',
    tags: ['file-detection', 'ai', 'content-types', 'security'],
    rating: 6.27,
    purchases: 4.979,
    downloads: 48.82,
    lastUpdated: '2026-04-17',
    compatibility: ['Python', 'CLI', 'API'],
    performance: { speed: 95, accuracy: 96, efficiency: 90 },
    features: ['File type detection', 'AI-powered', 'Fast processing'],
    documentation: 'https://github.com/google/magika',
    examples: 41,
    githubUrl: 'https://github.com/google/magika'
  },
  {
    id: 'garrytan',
    name: 'gstack',
    description: 'Use Garry Tan\'s exact Claude Code setup: 23 opinionated tools that serve as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA',
    category: 'AI Engineering',
    price: 0,
    version: '2026-01-27',
    tags: ['claude', 'tools', 'productivity', 'workflow'],
    rating: 1.14,
    purchases: 5.538,
    downloads: 8.04,
    lastUpdated: '2026-04-17',
    compatibility: ['Claude Code', 'VS Code', 'Cursor'],
    performance: { speed: 90, accuracy: 88, efficiency: 85 },
    features: ['23 tools', 'Role-based', 'Productivity workflow'],
    documentation: 'https://github.com/garrytan/gstack',
    examples: 9,
    githubUrl: 'https://github.com/garrytan/gstack'
  },
  {
    id: 'basedhardware',
    name: 'omi',
    description: 'AI that sees your screen, listens to your conversations and tells you what to do',
    category: 'Applications',
    price: 0,
    version: '2026-01-27',
    tags: ['ai', 'screen-capture', 'voice', 'assistant'],
    rating: 9.66,
    purchases: 1.516,
    downloads: 19.12,
    lastUpdated: '2026-04-17',
    compatibility: ['Windows', 'Mac', 'Linux', 'Mobile'],
    performance: { speed: 75, accuracy: 85, efficiency: 70 },
    features: ['Screen monitoring', 'Voice recognition', 'AI assistance'],
    documentation: 'https://github.com/basedhardware/omi',
    examples: 100,
    githubUrl: 'https://github.com/basedhardware/omi'
  },
  {
    id: 'santifer',
    name: 'career-ops',
    description: 'AI-powered job search system built on Claude Code. 14 skill modes, Go dashboard, PDF generation, batch processing.',
    category: 'Applications',
    price: 0,
    version: '2026-01-27',
    tags: ['job-search', 'ai', 'career', 'automation'],
    rating: 2.39,
    purchases: 6.785,
    downloads: 23.75,
    lastUpdated: '2026-04-17',
    compatibility: ['Claude Code', 'Web', 'Desktop'],
    performance: { speed: 80, accuracy: 85, efficiency: 78 },
    features: ['14 skill modes', 'Go dashboard', 'PDF generation', 'Batch processing'],
    documentation: 'https://github.com/santifer/career-ops',
    examples: 28,
    githubUrl: 'https://github.com/santifer/career-ops'
  },
  {
    id: 'lsdefine',
    name: 'GenericAgent',
    description: 'Self-evolving agent: grows skill tree from 3.3K-line seed, achieving full system control with 6x less token consumption',
    category: 'AI Engineering',
    price: 0,
    version: '2026-01-27',
    tags: ['agent', 'self-evolving', 'token-optimization', 'ai'],
    rating: 33.83,
    purchases: 2.346,
    downloads: 263.60,
    lastUpdated: '2026-04-17',
    compatibility: ['Python', 'TypeScript', 'JavaScript'],
    performance: { speed: 95, accuracy: 92, efficiency: 96 },
    features: ['Self-evolving', 'Skill tree', 'Token optimization', 'System control'],
    documentation: 'https://github.com/lsdefine/GenericAgent',
    examples: 13,
    githubUrl: 'https://github.com/lsdefine/GenericAgent'
  },
  {
    id: 'safishamsi',
    name: 'graphify',
    description: 'AI coding assistant skill that turns any folder of code, docs, papers, images, or videos into a queryable knowledge graph',
    category: 'AI Engineering',
    price: 0,
    version: '2026-01-27',
    tags: ['knowledge-graph', 'ai-assistant', 'code-analysis', 'documentation'],
    rating: 2.91,
    purchases: 9.317,
    downloads: 48.12,
    lastUpdated: '2026-04-17',
    compatibility: ['Claude Code', 'Codex', 'OpenCode', 'Cursor'],
    performance: { speed: 85, accuracy: 90, efficiency: 82 },
    features: ['Knowledge graph', 'Multi-format support', 'Queryable database'],
    documentation: 'https://github.com/safishamsi/graphify',
    examples: 6,
    githubUrl: 'https://github.com/safishamsi/graphify'
  },
  {
    id: 'manavarya09',
    name: 'design-extract',
    description: 'Extract the complete design language from any website - colors, typography, spacing, shadows, and more. npx CLI + Claude Code plugin.',
    category: 'Applications',
    price: 0,
    version: '2026-01-27',
    tags: ['design-extraction', 'website-analysis', 'cli', 'plugin'],
    rating: 0,
    purchases: 0,
    downloads: 0,
    lastUpdated: '2026-04-17',
    compatibility: ['CLI', 'Claude Code', 'Web'],
    performance: { speed: 88, accuracy: 92, efficiency: 85 },
    features: ['Design extraction', 'Color analysis', 'Typography detection', 'CLI tool'],
    documentation: 'https://github.com/manavarya09/design-extract',
    examples: 1,
    githubUrl: 'https://github.com/manavarya09/design-extract'
  },
  {
    id: 'anthropics',
    name: 'skills',
    description: 'Public repository for Agent Skills',
    category: 'Applications',
    price: 0,
    version: '2026-01-27',
    tags: ['skills', 'anthropics', 'agents', 'official'],
    rating: 0.62,
    purchases: 4.928,
    downloads: 4.31,
    lastUpdated: '2026-04-17',
    compatibility: ['Claude', 'Anthropic', 'Multi-platform'],
    performance: { speed: 95, accuracy: 98, efficiency: 92 },
    features: ['Official repository', 'Agent skills', 'Anthropic ecosystem'],
    documentation: 'https://github.com/anthropics/skills',
    examples: 12,
    githubUrl: 'https://github.com/anthropics/skills'
  },
  {
    id: 'msitarzewski',
    name: 'agency-agents',
    description: 'A complete AI agency at your fingertips - From frontend wizards to Reddit community ninjas, from whimsy injectors to reality checkers.',
    category: 'Lists',
    price: 0,
    version: '2026-01-27',
    tags: ['agency', 'agents', 'specialists', 'ai-agency'],
    rating: 0.90,
    purchases: 3.985,
    downloads: 5.15,
    lastUpdated: '2026-04-17',
    compatibility: ['Multi-platform', 'Web', 'Desktop'],
    performance: { speed: 85, accuracy: 88, efficiency: 82 },
    features: ['Complete agency', 'Multiple specialists', 'Personality-driven'],
    documentation: 'https://github.com/msitarzewski/agency-agents',
    examples: 66,
    githubUrl: 'https://github.com/msitarzewski/agency-agents'
  },
  {
    id: 'nextlevelbuilder',
    name: 'ui-ux-pro-max-skill',
    description: 'An AI SKILL that provide design intelligence for building professional UI/UX multiple platforms',
    category: 'Applications',
    price: 0,
    version: '2026-01-27',
    tags: ['ui', 'ux', 'design', 'multi-platform', 'professional'],
    rating: 1.05,
    purchases: 4.564,
    downloads: 7.33,
    lastUpdated: '2026-04-17',
    compatibility: ['React', 'Vue', 'Angular', 'Flutter', 'Swift'],
    performance: { speed: 88, accuracy: 90, efficiency: 85 },
    features: ['Design intelligence', 'Multi-platform', 'Professional UI/UX'],
    documentation: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
    examples: 30,
    githubUrl: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill'
  },
  {
    id: 'openclaw',
    name: 'openclaw',
    description: 'Your own personal AI assistant. Any OS. Any Platform. The lobster way. ',
    category: 'Applications',
    price: 0,
    version: '2026-01-27',
    tags: ['ai-assistant', 'personal', 'cross-platform', 'lobster'],
    rating: 0.19,
    purchases: 5.437,
    downloads: 1.54,
    lastUpdated: '2026-04-17',
    compatibility: ['Windows', 'Mac', 'Linux', 'Mobile', 'Web'],
    performance: { speed: 90, accuracy: 92, efficiency: 88 },
    features: ['Personal assistant', 'Cross-platform', 'AI-powered'],
    documentation: 'https://github.com/openclaw/openclaw',
    examples: 73,
    githubUrl: 'https://github.com/openclaw/openclaw'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Use mock data for now
    let filteredSkills = [...mockSkills];

    if (category && category !== 'all') {
      filteredSkills = filteredSkills.filter(s => s.category === category);
    }

    if (search) {
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
    const body = await request.json();
    const result = SkillSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // For now, just return success without database operations
    const newSkill = {
      id: String(mockSkills.length + 1),
      name: result.data.name,
      description: result.data.description,
      category: result.data.category,
      price: result.data.price,
      version: result.data.version,
      tags: result.data.tags,
      sellerName: 'Demo User',
      rating: 0,
      purchases: 0,
    };

    return NextResponse.json({ skill: newSkill }, { status: 201 });
  } catch (error) {
    console.error('Skills POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
