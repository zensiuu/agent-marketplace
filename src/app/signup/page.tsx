'use client';

import { useEffect } from 'react';

export default function SignupPage() {
  useEffect(() => {
    // Redirect to Auth0 signup
    window.location.href = '/api/auth/signup';
  }, []);

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="glass-card p-8">
          <div className="mb-6">
            <div className="w-12 h-12 mx-auto mb-4 border-2 border-primary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary animate-spin" style={{ fontVariationSettings: "'FILL' 1" }}>
                sync
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}>
              REDIRECTING...
            </h1>
            <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Taking you to secure signup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
