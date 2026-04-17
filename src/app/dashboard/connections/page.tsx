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
  tokenFingerprint: string;
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
  const [refreshing, setRefreshing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  async function fetchConnections() {
    try {
      const res = await fetch('/api/tokens');
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
      }
      
      const connectionsData = await res.json();
      
      if (!connectionsData || typeof connectionsData !== 'object') {
        throw new Error('Invalid response format from server');
      }
      
      setData(connectionsData);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch connections:', error);
      setError(error instanceof Error ? error.message : 'Failed to load connections');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchConnections();
  };

  const handleDeleteConnection = async (serviceId: string) => {
    try {
      const res = await fetch(`/api/tokens/${serviceId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete connection');
      }
      
      await fetchConnections();
      setSuccess('Connection deleted successfully');
      setShowDeleteModal(false);
      setServiceToDelete(null);
    } catch (error) {
      setError('Failed to delete connection');
    }
  };

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
      <div className="p-6 lg:p-8">
        <div className="space-y-6">
          <div className="card p-6">
            <div className="h-6 bg-[rgba(255,255,255,0.05)] rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded w-2/3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="card p-6">
                <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-[rgba(255,255,255,0.05)] rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 lg:p-8 text-center">
        <div className="card p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-[rgba(239,68,68,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-[#f7f8f8] mb-2 inter-display">Failed to load connections</h3>
          <p className="text-sm text-[#8a8f98] mb-4 inter-body">{error || 'Please try refreshing the page'}</p>
          <button 
            onClick={() => fetchConnections()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { services, connectedServices, summary } = data;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-[#f7f8f8] mb-2 inter-display">
              Connections
            </h1>
            <p className="text-sm text-[#8a8f98] inter-body">
              Manage your AI service connections and API keys
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn-ghost"
          >
            <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-sm text-[#8a8f98]" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"' }}>
        Connect services to empower your AI agents with secure API access
      </p>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#62666d] mb-2" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>Total Connected</p>
              <p className="text-2xl font-medium text-[#f7f8f8]" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>{summary.totalConnected}</p>
            </div>
            <div className="w-12 h-12 bg-[rgba(94,106,210,0.15)] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#7170ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#62666d] mb-2" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>Active</p>
              <p className="text-2xl font-medium text-[#10b981]" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>{summary.activeConnections}</p>
            </div>
            <div className="w-12 h-12 bg-[rgba(16,185,129,0.15)] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#62666d] mb-2" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>Required</p>
              <p className="text-2xl font-medium text-[#eab308]" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>{summary.requiredConnected}</p>
            </div>
            <div className="w-12 h-12 bg-[rgba(234,179,8,0.15)] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#eab308]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <p className="text-sm text-[#ef4444]" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"' }}>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <p className="text-sm text-[#10b981]" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"' }}>{success}</p>
        </div>
      )}

      {/* Available Services */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-[#f7f8f8] mb-4" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const isConnected = connectedServices.find(cs => cs.serviceName === service.name);
            
            return (
              <div
                key={service.name}
                className={`card p-6 transition-all hover:bg-[rgba(255,255,255,0.04)] ${
                  isConnected 
                    ? 'border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.05)]' 
                    : 'border-[rgba(255,255,255,0.08)]'
                }`}
                style={{ borderRadius: '12px' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-2xl">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-[#f7f8f8]" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 590 }}>{service.name}</h3>
                      {service.required && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: 'rgba(234,179,8,0.1)', color: '#eab308', border: '1px solid rgba(234,179,8,0.2)', fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>
                          REQUIRED
                        </span>
                      )}
                    </div>
                  </div>
                  {isConnected ? (
                    <span className="px-2 py-1 text-xs rounded-full inline-flex items-center gap-1" style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>
                      <span className="w-1 h-1 rounded-full bg-[#10b981]"></span>
                      CONNECTED
                    </span>
                  ) : null}
                </div>
                
                <p className="text-sm text-[#8a8f98] mb-4" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"' }}>{service.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#62666d] capitalize" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>{service.category}</span>
                  {isConnected ? (
                    <button
                      onClick={() => handleDisconnect(service.name)}
                      className="btn-ghost text-sm"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedService(service);
                        setShowConnectModal(true);
                      }}
                      className="btn-primary text-sm"
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
          <h2 className="text-lg font-medium text-[#f7f8f8] mb-4" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>Connected Services</h2>
          <div className="space-y-4">
            {connectedServices.map((service) => (
              <div key={service.id} className="card p-6" style={{ borderRadius: '12px' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-2xl">
                      {service.serviceInfo.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-[#f7f8f8]" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 590 }}>{service.serviceName}</h3>
                      <p className="text-sm text-[#8a8f98] inter-mono">{service.tokenFingerprint}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${
                        service.isActive 
                          ? 'text-[#10b981]' 
                          : 'text-[#8a8f98]'
                      }`} style={{ 
                        backgroundColor: service.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(138,143,152,0.1)', 
                        border: service.isActive ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(138,143,152,0.2)',
                        fontFamily: 'Inter Variable',
                        fontFeatureSettings: '"cv01", "ss03"',
                        fontWeight: 510
                      }}>
                        <span className={`w-1 h-1 rounded-full`} style={{ backgroundColor: service.isActive ? '#10b981' : '#8a8f98' }}></span>
                        {service.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                      <p className="text-xs text-[#62666d] mt-1" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>
                        Used {service.usageCount} times
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleDisconnect(service.serviceName)}
                      className="btn-ghost text-sm"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
                
                {service.lastUsedAt && (
                  <p className="text-xs text-[#62666d] mt-3" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>
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
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.85)] flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="card-elevated p-8 w-full max-w-lg mx-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-2xl">
                {selectedService.icon}
              </div>
              <h2 className="text-xl font-medium text-[#f7f8f8]" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 590 }}>
                Connect {selectedService.name}
              </h2>
            </div>
            
            <form onSubmit={handleConnect} className="space-y-6">
              <div>
                <label className="block text-sm text-[#8a8f98] mb-2" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', fontWeight: 510 }}>
                  API KEY
                </label>
                <input
                  type="password"
                  value={tokenValue}
                  onChange={(e) => setTokenValue(e.target.value)}
                  placeholder={getServicePlaceholder(selectedService.name)}
                  className="input w-full"
                  style={{ fontFamily: 'Berkeley Mono, ui-monospace, SF Mono, monospace' }}
                  required
                />
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(122,127,173,0.1)', border: '1px solid rgba(122,127,173,0.2)' }}>
                <p className="text-sm text-[#7a7fad]" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"' }}>
                  🔒 Your API key will be encrypted and stored securely in Auth0 Token Vault
                </p>
                <p className="text-xs text-[#7a7fad] mt-1" style={{ fontFamily: 'Inter Variable', fontFeatureSettings: '"cv01", "ss03"', opacity: 0.8 }}>
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
                  className="btn-ghost flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={connecting || !tokenValue.trim()}
                  className="btn-primary flex-1"
                  style={{ opacity: (connecting || !tokenValue.trim()) ? 0.5 : 1 }}
                >
                  {connecting ? 'Connecting...' : 'Connect'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
