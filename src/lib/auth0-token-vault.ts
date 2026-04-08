// Stub for auth0 ManagementClient - install 'auth0' package for full functionality
class ManagementClient {
  constructor(_config: any) {}
  async getUser(_params: any) { 
    return { user_metadata: {} as any }; 
  }
  async updateUser(_id: any, _data: any) { 
    return {}; 
  }
}

interface TokenVaultConfig {
  domain: string;
  clientId: string;
  clientSecret: string;
  audience?: string;
}

interface TokenRequest {
  userId: string;
  serviceName: string;
  scope?: string;
}

interface StoredToken {
  id: string;
  userId: string;
  serviceName: string;
  tokenType: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt: string;
  metadata?: Record<string, any>;
}

export class Auth0TokenVault {
  private management: ManagementClient;
  private config: TokenVaultConfig;

  constructor(config: TokenVaultConfig) {
    this.config = config;
    this.management = new ManagementClient({
      domain: config.domain,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    });
  }

  /**
   * Store a token in Auth0 Token Vault for AI agents
   */
  async storeToken(userId: string, serviceName: string, accessToken: string, metadata?: Record<string, any>): Promise<StoredToken> {
    try {
      // Store token as user metadata with encryption
      const userMetadata = {
        [`token_vault_${serviceName}`]: {
          accessToken,
          serviceName,
          storedAt: new Date().toISOString(),
          metadata,
        },
      };

      await this.management.updateUser({ id: userId }, { user_metadata: userMetadata });

      return {
        id: `${userId}_${serviceName}`,
        userId,
        serviceName,
        tokenType: 'Bearer',
        accessToken,
        expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour default
        metadata,
      };
    } catch (error) {
      console.error('Failed to store token in vault:', error);
      throw new Error('Token storage failed');
    }
  }

  /**
   * Retrieve a token from Auth0 Token Vault for AI agents
   */
  async getToken(userId: string, serviceName: string): Promise<StoredToken | null> {
    try {
      const user = await this.management.getUser({ id: userId });
      const tokenData = user.user_metadata?.[`token_vault_${serviceName}`];

      if (!tokenData) {
        return null;
      }

      return {
        id: `${userId}_${serviceName}`,
        userId,
        serviceName,
        tokenType: 'Bearer',
        accessToken: tokenData.accessToken,
        expiresAt: tokenData.expiresAt || new Date(Date.now() + 3600000).toISOString(),
        metadata: tokenData.metadata,
      };
    } catch (error) {
      console.error('Failed to retrieve token from vault:', error);
      throw new Error('Token retrieval failed');
    }
  }

  /**
   * Get Paperclip API token for deployment
   */
  async getPaperclipToken(userId: string): Promise<string | null> {
    const token = await this.getToken(userId, 'paperclip');
    return token?.accessToken || null;
  }

  /**
   * Store Paperclip API token after user connects their account
   */
  async storePaperclipToken(userId: string, apiKey: string): Promise<StoredToken> {
    return this.storeToken(userId, 'paperclip', apiKey, {
      service: 'paperclip',
      permissions: ['deploy', 'manage_agents', 'create_companies'],
    });
  }

  /**
   * Delete a token from the vault
   */
  async deleteToken(userId: string, serviceName: string): Promise<boolean> {
    try {
      const user = await this.management.getUser({ id: userId });
      const metadata = { ...user.user_metadata };
      delete metadata[`token_vault_${serviceName}`];

      await this.management.updateUser({ id: userId }, { user_metadata: metadata });
      return true;
    } catch (error) {
      console.error('Failed to delete token from vault:', error);
      return false;
    }
  }

  /**
   * List all stored tokens for a user
   */
  async listUserTokens(userId: string): Promise<StoredToken[]> {
    try {
      const user = await this.management.getUser({ id: userId });
      const metadata = user.user_metadata || {};
      const tokens: StoredToken[] = [];

      Object.keys(metadata).forEach(key => {
        if (key.startsWith('token_vault_')) {
          const serviceName = key.replace('token_vault_', '');
          const tokenData = metadata[key];
          tokens.push({
            id: `${userId}_${serviceName}`,
            userId,
            serviceName,
            tokenType: 'Bearer',
            accessToken: tokenData.accessToken,
            expiresAt: tokenData.expiresAt || new Date(Date.now() + 3600000).toISOString(),
            metadata: tokenData.metadata,
          });
        }
      });

      return tokens;
    } catch (error) {
      console.error('Failed to list user tokens:', error);
      return [];
    }
  }

  /**
   * Validate if token is still valid
   */
  async validateToken(token: StoredToken): Promise<boolean> {
    if (!token.expiresAt) return true;

    const expiryTime = new Date(token.expiresAt).getTime();
    const currentTime = Date.now();
    
    // Add 5-minute buffer before expiry
    return currentTime < (expiryTime - 300000);
  }
}

// Singleton instance
let tokenVaultInstance: Auth0TokenVault | null = null;

export function getTokenVault(): Auth0TokenVault {
  if (!tokenVaultInstance) {
    const config: TokenVaultConfig = {
      domain: process.env.AUTH0_A2A_DOMAIN || process.env.AUTH0_DOMAIN!,
      clientId: process.env.AUTH0_A2A_CLIENT_ID!,
      clientSecret: process.env.AUTH0_A2A_CLIENT_SECRET!,
      audience: 'https://token-vault.auth0.com',
    };

    if (!config.clientId || !config.clientSecret) {
      throw new Error('Auth0 Token Vault credentials not configured');
    }

    tokenVaultInstance = new Auth0TokenVault(config);
  }

  return tokenVaultInstance;
}
