import { BaseAPI } from './base';
import { 
  PoolDetails, 
  OHLCVRecord
} from '../models/pools';
import { PoolPaginatedResponse } from '../models/base';
import { 
  PoolListOptions, 
  OHLCVOptions, 
  PoolDetailsOptions, 
  TransactionOptions 
} from '../models/options';

// Pools API implementation
export class PoolsAPI extends BaseAPI {
  /**
   * Get top pools across all networks with pagination and sorting.
   * 
   * @param options - Options for filtering, pagination and sorting
   * @returns Paginated list of pools
   */
  async list(options?: PoolListOptions): Promise<PoolPaginatedResponse> {
    const params: Record<string, any> = {
      page: options?.page ?? 0,
      limit: options?.limit ?? 10,
      sort: options?.sort ?? 'desc',
      order_by: options?.orderBy ?? 'volume_usd'
    };
    
    return this._get<PoolPaginatedResponse>('/pools', params);
  }
  
  /**
   * Get pools on a specific network with pagination and sorting.
   * 
   * @param networkId - Network identifier (e.g., 'ethereum', 'solana')
   * @param options - Options for filtering, pagination and sorting
   * @returns Paginated list of pools on the specified network
   */
  async listByNetwork(
    networkId: string, 
    options?: PoolListOptions
  ): Promise<PoolPaginatedResponse> {
    const params: Record<string, any> = {
      page: options?.page ?? 0,
      limit: options?.limit ?? 10,
      sort: options?.sort ?? 'desc',
      order_by: options?.orderBy ?? 'volume_usd'
    };
    
    return this._get<PoolPaginatedResponse>(`/networks/${networkId}/pools`, params);
  }
  
  /**
   * Get pools on a specific DEX within a network with pagination.
   * 
   * @param networkId - Network identifier (e.g., 'ethereum', 'solana')
   * @param dexId - DEX identifier (e.g., 'uniswap_v2', 'sushiswap')
   * @param options - Options for filtering, pagination and sorting
   * @returns Paginated list of pools on the specified DEX
   */
  async listByDex(
    networkId: string, 
    dexId: string, 
    options?: PoolListOptions
  ): Promise<PoolPaginatedResponse> {
    const params: Record<string, any> = {
      page: options?.page ?? 0,
      limit: options?.limit ?? 10,
      sort: options?.sort ?? 'desc',
      order_by: options?.orderBy ?? 'volume_usd'
    };
    
    return this._get<PoolPaginatedResponse>(`/networks/${networkId}/dexes/${dexId}/pools`, params);
  }
  
  /**
   * Get detailed information about a specific pool.
   * 
   * @param networkId - Network identifier (e.g., 'ethereum', 'solana')
   * @param poolAddress - On-chain address of the pool
   * @param options - Additional options for pool details
   * @returns Detailed pool information
   */
  async getDetails(
    networkId: string, 
    poolAddress: string, 
    options?: PoolDetailsOptions
  ): Promise<PoolDetails> {
    const params: Record<string, any> = {};
    if (options?.inversed) params.inversed = 'true';
    
    return this._get<PoolDetails>(`/networks/${networkId}/pools/${poolAddress}`, params);
  }
  
  /**
   * Get OHLCV (Open-High-Low-Close-Volume) data for a pool.
   * 
   * @param networkId - Network identifier (e.g., 'ethereum', 'solana')
   * @param poolAddress - On-chain address of the pool
   * @param options - OHLCV options including time range and interval
   * @returns Time-series OHLCV data
   */
  async getOHLCV(
    networkId: string, 
    poolAddress: string, 
    options: OHLCVOptions
  ): Promise<OHLCVRecord[]> {
    const params: Record<string, any> = { 
      start: options.start,
      limit: options.limit ?? 1,
      interval: options.interval ?? '24h'
    };
    
    if (options.end) params.end = options.end;
    if (options.inversed) params.inversed = 'true';
    
    return this._get<OHLCVRecord[]>(`/networks/${networkId}/pools/${poolAddress}/ohlcv`, params);
  }
  
  /**
   * Get transaction history for a specific pool.
   * 
   * @param networkId - Network identifier (e.g., 'ethereum', 'solana')
   * @param poolAddress - On-chain address of the pool
   * @param options - Pagination options
   * @returns List of pool transactions
   */
  async getTxs(
    networkId: string, 
    poolAddress: string, 
    options?: TransactionOptions
  ) {
    const params: Record<string, any> = {
      page: options?.page ?? 0,
      limit: options?.limit ?? 10
    };
    
    if (options?.cursor) params.cursor = options.cursor;
    
    return this._get(`/networks/${networkId}/pools/${poolAddress}/transactions`, params);
  }
  
  /**
   * Alternative method name for getTransactions
   * 
   * @param networkId - Network identifier (e.g., 'ethereum', 'solana')
   * @param poolAddress - On-chain address of the pool
   * @param options - Pagination options
   * @returns List of pool transactions
   */
  getTransactions(
    networkId: string, 
    poolAddress: string, 
    options?: TransactionOptions
  ) {
    return this.getTxs(networkId, poolAddress, options);
  }
}