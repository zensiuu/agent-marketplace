-- AgentForge Row Level Security (RLS) Policies (FIXED)
-- Run this after schema-fixed.sql to enable security

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tokens ENABLE ROW LEVEL SECURITY;

-- Templates table allows public reads (marketplace)
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES FOR CUSTOMERS TABLE
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own customer profile" ON customers;
DROP POLICY IF EXISTS "Users can insert own customer profile" ON customers;
DROP POLICY IF EXISTS "Users can update own customer profile" ON customers;

-- Users can only see their own customer record
CREATE POLICY "Users can view own customer profile" ON customers
    FOR SELECT USING (supabase_id = auth.uid());

-- Users can insert their own customer record (via signup)
CREATE POLICY "Users can insert own customer profile" ON customers
    FOR INSERT WITH CHECK (supabase_id = auth.uid());

-- Users can update their own customer record
CREATE POLICY "Users can update own customer profile" ON customers
    FOR UPDATE USING (supabase_id = auth.uid());

-- =====================================================
-- RLS POLICIES FOR PURCHASES TABLE
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own purchases" ON purchases;
DROP POLICY IF EXISTS "Users can insert own purchases" ON purchases;
DROP POLICY IF EXISTS "Users can update own purchases" ON purchases;

-- Users can only see their own purchases
CREATE POLICY "Users can view own purchases" ON purchases
    FOR SELECT USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- Users can insert their own purchases
CREATE POLICY "Users can insert own purchases" ON purchases
    FOR INSERT WITH CHECK (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- Users can update their own purchases (status updates)
CREATE POLICY "Users can update own purchases" ON purchases
    FOR UPDATE USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- =====================================================
-- RLS POLICIES FOR DEPLOYMENTS TABLE
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own deployments" ON deployments;
DROP POLICY IF EXISTS "Users can insert own deployments" ON deployments;
DROP POLICY IF EXISTS "Users can update own deployments" ON deployments;

-- Users can only see their own deployments
CREATE POLICY "Users can view own deployments" ON deployments
    FOR SELECT USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- Users can insert their own deployments
CREATE POLICY "Users can insert own deployments" ON deployments
    FOR INSERT WITH CHECK (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- Users can update their own deployments
CREATE POLICY "Users can update own deployments" ON deployments
    FOR UPDATE USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- =====================================================
-- RLS POLICIES FOR INTERACTIONS TABLE
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own interactions" ON interactions;
DROP POLICY IF EXISTS "Users can insert own interactions" ON interactions;

-- Users can only see their own interactions
CREATE POLICY "Users can view own interactions" ON interactions
    FOR SELECT USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- Users can insert their own interactions
CREATE POLICY "Users can insert own interactions" ON interactions
    FOR INSERT WITH CHECK (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- =====================================================
-- RLS POLICIES FOR AGENT_TOKENS TABLE
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own agent tokens" ON agent_tokens;
DROP POLICY IF EXISTS "Users can insert own agent tokens" ON agent_tokens;
DROP POLICY IF EXISTS "Users can update own agent tokens" ON agent_tokens;

-- Users can only see their own tokens
CREATE POLICY "Users can view own agent tokens" ON agent_tokens
    FOR SELECT USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- Users can insert their own tokens
CREATE POLICY "Users can insert own agent tokens" ON agent_tokens
    FOR INSERT WITH CHECK (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- Users can update their own tokens
CREATE POLICY "Users can update own agent tokens" ON agent_tokens
    FOR UPDATE USING (customer_id IN (
        SELECT id FROM customers WHERE supabase_id = auth.uid()
    ));

-- =====================================================
-- RLS POLICIES FOR TEMPLATES TABLE (PUBLIC READS)
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view active templates" ON templates;
DROP POLICY IF EXISTS "Authenticated can view all templates" ON templates;

-- Everyone can view active templates (marketplace)
CREATE POLICY "Public can view active templates" ON templates
    FOR SELECT USING (is_active = true);

-- Authenticated users can view all templates (including inactive)
CREATE POLICY "Authenticated can view all templates" ON templates
    FOR SELECT USING (auth.role() = 'authenticated');

-- =====================================================
-- DATABASE GRANTS
-- =====================================================

-- Grant permissions to authenticated role
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated;
GRANT SELECT ON public.templates TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.purchases TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.deployments TO authenticated;
GRANT SELECT, INSERT ON public.interactions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.agent_tokens TO authenticated;

-- Grant public read access to templates (marketplace)
GRANT SELECT ON public.templates TO anon;

-- Grant usage on sequences for UUID generation
GRANT USAGE ON SEQUENCE customers_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE purchases_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE deployments_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE interactions_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE agent_tokens_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE templates_id_seq TO authenticated;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('customers', 'purchases', 'deployments', 'interactions', 'agent_tokens', 'templates');

-- Check policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';

-- Check grants
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
AND grantee = 'authenticated';
