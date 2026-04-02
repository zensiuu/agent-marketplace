'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const navigation = {
  overview: { name: 'Overview', href: '/dashboard', icon: '📊' },
  deployments: { name: 'Deployments', href: '/dashboard/deployments', icon: '🚀' },
  templates: { name: 'Templates', href: '/dashboard/templates', icon: '📦' },
  settings: { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPath, setCurrentPath] = useState('/dashboard');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const isActive = (href: string) => currentPath === href;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0a0a0a]">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/">
            <span 
              className="text-xl font-bold"
              style={{ fontFamily: 'Orbitron, sans-serif', color: '#00d4ff', letterSpacing: '2px' }}
            >
              AGENT<span style={{ color: '#ffffff' }}>FORGE</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {Object.values(navigation).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${isActive(item.href) 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <span>{item.icon}</span>
              <span 
                className="text-sm font-medium"
                style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-white/5">
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                U
              </div>
              <div>
                <p className="text-sm text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>User</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
