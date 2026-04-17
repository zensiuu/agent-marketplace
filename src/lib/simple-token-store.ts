// Simple in-memory token store for testing
// In production, this would be replaced with Auth0 Token Vault

import { TokenEncryption } from './crypto';
import { tokenLock } from './async-lock';

interface SimpleToken {
  id: string;
  userId: string;
  serviceName: string;
  encryptedAccessToken: string;
  metadata: Record<string, any>;
  createdAt: string;
}

class SimpleTokenStore {
  private tokens: Map<string, SimpleToken> = new Map();
  private encryptionKey: string;

  constructor() {
    const key = process.env.TOKEN_ENCRYPTION_KEY;
    if (!key || !TokenEncryption.validateEncryptionKey(key)) {
      // For development/demo, use a fallback key
      console.warn('TOKEN_ENCRYPTION_KEY not set, using fallback key for development');
      this.encryptionKey = 'development-fallback-encryption-key-32-chars';
    } else {
      this.encryptionKey = key;
    }
  }

  async storeToken(userId: string, serviceName: string, accessToken: string, metadata: Record<string, any> = {}): Promise<SimpleToken> {
    const lockKey = `store_${userId}_${serviceName}`;
    
    return tokenLock.withLock(lockKey, async () => {
      const id = `${userId}_${serviceName}`;
      
      // Encrypt the access token
      const encryptedAccessToken = await TokenEncryption.encrypt(accessToken, this.encryptionKey);
      
      const token: SimpleToken = {
        id,
        userId,
        serviceName,
        encryptedAccessToken,
        metadata: {
          ...metadata,
          createdAt: new Date().toISOString(),
          deploymentCount: metadata.deploymentCount || 0,
        },
        createdAt: new Date().toISOString(),
      };

      this.tokens.set(id, token);
      console.log('Token stored securely:', { id, serviceName, userId });
      return token;
    });
  }

  async getToken(userId: string, serviceName: string): Promise<SimpleToken | null> {
    const id = `${userId}_${serviceName}`;
    const encryptedToken = this.tokens.get(id) || null;
    
    if (!encryptedToken) {
      console.log('Token not found:', { id });
      return null;
    }

    console.log('Token retrieved securely:', { id, found: !!encryptedToken });
    return encryptedToken;
  }

  /**
   * Get decrypted access token for API calls
   */
  async getDecryptedAccessToken(userId: string, serviceName: string): Promise<string | null> {
    const token = await this.getToken(userId, serviceName);
    if (!token) return null;

    try {
      return await TokenEncryption.decrypt(token.encryptedAccessToken, this.encryptionKey);
    } catch (error) {
      console.error('Failed to decrypt token:', error);
      return null;
    }
  }

  async listUserTokens(userId: string): Promise<SimpleToken[]> {
    const userTokens = Array.from(this.tokens.values()).filter(token => token.userId === userId);
    console.log('User tokens listed:', { userId, count: userTokens.length });
    return userTokens;
  }

  async deleteToken(userId: string, serviceName: string): Promise<boolean> {
    const lockKey = `delete_${userId}_${serviceName}`;
    
    return tokenLock.withLock(lockKey, async () => {
      const id = `${userId}_${serviceName}`;
      const result = this.tokens.delete(id);
      console.log('Token deleted:', { id, success: result });
      return result;
    });
  }

  async validateToken(token: SimpleToken): Promise<boolean> {
    // Simple validation - check if token exists and can be decrypted
    if (!token) return false;

    try {
      // Try to decrypt to verify token integrity
      await TokenEncryption.decrypt(token.encryptedAccessToken, this.encryptionKey);
      
      // For demo purposes, all decryptable tokens are valid
      // In production, you'd check expiration, revocation, etc.
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }

  async getPaperclipToken(userId: string): Promise<string | null> {
    return this.getDecryptedAccessToken(userId, 'Paperclip');
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
    const lockKey = `update_${userId}_${serviceName}`;
    
    return tokenLock.withLock(lockKey, async () => {
      const id = `${userId}_${serviceName}`;
      const token = this.tokens.get(id);
      if (token) {
        token.metadata = {
          ...token.metadata,
          ...usageData,
          lastUsed: new Date().toISOString(),
        };
        this.tokens.set(id, token);
      }
    });
  }
}

// Singleton instance
export const tokenStore = new SimpleTokenStore();
