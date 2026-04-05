'use client';

import { useEffect, useState } from 'react';
import { paperclipApi } from '@/lib/paperclip-client';
import type { Company, Agent, Issue } from '@/types/paperclip';

interface StatsOverviewProps {
  companyId?: string;
}

export default function StatsOverview({ companyId }: StatsOverviewProps) {
  const [stats, setStats] = useState({ companies: 0, agents: 0, issues: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const companies = await paperclipApi.listCompanies();
        let agents = 0;
        let issues = 0;

        for (const company of companies.slice(0, 5)) {
          try {
            const [companyAgents, companyIssues] = await Promise.all([
              paperclipApi.listAgents(company.id),
              paperclipApi.listIssues(company.id),
            ]);
            agents += companyAgents.length;
            issues += companyIssues.length;
          } catch {
            // Skip companies we can't access
          }
        }

        setStats({
          companies: companies.length,
          agents,
          issues,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [companyId]);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-lg p-4 h-24"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Companies" value={stats.companies} icon="🏢" />
      <StatCard label="Active Agents" value={stats.agents} icon="🤖" />
      <StatCard label="Open Issues" value={stats.issues} icon="📋" />
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
