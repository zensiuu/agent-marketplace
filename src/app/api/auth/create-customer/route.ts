import { NextRequest, NextResponse } from 'next/server';
import { createCustomer, findCustomerByEmail } from '@/lib/db';

/**
 * Create a customer record after Supabase signup
 * Called from the signup page after successful Supabase auth signup
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email, name, company } = body;

    if (!userId || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, email, name' },
        { status: 400 }
      );
    }

    // Check if customer already exists
    const existing = await findCustomerByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'Customer already exists' },
        { status: 409 }
      );
    }

    // Create new customer
    const customer = await createCustomer({
      email,
      name,
      company,
      // Store Supabase user ID for future session lookups
      // Note: In Supabase auth, you can look up users by their auth ID
    });

    return NextResponse.json({ customer });
  } catch (error) {
    console.error('Create customer error:', error);
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}