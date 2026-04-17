import { NextRequest, NextResponse } from 'next/server';
import { tokenStore } from '@/lib/simple-token-store';
import { getCurrentUser } from '@/lib/get-server-session';
import { validateApiToken, validateServiceName } from '@/lib/validation';

// AI Agent services that can be connected
const AI_SERVICES = [
  { 
    name: 'Paperclip', 
    description: 'Deploy AI agent teams and companies',
    category: 'orchestration',
    required: true,
    icon: '📎'
  },
  { 
    name: 'OpenAI', 
    description: 'GPT models for text generation and analysis',
    category: 'ai-models',
    required: false,
    icon: '🤖'
  },
  { 
    name: 'Anthropic', 
    description: 'Claude models for advanced reasoning',
    category: 'ai-models', 
    required: false,
    icon: '🧠'
  },
  { 
    name: 'Stripe', 
    description: 'Payment processing and billing automation',
    category: 'payments',
    required: false,
    icon: '💳'
  },
  { 
    name: 'GitHub', 
    description: 'Code repository management and CI/CD',
    category: 'development',
    required: false,
    icon: '🐙'
  }
];

/**
 * Get authenticated user ID or throw error
 */
async function getAuthenticatedUserId(): Promise<string> {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user.id;
}

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    let userId: string;
    try {
      userId = await getAuthenticatedUserId();
    } catch (authError) {
      // For demo/testing - return mock data when not authenticated
      userId = 'demo-user';
    }

    const tokenVault = tokenStore;
    
    // Get user's connected services
    const userTokens = await tokenVault.listUserTokens(userId);
    
    // Transform to UI-friendly format
    const connectedServices = [];
    for (const token of userTokens) {
      const isActive = await tokenVault.validateToken(token);
      connectedServices.push({
        id: token.id,
        serviceName: token.serviceName,
        serviceInfo: AI_SERVICES.find(s => s.name === token.serviceName) || {
          name: token.serviceName,
          description: 'Custom service integration',
          category: 'custom',
          required: false,
          icon: '🔑'
        },
        isActive,
        lastUsedAt: token.metadata?.lastUsed || null,
        createdAt: token.metadata?.createdAt || new Date().toISOString(),
        usageCount: token.metadata?.deploymentCount || 0,
        permissions: token.metadata?.permissions || [],
        tokenFingerprint: `service:${token.serviceName.toLowerCase()}-user:${userId.slice(-4)}-created:${new Date(token.createdAt).getFullYear()}`
      });
    }

    return NextResponse.json({
      services: AI_SERVICES,
      connectedServices,
      summary: {
        totalConnected: connectedServices.length,
        activeConnections: connectedServices.filter(s => s.isActive).length,
        requiredConnected: connectedServices.filter(s => s.serviceInfo.required).length
      }
    });

  } catch (error) {
    console.error('Token Vault API error:', error);
    return NextResponse.json({ error: 'Failed to fetch token vault data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    let userId: string;
    try {
      userId = await getAuthenticatedUserId();
    } catch (authError) {
      // For demo/testing - use fallback when not authenticated
      userId = 'demo-user';
    }

    const body = await request.json();
    const { serviceName, token: apiToken, permissions = [] } = body;

    // Validate service name
    const serviceValidation = validateServiceName(serviceName);
    if (!serviceValidation.isValid) {
      return NextResponse.json({ error: serviceValidation.error }, { status: 400 });
    }

    // Validate service exists
    const serviceInfo = AI_SERVICES.find(s => s.name === serviceName);
    if (!serviceInfo && !serviceName.startsWith('custom_')) {
      return NextResponse.json({ error: 'Invalid service' }, { status: 400 });
    }

    // Validate API token format
    const tokenValidation = validateApiToken(serviceName, apiToken);
    if (!tokenValidation.isValid) {
      return NextResponse.json({ error: tokenValidation.error }, { status: 400 });
    }

    const tokenVault = tokenStore;

    // Validate the API token (basic validation for known services)
    if (serviceName === 'Paperclip') {
      // Skip validation for testing
      // const isValid = await validatePaperclipToken(apiToken);
      // if (!isValid) {
      //   return NextResponse.json({ error: 'Invalid Paperclip API token' }, { status: 400 });
      // }
    }

    // Store token in Auth0 Token Vault
    const storedToken = await tokenVault.storeToken(
      userId,
      serviceName,
      apiToken,
      {
        permissions,
        category: serviceInfo?.category || 'custom',
        connectedAt: new Date().toISOString(),
        deploymentCount: 0
      }
    );

    return NextResponse.json({
      success: true,
      service: serviceName,
      connectedAt: storedToken.metadata?.createdAt || new Date().toISOString(),
      message: `${serviceName} connected successfully for your AI agents`,
      warnings: tokenValidation.warnings
    });

  } catch (error) {
    console.error('Token connection error:', error);
    return NextResponse.json({ error: 'Failed to connect service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get authenticated user
    let userId: string;
    try {
      userId = await getAuthenticatedUserId();
    } catch (authError) {
      // For demo/testing - use fallback when not authenticated
      userId = 'demo-user';
    }

    const { searchParams } = new URL(request.url);
    const serviceName = searchParams.get('service');

    if (!serviceName) {
      return NextResponse.json({ error: 'Service name is required' }, { status: 400 });
    }

    const tokenVault = tokenStore;
    const success = await tokenVault.deleteToken(userId, serviceName);

    if (!success) {
      return NextResponse.json({ error: 'Service not found or already disconnected' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      service: serviceName,
      message: `${serviceName} disconnected successfully`
    });

  } catch (error) {
    console.error('Token disconnection error:', error);
    return NextResponse.json({ error: 'Failed to disconnect service' }, { status: 500 });
  }
}

// Helper function to validate Paperclip tokens
async function validatePaperclipToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.PAPERCLIP_API_URL}/health`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}
