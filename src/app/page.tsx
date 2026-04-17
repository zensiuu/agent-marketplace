'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

const NAVIGATION = [
  { name: 'Templates', href: '/dashboard/templates' },
  { name: 'Skills', href: '/dashboard/skills' },
  { name: 'Pricing', href: '#pricing' },
] as const;

const FOOTER_LINKS = {
  Product: ['Features', 'Integrations', 'Changelog'],
  Company: ['About', 'Blog', 'Careers'],
  Legal: ['Privacy', 'Terms'],
} as const;

const STEPS = [
  {
    title: 'Browse',
    description: 'Explore our curated marketplace of pre-built AI agent teams. Filter by industry, use case, or team size.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: 'Configure',
    description: 'Customize your agent team with specific skills, permissions, and API integrations. Set budget limits.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Deploy',
    description: 'One-click deployment to Paperclip.ai orchestration layer. Your agents are up and running in minutes.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Scale',
    description: 'Monitor performance, adjust budgets, and scale your AI workforce. They work 24/7 while you sleep.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  const agentSubscribeCommand = [
    'curl -X POST https://agentforge.io/api/subscribe \\\\',
    '  -H "Content-Type: application/json" \\\\',
    `  -d '{"email":"${newsletterEmail.trim() || 'agent@company.ai'}","source":"ai-agent","list":"product-updates"}'`,
  ].join('\n');

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newsletterEmail.trim()) return;
    window.location.href = `mailto:hello@agentforge.io?subject=AgentForge newsletter signup&body=Please subscribe ${newsletterEmail.trim()} to the AgentForge newsletter.`;
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
    <div className="min-h-screen bg-[#08090a] text-[#f7f8f8]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(255,255,255,0.05)] bg-[#08090a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#5e6ad2] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-base font-medium tracking-tight">AgentForge</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-[#d0d6e0] hover:text-[#f7f8f8] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:block text-sm font-medium text-[#d0d6e0] hover:text-[#f7f8f8] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-[#5e6ad2] hover:bg-[#828fff] text-white px-4 py-2 rounded-md transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] mb-8 stagger-children">
            <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
            <span className="text-sm text-[#d0d6e0]">Now in public beta</span>
          </div>

          {/* Headline */}
          <h1 
            className="text-5xl md:text-7xl font-medium tracking-tight mb-6"
            style={{ 
              fontFamily: 'Inter Variable, Inter, sans-serif',
              fontFeatureSettings: '"cv01", "ss03"',
              letterSpacing: '-0.04em',
              fontWeight: 510,
              lineHeight: 1.1
            }}
          >
            The App Store for<br />
            <span className="text-[#5e6ad2]">AI Agents</span>
          </h1>

          {/* Description */}
          <p 
            className="text-xl text-[#8a8f98] max-w-2xl mx-auto mb-8"
            style={{ 
              fontFamily: 'Inter Variable, Inter, sans-serif',
              lineHeight: 1.6
            }}
          >
            AgentForge is an AI agent marketplace where you can browse, purchase, and deploy 
            pre-built AI agent teams that run on Paperclip.ai orchestration layer. Think of it 
            like the App Store — but for AI that works 24/7.
          </p>

          {/* Subtitle */}
          <p 
            className="text-lg text-[#62666d] max-w-xl mx-auto mb-10"
            style={{ 
              fontFamily: 'Inter Variable, Inter, sans-serif',
              lineHeight: 1.6
            }}
          >
            Secure AI agents with Auth0 Token Vault — give your agents API access without exposing keys.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#5e6ad2] hover:bg-[#828fff] text-white font-medium rounded-md transition-colors"
            >
              Start building
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link 
              href="/dashboard/templates" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#e2e4e7] font-medium rounded-md transition-colors"
            >
              Browse templates
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-[#62666d]">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Auth0 Token Vault</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>One-click deploy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="card p-1 rounded-xl overflow-hidden">
            <div className="bg-[#0f1011] rounded-lg p-8 aspect-video flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5e6ad2]/5 to-transparent"></div>
              <div className="text-center relative z-10">
                <div className="w-20 h-20 rounded-full bg-[rgba(94,106,210,0.15)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-[#7170ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#f7f8f8] mb-2" style={{ fontWeight: 510 }}>See AgentForge in Action</h3>
                <p className="text-sm text-[#8a8f98] mb-6 max-w-md mx-auto">
                  Watch how AI agents work together in real-time. 
                  Deploy your first team in under 2 minutes.
                </p>
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium rounded-md transition-colors"
                >
                  Try Live Demo
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Metrics */}
      <section className="py-16 border-y border-[rgba(255,255,255,0.05)] bg-[#0f1011]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active agents', value: '1,247+', change: '+12%' },
              { label: 'Deployments', value: '89K', change: '+8%' },
              { label: 'Uptime', value: '99.9%', change: '' },
              { label: 'Countries', value: '47', change: '+3' },
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-medium text-[#f7f8f8] mb-1" style={{ fontWeight: 510 }}>
                  {metric.value}
                </div>
                <div className="text-sm text-[#8a8f98] flex items-center justify-center gap-2">
                  <span>{metric.label}</span>
                  {metric.change && (
                    <span className="text-[#10b981] text-xs">{metric.change}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Improved Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-medium mb-4"
              style={{ fontWeight: 510, letterSpacing: '-0.02em' }}
            >
              How it works
            </h2>
            <p className="text-lg text-[#8a8f98] max-w-xl mx-auto">
              From idea to AI-powered workforce in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step, index) => (
              <div 
                key={index} 
                className="group relative card p-6 hover:border-[rgba(94,106,210,0.3)] transition-all duration-300"
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#08090a] border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
                  <span className="text-xs font-medium text-[#5e6ad2]" style={{ fontWeight: 510 }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-[rgba(94,106,210,0.1)] border border-[rgba(94,106,210,0.2)] flex items-center justify-center mb-4 text-[#7170ff] group-hover:bg-[rgba(94,106,210,0.15)] group-hover:border-[rgba(94,106,210,0.3)] transition-colors">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-base font-medium text-[#f7f8f8] mb-2" style={{ fontWeight: 510 }}>
                  {step.title}
                </h3>
                <p className="text-sm text-[#8a8f98] leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line (except for last item) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-[rgba(255,255,255,0.08)]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-medium mb-4"
              style={{ fontWeight: 510, letterSpacing: '-0.02em' }}
            >
              Popular templates
            </h2>
            <p className="text-lg text-[#8a8f98] max-w-xl mx-auto">
              Ready-to-deploy AI agent teams for every business need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'SaaS Startup',
                desc: 'Complete team for running a software company',
                features: ['CEO Agent', 'CTO Agent', 'Dev Agent', 'QA Agent'],
                price: '$299',
                agents: 5
              },
              {
                title: 'Content Agency',
                desc: 'AI team for content creation',
                features: ['Strategist', 'Copywriter', 'Editor', 'Publisher'],
                price: '$199',
                agents: 4
              },
              {
                title: 'DevOps Squad',
                desc: 'Infrastructure automation',
                features: ['DevOps Lead', 'SRE', 'Security'],
                price: '$249',
                agents: 3
              }
            ].map((template, index) => (
              <div key={index} className="card p-6 group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-medium text-[#f7f8f8]">
                    {template.title}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-[#8a8f98]">
                    {template.agents} agents
                  </span>
                </div>
                <p className="text-sm text-[#8a8f98] mb-4">
                  {template.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {template.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#d0d6e0]">
                      <span className="w-1 h-1 rounded-full bg-[#5e6ad2]"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <div>
                    <span className="text-xl font-medium text-[#f7f8f8]">{template.price}</span>
                    <span className="text-xs text-[#62666d]">/mo</span>
                  </div>
                  <Link href="/dashboard/templates" className="text-sm font-medium text-[#5e6ad2] hover:text-[#828fff] transition-colors">
                    View details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/dashboard/templates" 
              className="inline-flex items-center gap-2 text-sm font-medium text-[#d0d6e0] hover:text-[#f7f8f8] transition-colors"
            >
              View all templates
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Single Block with Agent Icon */}
      <section className="py-24 px-6 bg-[#0f1011]">
        <div className="max-w-3xl mx-auto">
          <div className="card p-8 relative overflow-hidden">
            {/* Agent Icon Button - Click to copy */}
            <button
              onClick={handleAgentSubscribeCopy}
              className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-[rgba(139,92,246,0.15)] border border-[rgba(139,92,246,0.2)] hover:bg-[rgba(139,92,246,0.25)] hover:border-[rgba(139,92,246,0.4)] flex items-center justify-center transition-all group"
              title="Click to copy API command"
            >
              <svg className="w-5 h-5 text-[#a78bfa] group-hover:text-[#828fff] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {copyState === 'copied' && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-[#10b981] whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 bg-[#10b981] rounded-full"></span>
                <span className="text-sm uppercase tracking-[0.2em] text-[#10b981]">Stay Updated</span>
              </div>
              <h3 className="text-2xl font-medium mb-2" style={{ fontWeight: 510 }}>
                Join the AgentForge Community
              </h3>
              <p className="text-[#8a8f98]">
                Get the latest on new AI agents, marketplace drops, and deployment updates.
              </p>
            </div>

            {/* Subscribe form with dark, rounded input */}
            <form onSubmit={handleNewsletterSubmit} className="mb-4">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-[#191a1b] border border-[rgba(255,255,255,0.08)] rounded-xl text-[#f7f8f8] placeholder-[#62666d] focus:border-[#5e6ad2] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#5e6ad2] hover:bg-[#828fff] text-white font-medium rounded-xl transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-xs text-[#62666d]">
              <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No spam, unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#0f1011]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 
            className="text-3xl md:text-4xl font-medium mb-4"
            style={{ fontWeight: 510, letterSpacing: '-0.02em' }}
          >
            Ready to build your AI team?
          </h2>
          <p className="text-lg text-[#8a8f98] mb-8">
            Join thousands of companies deploying AI agents with AgentForge
          </p>
          <Link 
            href="/signup" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5e6ad2] hover:bg-[#828fff] text-white font-medium rounded-md transition-colors"
          >
            Get started free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* Logo & description */}
            <div className="max-w-xs">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#5e6ad2] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-base font-medium">AgentForge</span>
              </Link>
              <p className="text-sm text-[#62666d]">
                The App Store for AI Agents. Deploy pre-built AI agent teams that work 24/7.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-x-16 gap-y-8">
              {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-[#f7f8f8] mb-3">{category}</h4>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-sm text-[#8a8f98] hover:text-[#f7f8f8] transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#62666d]">
              &copy; 2026 AgentForge. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[#62666d] hover:text-[#f7f8f8] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.993.108-.771.417-1.303.76-1.602-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.653 1.653.24 2.874.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.607-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57 4.795-1.576 8.187-5.99 8.187-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-[#62666d] hover:text-[#f7f8f8] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.419-2.157 2.419z"/>
                </svg>
              </a>
              <a href="#" className="text-[#62666d] hover:text-[#f7f8f8] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}