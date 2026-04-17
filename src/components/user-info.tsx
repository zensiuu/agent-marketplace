'use client';

import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase/supabase';
import { useRouter } from 'next/navigation';

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
    <div>
      <div className="flex items-center gap-3 p-2 rounded-md bg-[rgba(255,255,255,0.02)]">
        <div className="w-8 h-8 rounded-full bg-[#5e6ad2] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-[#f7f8f8] truncate">{displayName}</p>
          <p className="text-xs text-[#62666d] truncate">{user.email}</p>
        </div>
      </div>
      <button
        onClick={handleSignOut}
        className="w-full mt-2 py-2 text-xs text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[rgba(255,255,255,0.04)] rounded-md transition-colors"
      >
        Sign out
      </button>
    </div>
  );
}