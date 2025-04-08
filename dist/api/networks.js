"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworksAPI = void 0;
const base_1 = require("./base");
/**
 * API service for network-related endpoints.
 */
class NetworksAPI extends base_1.BaseAPI {
    /**
     * Get a list of supported blockchain networks.
     *
     * @returns List of supported networks
     */
    async list() {
        return this._get('/networks');
    }
}
exports.NetworksAPI = NetworksAPI;
