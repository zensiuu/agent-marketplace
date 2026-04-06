// Simple in-memory token store for testing
// In production, this would be replaced with Auth0 Token Vault

interface SimpleToken {
  id: string;
  userId: string;
  serviceName: string;
  accessToken: string;
  metadata: Record<string, any>;
  createdAt: string;
}

class SimpleTokenStore {
  private tokens: Map<string, SimpleToken> = new Map();

  async storeToken(userId: string, serviceName: string, accessToken: string, metadata: Record<string, any> = {}): Promise<SimpleToken> {
    const id = `${userId}_${serviceName}`;
    const token: SimpleToken = {
      id,
      userId,
      serviceName,
      accessToken,
      metadata: {
        ...metadata,
        createdAt: new Date().toISOString(),
        deploymentCount: metadata.deploymentCount || 0,
      },
      createdAt: new Date().toISOString(),
    };

    this.tokens.set(id, token);
    console.log('Token stored:', { id, serviceName, userId });
    return token;
  }

  async getToken(userId: string, serviceName: string): Promise<SimpleToken | null> {
    const id = `${userId}_${serviceName}`;
    const token = this.tokens.get(id) || null;
    console.log('Token retrieved:', { id, found: !!token });
    return token;
  }

  async listUserTokens(userId: string): Promise<SimpleToken[]> {
    const userTokens = Array.from(this.tokens.values()).filter(token => token.userId === userId);
    console.log('User tokens listed:', { userId, count: userTokens.length });
    return userTokens;
  }

  async deleteToken(userId: string, serviceName: string): Promise<boolean> {
    const id = `${userId}_${serviceName}`;
    const result = this.tokens.delete(id);
    console.log('Token deleted:', { id, success: result });
    return result;
  }

  async validateToken(token: SimpleToken): Promise<boolean> {
    // Simple validation - check if token exists and is not expired
    if (!token) return false;
    
    // For demo purposes, all tokens are valid
    // In production, you'd check expiration, revocation, etc.
    return true;
  }

  async getPaperclipToken(userId: string): Promise<string | null> {
    const token = await this.getToken(userId, 'Paperclip');
    return token?.accessToken || null;
  }

  async storePaperclipToken(userId: string, apiKey: string): Promise<SimpleToken> {
    return this.storeToken(userId, 'Paperclip', apiKey, {
      service: 'paperclip',
      permissions: ['deploy', 'manage_agents', 'create_companies'],
    });
  }

  async hasPaperclipConnection(userId: string): Promise<boolean> {
    const token = await this.getPaperclipToken(userId);
    console.log('Paperclip connection check:', { userId, hasToken: !!token });
    return !!token;
  }

  async getDeploymentHistory(userId: string): Promise<any[]> {
    const token = await this.getToken(userId, 'Paperclip');
    return token?.metadata?.deployments || [];
  }

  async updateTokenUsage(userId: string, serviceName: string, usageData: Record<string, any>): Promise<void> {
    const token = await this.getToken(userId, serviceName);
    if (token) {
      token.metadata = {
        ...token.metadata,
        ...usageData,
        lastUsed: new Date().toISOString(),
      };
      this.tokens.set(token.id, token);
    }
  }
}

// Singleton instance
export const tokenStore = new SimpleTokenStore();
