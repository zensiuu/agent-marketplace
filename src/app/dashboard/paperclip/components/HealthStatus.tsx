'use client';

import { useEffect, useState } from 'react';
import { paperclipApi } from '@/lib/paperclip-client';
import type { HealthStatus } from '@/types/paperclip';

export default function HealthStatus() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    paperclipApi.healthCheck()
      .then(setHealth)
      .catch(() => setHealth({ status: 'disconnected' }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse h-6 w-24 bg-gray-200 rounded"></div>
    );
  }

  const isConnected = health?.status === 'connected';

  return (
    <div className="flex items-center gap-2">
      <span className={`relative flex h-3 w-3`}>
        {isConnected ? (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        ) : (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
      </span>
      <span className={`text-sm font-medium ${isConnected ? 'text-green-700' : 'text-red-700'}`}>
        {isConnected ? 'Paperclip Connected' : 'Paperclip Disconnected'}
      </span>
    </div>
  );
}
