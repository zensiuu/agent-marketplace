'use client';

import { useEffect, useState } from 'react';

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
}

const categories = ['all', 'research', 'analytics', 'productivity', 'development', 'communication'];

const categoryColors: Record<string, string> = {
  research: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  analytics: 'bg-green-500/20 text-green-400 border-green-500/30',
  productivity: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  development: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  communication: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    try {
      const url = searchQuery 
        ? `/api/marketplace/skills?search=${encodeURIComponent(searchQuery)}`
        : '/api/marketplace/skills';
      const res = await fetch(url);
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

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
        >
          SKILLS
        </h1>
        <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Browse and purchase AI agent skills to enhance your team
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Search
          </button>
        </div>
      </form>

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300
              ${selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-white/5 text-gray-400 hover:text-white border border-transparent hover:bg-white/10'
              }
            `}
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="text-gray-400">Loading skills...</div>
      ) : filteredSkills.length === 0 ? (
        <div className="text-gray-400 text-center py-12">
          No skills found. Try a different search or category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-card p-6 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px' }}
                >
                  {skill.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded border ${categoryColors[skill.category] || 'bg-gray-500/20 text-gray-400'}`}
                >
                  {skill.category}
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {skill.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-center mb-4">
                <div>
                  <div className="text-xs text-gray-500">RATING</div>
                  <div className="text-lg font-bold text-yellow-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    ★{skill.rating?.toFixed(1) || 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">PURCHASES</div>
                  <div className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {skill.purchases?.toLocaleString() || 0}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {skill.tags?.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs bg-white/5 text-gray-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-purple-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {skill.price === 0 ? 'Free' : `$${skill.price}`}
                  </span>
                  {skill.githubUrl && (
                    <a
                      href={skill.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-white rounded border border-gray-600 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
                {skill.price > 0 && !skill.githubUrl && (
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 text-sm">
                    Purchase
                  </button>
                )}
                {skill.price === 0 && !skill.githubUrl && (
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:opacity-90 text-sm">
                    Install
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
