import { NextRequest, NextResponse } from 'next/server';
import { getSecureDeploymentService } from '@/lib/secure-deployment';
import { requireCurrentUser } from '@/lib/get-server-session';
import { validateDeploymentRequest } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await requireCurrentUser();
    const userId = user.id;

    const body = await request.json();
    const { templateId, companyName, templateData } = body;

    // Validate deployment request
    const validation = validateDeploymentRequest({ templateId, companyName, templateData });
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Get secure deployment service
    const deploymentService = getSecureDeploymentService();

    // Check if user has connected Paperclip account
    const hasConnection = await deploymentService.hasPaperclipConnection(userId);
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
      userId: userId,
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
    // Get authenticated user
    const user = await requireCurrentUser();
    const userId = user.id;

    const deploymentService = getSecureDeploymentService();
    
    // Check connection status
    const isConnected = await deploymentService.hasPaperclipConnection(userId);
    const deploymentHistory = await deploymentService.getDeploymentHistory(userId);

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
