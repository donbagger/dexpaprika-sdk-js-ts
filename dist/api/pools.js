"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolsAPI = void 0;
const base_1 = require("./base");
/**
 * API service for pool-related endpoints.
 */
class PoolsAPI extends base_1.BaseAPI {
    /**
     * Get a paginated list of top pools from all networks.
     *
     * @param page - Page number for pagination
     * @param limit - Number of items per page
     * @param sort - Sort order ("asc" or "desc")
     * @param orderBy - Field to order by ("volume_usd", "price_usd", "transactions", "last_price_change_usd_24h", "created_at")
     * @returns Response containing a list of pools
     */
    async list(page = 0, limit = 10, sort = 'desc', orderBy = 'volume_usd') {
        const params = {
            page,
            limit,
            sort,
            order_by: orderBy,
        };
        return this._get('/pools', params);
    }
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
    async listByNetwork(networkId, page = 0, limit = 10, sort = 'desc', orderBy = 'volume_usd') {
        const params = {
            page,
            limit,
            sort,
            order_by: orderBy,
        };
        return this._get(`/networks/${networkId}/pools`, params);
    }
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
    async listByDex(networkId, dexId, page = 0, limit = 10, sort = 'desc', orderBy = 'volume_usd') {
        const params = {
            page,
            limit,
            sort,
            order_by: orderBy,
        };
        return this._get(`/networks/${networkId}/dexes/${dexId}/pools`, params);
    }
    /**
     * Get detailed information about a specific pool on a network.
     *
     * @param networkId - Network ID (e.g., "ethereum", "solana")
     * @param poolAddress - Pool address or identifier
     * @param inversed - Whether to invert the price ratio
     * @returns Detailed information about the pool
     */
    async getDetails(networkId, poolAddress, inversed = false) {
        const params = {};
        if (inversed)
            params.inversed = 'true';
        return this._get(`/networks/${networkId}/pools/${poolAddress}`, params);
    }
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
    async getOHLCV(networkId, poolAddress, start, end, limit = 1, interval = '24h', inversed = false) {
        const params = {
            start,
            limit,
            interval
        };
        if (end)
            params.end = end;
        if (inversed)
            params.inversed = 'true';
        return this._get(`/networks/${networkId}/pools/${poolAddress}/ohlcv`, params);
    }
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
    async getTransactions(networkId, poolAddress, page = 0, limit = 10, cursor) {
        const params = {
            page,
            limit,
        };
        if (cursor)
            params.cursor = cursor;
        return this._get(`/networks/${networkId}/pools/${poolAddress}/transactions`, params);
    }
}
exports.PoolsAPI = PoolsAPI;
