'use client';

import { useState, useEffect } from 'react';

interface Token {
  id: string;
  serviceName: string;
  label: string;
  isActive: boolean;
  lastUsedAt: string | null;
  maskedToken: string;
  createdAt: string;
}

const SERVICES = [
  { name: 'OpenAI', icon: '🤖', placeholder: 'sk-...' },
  { name: 'Anthropic', icon: '🧠', placeholder: 'sk-ant-...' },
  { name: 'GitHub', icon: '🐙', placeholder: 'ghp_...' },
  { name: 'Paperclip', icon: '📎', placeholder: 'pc_...' },
  { name: 'Stripe', icon: '💳', placeholder: 'sk_live_...' },
  { name: 'Custom', icon: '🔑', placeholder: 'Your API key' },
];

export default function TokenVault() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [tokenValue, setTokenValue] = useState('');
  const [tokenLabel, setTokenLabel] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTokens();
  }, []);

  async function fetchTokens() {
    try {
      const res = await fetch('/api/tokens');
      const data = await res.json();
      setTokens(data.tokens || []);
    } catch (error) {
      console.error('Failed to fetch tokens:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddToken(e: React.FormEvent) {
    e.preventDefault();
    if (!tokenValue.trim()) return;

    setSaving(true);
    try {
      const res = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceName: selectedService.name,
          token: tokenValue,
          label: tokenLabel || selectedService.name,
        }),
      });
      
      if (res.ok) {
        setShowAddModal(false);
        setTokenValue('');
        setTokenLabel('');
        fetchTokens();
      }
    } catch (error) {
      console.error('Failed to add token:', error);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteToken(id: string) {
    if (!confirm('Delete this API key?')) return;
    
    try {
      await fetch(`/api/tokens?id=${id}`, { method: 'DELETE' });
      fetchTokens();
    } catch (error) {
      console.error('Failed to delete token:', error);
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
        >
          TOKEN VAULT
        </h1>
        <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Securely store and manage your API keys for AI agents
        </p>
      </div>

      {/* Add Token Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
          style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}
        >
          + ADD API KEY
        </button>
      </div>

      {/* Tokens List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
      ) : tokens.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            No API Keys Yet
          </h3>
          <p className="text-gray-400 mb-6" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Add your first API key to get started with AI agents
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Add Your First Key
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {tokens.map((token) => (
            <div key={token.id} className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-2xl">
                    {SERVICES.find(s => s.name === token.serviceName)?.icon || '🔑'}
                  </div>
                  <div>
                    <h3 className="font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {token.label}
                    </h3>
                    <p className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {token.serviceName} • {token.maskedToken}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    token.isActive 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {token.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                  <button
                    onClick={() => handleDeleteToken(token.id)}
                    className="px-4 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {token.lastUsedAt && (
                <p className="text-xs text-gray-500 mt-3" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Last used: {new Date(token.lastUsedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Token Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="glass-card p-8 w-full max-w-lg mx-4">
            <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Add API Key
            </h2>
            <form onSubmit={handleAddToken} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-sm text-gray-400 mb-3" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  SERVICE
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SERVICES.map((service) => (
                    <button
                      key={service.name}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedService.name === service.name
                          ? 'border-cyan-500 bg-cyan-500/20'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-2xl mb-1">{service.icon}</div>
                      <div className="text-xs text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        {service.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* API Key Input */}
              <div>
                <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  API KEY
                </label>
                <input
                  type="password"
                  value={tokenValue}
                  onChange={(e) => setTokenValue(e.target.value)}
                  placeholder={selectedService.placeholder}
                  className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                  style={{ fontFamily: 'monospace' }}
                  required
                />
              </div>

              {/* Label */}
              <div>
                <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  LABEL (optional)
                </label>
                <input
                  type="text"
                  value={tokenLabel}
                  onChange={(e) => setTokenLabel(e.target.value)}
                  placeholder={selectedService.name}
                  className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                />
              </div>

              {/* Security Note */}
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  🔒 Your API key is encrypted and stored securely. It will only be revealed to authorized AI agents.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !tokenValue.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {saving ? 'SAVING...' : 'ADD KEY'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
