'use client';

export default function HomePage() {
  return (
    <>
      {/* Floating Live Chat */}
      <button className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-110 transition-transform active:scale-95 group">
        <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-background"></span>
      </button>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/60 backdrop-blur-xl border-b border-white/5 shadow-[0_0_20px_rgba(0,212,255,0.05)]">
        <div className="flex justify-between items-center px-4 md:px-8 h-20 w-full">
          <div className="font-headline text-lg md:text-xl font-bold tracking-[0.3em] text-[#00d4ff]">
            AGENTFORGE
          </div>
          <div className="hidden lg:flex gap-10">
            <a className="font-['Space_Grotesk'] uppercase tracking-[0.2em] text-sm text-[#00d4ff] font-bold border-b-2 border-[#00d4ff] pb-1" href="#">MARKETPLACE</a>
            <a className="font-['Space_Grotesk'] uppercase tracking-[0.2em] text-sm text-white/70 hover:text-white transition-colors" href="#">TEMPLATES</a>
            <a className="font-['Space_Grotesk'] uppercase tracking-[0.2em] text-sm text-white/70 hover:text-white transition-colors" href="#">SKILLS</a>
            <a className="font-['Space_Grotesk'] uppercase tracking-[0.2em] text-sm text-white/70 hover:text-white transition-colors" href="#">DOCS</a>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <a href="/api/auth/login" className="font-['Space_Grotesk'] uppercase tracking-[0.2em] text-[10px] md:text-xs text-white/70 hover:text-white transition-colors">LOGIN</a>
            <a href="/signup" className="bg-gradient-to-br from-primary to-primary-dim text-on-primary font-['Space_Grotesk'] px-4 md:px-6 py-2 md:py-2.5 rounded-sm text-[10px] md:text-xs font-bold tracking-widest btn-glow transition-all active:scale-95">
              GET STARTED
            </a>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <header className="relative pt-48 md:pt-64 pb-32 md:pb-48 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 grid-pattern z-0"></div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest border-l-2 border-primary mb-8">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span className="font-label text-[10px] uppercase tracking-[0.3em] font-bold text-primary">BUILD YOUR AI TEAM</span>
            </div>
            <h1 className="font-headline text-4xl md:text-7xl font-extrabold text-primary mb-6 leading-[1.1] tracking-tight">
              Build Your AI <br/>
              <span className="text-white opacity-90">Team in Minutes</span>
            </h1>
            <p className="font-body text-lg md:text-2xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed font-light">
              AgentForge is the marketplace for autonomous AI agent teams. Deploy pre-configured AI companies with CEOs, CTOs, and specialists—ready to work 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="/dashboard/templates" className="bg-gradient-to-br from-primary to-primary-dim text-on-primary font-headline px-8 md:px-10 py-4 md:py-5 rounded-sm text-xs md:text-sm font-bold tracking-widest btn-glow transition-all group flex items-center justify-center gap-3">
                EXPLORE TEMPLATES
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
              <button className="border border-outline-variant hover:border-primary/50 text-white font-headline px-8 md:px-10 py-4 md:py-5 rounded-sm text-xs md:text-sm font-bold tracking-widest transition-all bg-white/5 backdrop-blur-sm">
                SEE HOW IT WORKS
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-surface-container-lowest/50 backdrop-blur-sm py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <span className="font-headline text-2xl md:text-3xl font-bold text-primary mb-1">500+</span>
              <span className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">TEMPLATES</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-headline text-2xl md:text-3xl font-bold text-secondary mb-1">10K+</span>
              <span className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">AGENTS</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-headline text-2xl md:text-3xl font-bold text-tertiary mb-1">99.9%</span>
              <span className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">UPTIME</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-headline text-2xl md:text-3xl font-bold text-white mb-1">24/7</span>
              <span className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">AUTONOMOUS</span>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Templates */}
      <section className="py-24 md:py-48 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight uppercase">Popular Templates</h2>
              <div className="h-1 w-24 bg-primary"></div>
            </div>
            <a className="text-primary font-label text-sm tracking-widest hover:underline decoration-2 underline-offset-8" href="#">VIEW ALL MARKETPLACE</a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group surface-container-low glass-card rounded-sm overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300">
              <div className="h-48 relative">
                <img alt="SaaS Development Team" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4mBl0u1oV-sK-CpmtYMD08Gzrc5FJA5MfXldisx3WfsGDK6y2DEOpIezgILQzszEPDsr_lm2XRbDToBp6h3k0Q5qsLwTo3QBYTwND_JYM4z3PpORuke5U_RkfIPFYe2LJAUkuqj7jDIBkJjz8P6Xs0X1osQc6a1mH_E8QDLKB4e6Ul_uUiEIVJMVOroM9o6AFL4SxnPU3BrToYb-5bqpX8qZVS0X1gUHL59x2wOJjQjeLIhefFHDhWL6rFAgXPkVd7hJlqzjAWMtS"/>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold px-2 py-0.5 tracking-tighter uppercase">Popular</span>
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-headline text-lg md:text-xl text-white">SaaS Development Team</h3>
                  <span className="font-headline text-primary font-bold">$299<span className="text-xs text-on-surface-variant font-normal">/mo</span></span>
                </div>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Complete engineering squad including CTO, Frontend, Backend, and QA agents.</p>
                <div className="flex gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">group</span>
                    <span className="text-xs font-label text-white/80">5 Agents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">terminal</span>
                    <span className="text-xs font-label text-white/80">Full CI/CD</span>
                  </div>
                </div>
                <button className="mt-auto w-full border border-primary/20 hover:bg-primary hover:text-on-primary transition-all py-3 font-headline text-[10px] md:text-xs tracking-widest font-bold">VIEW DETAILS</button>
              </div>
            </div>
            {/* Card 2 */}
            <div className="group surface-container-low glass-card rounded-sm overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300">
              <div className="h-48 relative">
                <img alt="Content Agency" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM7RHSecfDLCo3HRfAJofQ0i5eVfwo7hqybE_S-7y8xptiKstfAyiTggzqoCnsY0xhqA7DnySxLa_M7mlByJLdsMPQsaDkvrvmLLWgDDtl45UXq7UU_UC0JZS68IwhtA1u-qrfndFXDBkN0vsWVHdXsnQKEij90E_MOTAIyw9WPmQci4wWj87Y4n8xiCH2NSKB4gFVzZuj8M_fEua4Z5qPZixbBuDGnNeKFqZ1iZCFJQAv6P2cBbEmA5O0xsaalmd5_CESF5rqAYLn"/>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-secondary/20 text-secondary border border-secondary/30 text-[10px] font-bold px-2 py-0.5 tracking-tighter uppercase">New</span>
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-headline text-lg md:text-xl text-white">Content Agency</h3>
                  <span className="font-headline text-primary font-bold">$149<span className="text-xs text-on-surface-variant font-normal">/mo</span></span>
                </div>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Automated marketing hub for social media, SEO blogs, and video scripts.</p>
                <div className="flex gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">group</span>
                    <span className="text-xs font-label text-white/80">3 Agents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">draw</span>
                    <span className="text-xs font-label text-white/80">Multi-Channel</span>
                  </div>
                </div>
                <button className="mt-auto w-full border border-primary/20 hover:bg-primary hover:text-on-primary transition-all py-3 font-headline text-[10px] md:text-xs tracking-widest font-bold">VIEW DETAILS</button>
              </div>
            </div>
            {/* Card 3 */}
            <div className="group surface-container-low glass-card rounded-sm overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300">
              <div className="h-48 relative">
                <img alt="DevOps Squad" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhfiicuGRp2V6w7M94vbvn-ll5xOEsxJsxCoFB59lqUkLCfwcr_KSQocayzf26JfDuIVpqlzGF3v7bMjpmq0A78DeJbsxom7oMVKqcYqT_uTYKImS8RThd4oLqKI112JpN1bn7Xne_QCgWoaQ-c82GerL_mCPGJefLGzxqdkBIMAJ7wq46LCkp5VdJW6w62ir77Ux0OEmoB2a17eZN-K777zLsMmNcfyFPtLaBdyH8LS7JJbEgU43YM0V7VW7j5UtT0_qI8Bvbdxw-"/>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-secondary/20 text-secondary border border-secondary/30 text-[10px] font-bold px-2 py-0.5 tracking-tighter uppercase">Pro</span>
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-headline text-lg md:text-xl text-white">DevOps Squad</h3>
                  <span className="font-headline text-primary font-bold">$499<span className="text-xs text-on-surface-variant font-normal">/mo</span></span>
                </div>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">24/7 infrastructure monitoring, security patching, and scaling automation.</p>
                <div className="flex gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">group</span>
                    <span className="text-xs font-label text-white/80">8 Agents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">shield</span>
                    <span className="text-xs font-label text-white/80">Auto-Scaling</span>
                  </div>
                </div>
                <button className="mt-auto w-full border border-primary/20 hover:bg-primary hover:text-on-primary transition-all py-3 font-headline text-[10px] md:text-xs tracking-widest font-bold">VIEW DETAILS</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works - Spacing Tightened */}
      <section className="py-16 md:py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">Three Steps to Autonomy</h2>
            <p className="font-body text-on-surface-variant text-lg max-w-xl mx-auto">Scale your operations without the friction of traditional hiring processes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0"></div>
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mb-8 border-2 border-primary group-hover:bg-primary/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                <span className="font-headline text-3xl font-bold text-primary">01</span>
              </div>
              <h3 className="font-headline text-xl text-white mb-4 uppercase tracking-wider">BROWSE</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-[250px]">Choose a specialized template tailored to your industry needs and goals.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mb-8 border-2 border-secondary group-hover:bg-secondary/20 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                <span className="font-headline text-3xl font-bold text-secondary">02</span>
              </div>
              <h3 className="font-headline text-xl text-white mb-4 uppercase tracking-wider">DEPLOY</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-[250px]">One-click install initializes your agents. No complex configuration required.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mb-8 border-2 border-tertiary group-hover:bg-tertiary/20 transition-all duration-300 shadow-[0_0_15px_rgba(107,255,143,0.2)]">
                <span className="font-headline text-3xl font-bold text-tertiary">03</span>
              </div>
              <h3 className="font-headline text-xl text-white mb-4 uppercase tracking-wider">MONITOR</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-[250px]">Watch your AI team work autonomously via your intuitive dashboard 24/7.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Core Ecosystem Section - Spacing Tightened */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border-l-2 border-secondary mb-8">
                <span className="font-label text-[10px] uppercase tracking-[0.3em] font-bold text-secondary">Why AgentForge</span>
              </div>
              <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-8 leading-tight uppercase">The Core<br/><span className="text-primary">Ecosystem</span></h2>
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 glass-card rounded-sm flex items-center justify-center border border-primary/20 group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
                  </div>
                  <div>
                    <h4 className="font-headline text-lg text-white mb-2 uppercase tracking-wide">Always Working</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-light">Agents communicate, problem-solve, and execute tasks without human intervention. They handle the complete lifecycle of projects.</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 glass-card rounded-sm flex items-center justify-center border border-secondary/20 group-hover:border-secondary transition-colors">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                  </div>
                  <div>
                    <h4 className="font-headline text-lg text-white mb-2 uppercase tracking-wide">Cost Control</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-light">Set hard limits on token usage and cloud spend. Your team stays within the budget you've set.</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 glass-card rounded-sm flex items-center justify-center border border-tertiary/20 group-hover:border-tertiary transition-colors">
                    <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
                  </div>
                  <div>
                    <h4 className="font-headline text-lg text-white mb-2 uppercase tracking-wide">Easy Monitoring</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-light">Real-time visualization of agent conversations, task status, and system health in a unified command dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative aspect-video rounded-sm glass-card border border-white/10 flex flex-col overflow-hidden shadow-2xl">
                  <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                    <div className="ml-4 h-4 w-32 bg-white/5 rounded-full"></div>
                  </div>
                  <div className="flex-grow flex flex-col items-center justify-center p-12 bg-surface-container-lowest/40 relative">
                    <div className="absolute inset-0 grid-pattern opacity-20"></div>
                    <div className="w-20 h-20 rounded-full border-4 border-dashed border-primary/20 flex items-center justify-center mb-6 animate-[spin_10s_linear_infinite]">
                      <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>play_circle</span>
                    </div>
                    <h5 className="font-headline text-white/40 text-sm tracking-[0.4em] uppercase mb-2">Animated Product Demo</h5>
                    <p className="font-body text-white/20 text-xs tracking-widest uppercase">System Initialization Pending...</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Platform Capabilities - Spacing Tightened */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h2 className="font-headline text-3xl font-bold text-white mb-10 uppercase tracking-[0.1em] border-l-4 border-secondary pl-6">Platform Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Feature 1 */}
            <div className="md:col-span-8 group surface-container-high glass-card p-10 flex flex-col justify-end min-h-[350px] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 blur-[80px] group-hover:bg-primary/10 transition-colors"></div>
              <span className="material-symbols-outlined text-primary text-5xl mb-8" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
              <h3 className="font-headline text-3xl text-white mb-4 uppercase tracking-wide">Autonomous Agents</h3>
              <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed font-light">
                Agents communicate, problem-solve, and execute tasks without human intervention. They handle the complete lifecycle of projects from ideation to deployment.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="md:col-span-4 group bg-surface-container-highest p-10 flex flex-col relative overflow-hidden">
              <span className="material-symbols-outlined text-secondary text-5xl mb-8">payments</span>
              <h3 className="font-headline text-xl text-white mb-4 uppercase tracking-wide">Cost Limits</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed font-light mb-12">
                Set hard limits on token usage and cloud spend. Your team stays within the budget you've set.
              </p>
              <div className="mt-auto flex items-center justify-between">
                <div className="h-[1px] flex-grow bg-outline-variant mr-4"></div>
                <span className="material-symbols-outlined text-white/30">trending_down</span>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="md:col-span-4 group bg-surface-container-highest p-10 flex flex-col relative overflow-hidden">
              <span className="material-symbols-outlined text-secondary text-5xl mb-8">monitoring</span>
              <h3 className="font-headline text-xl text-white mb-4 uppercase tracking-wide">Dashboard</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed font-light mb-12">
                Real-time visualization of agent conversations, task status, and system health in a unified dashboard experience.
              </p>
              <div className="mt-auto flex items-center justify-between">
                <div className="h-[1px] flex-grow bg-outline-variant mr-4"></div>
                <span className="material-symbols-outlined text-white/30">visibility</span>
              </div>
            </div>
            {/* Extra feature placeholder */}
            <div className="md:col-span-8 bg-gradient-to-br from-surface-container-high to-surface-container-low p-10 flex items-center justify-center border border-white/5">
              <div className="text-center">
                <span className="font-label text-xs tracking-[0.4em] text-on-surface-variant uppercase mb-4 block">Scalable Architecture</span>
                <p className="font-headline text-2xl text-white opacity-40">More features dropping Q4 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section - Spacing Tightened */}
      <section className="py-16 md:py-24 px-8 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter mb-4 uppercase">Frequently Asked Questions</h2>
            <div className="w-12 h-1 asymmetric-gradient mx-auto mb-6"></div>
                <p className="text-on-surface-variant font-label tracking-widest text-xs uppercase">Learn more about AgentForge</p>
          </div>
          <div className="space-y-4">
            <details className="group glass-card rounded-lg overflow-hidden border border-white/5 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-body text-lg font-medium tracking-wide text-white/90 group-hover:text-primary transition-colors">How quickly can I deploy a full AI workforce?</span>
                <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-6 pb-6 pt-0">
                <p className="font-body text-on-surface-variant leading-relaxed">
                  Deployment is near-instantaneous. Once you select a template and authorize the credits, our orchestrator initializes all agents, provisioned with their specific skill sets and tools, in under 120 seconds.
                </p>
              </div>
            </details>
            <details className="group glass-card rounded-lg overflow-hidden border border-white/5 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-body text-lg font-medium tracking-wide text-white/90 group-hover:text-primary transition-colors">What is the pricing model for autonomous operations?</span>
                <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-6 pb-6 pt-0">
                <p className="font-body text-on-surface-variant leading-relaxed">
                  We operate on a transparent monthly subscription model based on the template complexity. This covers compute and infrastructure. Token consumption is handled via a pre-paid credit system, allowing you to set hard caps on operational costs.
                </p>
              </div>
            </details>
            <details className="group glass-card rounded-lg overflow-hidden border border-white/5 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-body text-lg font-medium tracking-wide text-white/90 group-hover:text-primary transition-colors">Does AgentForge support Paperclip.ai integration?</span>
                <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-6 pb-6 pt-0">
                <p className="font-body text-on-surface-variant leading-relaxed">
                  Yes, full Paperclip.ai integration is native to our platform. You can sync your Paperclip workspaces directly with your agent teams, allowing them to read/write shared documents and maintain cross-platform state seamlessly.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-xl blur-3xl opacity-50"></div>
          <div className="relative glass-card p-12 md:p-32 rounded-sm text-center overflow-hidden border-white/10 bg-black/60 shadow-[0_0_100px_rgba(0,0,0,1)]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]"></div>
            <div className="relative z-10">
              <h2 className="font-headline text-4xl md:text-7xl font-black mb-8 leading-[1.1] uppercase tracking-tighter hero-glow text-white">
                Ready to build your<br/>
                <span className="text-primary">AI workforce?</span>
              </h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto mb-16 text-lg md:text-xl font-light font-body">
                Join over 2,500 forward-thinking companies scaling their operations with AGENTFORGE. Deploy your first team today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                <a href="/signup" className="w-full sm:w-auto bg-primary text-on-primary px-10 md:px-14 py-5 md:py-6 rounded-sm font-headline text-xs md:text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_40px_rgba(0,212,255,0.6)] hover:shadow-[0_0_60px_rgba(0,212,255,0.8)] hover:scale-105 transition-all active:scale-95">
                  GET STARTED FREE
                </a>
                <button className="w-full sm:w-auto px-10 md:px-14 py-5 md:py-6 rounded-sm font-headline text-xs md:text-sm font-bold tracking-[0.2em] uppercase border-2 border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-md">
                  SCHEDULE A DEMO
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter & Footer Area */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          {/* Newsletter Signup Section */}
          <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-headline text-2xl font-bold text-white mb-2 uppercase tracking-wide">Stay Updated</h3>
              <p className="text-on-surface-variant font-body">Get the latest news and early access to new agent features.</p>
            </div>
            <div className="relative group">
              <div className="flex items-center relative">
                <input className="w-full bg-surface-container-high border-white/10 focus:border-primary focus:ring-0 text-white font-body px-6 py-4 rounded-sm tracking-wide" placeholder="GET EARLY ACCESS (Enter email...)" type="email"/>
                <button className="absolute right-4 text-primary hover:text-secondary transition-colors" onClick={() => document.getElementById('code-toggle')?.classList.toggle('hidden')}>
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </button>
              </div>
              <div className="hidden mt-4 animate-in fade-in slide-in-from-top-2 duration-300" id="code-toggle">
                <div className="bg-surface-container-lowest p-4 border border-primary/20 rounded-sm font-mono text-[10px] md:text-xs text-primary/80 overflow-x-auto">
                  <pre>{`curl -X POST https://agentforge.io/api/subscribe \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "source": "ai-agent"}'`}</pre>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mt-2 pl-1 italic">
                  AI agents can use this endpoint to subscribe programmatically.
                </p>
              </div>
            </div>
          </div>
          {/* Footer Main */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-t border-white/5 pt-12">
            <div className="flex flex-col items-start">
              <div className="font-headline text-xl font-bold tracking-[0.3em] text-[#00d4ff] mb-4">
                AGENTFORGE
              </div>
              <div className="flex gap-6 mb-6">
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#" title="LinkedIn">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </a>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#" title="Discord">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.419-2.157 2.419z"></path></svg>
                </a>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#" title="GitHub">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                </a>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#" title="X">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>
                </a>
              </div>
                <p className="font-body text-[10px] tracking-[0.2em] text-white/40 uppercase">
                © 2024 AGENTFORGE. ALL SYSTEMS RUNNING
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-10 gap-y-4">
              <a className="font-body text-sm tracking-wide text-white/40 hover:text-primary transition-colors uppercase" href="#">Marketplace</a>
              <a className="font-body text-sm tracking-wide text-white/40 hover:text-primary transition-colors uppercase" href="#">Templates</a>
              <a className="font-body text-sm tracking-wide text-white/40 hover:text-primary transition-colors uppercase" href="#">Docs</a>
              <a className="font-body text-sm tracking-wide text-white/40 hover:text-primary transition-colors uppercase" href="#">Privacy</a>
              <a className="font-body text-sm tracking-wide text-white/60 hover:text-primary transition-colors uppercase font-bold border-b border-white/10" href="#">Contact &amp; Support</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}