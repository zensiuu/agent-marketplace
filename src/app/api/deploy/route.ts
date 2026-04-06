import { NextRequest, NextResponse } from 'next/server';
import { getSecureDeploymentService } from '@/lib/secure-deployment';

export async function POST(request: NextRequest) {
  try {
    // For demo/testing - skip authentication for now
    // TODO: Add proper Auth0 authentication
    const userId = 'demo-user'; // Mock user ID for testing

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
    // For demo/testing - skip authentication for now
    // TODO: Add proper Auth0 authentication
    const userId = 'demo-user'; // Mock user ID for testing

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
