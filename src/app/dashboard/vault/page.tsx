'use client';

import { useEffect } from 'react';

export default function TokenVaultRedirect() {
  useEffect(() => {
    // Redirect to the new connections page
    window.location.href = '/dashboard/connections';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full mx-auto mb-4"></div>
        <p className="text-gray-400">Redirecting to Connections...</p>
      </div>
    </div>
  );
}
