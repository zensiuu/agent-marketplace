'use client';

import { useState, useEffect } from 'react';

interface Service {
  name: string;
  description: string;
  category: string;
  required: boolean;
  icon: string;
}

interface ConnectedService {
  id: string;
  serviceName: string;
  serviceInfo: Service;
  isActive: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  usageCount: number;
  permissions: string[];
  maskedToken: string;
}

interface ConnectionsData {
  services: Service[];
  connectedServices: ConnectedService[];
  summary: {
    totalConnected: number;
    activeConnections: number;
    requiredConnected: number;
  };
}

export default function ConnectionsDashboard() {
  const [data, setData] = useState<ConnectionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [tokenValue, setTokenValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  async function fetchConnections() {
    try {
      const res = await fetch('/api/tokens');
      const connectionsData = await res.json();
      setData(connectionsData);
    } catch (error) {
      console.error('Failed to fetch connections:', error);
      setError('Failed to load connections');
    } finally {
      setLoading(false);
    }
  }

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedService || !tokenValue.trim()) return;

    setConnecting(true);
    setError(null);

    try {
      const res = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceName: selectedService.name,
          token: tokenValue.trim(),
          permissions: getDefaultPermissions(selectedService.name),
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess(result.message);
        setShowConnectModal(false);
        setTokenValue('');
        setSelectedService(null);
        fetchConnections();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || 'Failed to connect service');
      }
    } catch (error) {
      setError('Connection failed. Please try again.');
    } finally {
      setConnecting(false);
    }
  }

  async function handleDisconnect(serviceName: string) {
    if (!confirm(`Disconnect ${serviceName}? This will revoke access for your AI agents.`)) return;

    try {
      const res = await fetch(`/api/tokens?service=${encodeURIComponent(serviceName)}`, { 
        method: 'DELETE' 
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess(result.message);
        fetchConnections();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || 'Failed to disconnect service');
      }
    } catch (error) {
      setError('Failed to disconnect. Please try again.');
    }
  }

  function getDefaultPermissions(serviceName: string): string[] {
    const permissions: Record<string, string[]> = {
      'Paperclip': ['deploy', 'manage_agents', 'create_companies'],
      'OpenAI': ['text_generation', 'analysis'],
      'Anthropic': ['text_generation', 'analysis', 'reasoning'],
      'Stripe': ['charges', 'customers', 'billing'],
      'GitHub': ['repos', 'issues', 'pull_requests'],
    };
    return permissions[serviceName] || [];
  }

  function getServicePlaceholder(serviceName: string): string {
    const placeholders: Record<string, string> = {
      'Paperclip': 'pc_...',
      'OpenAI': 'sk-...',
      'Anthropic': 'sk-ant-...',
      'Stripe': 'sk_live_...',
      'GitHub': 'ghp_...',
    };
    return placeholders[serviceName] || 'Enter your API key...';
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
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

  if (!data) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500">Failed to load connections</div>
      </div>
    );
  }

  const { services, connectedServices, summary } = data;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
        >
          AI AGENT CONNECTIONS
        </h1>
        <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Connect services to empower your AI agents with secure API access
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Connected</p>
              <p className="text-2xl font-bold text-white">{summary.totalConnected}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-xl">
              🔗
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active</p>
              <p className="text-2xl font-bold text-green-400">{summary.activeConnections}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 text-xl">
              ✅
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Required</p>
              <p className="text-2xl font-bold text-yellow-400">{summary.requiredConnected}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400 text-xl">
              ⚠️
            </div>
          </div>
        </div>
      </div>

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

      {/* Available Services */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const isConnected = connectedServices.find(cs => cs.serviceName === service.name);
            
            return (
              <div
                key={service.name}
                className={`glass-card p-6 border-2 transition-all ${
                  isConnected 
                    ? 'border-green-500/50 bg-green-500/5' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{service.icon}</div>
                    <div>
                      <h3 className="font-bold text-white">{service.name}</h3>
                      {service.required && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                          REQUIRED
                        </span>
                      )}
                    </div>
                  </div>
                  {isConnected ? (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                      CONNECTED
                    </span>
                  ) : null}
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 capitalize">{service.category}</span>
                  {isConnected ? (
                    <button
                      onClick={() => handleDisconnect(service.name)}
                      className="px-3 py-1 text-red-400 hover:bg-red-500/20 rounded text-sm transition-colors"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedService(service);
                        setShowConnectModal(true);
                      }}
                      className="px-3 py-1 bg-cyan-500 text-white rounded text-sm hover:bg-cyan-600 transition-colors"
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Connected Services Details */}
      {connectedServices.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Connected Services</h2>
          <div className="space-y-4">
            {connectedServices.map((service) => (
              <div key={service.id} className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{service.serviceInfo.icon}</div>
                    <div>
                      <h3 className="font-bold text-white">{service.serviceName}</h3>
                      <p className="text-sm text-gray-400">{service.maskedToken}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        service.isActive 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {service.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Used {service.usageCount} times
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleDisconnect(service.serviceName)}
                      className="px-4 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
                
                {service.lastUsedAt && (
                  <p className="text-xs text-gray-500 mt-3">
                    Last used: {new Date(service.lastUsedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connect Modal */}
      {showConnectModal && selectedService && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="glass-card p-8 w-full max-w-lg mx-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">{selectedService.icon}</div>
              <h2 className="text-2xl font-bold text-white">
                Connect {selectedService.name}
              </h2>
            </div>
            
            <form onSubmit={handleConnect} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  API KEY
                </label>
                <input
                  type="password"
                  value={tokenValue}
                  onChange={(e) => setTokenValue(e.target.value)}
                  placeholder={getServicePlaceholder(selectedService.name)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                  style={{ fontFamily: 'monospace' }}
                  required
                />
              </div>

              <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <p className="text-sm text-cyan-400">
                  🔒 Your API key will be encrypted and stored securely in Auth0 Token Vault
                </p>
                <p className="text-xs text-cyan-300 mt-1">
                  Only your authorized AI agents will be able to access this token
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowConnectModal(false);
                    setSelectedService(null);
                    setTokenValue('');
                  }}
                  className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={connecting || !tokenValue.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50"
                >
                  {connecting ? 'CONNECTING...' : 'CONNECT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
