"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexesAPI = void 0;
const base_1 = require("./base");
/**
 * API service for DEX-related endpoints.
 */
class DexesAPI extends base_1.BaseAPI {
    /**
     * Get a list of DEXes on a specific network.
     *
     * @param networkId - Network ID (e.g., "ethereum", "solana")
     * @param page - Page number for pagination
     * @param limit - Number of items per page
     * @returns Paginated response containing a list of DEXes on the network
     */
    async listByNetwork(networkId, page = 0, limit = 10) {
        const params = {
            page,
            limit,
        };
        return this._get(`/networks/${networkId}/dexes`, params);
    }
}
exports.DexesAPI = DexesAPI;
