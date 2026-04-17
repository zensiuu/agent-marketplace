'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createSupabaseClient } from '@/lib/supabase/supabase';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const supabase = createSupabaseClient();

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push('/dashboard');
    }
  };

  if (mounted) {
    checkSession();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
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

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else if (data.session) {
      router.push('/dashboard');
    } else if (data.user) {
      setSuccess(true);
      setLoading(false);
    }
  };

  const handleOAuthSignup = async (provider: 'github' | 'google') => {
    setLoading(true);
    setError(null);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }
    setLoading(true);
    setError(null);

    const { error: magicError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (magicError) {
      setError(magicError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex bg-[#08090a]">
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-sm text-center">
            <div className="card p-8">
              <div className="w-14 h-14 bg-[rgba(16,185,129,0.15)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-[#f7f8f8] mb-2" style={{ fontWeight: 510 }}>
                Check Your Email!
              </h2>
              <p className="text-sm text-[#8a8f98] mb-6">
                We've sent you a confirmation link. (Demo mode - you can continue)
              </p>
              <Link href="/dashboard" className="text-sm font-medium text-[#7170ff] hover:text-[#828fff]">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
        {/* Right Side - Brand */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#0f1011] p-8">
          <div className="text-center max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#5e6ad2] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-medium text-[#f7f8f8]">AgentForge</span>
            </Link>
            <h1 className="text-3xl font-medium text-[#f7f8f8] mb-4" style={{ fontWeight: 510, letterSpacing: '-0.02em' }}>
              The App Store for<br />
              <span className="text-[#5e6ad2]">AI Agents</span>
            </h1>
            <p className="text-[#8a8f98] mb-8">
              Deploy pre-built AI agent teams that work 24/7. 
              Secure. Fast. Enterprise-ready.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-[#62666d]">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Enterprise security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>One-click deploy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>24/7 operation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#08090a]">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#5e6ad2] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-medium text-[#f7f8f8]">AgentForge</span>
            </Link>
          </div>

          {/* Form Card */}
          <div className="card p-6">
            <h2 className="text-lg font-medium text-[#f7f8f8] mb-2" style={{ fontWeight: 510 }}>
              Get started
            </h2>
            <p className="text-sm text-[#8a8f98] mb-6">Create your account</p>

            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm bg-[rgba(239,68,68,0.1)] text-red-500 border border-[rgba(239,68,68,0.2)]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#191a1b] border border-[rgba(255,255,255,0.08)] rounded-xl text-[#f7f8f8] placeholder-[#62666d] focus:border-[#5e6ad2] focus:outline-none transition-colors"
                  placeholder="Name"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#191a1b] border border-[rgba(255,255,255,0.08)] rounded-xl text-[#f7f8f8] placeholder-[#62666d] focus:border-[#5e6ad2] focus:outline-none transition-colors"
                  placeholder="Email"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 bg-[#191a1b] border border-[rgba(255,255,255,0.08)] rounded-xl text-[#f7f8f8] placeholder-[#62666d] focus:border-[#5e6ad2] focus:outline-none transition-colors"
                  placeholder="Company (optional)"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#191a1b] border border-[rgba(255,255,255,0.08)] rounded-xl text-[#f7f8f8] placeholder-[#62666d] focus:border-[#5e6ad2] focus:outline-none transition-colors"
                  placeholder="Password"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#5e6ad2] hover:bg-[#828fff] text-white font-medium rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            {/* OAuth Buttons - Compact Row */}
            <div className="mt-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[rgba(255,255,255,0.05)]"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-[#0f1011] text-[#62666d]">or continue with</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleOAuthSignup('github')}
                  disabled={loading}
                  className="flex-1 py-2.5 bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-[#d0d6e0]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>

                <button
                  onClick={() => handleOAuthSignup('google')}
                  disabled={loading}
                  className="flex-1 py-2.5 bg-white hover:bg-gray-100 text-[#1f2937] rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>

                <button
                  onClick={handleMagicLink}
                  disabled={loading}
                  className="flex-1 py-2.5 bg-[rgba(139,92,246,0.15)] hover:bg-[rgba(139,92,246,0.25)] border border-[rgba(139,92,246,0.3)] rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-[#a78bfa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#8a8f98]">
                Already have an account?{' '}
                <Link href="/login" className="text-[#7170ff] hover:text-[#828fff]">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Brand */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#0f1011] p-8">
        <div className="text-center max-w-sm">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#5e6ad2] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-medium text-[#f7f8f8]">AgentForge</span>
          </Link>

          {/* Tagline */}
          <h1 className="text-3xl font-medium text-[#f7f8f8] mb-4" style={{ fontWeight: 510, letterSpacing: '-0.02em' }}>
            The App Store for<br />
            <span className="text-[#5e6ad2]">AI Agents</span>
          </h1>
          
          <p className="text-[#8a8f98] mb-8">
            Deploy pre-built AI agent teams that work 24/7. 
            Secure. Fast. Enterprise-ready.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-[#62666d]">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Enterprise security</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>One-click deploy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>24/7 operation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}