'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#f7f8f8] mb-1" style={{ fontWeight: 510 }}>
          Overview
        </h1>
        <p className="text-sm text-[#8a8f98]">
          Monitor your deployed AI teams and agent activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-5">
          <div className="text-xs text-[#62666d] mb-2">Deployments</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>
              {deployments.length}
            </span>
            <span className="text-xs text-[#10b981]">active</span>
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-[#62666d] mb-2">Total Agents</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>
              {agents.length}
            </span>
            <span className="text-xs text-[#8a8f98]">running</span>
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-[#62666d] mb-2">Active Now</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>
              {activeAgents}
            </span>
            <span className="text-xs text-[#10b981]">active</span>
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-[#62666d] mb-2">Monthly Cost</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>
              ${totalCost}
            </span>
            <span className="text-xs text-[#62666d]">/mo</span>
          </div>
        </div>
      </div>

      {/* Deployments Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>
            Deployments
          </h2>
          <Link 
            href="/dashboard/deploy" 
            className="text-sm font-medium text-[#7170ff] hover:text-[#828fff] transition-colors"
          >
            Deploy New Team
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deployments.map((deployment) => (
            <div key={deployment.id} className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium text-[#f7f8f8]">
                  {deployment.name}
                </h3>
                <StatusBadge status={deployment.status} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-xs text-[#62666d] mb-1">Agents</div>
                    <div className="text-lg font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>{deployment.agentCount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#62666d] mb-1">Cost</div>
                    <div className="text-lg font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>${deployment.monthlyCost}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#62666d] mb-1">Last Activity</div>
                    <div className="text-sm text-[#8a8f98]">{deployment.lastActivity}</div>
                  </div>
                </div>
              </div>
              <button className="btn-ghost mt-4 w-full text-sm">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Agents Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>
            Recent Agent Activity
          </h2>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-[rgba(255,255,255,0.05)]">
              <tr>
                <th className="text-left px-5 py-3 text-xs text-[#62666d] font-medium">AGENT</th>
                <th className="text-left px-5 py-3 text-xs text-[#62666d] font-medium">ROLE</th>
                <th className="text-left px-5 py-3 text-xs text-[#62666d] font-medium">STATUS</th>
                <th className="text-left px-5 py-3 text-xs text-[#62666d] font-medium">TASKS</th>
                <th className="text-left px-5 py-3 text-xs text-[#62666d] font-medium">COST TODAY</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[rgba(94,106,210,0.15)] flex items-center justify-center">
                        <span className="text-sm font-medium text-[#7170ff]" style={{ fontWeight: 510 }}>
                          {agent.name[0]}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[#f7f8f8]">{agent.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#8a8f98]">{agent.role}</td>
                  <td className="px-5 py-4">
                    <AgentStatusBadge status={agent.status} />
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>{agent.tasksCompleted}</td>
                  <td className="px-5 py-4 text-sm font-medium text-[#f7f8f8]" style={{ fontWeight: 510 }}>${agent.costToday.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: 'active' | 'paused' | 'error' }) {
  const config = {
    active: { bg: 'bg-[rgba(16,185,129,0.15)]', text: 'text-[#10b981]', border: 'border-[rgba(16,185,129,0.2)]', label: 'Active' },
    paused: { bg: 'bg-[rgba(234,179,8,0.15)]', text: 'text-yellow-500', border: 'border-yellow-500/20', label: 'Paused' },
    error: { bg: 'bg-[rgba(239,68,68,0.15)]', text: 'text-red-500', border: 'border-red-500/20', label: 'Error' },
  };
  const { bg, text, border, label } = config[status];
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded ${bg} ${text} ${border}`}>
      {label}
    </span>
  );
}

function AgentStatusBadge({ status }: { status: 'active' | 'idle' | 'error' }) {
  const config = {
    active: { color: 'text-[#10b981]', label: '● Active' },
    idle: { color: 'text-yellow-500', label: '● Idle' },
    error: { color: 'text-red-500', label: '● Error' },
  };
  const { color, label } = config[status];
  return (
    <span className={`text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}