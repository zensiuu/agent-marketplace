'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login - in production this connects to real auth
    setTimeout(() => {
      // For demo, just redirect to dashboard
      window.location.href = '/dashboard';
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: 'Orbitron, sans-serif', color: '#00d4ff', letterSpacing: '4px' }}
          >
            AGENT<span style={{ color: '#ffffff' }}>FORGE</span>
          </h1>
          <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            AI Agent Marketplace
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            {isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px' }}
            >
              {loading ? 'PLEASE WAIT...' : isLogin ? 'LOGIN' : 'SIGN UP'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-400 hover:text-cyan-300 text-sm"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-xs text-yellow-400 text-center" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              🔐 Demo mode: Auth0 integration available on Vercel deployment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
