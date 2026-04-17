-- AgentForge Skills Table Migration
-- Run this after schema-fixed.sql to add the skills marketplace table

-- =====================================================
-- SKILLS TABLE
-- AI Agent Skills marketplace (modular capabilities)
-- =====================================================
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'general',
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    version VARCHAR(50) DEFAULT '1.0.0',
    tags JSONB DEFAULT '[]'::jsonb,
    capabilities JSONB DEFAULT '{}'::jsonb,
    seller_id VARCHAR(255),
    seller_name VARCHAR(255),
    rating DECIMAL(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    purchases INTEGER DEFAULT 0,
    documentation_url VARCHAR(500),
    demo_url VARCHAR(500),
    github_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for skills
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_active ON skills(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_skills_price ON skills(price);
CREATE INDEX IF NOT EXISTS idx_skills_seller ON skills(seller_id);
CREATE INDEX IF NOT EXISTS idx_skills_rating ON skills(rating) WHERE rating > 0;

-- =====================================================
-- SEED DATA: Sample Skills
-- =====================================================
INSERT INTO skills (name, description, category, price, version, tags, capabilities, seller_name, rating, purchases) VALUES
(
    'Web Search Agent',
    'Search the web for current information, news, and updates',
    'research',
    29.99,
    '1.0.0',
    '["search", "research", "web"]'::jsonb,
    '{"search": true, "filters": true, "recent": true}'::jsonb,
    'AgentForge',
    4.8,
    1247
),
(
    'Data Analysis',
    'Analyze datasets and generate insights with charts',
    'analytics',
    49.99,
    '2.1.0',
    '["analytics", "data", "charts"]'::jsonb,
    '{"charts": true, "export": true, "pivot": true}'::jsonb,
    'AgentForge',
    4.9,
    892
),
(
    'Email Writer',
    'Compose professional emails with AI-powered templates',
    'productivity',
    19.99,
    '1.2.0',
    '["email", "writing", "productivity"]'::jsonb,
    '{"templates": true, "tone": true, "followup": true}'::jsonb,
    'AgentForge',
    4.7,
    2156
),
(
    'Code Reviewer',
    'Automated code review with security and performance suggestions',
    'development',
    39.99,
    '1.5.0',
    '["code", "review", "security"]'::jsonb,
    '{"security": true, "performance": true, "style": true}'::jsonb,
    'DevTools Inc',
    4.6,
    654
),
(
    'Meeting Scheduler',
    '智能日程管理，自動協調會議時間',
    'productivity',
    24.99,
    '2.0.0',
    '["calendar", "scheduling", "automation"]'::jsonb,
    '{"timezone": true, "recurring": true, "reminders": true}'::jsonb,
    'Productivity Pro',
    4.5,
    1823
),
(
    'CRM Assistant',
    'Manage customer relationships and track interactions',
    'analytics',
    59.99,
    '1.8.0',
    '["crm", "sales", "analytics"]'::jsonb,
    '{"contacts": true, "deals": true, "reports": true}'::jsonb,
    'SalesForce AI',
    4.8,
    432
) ON CONFLICT DO NOTHING;

-- =====================================================
-- Add rating/purchases to templates (optional migration)
-- =====================================================
ALTER TABLE templates ADD COLUMN IF NOT EXISTS seller_name VARCHAR(255);
ALTER TABLE templates ADD COLUMN IF NOT EXISTS rating DECIMAL(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5);
ALTER TABLE templates ADD COLUMN IF NOT EXISTS downloads INTEGER DEFAULT 0;