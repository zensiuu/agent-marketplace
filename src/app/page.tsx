'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-50"></div>
      
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="status-dot status-active"></span>
            <span className="text-xs text-cyan-400" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px' }}>
              AUTONOMOUS OPERATIONS ONLINE
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '4px' }}
          >
            DEPLOY YOUR <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent neon-text">
              AI WORKFORCE
            </span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
            The marketplace for pre-built AI agent companies. Deploy a CEO, CTO, and specialized agents—
            <br className="hidden sm:block" />
            ready to work 24/7. Zero hiring required.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button className="btn-primary">
              Explore Templates
            </button>
            <button className="btn-secondary">
              See How It Works
            </button>
          </div>
        </div>

        {/* Radar Animation Decor */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <div className="relative h-96 w-96">
            <div className="absolute inset-0 rounded-full border border-cyan-500/30"></div>
            <div className="absolute inset-8 rounded-full border border-cyan-500/20"></div>
            <div className="absolute inset-16 rounded-full border border-cyan-500/10"></div>
            <div className="radar-animation absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Metrics Bar */}
      <section className="border-y border-white/5 bg-[#0a0a0a]/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <MetricCard 
              label="TEMPLATES" 
              value="500" 
              suffix="PLUS"
              delay={mounted ? 100 : 0}
            />
            <MetricCard 
              label="AGENTS DEPLOYED" 
              value="10K" 
              suffix="PLUS"
              delay={mounted ? 200 : 0}
            />
            <MetricCard 
              label="UPTIME" 
              value="99.9" 
              suffix="%"
              delay={mounted ? 300 : 0}
            />
            <MetricCard 
              label="AUTONOMOUS" 
              value="24/7" 
              suffix="ACTIVE"
              delay={mounted ? 400 : 0}
            />
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
            >
              POPULAR TEMPLATES
            </h2>
            <p className="mt-2 text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Pre-built AI companies ready to deploy in minutes
            </p>
          </div>
          <button className="btn-secondary text-xs">
            View All Templates
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TemplateCard
            name="SaaS Development Team"
            agentCount={5}
            costPerCycle={299}
            status="POPULAR"
            description="Full-stack development unit with CEO, CTO, and specialized agents."
            delay={mounted ? 100 : 0}
          />
          <TemplateCard
            name="Content Agency"
            agentCount={4}
            costPerCycle={199}
            status="POPULAR"
            description="Marketing and content generation unit for brand operations."
            delay={mounted ? 200 : 0}
          />
          <TemplateCard
            name="DevOps Squad"
            agentCount={3}
            costPerCycle={249}
            status="NEW"
            description="Infrastructure and CI/CD automation specialists."
            delay={mounted ? 300 : 0}
          />
        </div>
      </section>

      {/* Features / Capabilities Grid */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 
            className="text-2xl font-bold text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
          >
            WHY AGENTFORGE
          </h2>
          <p className="mt-2 text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Everything you need to build with AI agents
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FeatureCard
            icon={
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            }
            title="AUTONOMOUS OPS"
            description="AI agents work 24/7 with zero human intervention. Set it and forget it."
            delay={mounted ? 100 : 0}
          />
          <FeatureCard
            icon={
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="BUDGET CONTROL"
            description="Set spending limits per agent. Track costs in real-time. Never overspend."
            delay={mounted ? 200 : 0}
          />
          <FeatureCard
            icon={
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            }
            title="REAL-TIME DASHBOARD"
            description="Monitor all your deployments, agents, and costs from one dashboard."
            delay={mounted ? 300 : 0}
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto mb-20 max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-card glow-border p-12 text-center">
          <h3 
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
          >
            READY TO START?
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Deploy your first AI team in minutes. No credit card required.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button className="btn-primary">
              Get Started Free
            </button>
            <button className="btn-secondary">
              View Marketplace
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ label, value, suffix, delay }: { label: string; value: string; suffix: string; delay: number }) {
  return (
    <div 
      className="metric-card glass-card p-6 text-center animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div 
        className="text-xs text-gray-500 mb-2"
        style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px' }}
      >
        {label}
      </div>
      <div className="flex items-baseline justify-center gap-1">
        <span 
          className="text-3xl font-bold text-white neon-text"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          {value}
        </span>
        <span className="text-sm text-cyan-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          {suffix}
        </span>
      </div>
    </div>
  );
}

function TemplateCard({ 
  name, 
  agentCount, 
  costPerCycle, 
  status,
  description,
  delay 
}: { 
  name: string; 
  agentCount: number; 
  costPerCycle: number; 
  status: string;
  description: string;
  delay: number;
}) {
  const isReady = status === 'READY';
  
  return (
    <div 
      className="glass-card group cursor-pointer p-6 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 
          className="text-lg font-semibold text-white"
          style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px', letterSpacing: '1px' }}
        >
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className={`status-dot ${isReady ? 'status-active' : 'status-standby'}`}></span>
          <span className={`text-xs ${isReady ? 'text-green-400' : 'text-cyan-400'}`} style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
            {status}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
        {description}
      </p>

      {/* Stats */}
      <div className="mt-6 flex items-center gap-6 border-t border-white/5 pt-4">
        <div>
          <div className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>AGENTS</div>
          <div className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>{agentCount}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>COST/CYCLE</div>
          <div className="text-lg font-bold text-purple-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>${costPerCycle}</div>
        </div>
      </div>

      {/* Deploy Button */}
      <button className="btn-deploy mt-6 w-full">
        {isReady ? 'Deploy Operation' : 'Stage Team'}
      </button>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description,
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}) {
  return (
    <div 
      className="glass-card glow-border p-8 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10">
        <div className="text-cyan-400">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 
        className="text-lg font-semibold text-white"
        style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px', letterSpacing: '1px' }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}
