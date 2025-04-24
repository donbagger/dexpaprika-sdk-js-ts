import { BaseAPI } from './base';
import { TokenDetails } from '../models/tokens';
import { PoolPaginatedResponse } from '../models/base';
import { TokenPoolsOptions } from '../models/options';

/**
 * API service for token-related endpoints.
 */
export class TokensAPI extends BaseAPI {
  /**
   * Get detailed information about a specific token on a network.
   * 
   * @param networkId - Network ID (e.g., "ethereum", "solana")
   * @param tokenAddress - Token address or identifier
   * @returns Detailed information about the token
   */
  async getDetails(networkId: string, tokenAddress: string): Promise<TokenDetails> {
    return this._get<TokenDetails>(`/networks/${networkId}/tokens/${tokenAddress}`);
  }
  
  /**
   * Get a list of top liquidity pools for a specific token on a network.
   * 
   * @param networkId - Network ID (e.g., "ethereum", "solana")
   * @param tokenAddress - Token address or identifier
   * @param options - Options for pagination, sorting, and filtering
   * @returns Response containing a list of pools that include the specified token
   */
  async getPools(
    networkId: string, 
    tokenAddress: string,
    options?: TokenPoolsOptions
  ): Promise<PoolPaginatedResponse> {
    // build params
    const params: Record<string, any> = { 
      page: options?.page ?? 0, 
      limit: options?.limit ?? 10, 
      sort: options?.sort ?? 'desc', 
      order_by: options?.orderBy ?? 'volume_usd' 
    };
    
    // add pair token if specified
    if (options?.pairWith) params['address'] = options.pairWith;
    
    // get pools filtered by token
    return this._get<PoolPaginatedResponse>(
      `/networks/${networkId}/tokens/${tokenAddress}/pools`, 
      params
    );
  }
} 