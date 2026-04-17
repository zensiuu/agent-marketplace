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
  private domain: string;
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(config: { domain: string; clientId: string; clientSecret: string }) {
    this.domain = config.domain;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry - 60000) {
      return this.accessToken;
    }

    const response = await fetch(`https://${this.domain}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        audience: `https://${this.domain}/api/v2/`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get Auth0 access token');
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000);
    
    return this.accessToken!;
  }

  private async getUserMetadata(userId: string): Promise<Record<string, any>> {
    const token = await this.getAccessToken();
    
    const response = await fetch(`https://${this.domain}/api/v2/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to get user:', response.status);
      return {};
    }

    const user = await response.json();
    return user.user_metadata || {};
  }

  /**
   * Store a token in Auth0 Token Vault for AI agents
   */
  async storeToken(userId: string, serviceName: string, accessToken: string, metadata?: Record<string, any>): Promise<StoredToken> {
    try {
      const token = await this.getAccessToken();
      const existingMetadata = await this.getUserMetadata(userId);
      
      const tokenKey = `token_vault_${serviceName}`;
      const updatedMetadata = {
        ...existingMetadata,
        [tokenKey]: {
          accessToken,
          serviceName,
          storedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
          metadata,
        },
      };

      const response = await fetch(`https://${this.domain}/api/v2/users/${userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_metadata: updatedMetadata,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Failed to store token:', error);
        throw new Error('Token storage failed');
      }

      return {
        id: `${userId}_${serviceName}`,
        userId,
        serviceName,
        tokenType: 'Bearer',
        accessToken,
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
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
      const metadata = await this.getUserMetadata(userId);
      const tokenKey = `token_vault_${serviceName}`;
      const tokenData = metadata[tokenKey];

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
      return null;
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
      const token = await this.getAccessToken();
      const existingMetadata = await this.getUserMetadata(userId);
      
      const tokenKey = `token_vault_${serviceName}`;
      const updatedMetadata = { ...existingMetadata };
      delete updatedMetadata[tokenKey];

      const response = await fetch(`https://${this.domain}/api/v2/users/${userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_metadata: updatedMetadata,
        }),
      });

      return response.ok;
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
      const metadata = await this.getUserMetadata(userId);
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
    
    return currentTime < (expiryTime - 300000);
  }
}

// Singleton instance
let tokenVaultInstance: Auth0TokenVault | null = null;

export function getTokenVault(): Auth0TokenVault {
  if (!tokenVaultInstance) {
    const domain = process.env.AUTH0_A2A_DOMAIN || process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_A2A_CLIENT_ID;
    const clientSecret = process.env.AUTH0_A2A_CLIENT_SECRET;

    if (!domain || !clientId || !clientSecret) {
      console.warn('Auth0 Token Vault credentials not fully configured in environment');
      throw new Error('Auth0 Token Vault credentials not configured');
    }

    tokenVaultInstance = new Auth0TokenVault({ domain, clientId, clientSecret });
  }

  return tokenVaultInstance;
}