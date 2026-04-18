-- Feedback table for AgentForge user feedback
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,           -- Auth0 user ID
  user_email TEXT,                 -- User email for reference
  content TEXT NOT NULL,           -- The actual feedback text
  content_length INTEGER,           -- Character count for analytics
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'addressed', 'archived')),
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'feature_request', 'bug_report', 'ux_feedback', 'other')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by TEXT,                -- Admin who reviewed it
  admin_notes TEXT                  -- Internal admin notes
);

-- Create index for faster queries
CREATE INDEX idx_feedback_user_id ON feedback(user_id);
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX idx_feedback_category ON feedback(category);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_feedback_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER feedback_updated_at_trigger
  BEFORE UPDATE ON feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_feedback_updated_at();

-- Row Level Security (RLS)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own feedback
CREATE POLICY "Users can view own feedback" ON feedback
  FOR SELECT USING (auth.uid()::text = user_id);

-- Policy: Users can only insert their own feedback
CREATE POLICY "Users can insert own feedback" ON feedback
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Policy: Users can update their own feedback (but not status)
CREATE POLICY "Users can update own feedback content" ON feedback
  FOR UPDATE USING (auth.uid()::text = user_id)
  WITH CHECK (
    auth.uid()::text = user_id AND 
    status = 'new' AND 
    content IS NOT NULL
  );

-- Admin policies (for future admin dashboard)
-- These would require additional admin role setup
CREATE POLICY "Admins can view all feedback" ON feedback
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can update all feedback" ON feedback
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Comments for documentation
COMMENT ON TABLE feedback IS 'User feedback and feature requests for AgentForge';
COMMENT ON COLUMN feedback.user_id IS 'Auth0 user ID of the feedback submitter';
COMMENT ON COLUMN feedback.status IS 'Current status: new, reviewed, addressed, archived';
COMMENT ON COLUMN feedback.category IS 'Type of feedback: general, feature_request, bug_report, ux_feedback, other';
COMMENT ON COLUMN feedback.priority IS 'Priority level: low, medium, high, urgent';
COMMENT ON COLUMN feedback.admin_notes IS 'Internal notes for administrators';
