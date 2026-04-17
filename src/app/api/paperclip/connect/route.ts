import { NextRequest, NextResponse } from 'next/server';
import { getSecureDeploymentService } from '@/lib/secure-deployment';
import { requireCurrentUser } from '@/lib/get-server-session';

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await requireCurrentUser();
    const userId = user.id;

    const body = await request.json();
    const { apiKey } = body;

    // Validate request
    if (!apiKey || typeof apiKey !== 'string') {
      return NextResponse.json(
        { error: 'Paperclip API key is required' },
        { status: 400 }
      );
    }

    // Get secure deployment service
    const deploymentService = getSecureDeploymentService();

    // Connect Paperclip account
    const success = await deploymentService.connectPaperclipAccount(
      userId,
      apiKey
    );

    if (!success) {
      return NextResponse.json(
        { 
          error: 'Failed to connect Paperclip account',
          message: 'Please verify your API key and try again.'
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Paperclip account connected successfully',
      connectedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Paperclip connection API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await requireCurrentUser();
    const userId = user.id;

    // Get secure deployment service
    const deploymentService = getSecureDeploymentService();

    // Disconnect Paperclip account
    const success = await deploymentService.disconnectPaperclipAccount(userId);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to disconnect Paperclip account' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Paperclip account disconnected successfully',
      disconnectedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Paperclip disconnection API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
