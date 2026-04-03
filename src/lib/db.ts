/**
 * AgentForge Database Connection Module
 * 
 * PostgreSQL connection pool using the `pg` package.
 * Configure DATABASE_URL in your .env.local file.
 * 
 * @example .env.local (Supabase):
 *   DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
 * 
 * @example .env.local (Local):
 *   DATABASE_URL=postgresql://user:password@localhost:5432/agentforge
 * 
 * Install pg when ready:
 *   npm install pg @types/pg
 */

import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';

// Database configuration from environment
const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.DB_POOL_MAX || '10', 10),
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
  connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000', 10),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

// Create connection pool (singleton pattern)
const pool = new Pool(databaseConfig);

// Handle pool errors gracefully
pool.on('error', (err: Error) => {
  console.error('Unexpected database pool error:', err.message);
});

// =====================================================
// QUERY HELPERS
// =====================================================

/**
 * Execute a parameterized query
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const result = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    
    // Log slow queries (>100ms) in development
    if (duration > 100 && process.env.NODE_ENV === 'development') {
      console.log('Slow query:', { text: text.substring(0, 100), duration, rows: result.rowCount });
    }
    
    return result;
  } catch (error) {
    console.error('Query error:', { text: text.substring(0, 100), error });
    throw error;
  }
}

/**
 * Get a client from the pool for transactions
 */
export async function getClient(): Promise<PoolClient> {
  const client = await pool.connect();
  return client;
}

/**
 * Execute a transaction with automatic commit/rollback
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// =====================================================
// CUSTOMER HELPERS
// =====================================================

export interface Customer {
  id: string;
  email: string;
  name: string;
  company: string | null;
  stripe_customer_id: string | null;
  auth0_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export async function findCustomerByEmail(email: string): Promise<Customer | null> {
  const result = await query<Customer>(
    'SELECT * FROM customers WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

export async function findCustomerById(id: string): Promise<Customer | null> {
  const result = await query<Customer>(
    'SELECT * FROM customers WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function createCustomer(data: {
  email: string;
  name: string;
  company?: string;
  stripe_customer_id?: string;
  auth0_id?: string;
}): Promise<Customer> {
  const result = await query<Customer>(
    `INSERT INTO customers (email, name, company, stripe_customer_id, auth0_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [data.email, data.name, data.company || null, data.stripe_customer_id || null, data.auth0_id || null]
  );
  return result.rows[0];
}

// =====================================================
// TEMPLATE HELPERS
// =====================================================

export interface Template {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  features: unknown[];
  image_url: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export async function getActiveTemplates(): Promise<Template[]> {
  const result = await query<Template>(
    'SELECT * FROM templates WHERE is_active = true ORDER BY created_at DESC'
  );
  return result.rows;
}

export async function getTemplateById(id: string): Promise<Template | null> {
  const result = await query<Template>(
    'SELECT * FROM templates WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function getTemplatesByCategory(category: string): Promise<Template[]> {
  const result = await query<Template>(
    'SELECT * FROM templates WHERE category = $1 AND is_active = true ORDER BY price ASC',
    [category]
  );
  return result.rows;
}

// =====================================================
// PURCHASE HELPERS
// =====================================================

export interface Purchase {
  id: string;
  customer_id: string;
  template_id: string;
  stripe_payment_id: string | null;
  stripe_checkout_session_id: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'refunded' | 'failed';
  created_at: Date;
  updated_at: Date;
}

export async function createPurchase(data: {
  customer_id: string;
  template_id: string;
  stripe_payment_id?: string;
  stripe_checkout_session_id?: string;
  amount: number;
  currency?: string;
}): Promise<Purchase> {
  const result = await query<Purchase>(
    `INSERT INTO purchases (customer_id, template_id, stripe_payment_id, stripe_checkout_session_id, amount, currency, status)
     VALUES ($1, $2, $3, $4, $5, $6, 'pending')
     RETURNING *`,
    [
      data.customer_id,
      data.template_id,
      data.stripe_payment_id || null,
      data.stripe_checkout_session_id || null,
      data.amount,
      data.currency || 'USD'
    ]
  );
  return result.rows[0];
}

export async function completePurchase(id: string, stripe_payment_id: string): Promise<void> {
  await query(
    `UPDATE purchases SET status = 'completed', stripe_payment_id = $2 WHERE id = $1`,
    [id, stripe_payment_id]
  );
}

export async function getCustomerPurchases(customer_id: string): Promise<Purchase[]> {
  const result = await query<Purchase>(
    'SELECT * FROM purchases WHERE customer_id = $1 ORDER BY created_at DESC',
    [customer_id]
  );
  return result.rows;
}

// =====================================================
// DEPLOYMENT HELPERS
// =====================================================

export interface Deployment {
  id: string;
  customer_id: string;
  template_id: string | null;
  name: string;
  paperclip_company_id: string | null;
  status: 'provisioning' | 'active' | 'paused' | 'suspended' | 'deleted';
  config: Record<string, unknown>;
  deployed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export async function createDeployment(data: {
  customer_id: string;
  template_id?: string;
  name: string;
  config?: Record<string, unknown>;
}): Promise<Deployment> {
  const result = await query<Deployment>(
    `INSERT INTO deployments (customer_id, template_id, name, config, status)
     VALUES ($1, $2, $3, $4, 'provisioning')
     RETURNING *`,
    [data.customer_id, data.template_id || null, data.name, data.config || {}]
  );
  return result.rows[0];
}

export async function getCustomerDeployments(customer_id: string): Promise<Deployment[]> {
  const result = await query<Deployment>(
    'SELECT * FROM deployments WHERE customer_id = $1 AND status != $2 ORDER BY created_at DESC',
    [customer_id, 'deleted']
  );
  return result.rows;
}

// =====================================================
// INTERACTION HELPERS
// =====================================================

export interface Interaction {
  id: string;
  customer_id: string;
  type: string;
  content: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: Date;
}

export async function logInteraction(data: {
  customer_id: string;
  type: string;
  content: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}): Promise<Interaction> {
  const result = await query<Interaction>(
    `INSERT INTO interactions (customer_id, type, content, metadata)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [data.customer_id, data.type, data.content, data.metadata || {}]
  );
  return result.rows[0];
}

export async function getCustomerInteractions(
  customer_id: string,
  limit = 50
): Promise<Interaction[]> {
  const result = await query<Interaction>(
    'SELECT * FROM interactions WHERE customer_id = $1 ORDER BY created_at DESC LIMIT $2',
    [customer_id, limit]
  );
  return result.rows;
}

// =====================================================
// AGENT TOKEN HELPERS (Token Vault)
// =====================================================

export interface AgentToken {
  id: string;
  customer_id: string;
  service_name: string;
  encrypted_token: string;
  label: string | null;
  is_active: boolean;
  last_used_at: Date | null;
  expires_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export async function storeAgentToken(data: {
  customer_id: string;
  service_name: string;
  encrypted_token: string;
  label?: string;
  expires_at?: Date;
}): Promise<AgentToken> {
  // Deactivate any existing tokens for this service
  await query(
    `UPDATE agent_tokens SET is_active = false WHERE customer_id = $1 AND service_name = $2`,
    [data.customer_id, data.service_name]
  );
  
  const result = await query<AgentToken>(
    `INSERT INTO agent_tokens (customer_id, service_name, encrypted_token, label, expires_at)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [data.customer_id, data.service_name, data.encrypted_token, data.label || null, data.expires_at || null]
  );
  return result.rows[0];
}

export async function getActiveAgentTokens(customer_id: string): Promise<AgentToken[]> {
  const result = await query<AgentToken>(
    `SELECT * FROM agent_tokens WHERE customer_id = $1 AND is_active = true ORDER BY service_name`,
    [customer_id]
  );
  return result.rows;
}

export async function getAgentToken(
  customer_id: string,
  service_name: string
): Promise<AgentToken | null> {
  const result = await query<AgentToken>(
    `SELECT * FROM agent_tokens WHERE customer_id = $1 AND service_name = $2 AND is_active = true`,
    [customer_id, service_name]
  );
  return result.rows[0] || null;
}

export async function markTokenUsed(id: string): Promise<void> {
  await query(
    'UPDATE agent_tokens SET last_used_at = CURRENT_TIMESTAMP WHERE id = $1',
    [id]
  );
}

// =====================================================
// HEALTH CHECK
// =====================================================

export async function checkConnection(): Promise<boolean> {
  try {
    await query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}

// =====================================================
// GRACEFUL SHUTDOWN
// =====================================================

export async function closePool(): Promise<void> {
  await pool.end();
}

// Export pool for advanced use cases
export { pool };
