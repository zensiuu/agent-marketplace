'use client';

import { useEffect, useState } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
  price: number;
  agentCount: number;
  category: string;
  rating: number;
  purchases: number;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Mock data - replace with actual API call to /api/marketplace/templates
    setTemplates([
      { id: '1', name: 'SaaS Development Team', description: 'Full-stack development team with CEO, CTO, and engineers', price: 299, agentCount: 5, category: 'development', rating: 4.8, purchases: 1247 },
      { id: '2', name: 'Content Agency', description: 'Marketing and content creation team for brand operations', price: 199, agentCount: 4, category: 'marketing', rating: 4.6, purchases: 892 },
      { id: '3', name: 'DevOps Squad', description: 'Infrastructure and CI/CD automation specialists', price: 249, agentCount: 3, category: 'devops', rating: 4.9, purchases: 654 },
      { id: '4', name: 'Sales Team', description: 'Lead generation and sales automation', price: 179, agentCount: 4, category: 'sales', rating: 4.5, purchases: 432 },
      { id: '5', name: 'Support Team', description: 'Customer support and helpdesk automation', price: 149, agentCount: 3, category: 'support', rating: 4.7, purchases: 789 },
      { id: '6', name: 'E-commerce Operator', description: 'Product listings, inventory, and order management', price: 299, agentCount: 6, category: 'ecommerce', rating: 4.4, purchases: 567 },
    ]);
  }, []);

  const categories = ['all', 'development', 'marketing', 'devops', 'sales', 'support', 'ecommerce'];
  
  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

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
              px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all
              ${selectedCategory === cat 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
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
        {filteredTemplates.map((template) => (
          <div key={template.id} className="glass-card overflow-hidden group">
            {/* Header */}
            <div className="p-6 border-b border-white/5">
              <div className="flex items-start justify-between mb-3">
                <h3 
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px' }}
                >
                  {template.name}
                </h3>
                <span 
                  className="px-2 py-1 text-xs rounded bg-cyan-500/20 text-cyan-400"
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
                <div>
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>AGENTS</div>
                  <div className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>{template.agentCount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>RATING</div>
                  <div className="text-lg font-bold text-yellow-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>★{template.rating}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>SOLD</div>
                  <div className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>{template.purchases}</div>
                </div>
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
                onClick={() => window.location.href = '/dashboard/deploy'}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 font-medium text-sm"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Deploy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
