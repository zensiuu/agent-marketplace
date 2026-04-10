import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Get current session/user from Supabase
 */
export async function GET() {
  const supabase = await createSupabaseServerClient();

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Get session error:', error);
    return NextResponse.json(
      { error: 'Failed to get session' },
      { status: 500 }
    );
  }

  if (!session) {
    return NextResponse.json({ user: null, session: null });
  }

  return NextResponse.json({
    user: session.user,
    session: {
      access_token: session.access_token,
      expires_at: session.expires_at,
    },
  });
}