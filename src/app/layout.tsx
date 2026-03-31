import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgentForge - The Marketplace for AI Agent Companies',
  description: 'Buy, sell, and deploy pre-built AI agent companies powered by Paperclip',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-slate-900">
          <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-xl font-bold text-white">AgentForge</span>
                </div>
                <div className="flex items-center gap-6">
                  <a href="/marketplace" className="text-sm text-gray-300 hover:text-white">
                    Marketplace
                  </a>
                  <a href="/templates" className="text-sm text-gray-300 hover:text-white">
                    Templates
                  </a>
                  <a href="/docs" className="text-sm text-gray-300 hover:text-white">
                    Docs
                  </a>
                  <button className="rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500">
                    Launch App
                  </button>
                </div>
              </div>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
