import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createStripeCustomer, createCheckoutSession, getStripeCustomer, findStripeCustomerByEmail } from '@/lib/stripe';
import { getCurrentUser } from '@/lib/get-server-session';
import { createSupabaseServerClient } from '@/lib/supabase/server';

// Validation schemas
const CreatePaymentIntentSchema = z.object({
  templateId: z.string().min(1, 'Template ID is required'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().optional().default('usd'),
});

const CreateCheckoutSchema = z.object({
  templateId: z.string().min(1, 'Template ID is required'),
  templateName: z.string().min(1, 'Template name is required'),
  price: z.number().positive('Price must be positive'),
  successUrl: z.string().url('Invalid success URL'),
  cancelUrl: z.string().url('Invalid cancel URL'),
});

/**
 * POST /api/payments
 * Create a checkout session for purchasing a template
 */
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const result = CreateCheckoutSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { templateId, templateName, price, successUrl, cancelUrl } = result.data;

    // Validate user has email
    if (!user.email) {
      return NextResponse.json({ error: 'User email is required for payments' }, { status: 400 });
    }

    // Get or create Stripe customer
    let customerId: string | undefined;

    try {
      // Try to find existing customer in Stripe
      let stripeCustomer = await findStripeCustomerByEmail(user.email);
      
      if (!stripeCustomer) {
        // Create new Stripe customer
        stripeCustomer = await createStripeCustomer({
          email: user.email,
          name: user.name || undefined,
          metadata: {
            userId: user.id,
          },
        });
      }
      
      customerId = stripeCustomer.id;
    } catch (stripeError) {
      console.warn('Stripe unavailable, creating guest checkout session:', stripeError);
    }

    // If Stripe is not configured, return mock checkout for demo
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        checkoutUrl: successUrl, // In production, this would be Stripe checkout URL
        sessionId: `demo_session_${Date.now()}`,
        mode: 'demo',
        message: 'Demo mode: Stripe not configured. In production, this would redirect to Stripe checkout.',
      });
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      lineItems: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: templateName,
            description: `AI Agent Template: ${templateName}`,
          },
          unit_amount: Math.round(price * 100), // Convert to cents
        },
        quantity: 1,
      }],
      customerId,
      customerEmail: user.email,
      successUrl: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl,
      metadata: {
        userId: user.id,
        templateId,
      },
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      sessionId: session.id,
    });

  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: 'Failed to create payment session' }, { status: 500 });
  }
}

/**
 * GET /api/payments
 * Retrieve payment session status
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // If Stripe is not configured, return demo response
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        status: 'demo',
        sessionId,
        paymentStatus: 'paid',
        message: 'Demo mode: Stripe not configured',
      });
    }

    // Import dynamically to handle missing Stripe key
    const { getCheckoutSession } = await import('@/lib/stripe');
    const session = await getCheckoutSession(sessionId);

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json({
      status: session.payment_status,
      customerEmail: session.customer_email || undefined,
      amountTotal: session.amount_total,
      currency: session.currency,
    });

  } catch (error) {
    console.error('Payment status error:', error);
    return NextResponse.json({ error: 'Failed to retrieve payment status' }, { status: 500 });
  }
}

/**
 * DELETE /api/payments
 * Cancel/refund a payment (requires authentication)
 */
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // In production, this would process a refund through Stripe
    // For now, return a mock response
    return NextResponse.json({
      success: true,
      message: 'Payment cancelled (demo mode)',
      sessionId,
    });

  } catch (error) {
    console.error('Payment cancellation error:', error);
    return NextResponse.json({ error: 'Failed to cancel payment' }, { status: 500 });
  }
}