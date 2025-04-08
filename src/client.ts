import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { NetworksAPI } from './api/networks';
import { PoolsAPI } from './api/pools';
import { TokensAPI } from './api/tokens';
import { SearchAPI } from './api/search';
import { UtilsAPI } from './api/utils';
import { DexesAPI } from './api/dexes';

/**
 * Main client for the DexPaprika API.
 */
export class DexPaprikaClient {
  private baseUrl: string;
  private httpClient: AxiosInstance;
  
  // API service instances
  public networks: NetworksAPI;
  public pools: PoolsAPI;
  public tokens: TokensAPI;
  public search: SearchAPI;
  public utils: UtilsAPI;
  public dexes: DexesAPI;

  /**
   * Initialize a new DexPaprika API client.
   * 
   * @param baseUrl - Base URL for the API
   * @param options - Additional Axios configuration options
   */
  constructor(
    baseUrl: string = 'https://api.dexpaprika.com',
    options: AxiosRequestConfig = {}
  ) {
    // Ensure baseUrl doesn't end with a trailing slash
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    
    // Create Axios instance with default headers
    this.httpClient = axios.create({
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'DexPaprika-SDK-JavaScript/0.1.0',
        ...options.headers,
      },
    });
    
    // Initialize API services
    this.networks = new NetworksAPI(this);
    this.pools = new PoolsAPI(this);
    this.tokens = new TokensAPI(this);
    this.search = new SearchAPI(this);
    this.utils = new UtilsAPI(this);
    this.dexes = new DexesAPI(this);
  }

  /**
   * Make a GET request to the DexPaprika API.
   * 
   * @param endpoint - API endpoint (e.g., "/networks")
   * @param params - Query parameters
   * @returns Response data
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response: AxiosResponse<T> = await this.httpClient.get(url, { params });
    return response.data;
  }

  /**
   * Make a POST request to the DexPaprika API.
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
    const url = `${this.baseUrl}${endpoint}`;
    const response: AxiosResponse<T> = await this.httpClient.post(url, data, { params });
    return response.data;
  }
} 