'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const IconX = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconUsers = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconStar = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
  </svg>
);

const IconShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconClock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconZap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconShield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconCheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  development: { bg: 'bg-[rgba(59,130,246,0.15)]', text: 'text-blue-400', border: 'border-blue-500/30' },
  marketing: { bg: 'bg-[rgba(236,72,153,0.15)]', text: 'text-pink-400', border: 'border-pink-500/30' },
  devops: { bg: 'bg-[rgba(16,185,129,0.15)]', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  sales: { bg: 'bg-[rgba(249,115,22,0.15)]', text: 'text-orange-400', border: 'border-orange-500/30' },
  support: { bg: 'bg-[rgba(6,182,212,0.15)]', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  ecommerce: { bg: 'bg-[rgba(139,92,246,0.15)]', text: 'text-purple-400', border: 'border-purple-500/30' }
};

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#f7f8f8] mb-1" style={{ fontWeight: 510 }}>
          Templates
        </h1>
        <p className="text-sm text-[#8a8f98]">
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
              px-3.5 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors
              ${selectedCategory === cat
                ? 'bg-[rgba(94,106,210,0.15)] text-[#7170ff] border border-[rgba(113,112,255,0.3)]'
                : 'text-[#8a8f98] hover:text-[#d0d6e0] border border-transparent hover:bg-[rgba(255,255,255,0.04)]'
              }
            `}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template, index) => {
          const colors = categoryColors[template.category] || categoryColors.development;
          return (
            <div
              key={template.id}
              className="card overflow-hidden cursor-pointer group"
              onClick={() => openTemplateDetails(template)}
            >
              {/* Header */}
              <div className="p-5 border-b border-[rgba(255,255,255,0.05)]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-medium text-[#f7f8f8] group-hover:text-[#7170ff] transition-colors">
                    {template.name}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded border ${colors.bg} ${colors.text} ${colors.border}`}>
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-[#8a8f98] line-clamp-2">
                  {template.description}
                </p>
              </div>

              {/* Stats */}
              <div className="px-5 py-4">
                <div className="flex items-center justify-between text-center">
                  <div className="flex-1">
                    <div className="text-xs text-[#62666d] mb-1">Agents</div>
                    <div className="text-lg font-medium text-[#f7f8f8] group-hover:text-[#7170ff] transition-colors" style={{ fontWeight: 510 }}>
                      {template.agentCount}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-[rgba(255,255,255,0.05)]"></div>
                  <div className="flex-1">
                    <div className="text-xs text-[#62666d] mb-1">Rating</div>
                    <div className="text-lg font-medium text-yellow-500" style={{ fontWeight: 510 }}>
                      ★{template.rating}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-[rgba(255,255,255,0.05)]"></div>
                  <div className="flex-1">
                    <div className="text-xs text-[#62666d] mb-1">Sold</div>
                    <div className="text-lg font-medium text-[#f7f8f8] group-hover:text-[#7170ff] transition-colors" style={{ fontWeight: 510 }}>
                      {template.purchases}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="px-5 pb-3">
                <div className="flex flex-wrap gap-1.5">
                  {template.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs bg-[rgba(255,255,255,0.03)] text-[#8a8f98] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between">
                <div>
                  <span className="text-xl font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>
                    ${template.price}
                  </span>
                  <span className="text-xs text-[#62666d]">/month</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeploy();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium rounded-md transition-colors"
                >
                  Deploy
                  <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Hover indicator */}
              <div className={`h-0.5 bg-[#5e6ad2] transition-all duration-200 ${index === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            </div>
          );
        })}
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
  const colors = categoryColors[template.category] || categoryColors.development;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0f1011] shadow-2xl animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-md bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors"
        >
          <IconX className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.05)]">
          <div className="flex items-start justify-between pr-12 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>
                  {template.name}
                </h2>
                <span className={`text-xs px-2.5 py-1 rounded border ${colors.bg} ${colors.text} ${colors.border}`}>
                  {template.category.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-[#8a8f98]">
                {template.longDescription}
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm">
              <IconUsers className="w-4 h-4 text-[#7170ff]" />
              <span className="text-[#8a8f98]">{template.agentCount} Agents</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconStar className="w-4 h-4 text-yellow-500" />
              <span className="text-[#8a8f98]">{template.rating} Rating</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconShoppingCart className="w-4 h-4 text-[#10b981]" />
              <span className="text-[#8a8f98]">{template.purchases} Purchases</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconClock className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-[#8a8f98]">Deploys in {template.deploymentTime}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[rgba(255,255,255,0.05)]">
          {[
            { id: 'overview', label: 'Overview', icon: IconZap },
            { id: 'agents', label: 'Agent Team', icon: IconUsers },
            { id: 'features', label: 'Features', icon: IconCheckCircle2 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-[#7170ff] border-b-2 border-[#7170ff] bg-[rgba(113,112,255,0.05)]'
                  : 'text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[rgba(255,255,255,0.02)]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[45vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Tags */}
              <div>
                <h4 className="text-xs font-medium text-[#62666d] mb-3 uppercase tracking-wide">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm bg-[rgba(255,255,255,0.03)] text-[#d0d6e0] rounded-md border border-[rgba(255,255,255,0.05)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features preview */}
              <div>
                <h4 className="text-xs font-medium text-[#62666d] mb-3 uppercase tracking-wide">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {template.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#d0d6e0]">
                      <IconCheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="card p-4 rounded-lg">
                <h4 className="text-xs font-medium text-[#62666d] mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <IconShield className="w-4 h-4" />
                  Requirements
                </h4>
                <ul className="space-y-2">
                  {template.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#8a8f98]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2] flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="space-y-3">
              <p className="text-sm text-[#8a8f98] mb-4">
                Your {template.name} includes {template.agentCount} specialized AI agents working together:
              </p>
              <div className="space-y-3">
                {template.agents.map((agent, i) => (
                  <div key={i} className="card p-4 rounded-lg hover:border-[rgba(113,112,255,0.2)] transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[rgba(94,106,210,0.15)] flex items-center justify-center border border-[rgba(113,112,255,0.2)] flex-shrink-0">
                        <span className="text-sm font-medium text-[#7170ff]" style={{ fontWeight: 510 }}>
                          {agent.name[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="text-sm font-medium text-[#f7f8f8]">{agent.name}</h5>
                          <span className="text-xs px-2 py-0.5 bg-[rgba(113,112,255,0.1)] text-[#7170ff] rounded">
                            {agent.role}
                          </span>
                        </div>
                        <p className="text-sm text-[#8a8f98] mb-2">{agent.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {agent.skills.map((skill, j) => (
                            <span key={j} className="px-2 py-0.5 text-xs bg-[rgba(255,255,255,0.03)] text-[#62666d] rounded">
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
                <h4 className="text-xs font-medium text-[#62666d] mb-4 uppercase tracking-wide">All Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {template.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 card rounded-lg">
                      <div className="w-7 h-7 rounded bg-[rgba(113,112,255,0.1)] flex items-center justify-center">
                        <IconZap className="w-3.5 h-3.5 text-[#7170ff]" />
                      </div>
                      <span className="text-sm text-[#d0d6e0]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-4 rounded-lg border-l-2 border-l-[#8b5cf6]">
                <h4 className="text-xs font-medium text-[#62666d] mb-3 uppercase tracking-wide">Deployment Info</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#8a8f98]">Setup Time:</span>
                    <span className="text-[#f7f8f8] ml-2">{template.deploymentTime}</span>
                  </div>
                  <div>
                    <span className="text-[#8a8f98]">Team Size:</span>
                    <span className="text-[#f7f8f8] ml-2">{template.agentCount} agents</span>
                  </div>
                  <div>
                    <span className="text-[#8a8f98]">Updates:</span>
                    <span className="text-[#f7f8f8] ml-2">Automatic</span>
                  </div>
                  <div>
                    <span className="text-[#8a8f98]">Support:</span>
                    <span className="text-[#f7f8f8] ml-2">24/7 Priority</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between bg-[rgba(255,255,255,0.02)]">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>
                ${template.price}
              </span>
              <span className="text-sm text-[#62666d]">/month</span>
            </div>
            <p className="text-xs text-[#62666d] mt-1">Cancel anytime. No setup fees.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-[rgba(255,255,255,0.1)] text-[#d0d6e0] rounded-md hover:bg-[rgba(255,255,255,0.04)] transition-colors text-sm font-medium"
            >
              Close
            </button>
            <button
              onClick={onDeploy}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5e6ad2] hover:bg-[#828fff] text-white rounded-md transition-colors text-sm font-medium"
            >
              <IconZap className="w-3.5 h-3.5" />
              Deploy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}