-- AgentForge Seed Data
-- Run AFTER schema.sql: psql $DATABASE_URL -f db/seed.sql

-- =====================================================
-- SAMPLE TEMPLATES
-- Pre-configured AI agent teams for different use cases
-- =====================================================

INSERT INTO templates (name, description, price, category, features, image_url, is_active) VALUES
(
    'SaaS Startup',
    'A fully automated startup team with CEO, CTO, and developer agents. Perfect for building and launching your SaaS product from idea to deployment.',
    299.00,
    'Development',
    '[
        {"name": "CEO Agent", "role": "Strategic planning and decision making"},
        {"name": "CTO Agent", "role": "Technical architecture and code review"},
        {"name": "Developer Agent", "role": "Code implementation and bug fixes"},
        {"name": "Product Agent", "role": "Feature prioritization and user stories"},
        {"name": "DevOps Agent", "role": "CI/CD and deployment automation"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
    true
),
(
    'Content Agency',
    'AI-powered content team that handles ideation, creation, SEO optimization, and social media distribution. Scale your content without hiring.',
    199.00,
    'Marketing',
    '[
        {"name": "Content Director", "role": "Content strategy and editorial calendar"},
        {"name": "Copywriter Agent", "role": "Blog posts, landing pages, and emails"},
        {"name": "SEO Agent", "role": "Keyword research and on-page optimization"},
        {"name": "Social Media Agent", "role": "Twitter, LinkedIn, and Instagram posts"},
        {"name": "Graphic Designer Agent", "role": "Social media graphics and banners"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
    true
),
(
    'DevOps Squad',
    'Comprehensive DevOps team for infrastructure management, monitoring, and incident response. Keep your systems running smoothly 24/7.',
    399.00,
    'Operations',
    '[
        {"name": "SRE Agent", "role": "System reliability and incident management"},
        {"name": "Infrastructure Agent", "role": "Cloud infrastructure and Terraform"},
        {"name": "Security Agent", "role": "Vulnerability scanning and compliance"},
        {"name": "Monitoring Agent", "role": "Alerting and dashboards"},
        {"name": "Documentation Agent", "role": "Runbooks and technical docs"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    true
),
(
    'Sales Machine',
    'End-to-end sales automation with lead research, outreach, follow-ups, and CRM updates. Never miss a qualified prospect again.',
    249.00,
    'Sales',
    '[
        {"name": "Sales Director", "role": "Pipeline strategy and quota management"},
        {"name": "Lead Researcher", "role": "Company and contact discovery"},
        {"name": "Outreach Agent", "role": "Personalized cold emails"},
        {"name": "Follow-up Agent", "role": "Sequence management and reminders"},
        {"name": "CRM Agent", "role": "HubSpot/Salesforce data entry"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
    true
),
(
    'Customer Success',
    'Proactive customer support team that handles tickets, FAQs, onboarding, and churn prevention. Delight customers at scale.',
    149.00,
    'Support',
    '[
        {"name": "Support Manager", "role": "Ticket triage and escalation"},
        {"name": "Help Desk Agent", "role": "Ticket resolution and responses"},
        {"name": "Onboarding Agent", "role": "New customer activation"},
        {"name": "NPS Agent", "role": "Survey collection and analysis"},
        {"name": "Knowledge Base Agent", "role": "FAQ and documentation updates"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800',
    true
);

-- =====================================================
-- NOTES FOR MANUAL SETUP
-- =====================================================
-- 
-- After running this seed, you can:
-- 1. View templates: SELECT * FROM templates;
-- 2. Create a test customer manually:
--    INSERT INTO customers (email, name, company) 
--    VALUES ('demo@example.com', 'Demo User', 'Demo Company');
-- 3. Link Auth0 users after implementing authentication
-- 4. Test Stripe integration with test mode API keys
--
-- To reset seed data:
-- TRUNCATE TABLE templates RESTART IDENTITY CASCADE;
