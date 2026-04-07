'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { 
    name: 'Overview', 
    href: '/dashboard', 
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  { 
    name: 'Connections', 
    href: '/dashboard/connections', 
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  { 
    name: 'Deploy', 
    href: '/dashboard/deploy', 
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5L10.5 3m0 0l5.25 4.5M10.5 3v16.5" />
      </svg>
    ),
  },
  { 
    name: 'Templates', 
    href: '/dashboard/templates', 
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize sidebar state from localStorage and detect mobile
  useEffect(() => {
    setIsMounted(true);
    
    // Check for saved sidebar state
    const savedState = localStorage.getItem('sidebar-open');
    if (savedState !== null) {
      setSidebarOpen(savedState === 'true');
    }
    
    // Check if mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Save sidebar state to localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('sidebar-open', String(sidebarOpen));
    }
  }, [sidebarOpen, isMounted]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const isActive = (href: string) => pathname === href;

  // Prevent flash of incorrect state
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex">
        <div className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-white/5">
            <span className="text-xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif', color: '#00d4ff', letterSpacing: '2px' }}>
              AGENT<span style={{ color: '#ffffff' }}>FORGE</span>
            </span>
          </div>
        </div>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Fixed/Sticky, collapsible */}
      <aside 
        className={`
          fixed top-0 left-0 h-screen z-40
          bg-[#0a0a0a] border-r border-white/5 flex flex-col
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0 lg:w-20'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center border-b border-white/5 relative">
          {/* Mobile Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-colors z-50 lg:hidden"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center rounded-full bg-[#0a0a0a] border border-white/20 hover:border-cyan-500/50 transition-colors z-50"
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <svg 
              className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className={`flex items-center px-6 transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'lg:opacity-0'}`}>
            <Link href="/">
              <span 
                className="text-xl font-bold whitespace-nowrap"
                style={{ fontFamily: 'Orbitron, sans-serif', color: '#00d4ff', letterSpacing: '2px' }}
              >
                AGENT<span style={{ color: '#ffffff' }}>FORGE</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${isActive(item.href) 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
                ${sidebarOpen ? 'justify-start' : 'lg:justify-center lg:px-0'}
              `}
              title={!sidebarOpen ? item.name : undefined}
            >
              <span className={sidebarOpen ? '' : 'lg:mx-auto'}>{item.icon}</span>
              <span 
                className={`
                  text-sm font-medium whitespace-nowrap
                  ${sidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0'}
                `}
                style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/5">
          <div className={`
            glass-card p-4 transition-all duration-300
            ${sidebarOpen ? '' : 'lg:p-2'}
          `}>
            <div className={`flex items-center gap-3 ${sidebarOpen ? '' : 'lg:justify-center'}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                D
              </div>
              <div className={`
                flex-1 min-w-0 transition-all duration-300
                ${sidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0'}
              `}>
                <p className="text-sm text-white truncate" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Demo User
                </p>
                <p className="text-xs text-gray-500 truncate">demo@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content - adjusted margin when sidebar is collapsed on desktop */}
      <main className={`
        flex-1 min-h-screen transition-all duration-300
        ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
      `}>
        {/* Top bar for mobile */}
        <div className="lg:hidden h-16 flex items-center px-4 border-b border-white/5 bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-20">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span 
            className="ml-4 text-lg font-bold text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}
          >
            AGENT<span className="text-cyan-400">FORGE</span>
          </span>
        </div>
        {children}
      </main>
    </div>
  );
}
