/**
 * AgentForge Stripe Configuration
 * 
 * Stripe SDK setup for payment processing.
 * Configure STRIPE_SECRET_KEY in your .env.local file.
 */

import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;

// Lazy initialize Stripe only when key is available
const getStripe = () => {
  if (!stripeKey) {
    throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY environment variable.');
  }
  return new Stripe(stripeKey, {
    apiVersion: '2026-03-25.dahlia' as const,
    typescript: true,
  });
};

export const stripe = {
  get customers() {
    return getStripe().customers;
  },
  get checkout() {
    return getStripe().checkout;
  },
  get paymentIntents() {
    return getStripe().paymentIntents;
  },
  get prices() {
    return getStripe().prices;
  },
  get products() {
    return getStripe().products;
  },
  get webhooks() {
    return getStripe().webhooks;
  },
};

// =====================================================
// STRIPE CUSTOMER HELPERS
// =====================================================

/**
 * Create a Stripe customer for a user
 */
export async function createStripeCustomer(data: {
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.Customer> {
  return stripe.customers.create({
    email: data.email,
    name: data.name,
    metadata: data.metadata,
  });
}

/**
 * Get Stripe customer by ID
 */
export async function getStripeCustomer(customerId: string): Promise<Stripe.Customer | null> {
  try {
    return await stripe.customers.retrieve(customerId) as Stripe.Customer;
  } catch {
    return null;
  }
}

/**
 * Get Stripe customer by email
 */
export async function findStripeCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  const customers = await stripe.customers.list({
    email,
    limit: 1,
  });
  return customers.data[0] || null;
}

// =====================================================
// STRIPE PAYMENT HELPERS
// =====================================================

/**
 * Create a payment intent for purchasing a template or skill
 */
export async function createPaymentIntent(data: {
  amount: number; // Amount in cents
  currency?: string;
  customerId?: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.create({
    amount: data.amount,
    currency: data.currency || 'usd',
    customer: data.customerId,
    metadata: data.metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  });
}

/**
 * Create a checkout session for purchasing items
 */
export async function createCheckoutSession(data: {
  lineItems: Array<{
    price_data: {
      currency: string;
      product_data: {
        name: string;
        description?: string;
        images?: string[];
      };
      unit_amount: number; // Amount in cents
    };
    quantity: number;
  }>;
  customerId?: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: data.lineItems,
    customer: data.customerId,
    customer_email: data.customerEmail,
    success_url: data.successUrl,
    cancel_url: data.cancelUrl,
    metadata: data.metadata,
    allow_promotion_codes: true,
  });
}

/**
 * Retrieve a payment intent
 */
export async function getPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent | null> {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch {
    return null;
  }
}

/**
 * Retrieve a checkout session
 */
export async function getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session | null> {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}

// =====================================================
// STRIPE WEBHOOK HELPERS
// =====================================================

/**
 * Construct webhook event from request body
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

// =====================================================
// STRIPE PRICE HELPERS
// =====================================================

/**
 * Create a price for a product (templates/skills)
 */
export async function createPrice(data: {
  productName: string;
  unitAmount: number; // Amount in cents
  currency?: string;
  recurring?: boolean;
}): Promise<Stripe.Price> {
  const product = await stripe.products.create({
    name: data.productName,
  });

  return stripe.prices.create({
    product: product.id,
    unit_amount: data.unitAmount,
    currency: data.currency || 'usd',
    ...(data.recurring && {
      recurring: {
        interval: 'month',
      },
    }),
  });
}

/**
 * Get a price by ID
 */
export async function getPrice(priceId: string): Promise<Stripe.Price | null> {
  try {
    return await stripe.prices.retrieve(priceId);
  } catch {
    return null;
  }
}