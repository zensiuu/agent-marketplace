'use client';

import { type FormEvent, useState } from 'react';
import Link from 'next/link';

const SOCIAL_LINKS = [
  { label: 'Discord', href: 'https://discord.gg/agentforge' },
  { label: 'GitHub', href: 'https://github.com/agentforge' },
  { label: 'X', href: 'https://x.com/agentforge' },
] as const;

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  const agentSubscribeCommand = [
    'curl -X POST https://agentforge.io/api/subscribe \\',
    '  -H "Content-Type: application/json" \\',
    `  -d '{"email":"${newsletterEmail.trim() || 'agent@company.ai'}","source":"ai-agent","list":"product-updates"}'`,
  ].join('\n');

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newsletterEmail.trim()) {
      return;
    }

    const subject = encodeURIComponent('AgentForge newsletter signup');
    const body = encodeURIComponent(
      `Please subscribe ${newsletterEmail.trim()} to the AgentForge newsletter.`
    );

    window.location.href = `mailto:hello@agentforge.io?subject=${subject}&body=${body}`;
  };

  const handleAgentSubscribeCopy = async () => {
    try {
      await navigator.clipboard.writeText(agentSubscribeCommand);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 2200);
    } catch {
      setCopyState('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 
                className="text-2xl font-bold"
                style={{ fontFamily: 'Orbitron, sans-serif', color: '#00d4ff', letterSpacing: '2px' }}
              >
                AGENT<span style={{ color: '#ffffff' }}>FORGE</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="grid-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6 hero-glow"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              The App Store for
              <span className="text-gradient"> AI Agents</span>
            </h1>
            <p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              Deploy pre-built AI agent teams — your digital employees that work 24/7
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/signup" 
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all btn-glow text-lg"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Get Started Free
              </Link>
              <Link 
                href="/dashboard/templates" 
                className="px-8 py-4 border border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white font-bold rounded-lg transition-all text-lg"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Browse Templates
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400">OK</span>
                <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>Enterprise Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">OK</span>
                <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>Auth0 Token Vault</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">OK</span>
                <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>One-Click Deploy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section with Metrics */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Platform Metrics
            </h2>
            <p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              Real-time performance and deployment statistics
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'ACTIVE AGENTS', value: '1,247', suffix: '+', delay: 0 },
              { label: 'DEPLOYMENTS', value: '89', suffix: 'K', delay: 100 },
              { label: 'UPTIME', value: '99.9', suffix: '%', delay: 200 },
              { label: 'COUNTRIES', value: '47', suffix: '', delay: 300 },
            ].map((metric, index) => (
              <div 
                key={index}
                className="glass-card p-6 text-center"
                style={{ animationDelay: `${metric.delay}ms` }}
              >
                <div 
                  className="text-xs text-gray-500 mb-2"
                  style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px' }}
                >
                  {metric.label}
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span 
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {metric.value}
                  </span>
                  <span 
                    className="text-sm text-cyan-400"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {metric.suffix}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Demo Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              See AgentForge in Action
            </h2>
            <p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              Watch how AI agents work together in real-time
            </p>
          </div>

          <div className="glass-card rounded-2xl border border-cyan-500/20 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  Live Agent Dashboard
                </h3>
                <p 
                  className="text-gray-300 mb-6"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  Monitor your AI agents in real-time. Track performance, costs, and activity from a single dashboard.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    'Real-time agent status monitoring',
                    'Budget control and cost tracking',
                    'Automated task assignment',
                    'Performance analytics and reporting'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span 
                        className="text-gray-300"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <Link 
                  href="/dashboard"
                  className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  Try Live Demo
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p 
                      className="text-gray-400 mb-4"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      Interactive Demo
                    </p>
                    <button 
                      className="px-4 py-2 border border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white rounded-lg font-medium transition-colors text-sm"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      Play Demo
                    </button>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-20"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              How It Works
            </h2>
            <p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              From browsing to deployment in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Browse', desc: 'Explore pre-built AI team templates' },
              { step: '02', title: 'Purchase', desc: 'Select a template and complete checkout' },
              { step: '03', title: 'Deploy', desc: 'One-click deploy to production' },
              { step: '04', title: 'Monitor', desc: 'Your digital employees start working 24/7' }
            ].map((item, index) => (
              <div key={index} className="text-center glass-card p-6 rounded-lg">
                <div 
                  className="text-4xl font-bold text-cyan-400 mb-4"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {item.step}
                </div>
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-gray-300"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Preview */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Popular Templates
            </h2>
            <p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              Ready-to-deploy AI agent teams for every business need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'SaaS Startup',
                desc: 'Complete team for running a software company',
                features: ['Support Agent', 'Dev Agent', 'PM Agent'],
                price: '$299'
              },
              {
                title: 'Content Agency',
                desc: 'AI team for content creation and management',
                features: ['Writer Agent', 'Editor Agent', 'Publisher Agent'],
                price: '$199'
              },
              {
                title: 'DevOps Squad',
                desc: 'Infrastructure and deployment automation',
                features: ['DevOps Agent', 'Monitor Agent', 'Security Agent'],
                price: '$399'
              }
            ].map((template, index) => (
              <div key={index} className="glass-card p-6 rounded-lg border border-gray-700">
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {template.title}
                </h3>
                <p 
                  className="text-gray-300 mb-4"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {template.desc}
                </p>
                <div className="mb-4">
                  {template.features.map((feature, i) => (
                    <div key={i} className="text-sm text-gray-400 mb-1">
                      - {feature}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span 
                    className="text-2xl font-bold text-cyan-400"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {template.price}
                  </span>
                  <button 
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/dashboard/templates" 
              className="px-8 py-3 border border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white font-bold rounded-lg transition-all"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              View All Templates
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Newsletter Section */}
      <div className="py-20 bg-gray-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Stay Connected To The AI Revolution
            </h2>
            <p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              Get launch notes, marketplace updates, and newly published AI teams before anyone else
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Human Newsletter Signup */}
            <section className="glass-card rounded-2xl border border-cyan-500/20 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
              
              <div className="mb-8 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                  <p
                    className="text-sm uppercase tracking-[0.35em] text-cyan-400"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    Human Access
                  </p>
                </div>
                <h3
                  className="mb-4 text-3xl font-bold md:text-4xl"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  Join The Community
                </h3>
                <p
                  className="max-w-2xl text-lg text-gray-300"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  Be the first to know about new AI agents, marketplace drops, and deployment updates.
                </p>
              </div>

              <form className="relative z-10" onSubmit={handleNewsletterSubmit}>
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <label className="sr-only" htmlFor="newsletter-email">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-cyan-400"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-cyan-600 px-6 py-4 font-bold text-white transition-all hover:bg-cyan-500 hover:scale-105 transform"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    Subscribe
                  </button>
                </div>
              </form>

              <div className="mt-6 flex items-center gap-2 text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No spam, unsubscribe anytime</span>
              </div>
            </section>

            {/* AI Agent Access */}
            <section className="glass-card rounded-2xl border border-purple-500/20 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
              
              <div className="mb-6 relative z-10">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <p
                      className="text-sm uppercase tracking-[0.35em] text-purple-300"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      Agent Access
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAgentSubscribeCopy}
                    className={`rounded-xl border px-4 py-3 text-sm font-bold transition-all transform hover:scale-105 ${
                      copyState === 'copied' 
                        ? 'border-green-400 bg-green-500/10 text-green-300' 
                        : 'border-purple-400/40 bg-purple-500/10 text-purple-100 hover:border-purple-300 hover:bg-purple-500/20'
                    }`}
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {copyState === 'copied' ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Copied!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1h-1a1 1 0 100 2h1v11H7V5h1a1 1 0 100-2H6z" />
                        </svg>
                        Copy
                      </span>
                    )}
                  </button>
                </div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  AI Agent Integration
                </h3>
                <p
                  className="text-gray-300 mb-4"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  Your AI agents can subscribe programmatically to receive marketplace updates and deployment notifications.
                </p>
              </div>

              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2">
                  <span 
                    className="text-xs uppercase tracking-wider text-purple-300"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    API ENDPOINT
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                </div>
                
                <div className="relative">
                  <pre className="overflow-x-auto rounded-xl border border-purple-400/20 bg-black/60 p-4 text-xs md:text-sm leading-6 text-purple-300 font-mono">
                    <code>{agentSubscribeCommand}</code>
                  </pre>
                  
                  {copyState === 'copied' && (
                    <div className="absolute top-2 right-2 bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs animate-fade-in">
                      Copied to clipboard!
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>Uses email from input or defaults to agent@company.ai</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317A5.937 5.937 0 0114 13c0-1.008-.315-1.912-.847-2.676l.024-.02A8.948 8.948 0 0110 9.083a8.947 8.947 0 01-3.177-.68l.024.02C6.315 9.088 6 9.992 6 11c0 .95.312 1.822.834 2.576C2.34 15.67 0 11.225 0 6c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Real-time updates for new agent deployments</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-cyan-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Ready to Build Your AI Team?
          </h2>
          <p 
            className="text-xl text-gray-300 mb-8"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Join thousands of companies deploying AI agents with AgentForge
          </p>
          <Link 
            href="/signup" 
            className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all btn-glow text-lg"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Start Building Today
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-t border-gray-800 pt-12">
            <div className="flex flex-col items-start">
              <div 
                className="text-xl font-bold tracking-[0.3em] mb-4"
                style={{ fontFamily: 'Orbitron, sans-serif', color: '#00d4ff' }}
              >
                AGENTFORGE
              </div>
              <div className="flex gap-6 mb-6">
                <a 
                  className="text-gray-400 hover:text-cyan-400 transition-colors" 
                  href="https://linkedin.com/company/agentforge" 
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  className="text-gray-400 hover:text-cyan-400 transition-colors" 
                  href="https://discord.gg/agentforge" 
                  target="_blank"
                  rel="noreferrer"
                  title="Discord"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.419-2.157 2.419z"/>
                  </svg>
                </a>
                <a 
                  className="text-gray-400 hover:text-cyan-400 transition-colors" 
                  href="https://github.com/agentforge" 
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
                <a 
                  className="text-gray-400 hover:text-cyan-400 transition-colors" 
                  href="https://x.com/agentforge" 
                  target="_blank"
                  rel="noreferrer"
                  title="X"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </a>
              </div>
              <p 
                className="text-[10px] tracking-[0.2em] text-gray-400 uppercase"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                © 2026 AGENTFORGE. ALL SYSTEMS OPERATIONAL
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-10 gap-y-4">
              <a 
                className="text-sm tracking-wide text-gray-400 hover:text-cyan-400 transition-colors uppercase" 
                href="/dashboard/templates"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Marketplace
              </a>
              <a 
                className="text-sm tracking-wide text-gray-400 hover:text-cyan-400 transition-colors uppercase" 
                href="/dashboard/templates"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Templates
              </a>
              <a 
                className="text-sm tracking-wide text-gray-400 hover:text-cyan-400 transition-colors uppercase" 
                href="/docs"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Docs
              </a>
              <a 
                className="text-sm tracking-wide text-gray-400 hover:text-cyan-400 transition-colors uppercase" 
                href="/privacy"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Privacy
              </a>
              <a 
                className="text-sm tracking-wide text-gray-600 hover:text-cyan-400 transition-colors uppercase font-bold border-b border-gray-600" 
                href="/contact"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Contact & Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
