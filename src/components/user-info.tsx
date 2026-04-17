'use client';

import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  email: string | null;
  user_metadata: {
    name?: string;
    full_name?: string;
  };
}

export function UserInfo() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseClient();
    
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user as unknown as User);
      }
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as unknown as User || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 p-2">
        <div className="w-8 h-8 rounded-full bg-[#5e6ad2] animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3 p-2">
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs">
          ?
        </div>
      </div>
    );
  }

  const displayName = user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-[rgba(255,255,255,0.02)]">
      <div className="flex-1">
        <p className="text-sm text-[#f7f8f8] truncate font-medium">{displayName}</p>
      </div>
      <Link
        href="/dashboard/settings"
        className="p-2 rounded-2xl hover:bg-[rgba(255,255,255,0.05)] transition-colors"
        title="Settings"
      >
        <svg className="w-4 h-4 text-[#8a8f98]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a3 3 0 013-3m0 3a3 3 0 01-3-3m3.75 11.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      </Link>
    </div>
  );
}