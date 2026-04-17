'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserInfo } from '@/components/user-info';

const navigation = [
  { 
    name: 'Overview', 
    href: '/dashboard', 
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  { 
    name: 'Connections', 
    href: '/dashboard/connections', 
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  { 
    name: 'Templates', 
    href: '/dashboard/templates', 
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  { 
    name: 'Skills', 
    href: '/dashboard/skills', 
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
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

  useEffect(() => {
    setIsMounted(true);
    
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

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const isActive = (href: string) => pathname === href;

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#08090a] flex">
        <div className="w-64 border-r border-[rgba(255,255,255,0.05)] bg-[#0f1011] flex flex-col">
          <div className="h-14 flex items-center px-4 border-b border-[rgba(255,255,255,0.05)]">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center gap-4 p-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a3 3 0 013-3m0 3a3 3 0 01-3-3m3.75 11.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <span className="text-sm font-medium text-[#f7f8f8]">Settings</span>
              </div>
            </Link>
          </div>
        </div>
        <main className="flex-1 overflow-auto bg-[#08090a]">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090a] flex">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-screen z-40
          bg-[#0f1011] border-r border-[rgba(255,255,255,0.05)] flex flex-col
          transition-all duration-200 ease-in-out
          ${sidebarOpen ? 'w-60 translate-x-0' : 'w-16 -translate-x-full lg:w-16 lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-14 flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] px-4">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-md bg-[#5e6ad2] flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className={`text-sm font-medium text-[#f7f8f8] inter-display transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>AgentForge</span>
          </Link>
          
          {/* Toggle Button - Desktop */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex absolute right-0 translate-x-1/2 w-5 h-5 items-center justify-center rounded-full bg-[#28282c] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-200 hover:bg-[rgba(255,255,255,0.1)]"
            aria-label="Toggle sidebar"
          >
            <svg 
              className={`w-3 h-3 text-[#8a8f98] transition-transform duration-200 ${sidebarOpen ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center px-3 py-2 rounded-md transition-all duration-200 group
                ${isActive(item.href) 
                  ? 'bg-[rgba(94,106,210,0.15)] text-[#7170ff]' 
                  : 'text-[#8a8f98] hover:text-[#d0d6e0] hover:bg-[rgba(255,255,255,0.04)]'
                }
              `}
            >
              <span className={`flex-shrink-0 transition-all duration-200 ${sidebarOpen ? 'mr-2.5' : 'lg:mx-auto'}`}>{item.icon}</span>
              <span 
                className={`
                  text-sm font-medium inter-display transition-opacity duration-200 whitespace-nowrap
                  ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}
                `}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Settings button */}
        <div className="p-3 border-t border-[rgba(255,255,255,0.05)]">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a3 3 0 013-3m0 3a3 3 0 01-3-3m3.75 11.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <span className="text-sm text-[#8a8f98]">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className={`
        flex-1 min-h-screen transition-all duration-200 ease-in-out
        ${sidebarOpen ? 'lg:ml-60' : 'lg:ml-16'}
        ${!sidebarOpen && isMobile ? 'ml-0' : ''}
      `}>
        {/* Top bar for mobile */}
        <div className="lg:hidden h-14 flex items-center px-4 border-b border-[rgba(255,255,255,0.05)] bg-[#08090a]/95 backdrop-blur-sm sticky top-0 z-20">
          <button
            onClick={toggleSidebar}
            className="p-2 -ml-2 rounded-md hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <svg className="w-5 h-5 text-[#8a8f98]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="ml-2 text-sm font-medium text-[#f7f8f8]">AgentForge</span>
        </div>
        {children}
      </main>
    </div>
  );
}