'use client';

import { useState, useEffect } from 'react';

interface ConnectionStatus {
  isConnected: boolean;
  deploymentHistory: any[];
  message: string;
}

export default function PaperclipConnection() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  async function checkConnectionStatus() {
    try {
      const res = await fetch('/api/deploy');
      const data = await res.json();
      setConnectionStatus(data);
    } catch (error) {
      console.error('Failed to check connection status:', error);
      setError('Failed to check connection status');
    } finally {
      setLoading(false);
    }
  }

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setConnecting(true);
    setError(null);

    try {
      const res = await fetch('/api/paperclip/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowConnectModal(false);
        setApiKey('');
        checkConnectionStatus();
      } else {
        setError(data.error || 'Failed to connect Paperclip account');
      }
    } catch (error) {
      setError('Connection failed. Please try again.');
    } finally {
      setConnecting(false);
    }
  }

  async function handleDisconnect() {
    if (!confirm('Are you sure you want to disconnect your Paperclip account?')) return;

    try {
      const res = await fetch('/api/paperclip/connect', { method: 'DELETE' });
      
      if (res.ok) {
        checkConnectionStatus();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to disconnect');
      }
    } catch (error) {
      setError('Failed to disconnect. Please try again.');
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="bg-gray-100 h-20 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Paperclip Connection</h3>
        <p className="text-sm text-gray-500 mb-4">
          Connect your Paperclip account to enable secure AI agent deployments
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {connectionStatus?.isConnected ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <h4 className="font-medium text-green-900">Connected to Paperclip</h4>
                <p className="text-sm text-green-700">
                  Your Paperclip account is ready for secure deployments
                </p>
                {connectionStatus.deploymentHistory.length > 0 && (
                  <p className="text-xs text-green-600 mt-1">
                    {connectionStatus.deploymentHistory.length} deployments made
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">🔗</div>
          <h4 className="font-medium text-gray-900 mb-2">Connect Paperclip Account</h4>
          <p className="text-sm text-gray-600 mb-4">
            Connect your Paperclip API key to enable secure AI agent deployments
          </p>
          <button
            onClick={() => setShowConnectModal(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Connect Account
          </button>
        </div>
      )}

      {/* Connect Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Connect Paperclip Account
            </h3>
            <form onSubmit={handleConnect} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paperclip API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="pc_..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Find your API key in the Paperclip dashboard
                </p>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  🔒 Your API key will be securely stored in Auth0 Token Vault and encrypted
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowConnectModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={connecting || !apiKey.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
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
