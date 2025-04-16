/**
 * Configuration for the cache
 */
export interface CacheConfig {
  /** Time to live in milliseconds */
  ttl: number;
  /** Maximum number of items in cache */
  maxSize: number;
  /** Whether caching is enabled (default: true) */
  enabled: boolean;
}

/**
 * Cache entry with stored data and expiration
 */
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  lastAccessed: number;
}

/**
 * Default cache configuration
 */
export const defaultCacheConfig: CacheConfig = {
  ttl: 5 * 60 * 1000, // 5 minutes default
  maxSize: 1000,      // Default max size
  enabled: true       // Enabled by default
};

/**
 * Simple LRU cache implementation with TTL
 */
export class Cache<T = any> {
  private store: Map<string, CacheEntry<T>>;
  private config: CacheConfig;

  /**
   * Create a new cache instance
   * 
   * @param config - Cache configuration options
   */
  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      ...defaultCacheConfig,
      ...config
    };
    this.store = new Map();
  }

  /**
   * Store a value in the cache
   * 
   * @param key - Cache key
   * @param value - Value to store
   */
  set(key: string, value: T): void {
    if (!this.config.enabled) return;

    // If at capacity, remove least recently used item
    if (this.store.size >= this.config.maxSize) {
      this.evictLRU();
    }

    const now = Date.now();
    this.store.set(key, {
      data: value,
      expiresAt: now + this.config.ttl,
      lastAccessed: now
    });
  }

  /**
   * Retrieve a value from the cache
   * 
   * @param key - Cache key
   * @returns The stored value or undefined if not found or expired
   */
  get(key: string): T | undefined {
    if (!this.config.enabled) return undefined;

    const entry = this.store.get(key);
    if (!entry) return undefined;

    const now = Date.now();
    
    // Check if entry is expired
    if (now > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    // Update last accessed time for LRU tracking
    entry.lastAccessed = now;
    return entry.data;
  }

  /**
   * Check if a key exists in the cache and is not expired
   * 
   * @param key - Cache key
   * @returns True if key exists and is not expired
   */
  has(key: string): boolean {
    if (!this.config.enabled) return false;

    const entry = this.store.get(key);
    if (!entry) return false;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Remove an item from the cache
   * 
   * @param key - Cache key
   * @returns True if the item was in the cache
   */
  delete(key: string): boolean {
    return this.store.delete(key);
  }

  /**
   * Clear all items from the cache
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Get the number of items in the cache
   */
  get size(): number {
    return this.store.size;
  }

  /**
   * Remove the least recently accessed item
   * @private
   */
  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    // Find the least recently used item
    for (const [key, entry] of this.store.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    // Remove it if found
    if (oldestKey !== null) {
      this.store.delete(oldestKey);
    }
  }
} 