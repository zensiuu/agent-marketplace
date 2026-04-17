-- =====================================================
-- AGENTFORGE COMPLETE DATABASE DEPLOYMENT
-- =====================================================
-- 
-- INSTRUCTIONS:
-- 1. Run this entire file in Supabase SQL Editor
-- 2. Execute all at once or section by section
-- 3. Verify no errors occur
-- =====================================================

-- =====================================================
-- STEP 1: CREATE SCHEMA (Fixed version)
-- =====================================================

-- Enable UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- STEP 2: CREATE TABLESS (Fixed version)
-- =====================================================

-- CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    stripe_customer_id VARCHAR(255),
    supabase_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS templates (
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

-- PURCHASES TABLE
CREATE TABLE IF NOT EXISTS purchases (
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

-- DEPLOYMENTS TABLE
CREATE TABLE IF NOT EXISTS deployments (
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

-- INTERACTIONS TABLE
CREATE TABLE IF NOT EXISTS interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('chat', 'support_ticket', 'email', 'purchase', 'deployment', 'api_call', 'page_view')),
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AGENT_TOKENS TABLE
CREATE TABLE IF NOT EXISTS agent_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    service_name VARCHAR(100) NOT NULL,
    encrypted_token TEXT NOT NULL,
    label VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_active_service_per_customer UNIQUE (customer_id, service_name)
);

-- =====================================================
-- STEP 3: CREATE INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_stripe ON customers(stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_active ON templates(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_templates_price ON templates(price);
CREATE INDEX IF NOT EXISTS idx_purchases_customer ON purchases(customer_id);
CREATE INDEX IF NOT EXISTS idx_purchases_template ON purchases(template_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);
CREATE INDEX IF NOT EXISTS idx_deployments_customer ON deployments(customer_id);
CREATE INDEX IF NOT EXISTS idx_deployments_status ON deployments(status);
CREATE INDEX IF NOT EXISTS idx_interactions_customer ON interactions(customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_tokens_customer ON agent_tokens(customer_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_agent_tokens_active ON agent_tokens(customer_id, service_name) WHERE is_active = true;

-- =====================================================
-- STEP 4: CREATE TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_templates_updated_at ON templates;
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_purchases_updated_at ON purchases;
CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON purchases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_deployments_updated_at ON deployments;
CREATE TRIGGER update_deployments_updated_at BEFORE UPDATE ON deployments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_agent_tokens_updated_at ON agent_tokens;
CREATE TRIGGER update_agent_tokens_updated_at BEFORE UPDATE ON agent_tokens
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STEP 5: ENABLE RLS
-- =====================================================

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 6: CREATE RLS POLICIES
-- =====================================================

-- CUSTOMERS POLICIES
CREATE POLICY "Users can view own customer profile" ON customers
    FOR SELECT USING (supabase_id = auth.uid());

CREATE POLICY "Users can insert own customer profile" ON customers
    FOR INSERT WITH CHECK (supabase_id = auth.uid());

CREATE POLICY "Users can update own customer profile" ON customers
    FOR UPDATE USING (supabase_id = auth.uid());

-- PURCHASES POLICIES
CREATE POLICY "Users can view own purchases" ON purchases
    FOR SELECT USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

CREATE POLICY "Users can insert own purchases" ON purchases
    FOR INSERT WITH CHECK (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

CREATE POLICY "Users can update own purchases" ON purchases
    FOR UPDATE USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- DEPLOYMENTS POLICIES
CREATE POLICY "Users can view own deployments" ON deployments
    FOR SELECT USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

CREATE POLICY "Users can insert own deployments" ON deployments
    FOR INSERT WITH CHECK (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

CREATE POLICY "Users can update own deployments" ON deployments
    FOR UPDATE USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- INTERACTIONS POLICIES
CREATE POLICY "Users can view own interactions" ON interactions
    FOR SELECT USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

CREATE POLICY "Users can insert own interactions" ON interactions
    FOR INSERT WITH CHECK (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- AGENT_TOKENS POLICIES
CREATE POLICY "Users can view own agent tokens" ON agent_tokens
    FOR SELECT USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

CREATE POLICY "Users can insert own agent tokens" ON agent_tokens
    FOR INSERT WITH CHECK (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

CREATE POLICY "Users can update own agent tokens" ON agent_tokens
    FOR UPDATE USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- TEMPLATES POLICIES (PUBLIC READS)
CREATE POLICY "Public can view active templates" ON templates
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated can view all templates" ON templates
    FOR SELECT USING (auth.role() = 'authenticated');

-- =====================================================
-- STEP 7: APPLY DATABASE GRANTS
-- =====================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated;
GRANT SELECT ON public.templates TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.purchases TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.deployments TO authenticated;
GRANT SELECT, INSERT ON public.interactions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.agent_tokens TO authenticated;
GRANT SELECT ON public.templates TO anon;

-- =====================================================
-- STEP 8: INSERT SAMPLE DATA
-- =====================================================

INSERT INTO templates (name, description, price, category, features, image_url, is_active) VALUES
(
    'SaaS Startup',
    'A fully automated startup team with CEO, CTO, and developer agents. Perfect for building and launching your SaaS product from idea to deployment.',
    299.00,
    'Development',
    '[{"name": "CEO Agent", "role": "Strategic planning and decision making"}, {"name": "CTO Agent", "role": "Technical architecture and code review"}, {"name": "Developer Agent", "role": "Code implementation and bug fixes"}, {"name": "Product Agent", "role": "Feature prioritization and user stories"}, {"name": "DevOps Agent", "role": "CI/CD and deployment automation"}]'::jsonb,
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
    true
),
(
    'Content Agency',
    'AI-powered content team that handles ideation, creation, SEO optimization, and social media distribution. Scale your content without hiring.',
    199.00,
    'Marketing',
    '[{"name": "Content Director", "role": "Content strategy and editorial calendar"}, {"name": "Copywriter Agent", "role": "Blog posts, landing pages, and emails"}, {"name": "SEO Agent", "role": "Keyword research and on-page optimization"}, {"name": "Social Media Agent", "role": "Twitter, LinkedIn, and Instagram posts"}, {"name": "Graphic Designer Agent", "role": "Social media graphics and banners"}]'::jsonb,
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
    true
),
(
    'Stripe Integration',
    'Complete Stripe payment integration with webhooks, subscription management, and fraud detection.',
    29.00,
    'Skills',
    '[{"name": "Payment Processing", "role": "Handle one-time and recurring payments"}, {"name": "Webhook Handler", "role": "Process Stripe events in real-time"}, {"name": "Subscription Manager", "role": "Manage customer subscriptions"}, {"name": "Fraud Detection", "role": "Analyze suspicious transactions"}]'::jsonb,
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    true
),
(
    'Auth System',
    'Complete authentication system with OAuth, JWT tokens, password reset, and multi-factor authentication.',
    39.00,
    'Skills',
    '[{"name": "OAuth Provider", "role": "Google, GitHub, Apple login"}, {"name": "JWT Manager", "role": "Token generation and validation"}, {"name": "Password Reset", "role": "Secure password recovery"}, {"name": "MFA Handler", "role": "Two-factor authentication"}]'::jsonb,
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    true
);

-- =====================================================
-- STEP 9: VERIFICATION
-- =====================================================

-- Check everything was created successfully
SELECT 'Tables created successfully' as status FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('customers', 'templates', 'purchases', 'deployments', 'interactions', 'agent_tokens');

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('customers', 'templates', 'purchases', 'deployments', 'interactions', 'agent_tokens');

-- Check policies exist
SELECT COUNT(*) as policy_count FROM pg_policies WHERE schemaname = 'public';

-- Check sample data
SELECT COUNT(*) as template_count FROM templates;

-- =====================================================
-- DEPLOYMENT COMPLETE
-- =====================================================
