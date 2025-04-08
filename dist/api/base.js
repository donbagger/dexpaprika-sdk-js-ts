"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAPI = void 0;
// base for api classes
class BaseAPI {
    /**
     * Initialize a new API service.
     *
     * @param client - DexPaprika client instance
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Make a GET request.
     *
     * @param endpoint - API endpoint
     * @param params - Query parameters
     * @returns Response data
     */
    async _get(endpoint, params) {
        return this.client.get(endpoint, params);
    }
    /**
     * Make a POST request.
     *
     * @param endpoint - API endpoint
     * @param data - Request body
     * @param params - Query parameters
     * @returns Response data
     */
    async _post(endpoint, data, params) {
        return this.client.post(endpoint, data, params);
    }
}
exports.BaseAPI = BaseAPI;
