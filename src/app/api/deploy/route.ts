import { NextRequest, NextResponse } from 'next/server';
import { getSecureDeploymentService } from '@/lib/secure-deployment';
import { auth0 } from '../auth/[auth0]/route';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const session = await auth0.getSession(request);
    if (!session?.user?.sub) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { templateId, companyName, templateData } = body;

    // Validate request
    if (!templateId || !companyName || !templateData) {
      return NextResponse.json(
        { error: 'Missing required fields: templateId, companyName, templateData' },
        { status: 400 }
      );
    }

    // Get secure deployment service
    const deploymentService = getSecureDeploymentService();

    // Check if user has connected Paperclip account
    const hasConnection = await deploymentService.hasPaperclipConnection(session.user.sub);
    if (!hasConnection) {
      return NextResponse.json(
        { 
          error: 'Paperclip account not connected',
          code: 'PAPERCLIP_NOT_CONNECTED',
          message: 'Please connect your Paperclip account to deploy templates.'
        },
        { status: 403 }
      );
    }

    // Deploy template securely
    const result = await deploymentService.deployTemplate({
      userId: session.user.sub,
      templateId,
      companyName,
      templateData,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      company: result.company,
      agents: result.agents,
      message: 'Template deployed successfully using secure Token Vault',
    });

  } catch (error) {
    console.error('Deployment API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const session = await auth0.getSession(request);
    if (!session?.user?.sub) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const deploymentService = getSecureDeploymentService();
    
    // Check connection status
    const isConnected = await deploymentService.hasPaperclipConnection(session.user.sub);
    const deploymentHistory = await deploymentService.getDeploymentHistory(session.user.sub);

    return NextResponse.json({
      isConnected,
      deploymentHistory,
      message: isConnected 
        ? 'Paperclip account connected and ready for deployment'
        : 'Paperclip account not connected'
    });

  } catch (error) {
    console.error('Deployment status API error:', error);
    return NextResponse.json(
      { error: 'Failed to get deployment status' },
      { status: 500 }
    );
  }
}
