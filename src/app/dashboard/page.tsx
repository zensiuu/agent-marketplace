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
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#f7f8f8] mb-2 inter-display">
          Overview
        </h1>
        <p className="text-sm text-[#8a8f98] inter-body">
          Monitor your deployed AI teams and agent activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mobile-stack">
        <div className="card p-6">
          <div className="text-xs text-[#62666d] mb-2 inter-caption">Deployments</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-medium text-[#f7f8f8] inter-display">
              {deployments.length}
            </span>
            <span className="text-xs text-[#10b981] inter-caption">active</span>
          </div>
        </div>
        <div className="card p-6">
          <div className="text-xs text-[#62666d] mb-2 inter-caption">Total Agents</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-medium text-[#f7f8f8] inter-display">
              {agents.length}
            </span>
            <span className="text-xs text-[#8a8f98] inter-caption">running</span>
          </div>
        </div>
        <div className="card p-6">
          <div className="text-xs text-[#62666d] mb-2 inter-caption">Active Now</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-medium text-[#f7f8f8] inter-display">
              {activeAgents}
            </span>
            <span className="text-xs text-[#10b981] inter-caption">active</span>
          </div>
        </div>
        <div className="card p-6">
          <div className="text-xs text-[#62666d] mb-2 inter-caption">Monthly Cost</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-medium text-[#f7f8f8] inter-display">
              ${totalCost}
            </span>
            <span className="text-xs text-[#62666d] inter-caption">/mo</span>
          </div>
        </div>
      </div>

      {/* Deployments Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">
            Deployments
          </h2>
          <Link 
            href="/dashboard/deploy" 
            className="btn-ghost text-sm"
          >
            Deploy New Team
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deployments.map((deployment) => (
            <div key={deployment.id} className="card p-6 hover:bg-[rgba(255,255,255,0.04)] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="card-title">
                  {deployment.name}
                </h3>
                <StatusBadge status={deployment.status} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="stat-label mb-1">Agents</div>
                    <div className="stat-value text-lg">{deployment.agentCount}</div>
                  </div>
                  <div>
                    <div className="stat-label mb-1">Cost</div>
                    <div className="stat-value text-lg">${deployment.monthlyCost}</div>
                  </div>
                  <div>
                    <div className="stat-label mb-1">Last Activity</div>
                    <div className="inter-body text-sm">{deployment.lastActivity}</div>
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
          <h2 className="section-title">
            Recent Agent Activity
          </h2>
        </div>

        <div className="card overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>AGENT</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>TASKS</th>
                <th>COST TODAY</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <span className="avatar-text">
                          {agent.name[0]}
                        </span>
                      </div>
                      <span className="inter-body-medium text-sm">{agent.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 inter-body text-sm">{agent.role}</td>
                  <td className="px-5 py-4">
                    <AgentStatusBadge status={agent.status} />
                  </td>
                  <td className="px-5 py-4 inter-body-medium text-sm">{agent.tasksCompleted}</td>
                  <td className="px-5 py-4 inter-body-medium text-sm">${agent.costToday.toFixed(2)}</td>
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
    active: { 
      className: 'status-badge-active',
      label: 'Active'
    },
    paused: { 
      className: 'status-badge-paused',
      label: 'Paused'
    },
    error: { 
      className: 'status-badge-error',
      label: 'Error'
    },
  };
  const { className, label } = config[status];
  return (
    <span className={`status-badge ${className}`}>
      <span className="status-dot"></span>
      {label}
    </span>
  );
}

function AgentStatusBadge({ status }: { status: 'active' | 'idle' | 'error' }) {
  const config = {
    active: { 
      className: 'agent-status-active',
      label: 'Active'
    },
    idle: { 
      className: 'agent-status-idle',
      label: 'Idle'
    },
    error: { 
      className: 'agent-status-error',
      label: 'Error'
    },
  };
  const { className, label } = config[status];
  return (
    <span className={`agent-status ${className}`}>
      <span className="status-dot"></span>
      {label}
    </span>
  );
}