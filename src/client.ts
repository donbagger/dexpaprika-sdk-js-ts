import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { NetworksAPI } from './api/networks';
import { PoolsAPI } from './api/pools';
import { TokensAPI } from './api/tokens';
import { SearchAPI } from './api/search';
import { UtilsAPI } from './api/utils';
import { DexesAPI } from './api/dexes';

// Main client class
export class DexPaprikaClient {
  private baseUrl: string;
  private httpClient: AxiosInstance;
  
  // API interfaces
  public networks: NetworksAPI;
  public pools: PoolsAPI;
  public tokens: TokensAPI;
  public search: SearchAPI;
  public utils: UtilsAPI;
  public dexes: DexesAPI;

  constructor(
    baseUrl: string = 'https://api.dexpaprika.com',
    options: AxiosRequestConfig = {}
  ) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    
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

  // GET request method
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response: AxiosResponse<T> = await this.httpClient.get(url, { params });
    return response.data;
  }

  // POST request method
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