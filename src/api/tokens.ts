import { BaseAPI } from './base';
import { TokenWithDetails } from '../models/tokens';
import { PoolPaginatedResponse } from '../models/base';

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
  async getDetails(
    networkId: string, 
    tokenAddress: string
  ): Promise<TokenWithDetails> {
    return this._get<TokenWithDetails>(`/networks/${networkId}/tokens/${tokenAddress}`);
  }
  
  /**
   * Get a list of top liquidity pools for a specific token on a network.
   * 
   * @param networkId - Network ID (e.g., "ethereum", "solana")
   * @param tokenAddress - Token address or identifier
   * @param page - Page number for pagination
   * @param limit - Number of items per page
   * @param sort - Sort order ("asc" or "desc")
   * @param orderBy - Field to order by ("volume_usd", "price_usd", "transactions", "last_price_change_usd_24h", "created_at")
   * @param otherTokenAddress - Filter pools that contain this additional token address
   * @returns Response containing a list of pools that include the specified token
   */
  async getPools(
    networkId: string, 
    tokenAddress: string, 
    page: number = 0, 
    limit: number = 10, 
    sort: 'asc' | 'desc' = 'desc', 
    orderBy: 'volume_usd' | 'price_usd' | 'transactions' | 'last_price_change_usd_24h' | 'created_at' = 'volume_usd',
    otherTokenAddress?: string
  ): Promise<PoolPaginatedResponse> {
    const params: Record<string, any> = {
      page,
      limit,
      sort,
      order_by: orderBy,
    };
    
    if (otherTokenAddress) params.address = otherTokenAddress;
    
    return this._get<PoolPaginatedResponse>(`/networks/${networkId}/tokens/${tokenAddress}/pools`, params);
  }
} 