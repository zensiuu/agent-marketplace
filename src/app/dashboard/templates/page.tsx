'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Inline SVG Icon Components
const IconX = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconUsers = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconStar = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const IconShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconClock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconZap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconShield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconCheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

interface AgentRole {
  name: string;
  role: string;
  description: string;
  skills: string[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  agentCount: number;
  category: string;
  rating: number;
  purchases: number;
  features: string[];
  requirements: string[];
  deploymentTime: string;
  agents: AgentRole[];
  tags: string[];
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'SaaS Development Team',
    description: 'Full-stack development team with CEO, CTO, and engineers',
    longDescription: 'A complete AI-powered development team designed to build, scale, and maintain SaaS products. Includes strategic leadership, technical architecture, and hands-on development capabilities.',
    price: 299,
    agentCount: 5,
    category: 'development',
    rating: 4.8,
    purchases: 1247,
    deploymentTime: '2-3 minutes',
    features: [
      'End-to-end product development',
      'Technical architecture design',
      'Code review and optimization',
      'DevOps pipeline setup',
      'API development and integration',
      'Database schema design'
    ],
    requirements: [
      'GitHub repository access',
      'OpenAI API key',
      'Vercel or AWS account',
      'Basic project requirements'
    ],
    agents: [
      { name: 'Alex', role: 'CEO', description: 'Strategic planning and product vision', skills: ['Strategy', 'Market Analysis', 'Roadmapping'] },
      { name: 'Sam', role: 'CTO', description: 'Technical leadership and architecture', skills: ['System Design', 'Tech Stack', 'Scalability'] },
      { name: 'Jordan', role: 'Full-Stack Dev', description: 'Frontend and backend development', skills: ['React', 'Node.js', 'PostgreSQL'] },
      { name: 'Taylor', role: 'DevOps Engineer', description: 'CI/CD and infrastructure', skills: ['Docker', 'Kubernetes', 'AWS'] },
      { name: 'Casey', role: 'QA Engineer', description: 'Testing and quality assurance', skills: ['Automated Testing', 'CI/CD', 'Performance'] }
    ],
    tags: ['SaaS', 'Full-Stack', 'Startup']
  },
  {
    id: '2',
    name: 'Content Agency',
    description: 'Marketing and content creation team for brand operations',
    longDescription: 'A comprehensive content and marketing team that handles everything from strategy to execution. Creates blog posts, social media content, email campaigns, and marketing collateral.',
    price: 199,
    agentCount: 4,
    category: 'marketing',
    rating: 4.6,
    purchases: 892,
    deploymentTime: '1-2 minutes',
    features: [
      'Content strategy development',
      'Blog writing and editing',
      'Social media management',
      'Email campaign creation',
      'SEO optimization',
      'Brand voice consistency'
    ],
    requirements: [
      'Brand guidelines document',
      'Target audience profile',
      'Content management system',
      'Social media accounts'
    ],
    agents: [
      { name: 'Morgan', role: 'Content Strategist', description: 'Content planning and strategy', skills: ['SEO', 'Content Strategy', 'Analytics'] },
      { name: 'Riley', role: 'Copywriter', description: 'Persuasive copy and content creation', skills: ['Copywriting', 'Storytelling', 'Conversion'] },
      { name: 'Quinn', role: 'Social Media Manager', description: 'Social presence and engagement', skills: ['Social Media', 'Community', 'Trending'] },
      { name: 'Avery', role: 'Editor', description: 'Quality control and refinement', skills: ['Editing', 'Proofreading', 'Style Guide'] }
    ],
    tags: ['Marketing', 'Content', 'Social Media']
  },
  {
    id: '3',
    name: 'DevOps Squad',
    description: 'Infrastructure and CI/CD automation specialists',
    longDescription: 'Expert DevOps team focused on automating infrastructure, optimizing deployments, and ensuring system reliability. Handles cloud resources, monitoring, and security compliance.',
    price: 249,
    agentCount: 3,
    category: 'devops',
    rating: 4.9,
    purchases: 654,
    deploymentTime: '3-5 minutes',
    features: [
      'Infrastructure as Code',
      'CI/CD pipeline setup',
      'Cloud cost optimization',
      'Security compliance',
      'Monitoring and alerting',
      'Disaster recovery planning'
    ],
    requirements: [
      'Cloud provider account (AWS/GCP/Azure)',
      'Existing application code',
      'Domain and DNS access',
      'Security policies'
    ],
    agents: [
      { name: 'Blake', role: 'DevOps Lead', description: 'Infrastructure architecture', skills: ['Terraform', 'AWS', 'Architecture'] },
      { name: 'Drew', role: 'SRE', description: 'Site reliability and monitoring', skills: ['Kubernetes', 'Prometheus', 'SLOs'] },
      { name: 'Jamie', role: 'Security Engineer', description: 'Security and compliance', skills: ['Security', 'Compliance', 'Audit'] }
    ],
    tags: ['DevOps', 'Infrastructure', 'SRE']
  },
  {
    id: '4',
    name: 'Sales Team',
    description: 'Lead generation and sales automation',
    longDescription: 'High-performance sales team that automates lead generation, qualification, and outreach. Includes CRM management, email sequences, and meeting scheduling.',
    price: 179,
    agentCount: 4,
    category: 'sales',
    rating: 4.5,
    purchases: 432,
    deploymentTime: '2-4 minutes',
    features: [
      'Lead generation and scoring',
      'Outreach automation',
      'CRM data management',
      'Meeting scheduling',
      'Proposal creation',
      'Follow-up sequences'
    ],
    requirements: [
      'Salesforce or HubSpot account',
      'LinkedIn Sales Navigator',
      'Email domain (Google Workspace)',
      'Target customer profile'
    ],
    agents: [
      { name: 'Cameron', role: 'Sales Manager', description: 'Strategy and team coordination', skills: ['Strategy', 'Pipeline', 'Forecasting'] },
      { name: 'Reese', role: 'SDR', description: 'Lead generation and qualification', skills: ['Prospecting', 'Qualification', 'Outreach'] },
      { name: 'Hayden', role: 'Account Executive', description: 'Demo and closing', skills: ['Demo', 'Negotiation', 'Closing'] },
      { name: 'Parker', role: 'Sales Ops', description: 'CRM and analytics', skills: ['CRM', 'Reporting', 'Automation'] }
    ],
    tags: ['Sales', 'CRM', 'Outreach']
  },
  {
    id: '5',
    name: 'Support Team',
    description: 'Customer support and helpdesk automation',
    longDescription: '24/7 customer support team that handles inquiries, troubleshooting, and ticket resolution. Integrates with helpdesk platforms and provides multilingual support.',
    price: 149,
    agentCount: 3,
    category: 'support',
    rating: 4.7,
    purchases: 789,
    deploymentTime: '1-2 minutes',
    features: [
      'Ticket triage and routing',
      'Knowledge base management',
      'Customer satisfaction tracking',
      'Escalation handling',
      'Multi-channel support',
      'Response time optimization'
    ],
    requirements: [
      'Zendesk or Intercom account',
      'Knowledge base documentation',
      'Product documentation',
      'Support email address'
    ],
    agents: [
      { name: 'Charlie', role: 'Support Lead', description: 'Ticket management and escalation', skills: ['Zendesk', 'Escalation', 'Training'] },
      { name: 'Sage', role: 'Support Agent', description: 'First-line issue resolution', skills: ['Troubleshooting', 'Documentation', 'Communication'] },
      { name: 'Finley', role: 'Knowledge Manager', description: 'Documentation and self-service', skills: ['Documentation', 'SEO', 'Content'] }
    ],
    tags: ['Support', 'Helpdesk', 'Customer Success']
  },
  {
    id: '6',
    name: 'E-commerce Operator',
    description: 'Product listings, inventory, and order management',
    longDescription: 'Complete e-commerce operations team managing product listings, inventory, pricing optimization, and customer communications across multiple marketplaces.',
    price: 299,
    agentCount: 6,
    category: 'ecommerce',
    rating: 4.4,
    purchases: 567,
    deploymentTime: '3-5 minutes',
    features: [
      'Product listing optimization',
      'Inventory management',
      'Dynamic pricing',
      'Review management',
      'Competitor analysis',
      'Order fulfillment tracking'
    ],
    requirements: [
      'Shopify/Amazon/eBay accounts',
      'Product catalog data',
      'Supplier information',
      'Shipping provider access'
    ],
    agents: [
      { name: 'Dakota', role: 'Store Manager', description: 'Overall store operations', skills: ['Operations', 'Analytics', 'Strategy'] },
      { name: 'Skyler', role: 'Listing Specialist', description: 'Product page optimization', skills: ['SEO', 'Copywriting', 'Photography'] },
      { name: 'River', role: 'Inventory Manager', description: 'Stock and fulfillment', skills: ['Inventory', 'Forecasting', 'Logistics'] },
      { name: 'Phoenix', role: 'Pricing Analyst', description: 'Competitive pricing', skills: ['Pricing', 'Analytics', 'Automation'] },
      { name: 'Remy', role: 'Customer Care', description: 'Buyer communications', skills: ['Communication', 'Resolution', 'Retention'] },
      { name: 'Kai', role: 'Marketing Specialist', description: 'Promotions and ads', skills: ['Ads', 'Email Marketing', 'Social'] }
    ],
    tags: ['E-commerce', 'Shopify', 'Marketplace']
  }
];

const categories = ['all', 'development', 'marketing', 'devops', 'sales', 'support', 'ecommerce'];

const categoryColors: Record<string, string> = {
  development: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  marketing: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  devops: 'bg-green-500/20 text-green-400 border-green-500/30',
  sales: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  support: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  ecommerce: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  useEffect(() => {
    setTemplates(mockTemplates);
  }, []);

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const openTemplateDetails = (template: Template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTemplate(null), 300);
  };

  const handleDeploy = () => {
    router.push('/dashboard/deploy');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
        >
          TEMPLATES
        </h1>
        <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Browse and deploy pre-built AI agent teams
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300
              ${selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                : 'bg-white/5 text-gray-400 hover:text-white border border-transparent hover:bg-white/10'
              }
            `}
            style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <div
            key={template.id}
            className="glass-card overflow-hidden group cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => openTemplateDetails(template)}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5">
              <div className="flex items-start justify-between mb-3">
                <h3
                  className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px' }}
                >
                  {template.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded border ${categoryColors[template.category] || 'bg-gray-500/20 text-gray-400'}`}
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {template.description}
              </p>
            </div>

            {/* Stats */}
            <div className="px-6 py-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="group/stat hover:bg-white/5 rounded-lg p-2 transition-colors">
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>AGENTS</div>
                  <div className="text-lg font-bold text-white group-hover/stat:text-cyan-400 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>{template.agentCount}</div>
                </div>
                <div className="group/stat hover:bg-white/5 rounded-lg p-2 transition-colors">
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>RATING</div>
                  <div className="text-lg font-bold text-yellow-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>★{template.rating}</div>
                </div>
                <div className="group/stat hover:bg-white/5 rounded-lg p-2 transition-colors">
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>SOLD</div>
                  <div className="text-lg font-bold text-white group-hover/stat:text-cyan-400 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>{template.purchases}</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="px-6 pb-2">
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs bg-white/5 text-gray-400 rounded"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <span
                  className="text-2xl font-bold text-purple-400"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  ${template.price}
                </span>
                <span className="text-sm text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>/month</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeploy();
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 font-medium text-sm transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] flex items-center gap-2"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Deploy
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Hover indicator */}
            <div className={`h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        ))}
      </div>

      {/* Template Detail Modal */}
      {isModalOpen && selectedTemplate && (
        <TemplateDetailModal
          template={selectedTemplate}
          onClose={closeModal}
          onDeploy={handleDeploy}
        />
      )}
    </div>
  );
}

interface TemplateDetailModalProps {
  template: Template;
  onClose: () => void;
  onDeploy: () => void;
}

function TemplateDetailModal({ template, onClose, onDeploy }: TemplateDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'features'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f] shadow-2xl animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <IconX className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-start justify-between pr-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '1px' }}
                >
                  {template.name}
                </h2>
                <span
                  className={`px-3 py-1 text-xs rounded border ${categoryColors[template.category] || 'bg-gray-500/20 text-gray-400'}`}
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {template.category.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {template.longDescription}
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm">
              <IconUsers className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {template.agentCount} Agents
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconStar className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {template.rating} Rating
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconShoppingCart className="w-4 h-4 text-green-400" />
              <span className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {template.purchases} Purchases
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconClock className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Deploys in {template.deploymentTime}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {[
            { id: 'overview', label: 'Overview', icon: IconZap },
            { id: 'agents', label: 'Agent Team', icon: IconUsers },
            { id: 'features', label: 'Features', icon: IconCheckCircle2 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Tags */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                  TAGS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-white/5 text-cyan-400 rounded-full border border-cyan-500/20"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features preview */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                  KEY FEATURES
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {template.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <IconCheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="glass-card p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                  <IconShield className="w-4 h-4" />
                  REQUIREMENTS
                </h4>
                <ul className="space-y-2">
                  {template.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="space-y-4">
              <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Your {template.name} includes {template.agentCount} specialized AI agents working together:
              </p>
              <div className="grid gap-4">
                {template.agents.map((agent, i) => (
                  <div key={i} className="glass-card p-4 rounded-lg hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/20">
                        <span className="text-cyan-400 font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                          {agent.name[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="text-white font-medium" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                            {agent.name}
                          </h5>
                          <span className="px-2 py-0.5 text-xs bg-cyan-500/10 text-cyan-400 rounded" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                            {agent.role}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                          {agent.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {agent.skills.map((skill, j) => (
                            <span
                              key={j}
                              className="px-2 py-0.5 text-xs bg-white/5 text-gray-400 rounded"
                              style={{ fontFamily: 'Rajdhani, sans-serif' }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                  ALL FEATURES
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {template.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 glass-card rounded-lg">
                      <div className="w-8 h-8 rounded bg-cyan-500/10 flex items-center justify-center">
                        <IconZap className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-4 rounded-lg border-l-4 border-l-purple-500">
                <h4 className="text-sm font-medium text-gray-500 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                  DEPLOYMENT INFO
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Setup Time:</span>
                    <span className="text-white ml-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{template.deploymentTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Team Size:</span>
                    <span className="text-white ml-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{template.agentCount} agents</span>
                  </div>
                  <div>
                    <span className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Updates:</span>
                    <span className="text-white ml-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Automatic</span>
                  </div>
                  <div>
                    <span className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Support:</span>
                    <span className="text-white ml-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>24/7 Priority</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex items-center justify-between bg-white/5">
          <div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-3xl font-bold text-purple-400"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                ${template.price}
              </span>
              <span className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>/month</span>
            </div>
            <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Cancel anytime. No setup fees.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all text-sm font-medium"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}
            >
              CLOSE
            </button>
            <button
              onClick={onDeploy}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all text-sm font-medium flex items-center gap-2"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}
            >
              <IconZap className="w-4 h-4" />
              DEPLOY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
