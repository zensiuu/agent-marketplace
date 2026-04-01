import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AGENTFORGE | Command Your AI Army',
  description: 'Deploy autonomous AI operations. Command your AI army with precision.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <div className="min-h-screen bg-[#0a0a0a]">
          {/* Navigation Bar */}
          <nav className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-lg"></div>
                    <span className="relative text-2xl" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, color: '#00d4ff', letterSpacing: '4px' }}>
                      AGENT<span style={{ color: '#ffffff' }}>FORGE</span>
                    </span>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                  <a href="/marketplace" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500, letterSpacing: '2px' }}>
                    MARKETPLACE
                  </a>
                  <a href="/templates" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500, letterSpacing: '2px' }}>
                    TEMPLATES
                  </a>
                  <a href="/skills" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500, letterSpacing: '2px' }}>
                    SKILLS
                  </a>
                  <a href="/docs" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500, letterSpacing: '2px' }}>
                    DOCUMENTATION
                  </a>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                  <a href="/login" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500, letterSpacing: '1px' }}>
                    LOGIN
                  </a>
                  <a href="/signup" className="btn-primary text-xs" style={{ padding: '8px 20px' }}>
                    GET STARTED
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          {children}

          {/* Footer */}
          <footer className="border-t border-white/5 bg-[#0a0a0a]/50 py-12 mt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <span className="text-xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif', color: '#00d4ff', letterSpacing: '2px' }}>
                    AGENT<span className="text-white">FORGE</span>
                  </span>
                  <p className="mt-3 text-sm text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    The marketplace for AI agent companies. Deploy, manage, and scale autonomous teams.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>MARKETPLACE</h4>
                  <ul className="space-y-2 text-sm text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    <li><a href="/templates" className="hover:text-cyan-400 transition-colors">Templates</a></li>
                    <li><a href="/skills" className="hover:text-cyan-400 transition-colors">Skills</a></li>
                    <li><a href="/agents" className="hover:text-cyan-400 transition-colors">Agents</a></li>
                    <li><a href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>RESOURCES</h4>
                  <ul className="space-y-2 text-sm text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    <li><a href="/docs" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                    <li><a href="/blog" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                    <li><a href="/tutorials" className="hover:text-cyan-400 transition-colors">Tutorials</a></li>
                    <li><a href="/api" className="hover:text-cyan-400 transition-colors">API Reference</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>COMPANY</h4>
                  <ul className="space-y-2 text-sm text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    <li><a href="/about" className="hover:text-cyan-400 transition-colors">About</a></li>
                    <li><a href="/careers" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                    <li><a href="/contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
                    <li><a href="/status" className="hover:text-cyan-400 transition-colors">Status</a></li>
                  </ul>
                </div>
              </div>
              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="status-dot status-active"></span>
                  <span className="text-sm text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                    All systems operational
                  </span>
                </div>
                <div className="text-sm text-gray-600" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
                  © 2026 AgentForge. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
