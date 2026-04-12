-- AgentForge PostgreSQL Schema
-- Run this after creating your database: psql $DATABASE_URL -f db/schema.sql

-- Enable UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CUSTOMERS TABLE
-- User profiles linked to Supabase Auth and Stripe
-- =====================================================
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    stripe_customer_id VARCHAR(255),
    supabase_id VARCHAR(255), -- Supabase Auth user identifier
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for email lookups
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_stripe ON customers(stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;

-- =====================================================
-- TEMPLATES TABLE
-- Agent templates marketplace
-- =====================================================
CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    category VARCHAR(100) NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for category filtering and active templates
CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_templates_active ON templates(is_active) WHERE is_active = true;
CREATE INDEX idx_templates_price ON templates(price);

-- =====================================================
-- PURCHASES TABLE
-- Template purchase records
-- =====================================================
CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    template_id UUID NOT NULL REFERENCES templates(id) ON DELETE RESTRICT,
    stripe_payment_id VARCHAR(255) UNIQUE,
    stripe_checkout_session_id VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'refunded', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for customer purchase history
CREATE INDEX idx_purchases_customer ON purchases(customer_id);
CREATE INDEX idx_purchases_template ON purchases(template_id);
CREATE INDEX idx_purchases_status ON purchases(status);
CREATE INDEX idx_purchases_stripe ON purchases(stripe_payment_id) WHERE stripe_payment_id IS NOT NULL;

-- =====================================================
-- DEPLOYMENTS TABLE
-- Deployed agent companies via Paperclip
-- =====================================================
CREATE TABLE deployments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    template_id UUID REFERENCES templates(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    paperclip_company_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'provisioning' CHECK (status IN ('provisioning', 'active', 'paused', 'suspended', 'deleted')),
    config JSONB DEFAULT '{}'::jsonb,
    deployed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for customer deployments
CREATE INDEX idx_deployments_customer ON deployments(customer_id);
CREATE INDEX idx_deployments_status ON deployments(status);
CREATE INDEX idx_deployments_paperclip ON deployments(paperclip_company_id) WHERE paperclip_company_id IS NOT NULL;

-- =====================================================
-- INTERACTIONS TABLE
-- Customer interaction logs for memory/analytics
-- =====================================================
CREATE TABLE interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('chat', 'support_ticket', 'email', 'purchase', 'deployment', 'api_call', 'page_view')),
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for customer interaction history (descending for recent first)
CREATE INDEX idx_interactions_customer ON interactions(customer_id, created_at DESC);
CREATE INDEX idx_interactions_type ON interactions(type);
CREATE INDEX idx_interactions_created ON interactions(created_at DESC);

-- =====================================================
-- AGENT_TOKENS TABLE
-- Encrypted API tokens for Token Vault (connected services)
-- =====================================================
CREATE TABLE agent_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    service_name VARCHAR(100) NOT NULL,
    encrypted_token TEXT NOT NULL,
    label VARCHAR(255), -- User-defined label (e.g., "Production Claude")
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Each service can only have one active token per customer (using partial unique index)
    CONSTRAINT unique_active_service_per_customer UNIQUE (customer_id, service_name)
);

-- Index for token lookups
CREATE INDEX idx_agent_tokens_customer ON agent_tokens(customer_id);
CREATE INDEX idx_agent_tokens_service ON agent_tokens(service_name);
CREATE UNIQUE INDEX idx_agent_tokens_active ON agent_tokens(customer_id, service_name) WHERE is_active = true;

-- =====================================================
-- TRIGGER: Auto-update updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at column
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON purchases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deployments_updated_at BEFORE UPDATE ON deployments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_tokens_updated_at BEFORE UPDATE ON agent_tokens
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
