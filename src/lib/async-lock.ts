/**
 * Simple async lock implementation to prevent race conditions
 */

export class AsyncLock {
  private locks: Map<string, Promise<any>> = new Map();

  /**
   * Execute a function with a lock to prevent concurrent execution
   */
  async withLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
    // Wait for any existing operation with the same key to complete
    const existingLock = this.locks.get(key);
    if (existingLock) {
      await existingLock;
    }

    // Create a new lock for this operation
    const lockPromise = this.executeWithLock(key, fn);
    this.locks.set(key, lockPromise);

    try {
      return await lockPromise;
    } finally {
      // Clean up the lock when done
      this.locks.delete(key);
    }
  }

  private async executeWithLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
    return fn();
  }

  /**
   * Check if a lock exists for the given key
   */
  isLocked(key: string): boolean {
    return this.locks.has(key);
  }

  /**
   * Get the number of active locks
   */
  getLockCount(): number {
    return this.locks.size;
  }
}

// Singleton instance for token operations
export const tokenLock = new AsyncLock();
