'use client';

import { useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseClient();

    // Step 1: Sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          company,
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (!authData.user) {
      setError('Failed to create user');
      setLoading(false);
      return;
    }

    // Step 2: Create customer record in the database
    try {
      const response = await fetch('/api/auth/create-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: authData.user.id,
          email,
          name,
          company,
        }),
      });

      if (!response.ok) {
        console.error('Failed to create customer record');
        // User was created in Auth, but customer record failed
        // Don't block signup - just log the error
      }
    } catch (err) {
      console.error('Customer creation error:', err);
      // Don't block signup if customer creation fails
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleOAuthSignup = async (provider: 'github' | 'google') => {
    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        callbackUrl: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    setLoading(true);
    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setError(null);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
        <div className="w-full max-w-md text-center">
          <div className="glass-card p-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Check Your Email!
            </h2>
            <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              We've sent you a confirmation link. Click it to activate your account.
            </p>
            <div className="mt-6">
              <a href="/login" className="text-cyan-400 hover:text-cyan-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Back to login
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Signup Card */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            CREATE ACCOUNT
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Company (optional)
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="my-4 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-sm text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>or</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleOAuthSignup('github')}
              className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-3"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>

            <button
              onClick={() => handleOAuthSignup('google')}
              className="w-full py-3 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-lg transition-colors flex items-center justify-center gap-3"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button
              onClick={handleMagicLink}
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              Send Magic Link
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Already have an account? 
              <a href="/login" className="text-cyan-400 hover:text-cyan-3 ml-1">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}