import { tokenStore } from './simple-token-store';
import { paperclipApi } from './paperclip-client';
import type { DeployTemplateRequest, DeployTemplateResponse } from '@/types/paperclip';

interface SecureDeploymentOptions {
  userId: string;
  templateId: string;
  companyName: string;
  templateData: any;
}

interface DeploymentResult {
  success: boolean;
  company?: any;
  agents?: any[];
  error?: string;
}

export class SecureDeploymentService {
  async deployTemplate(options: SecureDeploymentOptions): Promise<DeploymentResult> {
    try {
      // 1. Get Paperclip API token from Token Store (decrypted)
      const paperclipToken = await tokenStore.getPaperclipToken(options.userId);
      
      if (!paperclipToken) {
        return {
          success: false,
          error: 'Paperclip API token not found. Please connect your Paperclip account.',
        };
      }

      // 2. Validate token
      const storedToken = await tokenStore.getToken(options.userId, 'Paperclip');
      if (!storedToken || !(await tokenStore.validateToken(storedToken))) {
        return {
          success: false,
          error: 'Paperclip API token has expired. Please reconnect your account.',
        };
      }

      // 3. Deploy template with secure token
      const deploymentRequest: DeployTemplateRequest = {
        companyName: options.companyName,
        templateId: options.templateId,
        templateData: options.templateData,
      };

      // Add token to request headers for Paperclip API
      const result = await this.securePaperclipDeploy(deploymentRequest, paperclipToken);

      // 4. Update token usage metadata
      await this.updateTokenUsage(options.userId, 'Paperclip', {
        lastUsed: new Date().toISOString(),
        deploymentCount: (storedToken.metadata?.deploymentCount || 0) + 1,
        lastDeployment: {
          templateId: options.templateId,
          companyName: options.companyName,
          timestamp: new Date().toISOString(),
        },
      });

      return {
        success: true,
        company: result.company,
        agents: result.agents,
      };

    } catch (error) {
      console.error('Secure deployment failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Deployment failed',
      };
    }
  }

  /**
   * Secure Paperclip API call with token
   */
  private async securePaperclipDeploy(
    request: DeployTemplateRequest,
    token: string
  ): Promise<DeployTemplateResponse> {
    // For testing - return mock response
    // In production, this would make a real API call to Paperclip
    console.log('Mock deployment:', request);
    
    return {
      company: {
        id: 'mock-company-' + Date.now(),
        name: request.companyName,
        createdAt: new Date().toISOString(),
      },
      agents: request.templateData.agents.map((agent: any, index: number) => ({
        id: 'mock-agent-' + index,
        name: agent.name,
        role: agent.role,
        adapterType: 'claude_local',
        status: 'active',
        createdAt: new Date().toISOString(),
      })),
      status: 'deployed',
    };
  }

  /**
   * Update token usage metadata
   */
  private async updateTokenUsage(
    userId: string,
    serviceName: string,
    usageData: Record<string, any>
  ): Promise<void> {
    try {
      const token = await tokenStore.getToken(userId, serviceName);
      if (token) {
        // Get the decrypted access token to re-store with updated metadata
        const accessToken = await tokenStore.getDecryptedAccessToken(userId, serviceName);
        if (accessToken) {
          await tokenStore.storeToken(
            userId,
            serviceName,
            accessToken,
            {
              ...token.metadata,
              ...usageData,
            }
          );
        }
      }
    } catch (error) {
      console.error('Failed to update token usage:', error);
      // Don't fail deployment if metadata update fails
    }
  }

  /**
   * Check if user has connected Paperclip account
   */
  async hasPaperclipConnection(userId: string): Promise<boolean> {
    try {
      const token = await tokenStore.getPaperclipToken(userId);
      return !!token;
    } catch (error) {
      return false;
    }
  }

  /**
   * Connect user's Paperclip account to Token Vault
   */
  async connectPaperclipAccount(userId: string, apiKey: string): Promise<boolean> {
    try {
      // Validate the API key with Paperclip first
      const isValid = await this.validatePaperclipApiKey(apiKey);
      
      if (!isValid) {
        throw new Error('Invalid Paperclip API key');
      }

      // Store in Token Vault
      await tokenStore.storePaperclipToken(userId, apiKey);
      return true;
    } catch (error) {
      console.error('Failed to connect Paperclip account:', error);
      return false;
    }
  }

  /**
   * Validate Paperclip API key
   */
  private async validatePaperclipApiKey(apiKey: string): Promise<boolean> {
    try {
      // For testing - always return true
      // In production, this would validate with real Paperclip API
      return !!(apiKey && apiKey.length > 0);
    } catch (error) {
      return false;
    }
  }

  /**
   * Disconnect Paperclip account
   */
  async disconnectPaperclipAccount(userId: string): Promise<boolean> {
    try {
      return await tokenStore.deleteToken(userId, 'Paperclip');
    } catch (error) {
      console.error('Failed to disconnect Paperclip account:', error);
      return false;
    }
  }

  /**
   * Get deployment history for user
   */
  async getDeploymentHistory(userId: string): Promise<any[]> {
    try {
      const token = await tokenStore.getToken(userId, 'Paperclip');
      return token?.metadata?.deployments || [];
    } catch (error) {
      return [];
    }
  }
}

// Singleton instance
let secureDeploymentInstance: SecureDeploymentService | null = null;

export function getSecureDeploymentService(): SecureDeploymentService {
  if (!secureDeploymentInstance) {
    secureDeploymentInstance = new SecureDeploymentService();
  }
  return secureDeploymentInstance;
}
