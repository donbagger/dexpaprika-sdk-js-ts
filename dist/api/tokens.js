"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensAPI = void 0;
const base_1 = require("./base");
/**
 * API service for token-related endpoints.
 */
class TokensAPI extends base_1.BaseAPI {
    /**
     * Get detailed information about a specific token on a network.
     *
     * @param networkId - Network ID (e.g., "ethereum", "solana")
     * @param tokenAddress - Token address or identifier
     * @returns Detailed information about the token
     */
    async getDetails(networkId, tokenAddress) {
        return this._get(`/networks/${networkId}/tokens/${tokenAddress}`);
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
    async getPools(networkId, tokenAddress, page = 0, limit = 10, sort = 'desc', orderBy = 'volume_usd', otherTokenAddress) {
        const params = {
            page,
            limit,
            sort,
            order_by: orderBy,
        };
        if (otherTokenAddress)
            params.address = otherTokenAddress;
        return this._get(`/networks/${networkId}/tokens/${tokenAddress}/pools`, params);
    }
}
exports.TokensAPI = TokensAPI;
