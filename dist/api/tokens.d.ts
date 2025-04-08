import { BaseAPI } from './base';
import { TokenWithDetails } from '../models/tokens';
import { PoolPaginatedResponse } from '../models/base';
/**
 * API service for token-related endpoints.
 */
export declare class TokensAPI extends BaseAPI {
    /**
     * Get detailed information about a specific token on a network.
     *
     * @param networkId - Network ID (e.g., "ethereum", "solana")
     * @param tokenAddress - Token address or identifier
     * @returns Detailed information about the token
     */
    getDetails(networkId: string, tokenAddress: string): Promise<TokenWithDetails>;
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
    getPools(networkId: string, tokenAddress: string, page?: number, limit?: number, sort?: 'asc' | 'desc', orderBy?: 'volume_usd' | 'price_usd' | 'transactions' | 'last_price_change_usd_24h' | 'created_at', otherTokenAddress?: string): Promise<PoolPaginatedResponse>;
}
