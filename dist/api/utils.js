"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsAPI = void 0;
const base_1 = require("./base");
/**
 * API service for utility endpoints.
 */
class UtilsAPI extends base_1.BaseAPI {
    /**
     * Get statistics about the DexPaprika ecosystem.
     *
     * @returns Statistics about chains, DEXes, pools, and tokens
     */
    async getStats() {
        return this._get('/stats');
    }
}
exports.UtilsAPI = UtilsAPI;
