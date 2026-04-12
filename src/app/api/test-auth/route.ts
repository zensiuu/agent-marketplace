import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test Supabase connection
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Test a simple query
    const { data, error } = await supabase.from('customers').select('count').single();

    if (error && error.code !== 'PGRST116') { // Ignore "relation does not exist" error
      return NextResponse.json({ 
        status: 'error', 
        message: 'Supabase connection failed',
        error: error.message 
      });
    }

    return NextResponse.json({ 
      status: 'success', 
      message: 'Supabase connection working',
      envVars: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Configuration error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
