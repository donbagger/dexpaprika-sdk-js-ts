import { BaseAPI } from './base';
import { PoolDetails, OHLCVRecord, TransactionsResponse } from '../models/pools';
import { PoolPaginatedResponse } from '../models/base';
/**
 * API service for pool-related endpoints.
 */
export declare class PoolsAPI extends BaseAPI {
    /**
     * Get a paginated list of top pools from all networks.
     *
     * @param page - Page number for pagination
     * @param limit - Number of items per page
     * @param sort - Sort order ("asc" or "desc")
     * @param orderBy - Field to order by ("volume_usd", "price_usd", "transactions", "last_price_change_usd_24h", "created_at")
     * @returns Response containing a list of pools
     */
    list(page?: number, limit?: number, sort?: 'asc' | 'desc', orderBy?: 'volume_usd' | 'price_usd' | 'transactions' | 'last_price_change_usd_24h' | 'created_at'): Promise<PoolPaginatedResponse>;
    /**
     * Get a paginated list of top pools on a specific network.
     *
     * @param networkId - Network ID (e.g., "ethereum", "solana")
     * @param page - Page number for pagination
     * @param limit - Number of items per page
     * @param sort - Sort order ("asc" or "desc")
     * @param orderBy - Field to order by ("volume_usd", "price_usd", "transactions", "last_price_change_usd_24h", "created_at")
     * @returns Response containing a list of pools for the given network
     */
    listByNetwork(networkId: string, page?: number, limit?: number, sort?: 'asc' | 'desc', orderBy?: 'volume_usd' | 'price_usd' | 'transactions' | 'last_price_change_usd_24h' | 'created_at'): Promise<PoolPaginatedResponse>;
    /**
     * Get a paginated list of top pools on a specific network's DEX.
     *
     * @param networkId - Network ID (e.g., "ethereum", "solana")
     * @param dexId - DEX identifier (e.g., "uniswap_v3")
     * @param page - Page number for pagination
     * @param limit - Number of items per page
     * @param sort - Sort order ("asc" or "desc")
     * @param orderBy - Field to order by ("volume_usd", "price_usd", "transactions", "last_price_change_usd_24h", "created_at")
     * @returns Response containing a list of pools for the given DEX
     */
    listByDex(networkId: string, dexId: string, page?: number, limit?: number, sort?: 'asc' | 'desc', orderBy?: 'volume_usd' | 'price_usd' | 'transactions' | 'last_price_change_usd_24h' | 'created_at'): Promise<PoolPaginatedResponse>;
    /**
     * Get detailed information about a specific pool on a network.
     *
     * @param networkId - Network ID (e.g., "ethereum", "solana")
     * @param poolAddress - Pool address or identifier
     * @param inversed - Whether to invert the price ratio
     * @returns Detailed information about the pool
     */
    getDetails(networkId: string, poolAddress: string, inversed?: boolean): Promise<PoolDetails>;
    /**
     * Get OHLCV (Open-High-Low-Close-Volume) data for a specific pool.
     *
     * @param networkId - Network ID (e.g., "ethereum", "solana")
     * @param poolAddress - Pool address or identifier
     * @param start - Start time for historical data (ISO-8601, yyyy-mm-dd, or Unix timestamp)
     * @param end - End time for historical data (max 1 year from start)
     * @param limit - Number of data points to retrieve (max 366)
     * @param interval - Interval granularity for OHLCV data (1m, 5m, 10m, 15m, 30m, 1h, 6h, 12h, 24h)
     * @param inversed - Whether to invert the price ratio in OHLCV calculations
     * @returns List of OHLCV records
     */
    getOHLCV(networkId: string, poolAddress: string, start: string, end?: string, limit?: number, interval?: '1m' | '5m' | '10m' | '15m' | '30m' | '1h' | '6h' | '12h' | '24h', inversed?: boolean): Promise<OHLCVRecord[]>;
    /**
     * Get transactions of a pool on a network.
     *
     * @param networkId - Network ID (e.g., "ethereum", "solana")
     * @param poolAddress - Pool address or identifier
     * @param page - Page number for pagination
     * @param limit - Number of items per page
     * @param cursor - Transaction ID used for cursor-based pagination
     * @returns Response containing a list of transactions
     */
    getTransactions(networkId: string, poolAddress: string, page?: number, limit?: number, cursor?: string): Promise<TransactionsResponse>;
}
