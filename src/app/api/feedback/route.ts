import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Feedback validation schema
const feedbackSchema = z.object({
  content: z.string().min(1, 'Feedback cannot be empty').max(500, 'Feedback too long'),
  category: z.enum(['general', 'feature_request', 'bug_report', 'ux_feedback', 'other']).optional().default('general'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional().default('medium'),
});

export async function POST(request: NextRequest) {
  try {
    // Get user from session (you'll need to implement auth middleware)
    const authHeader = request.headers.get('authorization');
    
    // For now, we'll get user from the request body (in production, use proper auth)
    const body = await request.json();
    const { userId, userEmail, ...feedbackData } = body;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User authentication required' },
        { status: 401 }
      );
    }

    // Validate feedback data
    const validatedData = feedbackSchema.parse(feedbackData);

    // Insert feedback into Supabase
    const { data, error } = await supabase
      .from('feedback')
      .insert({
        user_id: userId,
        user_email: userEmail,
        content: validatedData.content,
        content_length: validatedData.content.length,
        category: validatedData.category,
        priority: validatedData.priority,
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      feedback: data,
      message: 'Feedback submitted successfully'
    });

  } catch (error) {
    console.error('Feedback API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid feedback data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    let query = supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by user if specified
    if (userId) {
      query = query.eq('user_id', userId);
    }

    // Filter by status if specified
    if (status) {
      query = query.eq('status', status);
    }

    // Filter by category if specified
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      feedback: data || [],
      count: data?.length || 0
    });

  } catch (error) {
    console.error('Feedback GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update feedback status (for admin use)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { feedbackId, status, adminNotes } = body;

    if (!feedbackId || !status) {
      return NextResponse.json(
        { error: 'Feedback ID and status are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('feedback')
      .update({
        status,
        admin_notes: adminNotes,
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', feedbackId)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      feedback: data,
      message: 'Feedback updated successfully'
    });

  } catch (error) {
    console.error('Feedback PATCH error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
