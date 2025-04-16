import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { NetworksAPI } from './api/networks';
import { PoolsAPI } from './api/pools';
import { TokensAPI } from './api/tokens';
import { SearchAPI } from './api/search';
import { UtilsAPI } from './api/utils';
import { DexesAPI } from './api/dexes';
import { withRetry, RetryConfig, defaultRetryConfig } from './utils/helpers';
import { Cache, CacheConfig } from './utils/cache';

/**
 * Client configuration options
 */
export interface ClientConfig {
  /** Retry configuration */
  retry?: Partial<RetryConfig>;
  /** Cache configuration */
  cache?: Partial<CacheConfig>;
}

// Main client class
export class DexPaprikaClient {
  private baseUrl: string;
  private httpClient: AxiosInstance;
  private retryConfig: RetryConfig;
  private cache: Cache;
  
  // API interfaces
  public networks: NetworksAPI;
  public pools: PoolsAPI;
  public tokens: TokensAPI;
  public search: SearchAPI;
  public utils: UtilsAPI;
  public dexes: DexesAPI;

  constructor(
    baseUrl: string = 'https://api.dexpaprika.com',
    options: AxiosRequestConfig = {},
    config: ClientConfig = {}
  ) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    
    // Initialize configs with defaults
    this.retryConfig = { ...defaultRetryConfig, ...config.retry };
    this.cache = new Cache(config.cache);
    
    // Initialize HTTP client
    this.httpClient = axios.create({
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'DexPaprika-SDK-JavaScript/0.1.0',
        ...options.headers,
      },
    });
    
    // Initialize API instances
    this.networks = new NetworksAPI(this);
    this.pools = new PoolsAPI(this);
    this.tokens = new TokensAPI(this);
    this.search = new SearchAPI(this);
    this.utils = new UtilsAPI(this);
    this.dexes = new DexesAPI(this);
  }

  /**
   * Generate a cache key from endpoint and params
   * @private
   */
  private getCacheKey(endpoint: string, params?: Record<string, any>): string {
    return `${endpoint}:${JSON.stringify(params || {})}`;
  }

  /**
   * Make a GET request with caching and retry
   * 
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @returns Response data
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint, params);
    
    // Check cache first
    const cachedData = this.cache.get(cacheKey) as T | undefined;
    if (cachedData) {
      return cachedData;
    }
    
    // If not in cache, fetch with retry
    const operation = async () => {
      const url = `${this.baseUrl}${endpoint}`;
      const response: AxiosResponse<T> = await this.httpClient.get(url, { params });
      
      // Cache the result
      this.cache.set(cacheKey, response.data);
      
      return response.data;
    };
    
    return withRetry(operation, this.retryConfig);
  }

  /**
   * Make a POST request with retry (not cached)
   * 
   * @param endpoint - API endpoint
   * @param data - Request body
   * @param params - Query parameters
   * @returns Response data
   */
  async post<T>(
    endpoint: string, 
    data: Record<string, any>, 
    params?: Record<string, any>
  ): Promise<T> {
    const operation = async () => {
      const url = `${this.baseUrl}${endpoint}`;
      const response: AxiosResponse<T> = await this.httpClient.post(url, data, { params });
      return response.data;
    };
    
    return withRetry(operation, this.retryConfig);
  }
  
  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear();
  }
  
  /**
   * Get current cache size
   */
  get cacheSize(): number {
    return this.cache.size;
  }
  
  /**
   * Check if caching is enabled
   */
  get isCacheEnabled(): boolean {
    return (this.cache as any).config.enabled;
  }
  
  /**
   * Enable or disable cache
   */
  setCacheEnabled(enabled: boolean): void {
    (this.cache as any).config.enabled = enabled;
  }
} 