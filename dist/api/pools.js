"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolsAPI = void 0;
const base_1 = require("./base");
// Pools API implementation
class PoolsAPI extends base_1.BaseAPI {
    // Get top pools across all networks
    async list(page = 0, limit = 10, sort = 'desc', orderBy = 'volume_usd') {
        return this._get('/pools', {
            page, limit, sort, order_by: orderBy
        });
    }
    // Get pools by network
    async listByNetwork(networkId, page = 0, limit = 10, sort = 'desc', orderBy = 'volume_usd') {
        return this._get(`/networks/${networkId}/pools`, {
            page, limit, sort, order_by: orderBy
        });
    }
    // Get pools by DEX
    async listByDex(networkId, dexId, page = 0, limit = 10, sort = 'desc', orderBy = 'volume_usd') {
        let params = {
            page: page,
            limit: limit,
            sort: sort,
            order_by: orderBy
        };
        const url = `/networks/${networkId}/dexes/${dexId}/pools`;
        return this._get(url, params);
    }
    // Get pool details
    async getDetails(networkId, poolAddress, inversed = false) {
        const params = {};
        if (inversed)
            params.inversed = 'true';
        return this._get(`/networks/${networkId}/pools/${poolAddress}`, params);
    }
    // Get OHLCV data
    async getOHLCV(networkId, poolAddress, start, end, limit = 1, interval = '24h', inversed = false) {
        const params = { start, limit, interval };
        if (end)
            params.end = end;
        if (inversed)
            params.inversed = 'true';
        return this._get(`/networks/${networkId}/pools/${poolAddress}/ohlcv`, params);
    }
    // Get transactions for a pool
    getTxs(networkId, poolAddress, page = 0, limit = 10, cursor) {
        let p = { page, limit };
        if (cursor)
            p.cursor = cursor;
        return this._get(`/networks/${networkId}/pools/${poolAddress}/transactions`, p);
    }
    // Alternative method name for getTransactions
    getTransactions(networkId, poolAddress, page = 0, limit = 10, cursor) {
        return this.getTxs(networkId, poolAddress, page, limit, cursor);
    }
}
exports.PoolsAPI = PoolsAPI;
