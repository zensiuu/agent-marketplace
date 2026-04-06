import { getTokenVault, Auth0TokenVault } from './auth0-token-vault';
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
  private tokenVault: Auth0TokenVault;

  constructor() {
    this.tokenVault = getTokenVault();
  }

  /**
   * Deploy template securely using Token Vault for Paperclip credentials
   */
  async deployTemplate(options: SecureDeploymentOptions): Promise<DeploymentResult> {
    try {
      // 1. Get Paperclip API token from Token Vault
      const paperclipToken = await this.tokenVault.getPaperclipToken(options.userId);
      
      if (!paperclipToken) {
        return {
          success: false,
          error: 'Paperclip API token not found. Please connect your Paperclip account.',
        };
      }

      // 2. Validate token
      const storedToken = await this.tokenVault.getToken(options.userId, 'paperclip');
      if (!storedToken || !(await this.tokenVault.validateToken(storedToken))) {
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
      await this.updateTokenUsage(options.userId, 'paperclip', {
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
    const API_BASE = process.env.PAPERCLIP_API_URL || 'https://api.paperclip.ai';
    
    const response = await fetch(`${API_BASE}/deploy-template`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'AgentForge/1.0',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `Paperclip API error ${response.status}`);
    }

    return response.json();
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
      const token = await this.tokenVault.getToken(userId, serviceName);
      if (token) {
        await this.tokenVault.storeToken(
          userId,
          serviceName,
          token.accessToken,
          {
            ...token.metadata,
            ...usageData,
          }
        );
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
      const token = await this.tokenVault.getPaperclipToken(userId);
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
      await this.tokenVault.storePaperclipToken(userId, apiKey);
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
      const API_BASE = process.env.PAPERCLIP_API_URL || 'https://api.paperclip.ai';
      
      const response = await fetch(`${API_BASE}/health`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Disconnect Paperclip account
   */
  async disconnectPaperclipAccount(userId: string): Promise<boolean> {
    try {
      return await this.tokenVault.deleteToken(userId, 'paperclip');
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
      const token = await this.tokenVault.getToken(userId, 'paperclip');
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
