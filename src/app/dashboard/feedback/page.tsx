'use client';

import { useState } from 'react';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    setError(null);
    
    try {
      // Get user info (you'll need to implement proper auth)
      const userId = 'demo-user-id'; // Replace with actual user ID from auth
      const userEmail = 'demo@example.com'; // Replace with actual user email

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          userEmail,
          content: feedback.trim(),
          category: 'general',
          priority: 'medium',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit feedback');
      }

      setSubmitted(true);
      setFeedback('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-[#0f1011] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#f7f8f8] mb-2">Thank You!</h2>
          <p className="text-[#8a8f98] mb-6">Your feedback has been received. We appreciate your input!</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-[#5e6ad2] text-white rounded-lg hover:bg-[#4b5bb8] transition-colors"
          >
            Submit More Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f7f8f8] mb-2">Feedback</h1>
        <p className="text-[#8a8f98]">Share your thoughts about AgentForge and help us improve</p>
      </div>

      <div className="bg-[#0f1011] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-[#f7f8f8] mb-2">
              What do you think about AgentForge?
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts, suggestions, or report issues..."
              className="w-full h-40 px-4 py-3 bg-[#08090a] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#f7f8f8] placeholder-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#5e6ad2] focus:border-transparent resize-none"
              maxLength={500}
              required
            />
            <p className="mt-2 text-sm text-[#6b7280]">
              {feedback.length}/500 characters
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <select 
                className="px-3 py-2 bg-[#08090a] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#8a8f98] text-sm focus:outline-none focus:ring-2 focus:ring-[#5e6ad2]"
                defaultValue="general"
              >
                <option value="general">General Feedback</option>
                <option value="feature_request">Feature Request</option>
                <option value="bug_report">Bug Report</option>
                <option value="ux_feedback">UX Feedback</option>
                <option value="other">Other</option>
              </select>
              
              <select 
                className="px-3 py-2 bg-[#08090a] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#8a8f98] text-sm focus:outline-none focus:ring-2 focus:ring-[#5e6ad2]"
                defaultValue="medium"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={!feedback.trim() || isSubmitting}
              className="px-6 py-2 bg-[#5e6ad2] text-white rounded-lg hover:bg-[#4b5bb8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0f1011] border border-[rgba(255,255,255,0.05)] rounded-xl p-6">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#f7f8f8] mb-2">Feature Ideas</h3>
          <p className="text-sm text-[#8a8f98]">Suggest new features or improvements you'd like to see</p>
        </div>

        <div className="bg-[#0f1011] border border-[rgba(255,255,255,0.05)] rounded-xl p-6">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#f7f8f8] mb-2">User Experience</h3>
          <p className="text-sm text-[#8a8f98]">Tell us about your experience using the platform</p>
        </div>

        <div className="bg-[#0f1011] border border-[rgba(255,255,255,0.05)] rounded-xl p-6">
          <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#f7f8f8] mb-2">Bug Reports</h3>
          <p className="text-sm text-[#8a8f98]">Report any issues or problems you've encountered</p>
        </div>
      </div>
    </div>
  );
}
