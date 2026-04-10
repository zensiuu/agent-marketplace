import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createCustomer, findCustomerByEmail } from '@/lib/db';

/**
 * OAuth callback handler for Supabase OAuth
 * This route is called after OAuth provider authentication
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createSupabaseServerClient();

    // Exchange code for session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error('Session exchange error:', sessionError);
      return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
    }

    const user = sessionData.user;

    if (user) {
      // Get user metadata from Supabase
      const email = user.email;
      const name = user.user_metadata?.name || user.user_metadata?.full_name || '';
      const company = user.user_metadata?.company || '';

      // Check if customer already exists
      let customer = await findCustomerByEmail(email!);

      // If not, create customer record
      if (!customer) {
        try {
          customer = await createCustomer({
            email: email!,
            name: name as string || 'User',
            company: company as string || undefined,
          });
          console.log('Created customer:', customer.id);
        } catch (err) {
          console.error('Failed to create customer:', err);
          // Continue to dashboard even if customer creation fails
        }
      }
    }
  }

  // Redirect to dashboard after successful OAuth
  return NextResponse.redirect(new URL('/dashboard', request.url));
}