-- AgentForge Seed Data (FIXED)
-- Run AFTER schema-fixed.sql: psql $DATABASE_URL -f db/seed-fixed.sql

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
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    true
),
(
    'E-commerce Team',
    'Complete e-commerce operations team including inventory management, customer service, marketing automation, and analytics.',
    249.00,
    'E-commerce',
    '[
        {"name": "Inventory Manager", "role": "Stock tracking and reordering"},
        {"name": "Customer Service Agent", "role": "Support tickets and live chat"},
        {"name": "Marketing Automation", "role": "Email campaigns and segmentation"},
        {"name": "Analytics Agent", "role": "Sales tracking and insights"},
        {"name": "Product Manager", "role": "Product listings and optimization"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    true
),
(
    'Research Lab',
    'Scientific research team for data analysis, literature review, experiment design, and academic writing.',
    349.00,
    'Research',
    '[
        {"name": "Data Scientist", "role": "Statistical analysis and modeling"},
        {"name": "Research Assistant", "role": "Literature review and summarization"},
        {"name": "Lab Manager", "role": "Experiment design and protocols"},
        {"name": "Academic Writer", "role": "Paper writing and citations"},
        {"name": "Peer Reviewer", "role": "Quality control and validation"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1532094349-884-824ae1b704d3?w=800',
    true
),
(
    'Customer Support',
    '24/7 customer support team with ticket management, knowledge base, chat support, and customer success tracking.',
    179.00,
    'Support',
    '[
        {"name": "Support Lead", "role": "Team coordination and escalation"},
        {"name": "Tier 1 Support", "role": "First response and basic troubleshooting"},
        {"name": "Technical Support", "role": "Advanced technical issues"},
        {"name": "Customer Success", "role": "Onboarding and retention"},
        {"name": "Knowledge Manager", "role": "FAQ and documentation updates"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1557804506-669a16779b4e?w=800',
    true
);

-- =====================================================
-- SAMPLE SKILLS (for skills marketplace)
-- =====================================================

-- Note: These would be stored in a separate skills table or as templates with category "skills"
-- For now, we'll add them as templates with "Skills" category

INSERT INTO templates (name, description, price, category, features, image_url, is_active) VALUES
(
    'Stripe Integration',
    'Complete Stripe payment integration with webhooks, subscription management, and fraud detection.',
    29.00,
    'Skills',
    '[
        {"name": "Payment Processing", "role": "Handle one-time and recurring payments"},
        {"name": "Webhook Handler", "role": "Process Stripe events in real-time"},
        {"name": "Subscription Manager", "role": "Manage customer subscriptions"},
        {"name": "Fraud Detection", "role": "Analyze suspicious transactions"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    true
),
(
    'Auth System',
    'Complete authentication system with OAuth, JWT tokens, password reset, and multi-factor authentication.',
    39.00,
    'Skills',
    '[
        {"name": "OAuth Provider", "role": "Google, GitHub, Apple login"},
        {"name": "JWT Manager", "role": "Token generation and validation"},
        {"name": "Password Reset", "role": "Secure password recovery"},
        {"name": "MFA Handler", "role": "Two-factor authentication"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    true
),
(
    'Blog Writer',
    'AI-powered blog content creation with SEO optimization, topic research, and multi-language support.',
    19.00,
    'Skills',
    '[
        {"name": "Content Generator", "role": "Write engaging blog posts"},
        {"name": "SEO Optimizer", "role": "Optimize for search engines"},
        {"name": "Topic Researcher", "role": "Find trending topics"},
        {"name": "Language Translator", "role": "Multi-language content"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
    true
),
(
    'SEO Audit',
    'Comprehensive SEO audit tool with keyword analysis, competitor research, and optimization recommendations.',
    24.00,
    'Skills',
    '[
        {"name": "Keyword Analyzer", "role": "Research and analyze keywords"},
        {"name": "Competitor Spy", "role": "Analyze competitor strategies"},
        {"name": "Site Auditor", "role": "Technical SEO analysis"},
        {"name": "Rank Tracker", "role": "Monitor search rankings"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    true
),
(
    'Kubernetes Deploy',
    'Automated Kubernetes deployment with CI/CD integration, monitoring, and auto-scaling.',
    49.00,
    'Skills',
    '[
        {"name": "Container Builder", "role": "Build and optimize containers"},
        {"name": "K8s Deployer", "role": "Deploy to Kubernetes clusters"},
        {"name": "Monitor Agent", "role": "Application monitoring"},
        {"name": "Auto Scaler", "role": "Dynamic resource scaling"}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    true
);
