"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchAPI = void 0;
const base_1 = require("./base");
/**
 * API service for search-related endpoints.
 */
class SearchAPI extends base_1.BaseAPI {
    /**
     * Search for tokens, pools, and DEXes by name or identifier.
     *
     * @param query - Search term (e.g., "uniswap", "bitcoin", or a token address)
     * @returns Search results across tokens, pools, and DEXes
     */
    async search(query) {
        const params = { query };
        return this._get('/search', params);
    }
}
exports.SearchAPI = SearchAPI;
