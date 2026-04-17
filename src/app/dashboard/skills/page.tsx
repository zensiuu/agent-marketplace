'use client';

import { useEffect, useState, useMemo } from 'react';

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  version?: string;
  tags?: string[];
  capabilities?: Record<string, boolean>;
  sellerName?: string;
  rating?: number;
  purchases?: number;
  githubUrl?: string | null;
  downloads?: number;
  lastUpdated?: string;
  compatibility?: string[];
  performance?: {
    speed: number;
    accuracy: number;
    efficiency: number;
  };
  features?: string[];
  documentation?: string;
  examples?: number;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  count: number;
}

const categories: SkillCategory[] = [
  { id: 'all', name: 'All Skills', icon: 'grid', description: 'Browse all available skills', color: '#7170ff', count: 0 },
  { id: 'research', name: 'Research', icon: 'search', description: 'Data analysis and research skills', color: '#10b981', count: 0 },
  { id: 'analytics', name: 'Analytics', icon: 'chart', description: 'Business intelligence and analytics', color: '#eab308', count: 0 },
  { id: 'productivity', name: 'Productivity', icon: 'zap', description: 'Automation and efficiency tools', color: '#8b5cf6', count: 0 },
  { id: 'development', name: 'Development', icon: 'code', description: 'Software development tools', color: '#f97316', count: 0 },
  { id: 'communication', name: 'Communication', icon: 'message', description: 'Communication and collaboration', color: '#ec4899', count: 0 },
  { id: 'ai-ml', name: 'AI/ML', icon: 'brain', description: 'Machine learning and AI skills', color: '#06b6d4', count: 0 },
];

const sortOptions = [
  { id: 'popular', name: 'Most Popular', icon: 'trending' },
  { id: 'rating', name: 'Highest Rated', icon: 'star' },
  { id: 'newest', name: 'Recently Updated', icon: 'clock' },
  { id: 'price-low', name: 'Price: Low to High', icon: 'arrow-up' },
  { id: 'price-high', name: 'Price: High to Low', icon: 'arrow-down' },
];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    try {
      const url = searchQuery 
        ? `/api/marketplace/skills?search=${encodeURIComponent(searchQuery)}`
        : '/api/marketplace/skills';
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setSkills(data.skills || []);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchSkills();
  };

  const filteredAndSortedSkills = useMemo(() => {
    let filtered = skills.filter(skill => {
      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPrice = skill.price >= priceRange[0] && skill.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    });

    // Sort skills
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.purchases || 0) - (a.purchases || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.lastUpdated || '').getTime() - new Date(a.lastUpdated || '').getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [skills, selectedCategory, searchQuery, sortBy, priceRange]);

  const getCategoryStats = () => {
    const stats = new Map();
    skills.forEach(skill => {
      stats.set(skill.category, (stats.get(skill.category) || 0) + 1);
    });
    return categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? skills.length : stats.get(cat.id) || 0
    }));
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#f7f8f8] mb-2 inter-display">
          Skills Marketplace
        </h1>
        <p className="text-sm text-[#8a8f98] inter-body">
          Discover and install powerful AI skills to enhance your agent capabilities
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills, tags, or capabilities..."
                className="input w-full pl-10 bg-[#191a1b] border-[#23252a] text-[#f7f8f8] placeholder-[#62666d]"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#62666d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button type="submit" className="btn-primary">
              Search
            </button>
            <button 
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="btn-ghost"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Filters Panel */}
        {showFilters && (
          <div className="card p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block inter-caption text-[#62666d] mb-2">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="input w-20"
                    placeholder="0"
                  />
                  <span className="text-[#8a8f98]">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="input w-20"
                    placeholder="100"
                  />
                </div>
              </div>
              <div>
                <label className="block inter-caption text-[#62666d] mb-2">Sort By</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input w-full"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block inter-caption text-[#62666d] mb-2">View Mode</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`btn-ghost ${viewMode === 'grid' ? 'bg-[rgba(94,106,210,0.15)] text-[#7170ff]' : ''}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`btn-ghost ${viewMode === 'list' ? 'bg-[rgba(94,106,210,0.15)] text-[#7170ff]' : ''}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {getCategoryStats().map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-[rgba(94,106,210,0.15)] text-[#7170ff] border border-[rgba(94,106,210,0.3)]'
                : 'bg-[rgba(255,255,255,0.02)] text-[#8a8f98] border border-[rgba(255,255,255,0.05)] hover:text-[#f7f8f8] hover:bg-[rgba(255,255,255,0.04)]'
            }`}
            style={{ borderColor: selectedCategory === category.id ? category.color : undefined }}
          >
            <span className="inter-display">{category.name}</span>
            <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-[rgba(255,255,255,0.1)]">
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Skills Display */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="card p-6">
              <div className="skeleton h-4 w-3/4 mb-3 rounded"></div>
              <div className="skeleton h-3 w-full mb-2 rounded"></div>
              <div className="skeleton h-3 w-5/6 mb-4 rounded"></div>
              <div className="flex gap-2 mb-4">
                <div className="skeleton h-6 w-16 rounded-full"></div>
                <div className="skeleton h-6 w-20 rounded-full"></div>
              </div>
              <div className="skeleton h-8 w-full rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredAndSortedSkills.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[rgba(94,106,210,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#7170ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-[#f7f8f8] mb-2 inter-display">No skills found</h3>
          <p className="text-sm text-[#8a8f98] inter-body">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
          {filteredAndSortedSkills.map((skill) => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              viewMode={viewMode}
              onSelect={() => setSelectedSkill(skill)}
            />
          ))}
        </div>
      )}

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <SkillDetailModal 
          skill={selectedSkill} 
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
}

// Skill Card Component
function SkillCard({ skill, viewMode, onSelect }: { 
  skill: Skill; 
  viewMode: 'grid' | 'list'; 
  onSelect: () => void;
}) {
  const performanceScore = skill.performance 
    ? Math.round((skill.performance.speed + skill.performance.accuracy + skill.performance.efficiency) / 3)
    : 0;

  if (viewMode === 'list') {
    return (
      <div className="card p-6 hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer" onClick={onSelect}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-medium text-[#f7f8f8] inter-display">{skill.name}</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-[rgba(94,106,210,0.15)] text-[#7170ff] inter-caption">
                {skill.category}
              </span>
              {skill.version && (
                <span className="px-2 py-1 text-xs rounded-full bg-[rgba(16,185,129,0.1)] text-[#10b981] inter-caption">
                  v{skill.version}
                </span>
              )}
            </div>
            <p className="text-sm text-[#8a8f98] mb-3 inter-body">{skill.description}</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#eab308]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-[#f7f8f8] inter-body-medium">{skill.rating || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#8a8f98]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span className="text-[#f7f8f8] inter-body-medium">{skill.purchases?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#8a8f98]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <span className="text-[#f7f8f8] inter-body-medium">{skill.downloads?.toLocaleString() || 0}</span>
              </div>
              {performanceScore > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <span className="text-[#f7f8f8] inter-body-medium">{performanceScore}%</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {skill.tags?.slice(0, 3).map((tag, i) => (
                <span key={i} className="px-2 py-1 text-xs rounded-full bg-[rgba(255,255,255,0.05)] text-[#8a8f98] inter-caption">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-[#7170ff] inter-display">
                {skill.price === 0 ? 'Free' : `$${skill.price}`}
              </div>
              <div className="text-xs text-[#62666d] inter-caption">
                {skill.price > 0 ? 'one-time' : 'open source'}
              </div>
            </div>
            <a 
              href={skill.githubUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary inline-block text-center hover:bg-[rgba(113,112,255,0.15)] transition-colors"
            >
              Use Skill
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200 cursor-pointer group" onClick={onSelect}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-medium text-[#f7f8f8] inter-display">{skill.name}</h3>
        <div className="flex items-center gap-2">
          {skill.version && (
            <span className="px-2 py-1 text-xs rounded-full bg-[rgba(16,185,129,0.1)] text-[#10b981] inter-caption">
              v{skill.version}
            </span>
          )}
          <span className="px-2 py-1 text-xs rounded-full bg-[rgba(94,106,210,0.15)] text-[#7170ff] inter-caption">
            {skill.category}
          </span>
        </div>
      </div>

      <p className="text-sm text-[#8a8f98] mb-4 inter-body line-clamp-2">{skill.description}</p>

      {/* Performance Metrics */}
      {skill.performance && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#62666d] inter-caption">Performance</span>
            <span className="text-xs text-[#10b981] inter-body-medium">{performanceScore}%</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-xs text-[#62666d] inter-caption">Speed</div>
              <div className="text-sm font-medium text-[#f7f8f8] inter-body-medium">{skill.performance.speed}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-[#62666d] inter-caption">Accuracy</div>
              <div className="text-sm font-medium text-[#f7f8f8] inter-body-medium">{skill.performance.accuracy}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-[#62666d] inter-caption">Efficiency</div>
              <div className="text-sm font-medium text-[#f7f8f8] inter-body-medium">{skill.performance.efficiency}%</div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#eab308]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-[#f7f8f8] inter-body-medium">{skill.rating || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#8a8f98]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span className="text-[#f7f8f8] inter-body-medium">{skill.purchases?.toLocaleString() || 0}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {skill.tags?.slice(0, 3).map((tag, i) => (
          <span key={i} className="px-2 py-1 text-xs rounded-full bg-[rgba(255,255,255,0.05)] text-[#8a8f98] inter-caption">
            {tag}
          </span>
        ))}
        {(skill.tags?.length || 0) > 3 && (
          <span className="px-2 py-1 text-xs rounded-full bg-[rgba(255,255,255,0.05)] text-[#62666d] inter-caption">
            +{(skill.tags?.length || 0) - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.05)]">
        <div>
          <div className="text-xl font-bold text-[#7170ff] inter-display">
            {skill.price === 0 ? 'Free' : `$${skill.price}`}
          </div>
          <div className="text-xs text-[#62666d] inter-caption">
            {skill.price > 0 ? 'one-time payment' : 'open source'}
          </div>
        </div>
        <a 
          href={skill.githubUrl || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary inline-block text-center group-hover:bg-[rgba(113,112,255,0.15)] transition-colors"
        >
          Use Skill
        </a>
      </div>
    </div>
  );
}

// Skill Detail Modal Component
function SkillDetailModal({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.85)] flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="card-elevated p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4 modal-content">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-medium text-[#f7f8f8] mb-2 inter-display">{skill.name}</h2>
            <p className="text-[#8a8f98] inter-body">{skill.description}</p>
          </div>
          <button onClick={onClose} className="btn-ghost">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Features */}
            {skill.features && skill.features.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-[#f7f8f8] mb-3 inter-display">Features</h3>
                <ul className="space-y-2">
                  {skill.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#8a8f98] inter-body">
                      <svg className="w-4 h-4 text-[#10b981] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Performance Details */}
            {skill.performance && (
              <div>
                <h3 className="text-lg font-medium text-[#f7f8f8] mb-3 inter-display">Performance Metrics</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[#8a8f98] inter-body">Speed</span>
                      <span className="text-sm font-medium text-[#f7f8f8] inter-body-medium">{skill.performance.speed}%</span>
                    </div>
                    <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-2">
                      <div className="bg-[#10b981] h-2 rounded-full" style={{ width: `${skill.performance.speed}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[#8a8f98] inter-body">Accuracy</span>
                      <span className="text-sm font-medium text-[#f7f8f8] inter-body-medium">{skill.performance.accuracy}%</span>
                    </div>
                    <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-2">
                      <div className="bg-[#10b981] h-2 rounded-full" style={{ width: `${skill.performance.accuracy}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[#8a8f98] inter-body">Efficiency</span>
                      <span className="text-sm font-medium text-[#f7f8f8] inter-body-medium">{skill.performance.efficiency}%</span>
                    </div>
                    <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-2">
                      <div className="bg-[#10b981] h-2 rounded-full" style={{ width: `${skill.performance.efficiency}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Compatibility */}
            {skill.compatibility && skill.compatibility.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-[#f7f8f8] mb-3 inter-display">Compatibility</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.compatibility.map((comp, i) => (
                    <span key={i} className="px-3 py-1 text-sm rounded-full bg-[rgba(94,106,210,0.15)] text-[#7170ff] inter-body">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Pricing */}
            <div className="card p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#7170ff] mb-2 inter-display">
                  {skill.price === 0 ? 'Free' : `$${skill.price}`}
                </div>
                <div className="text-sm text-[#62666d] inter-caption mb-4">
                  {skill.price > 0 ? 'one-time payment' : 'open source'}
                </div>
                <a 
                  href={skill.githubUrl || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary w-full inline-block text-center hover:bg-[rgba(113,112,255,0.15)] transition-colors"
                >
                  Use Skill
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="card p-4">
              <h3 className="text-sm font-medium text-[#f7f8f8] mb-3 inter-display">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#8a8f98] inter-body">Rating</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-[#eab308]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="text-sm font-medium text-[#f7f8f8] inter-body-medium">{skill.rating || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#8a8f98] inter-body">Purchases</span>
                  <span className="text-sm font-medium text-[#f7f8f8] inter-body-medium">{skill.purchases?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#8a8f98] inter-body">Downloads</span>
                  <span className="text-sm font-medium text-[#f7f8f8] inter-body-medium">{skill.downloads?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#8a8f98] inter-body">Version</span>
                  <span className="text-sm font-medium text-[#f7f8f8] inter-body-medium">{skill.version || 'N/A'}</span>
                </div>
                {skill.lastUpdated && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8a8f98] inter-body">Last Updated</span>
                    <span className="text-sm font-medium text-[#f7f8f8] inter-body-medium">
                      {new Date(skill.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {skill.tags && skill.tags.length > 0 && (
              <div className="card p-4">
                <h3 className="text-sm font-medium text-[#f7f8f8] mb-3 inter-display">Tags</h3>
                <div className="flex flex-wrap gap-1">
                  {skill.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-full bg-[rgba(255,255,255,0.05)] text-[#8a8f98] inter-caption">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="space-y-2">
              {skill.documentation && (
                <button className="btn-ghost w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Documentation
                </button>
              )}
              {skill.githubUrl && (
                <button className="btn-ghost w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Source
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
