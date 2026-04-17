import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';

/**
 * Simple encryption utilities for token storage
 * Uses AES-256-GCM for authenticated encryption
 */

export class TokenEncryption {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly SALT_LENGTH = 32;
  private static readonly IV_LENGTH = 16;
  private static readonly TAG_LENGTH = 16;

  /**
   * Derive encryption key from password using scrypt
   */
  private static async deriveKey(password: string, salt: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      scrypt(password, salt, 32, (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey);
      });
    });
  }

  /**
   * Encrypt sensitive data
   */
  static async encrypt(plaintext: string, password: string): Promise<string> {
    try {
      const salt = randomBytes(this.SALT_LENGTH);
      const iv = randomBytes(this.IV_LENGTH);
      const key = await this.deriveKey(password, salt);
      
      const cipher = createCipheriv(this.ALGORITHM, key, iv);
      
      let encrypted = cipher.update(plaintext, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const tag = cipher.getAuthTag();
      
      // Combine all components: salt + iv + tag + encrypted
      const combined = Buffer.concat([
        salt,
        iv,
        tag,
        Buffer.from(encrypted, 'hex')
      ]);
      
      return combined.toString('base64');
    } catch (error) {
      throw new Error('Encryption failed');
    }
  }

  /**
   * Decrypt sensitive data
   */
  static async decrypt(ciphertext: string, password: string): Promise<string> {
    try {
      const combined = Buffer.from(ciphertext, 'base64');
      
      const salt = combined.slice(0, this.SALT_LENGTH);
      const iv = combined.slice(this.SALT_LENGTH, this.SALT_LENGTH + this.IV_LENGTH);
      const tag = combined.slice(
        this.SALT_LENGTH + this.IV_LENGTH,
        this.SALT_LENGTH + this.IV_LENGTH + this.TAG_LENGTH
      );
      const encrypted = combined.slice(this.SALT_LENGTH + this.IV_LENGTH + this.TAG_LENGTH);
      
      const key = await this.deriveKey(password, salt);
      
      const decipher = createDecipheriv(this.ALGORITHM, key, iv);
      decipher.setAuthTag(tag);
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error('Decryption failed');
    }
  }

  /**
   * Generate a secure random token ID
   */
  static generateTokenId(): string {
    return randomBytes(16).toString('hex');
  }

  /**
   * Validate encryption key format
   */
  static validateEncryptionKey(key: string): boolean {
    // Key should be at least 32 characters for proper entropy
    return key && key.length >= 32;
  }
}
