'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Deployment {
  id: string;
  name: string;
  status: 'running' | 'ready' | 'idle' | 'standby';
  agentCount: number;
  latency: string;
  monthlyCost: number;
}

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setDeployments([
      { id: '1', name: 'SaaS Startup Team', status: 'running', agentCount: 5, latency: '12ms', monthlyCost: 299 },
      { id: '2', name: 'DevOps Automation', status: 'running', agentCount: 8, latency: '8ms', monthlyCost: 399 },
      { id: '3', name: 'Marketing Hub', status: 'ready', agentCount: 4, latency: '15ms', monthlyCost: 199 },
      { id: '4', name: 'Analytics Engine', status: 'idle', agentCount: 12, latency: '--', monthlyCost: 499 },
    ]);
  }, []);

  const filteredDeployments = filter === 'all' 
    ? deployments 
    : deployments.filter(d => d.status === filter);

  const statusColors = {
    running: 'bg-green-500/10 text-green-400 border-green-500/30',
    ready: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    idle: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
    standby: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
          >
            DEPLOYMENTS
          </h1>
          <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Manage your AI teams and monitor their activity
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search deployments..."
            className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-2 pl-10 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          />
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {['all', 'running', 'ready', 'idle'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all ${
              filter === status 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                : 'bg-transparent text-gray-500 border border-outline-variant/30 hover:text-white'
            }`}
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            {status}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-gray-500 text-xs" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          {filteredDeployments.filter(d => d.status === 'running').length} active
        </div>
      </div>

      {/* Deployment Cards */}
      <div className="space-y-4">
        {filteredDeployments.map((deployment) => (
          <div 
            key={deployment.id} 
            className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-surface-container-low transition-all"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {deployment.name}
                </h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  <span>{deployment.agentCount} agents</span>
                  <span>{deployment.latency} latency</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className={`px-3 py-1 text-xs font-medium border ${statusColors[deployment.status]}`} style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {deployment.status.toUpperCase()}
              </span>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-outline-variant/30 text-xs font-medium hover:bg-white/10 transition-all" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  View Details
                </button>
                <button className="px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-medium hover:bg-purple-500/30 transition-all" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Configure
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Sidebar */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6">
          <div className="text-xs text-gray-500 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>TOTAL AGENTS</div>
          <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {deployments.reduce((sum, d) => sum + d.agentCount, 0)}
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="text-xs text-gray-500 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>MONTHLY COST</div>
          <div className="text-2xl font-bold text-purple-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            ${deployments.reduce((sum, d) => sum + d.monthlyCost, 0)}
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="text-xs text-gray-500 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>UPTIME</div>
          <div className="text-2xl font-bold text-green-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            99.9%
          </div>
        </div>
      </div>
    </div>
  );
}
