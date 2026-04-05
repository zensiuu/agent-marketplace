'use client';

import { useState } from 'react';
import HealthStatus from './components/HealthStatus';
import StatsOverview from './components/StatsOverview';
import CompanyList from './components/CompanyList';
import AgentTable from './components/AgentTable';
import IssueList from './components/IssueList';
import DeployTemplate from './components/DeployTemplate';
import type { Company } from '@/types/paperclip';

type Tab = 'overview' | 'companies' | 'agents' | 'issues' | 'deploy';

export default function PaperclipDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'companies', label: 'Companies' },
    { id: 'agents', label: 'Agents' },
    { id: 'issues', label: 'Issues' },
    { id: 'deploy', label: 'Deploy Template' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Paperclip Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your AI agent companies</p>
          </div>
          <HealthStatus />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <StatsOverview />
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Quick Start</h3>
                  <p className="text-sm text-blue-700 mb-4">
                    Get started by creating a company and hiring your first AI agent, or deploy a pre-built template.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveTab('companies')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                    >
                      Create Company
                    </button>
                    <button
                      onClick={() => setActiveTab('deploy')}
                      className="px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 text-sm font-medium"
                    >
                      Browse Templates
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'companies' && (
              <CompanyList
                onSelectCompany={(company) => {
                  setSelectedCompany(company);
                  setActiveTab('agents');
                }}
              />
            )}

            {activeTab === 'agents' && (
              <div>
                {selectedCompany ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => setSelectedCompany(null)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        ← Back to companies
                      </button>
                      <span className="text-gray-300">|</span>
                      <h3 className="font-medium text-gray-900">{selectedCompany.name}</h3>
                    </div>
                    <AgentTable companyId={selectedCompany.id} />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Select a company to manage agents</p>
                    <button
                      onClick={() => setActiveTab('companies')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Go to Companies
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'issues' && (
              <div>
                {selectedCompany ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => setSelectedCompany(null)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        ← Back to companies
                      </button>
                      <span className="text-gray-300">|</span>
                      <h3 className="font-medium text-gray-900">{selectedCompany.name}</h3>
                    </div>
                    <IssueList companyId={selectedCompany.id} />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Select a company to manage issues</p>
                    <button
                      onClick={() => setActiveTab('companies')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Go to Companies
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'deploy' && <DeployTemplate />}
          </div>
        </div>
      </div>
    </div>
  );
}
