'use client';

import { useEffect, useState } from 'react';

interface Deployment {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'error';
  agentCount: number;
  monthlyCost: number;
  lastActivity: string;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'error';
  deploymentId: string;
  tasksCompleted: number;
  costToday: number;
}

export default function DashboardPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setDeployments([
      { id: '1', name: 'SaaS Startup', status: 'active', agentCount: 5, monthlyCost: 299, lastActivity: '2 min ago' },
      { id: '2', name: 'Content Agency', status: 'active', agentCount: 4, monthlyCost: 199, lastActivity: '5 min ago' },
    ]);
    setAgents([
      { id: '1', name: 'CEO', role: 'Chief Executive', status: 'active', deploymentId: '1', tasksCompleted: 12, costToday: 2.50 },
      { id: '2', name: 'CTO', role: 'Chief Technology', status: 'active', deploymentId: '1', tasksCompleted: 8, costToday: 1.80 },
      { id: '3', name: 'Frontend Dev', role: 'Engineer', status: 'idle', deploymentId: '1', tasksCompleted: 15, costToday: 0.50 },
    ]);
    setLoading(false);
  }, []);

  const totalCost = deployments.reduce((sum, d) => sum + d.monthlyCost, 0);
  const activeAgents = agents.filter(a => a.status === 'active').length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
        >
          DASHBOARD
        </h1>
        <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Monitor your deployed AI teams and agent activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="DEPLOYMENTS" value={deployments.length} suffix="active" />
        <StatCard label="TOTAL AGENTS" value={agents.length} suffix="running" />
        <StatCard label="ACTIVE NOW" value={activeAgents} suffix="active" />
        <StatCard label="MONTHLY COST" value={`$${totalCost}`} suffix="/month" />
      </div>

      {/* Deployments Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '1px' }}
          >
            DEPLOYMENTS
          </h2>
          <button className="btn-primary text-xs">
            Deploy New Team
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deployments.map((deployment) => (
            <div key={deployment.id} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px' }}
                >
                  {deployment.name}
                </h3>
                <StatusBadge status={deployment.status} />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>AGENTS</div>
                  <div className="text-xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>{deployment.agentCount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>COST</div>
                  <div className="text-xl font-bold text-purple-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>${deployment.monthlyCost}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>LAST ACT</div>
                  <div className="text-sm font-bold text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{deployment.lastActivity}</div>
                </div>
              </div>
              <button className="btn-secondary mt-4 w-full text-xs">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Agents Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '1px' }}
          >
            RECENT AGENT ACTIVITY
          </h2>
        </div>

        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-4 text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>AGENT</th>
                <th className="text-left px-6 py-4 text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>ROLE</th>
                <th className="text-left px-6 py-4 text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>STATUS</th>
                <th className="text-left px-6 py-4 text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>TASKS</th>
                <th className="text-left px-6 py-4 text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>COST TODAY</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <span className="text-cyan-400 text-sm">{agent.name[0]}</span>
                      </div>
                      <span className="text-white font-medium" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{agent.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{agent.role}</td>
                  <td className="px-6 py-4">
                    <AgentStatusBadge status={agent.status} />
                  </td>
                  <td className="px-6 py-4 text-white font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>{agent.tasksCompleted}</td>
                  <td className="px-6 py-4 text-purple-400 font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>${agent.costToday.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, suffix }: { label: string; value: string | number; suffix: string }) {
  return (
    <div className="glass-card p-6">
      <div 
        className="text-xs text-gray-500 mb-2"
        style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px' }}
      >
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span 
          className="text-3xl font-bold text-white"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          {value}
        </span>
        <span className="text-sm text-cyan-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          {suffix}
        </span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'active' | 'paused' | 'error' }) {
  const colors = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    paused: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span 
      className={`px-2 py-1 text-xs rounded border ${colors[status]}`}
      style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}
    >
      {status.toUpperCase()}
    </span>
  );
}

function AgentStatusBadge({ status }: { status: 'active' | 'idle' | 'error' }) {
  const config = {
    active: { color: 'text-green-400', label: '● ACTIVE' },
    idle: { color: 'text-yellow-400', label: '● IDLE' },
    error: { color: 'text-red-400', label: '● ERROR' },
  };
  const { color, label } = config[status];
  return (
    <span 
      className={`text-xs font-medium ${color}`}
      style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}
    >
      {label}
    </span>
  );
}
