'use client';

import { useState, useEffect } from 'react';
import { paperclipApi, templateApi, deploymentApi } from '@/lib/paperclip-client';
import type { Template } from '@/types/paperclip';

export default function DeployPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<{ isConnected: boolean } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Load templates
        const templateData = await templateApi.list();
        setTemplates(templateData);

        // Check connection status
        const res = await fetch('/api/deploy');
        const connectionData = await res.json();
        setConnectionStatus(connectionData);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleDeploy(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedTemplate || !companyName.trim()) return;

    setDeploying(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await paperclipApi.deployTemplate({
        companyName: companyName.trim(),
        templateId: selectedTemplate.id,
        templateData: {
          agents: selectedTemplate.agents,
          defaultGoals: [`Run ${selectedTemplate.name} operations`],
        },
      });

      await deploymentApi.create({
        templateId: selectedTemplate.id,
        name: companyName.trim(),
        paperclipCompanyId: result.company.id,
      });

      setSuccess(`Successfully deployed ${selectedTemplate.name}! Company: ${result.company.name}`);
      setCompanyName('');
      setSelectedTemplate(null);
    } catch (err: any) {
      if (err.message?.includes('PAPERCLIP_NOT_CONNECTED')) {
        setError('Please connect your Paperclip account first in Connections.');
      } else {
        setError(err instanceof Error ? err.message : 'Deployment failed');
      }
    } finally {
      setDeploying(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
        >
          DEPLOY TEMPLATES
        </h1>
        <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Deploy pre-built AI agent teams to your Paperclip account
        </p>
      </div>

      {/* Connection Status */}
      {connectionStatus && (
        <div className={`mb-6 p-4 rounded-lg border ${
          connectionStatus.isConnected 
            ? 'bg-green-500/10 border-green-500/30 text-green-400'
            : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {connectionStatus.isConnected ? '✅ Paperclip Connected' : '⚠️ Paperclip Not Connected'}
              </p>
              <p className="text-sm opacity-80">
                {connectionStatus.isConnected 
                  ? 'Ready to deploy templates'
                  : 'Connect your Paperclip account in Connections to deploy templates'
                }
              </p>
            </div>
            {!connectionStatus.isConnected && (
              <a
                href="/dashboard/connections"
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 font-medium text-sm"
              >
                Connect Now
              </a>
            )}
          </div>
        </div>
      )}

      {/* Alerts */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
          {success}
        </div>
      )}

      {/* Templates */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Available Templates</h2>
          
          {!connectionStatus?.isConnected ? (
            <div className="text-center py-12 glass-card">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-white mb-2">Paperclip Connection Required</h3>
              <p className="text-gray-400 mb-6">
                Connect your Paperclip account to deploy AI agent templates
              </p>
              <a
                href="/dashboard/connections"
                className="inline-block px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 font-medium"
              >
                Go to Connections
              </a>
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-12 glass-card">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-white mb-2">No Templates Available</h3>
              <p className="text-gray-400">Check back later for new AI agent templates</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`glass-card p-6 border-2 cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-white text-lg">{template.name}</h3>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-bold">
                      ${template.price}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">{template.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Includes {template.agents.length} agents:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.agents.slice(0, 3).map((agent, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          {agent.role}
                        </span>
                      ))}
                      {template.agents.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          +{template.agents.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-400">4.8</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedTemplate?.id === template.id
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {selectedTemplate?.id === template.id ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Deployment Form */}
        {selectedTemplate && connectionStatus?.isConnected && (
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Deploy: {selectedTemplate.name}
            </h2>
            
            <form onSubmit={handleDeploy} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  COMPANY NAME
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="e.g., Acme Corp Operations"
                  required
                />
              </div>

              <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <p className="text-sm text-cyan-400 mb-2">
                  🚀 Ready to deploy {selectedTemplate.agents.length} AI agents
                </p>
                <p className="text-xs text-cyan-300">
                  Your Paperclip account will be charged ${selectedTemplate.price} for this deployment
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deploying || !companyName.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50"
                >
                  {deploying ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⟳</span>
                      Deploying...
                    </span>
                  ) : (
                    'Deploy Now'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
