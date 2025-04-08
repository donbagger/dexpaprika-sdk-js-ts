"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexPaprikaClient = void 0;
const axios_1 = __importDefault(require("axios"));
const networks_1 = require("./api/networks");
const pools_1 = require("./api/pools");
const tokens_1 = require("./api/tokens");
const search_1 = require("./api/search");
const utils_1 = require("./api/utils");
const dexes_1 = require("./api/dexes");
/**
 * Main client for the DexPaprika API.
 */
class DexPaprikaClient {
    /**
     * Initialize a new DexPaprika API client.
     *
     * @param baseUrl - Base URL for the API
     * @param options - Additional Axios configuration options
     */
    constructor(baseUrl = 'https://api.dexpaprika.com', options = {}) {
        // Ensure baseUrl doesn't end with a trailing slash
        this.baseUrl = baseUrl.replace(/\/+$/, '');
        // Create Axios instance with default headers
        this.httpClient = axios_1.default.create({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'DexPaprika-SDK-JavaScript/0.1.0',
                ...options.headers,
            },
        });
        // Initialize API services
        this.networks = new networks_1.NetworksAPI(this);
        this.pools = new pools_1.PoolsAPI(this);
        this.tokens = new tokens_1.TokensAPI(this);
        this.search = new search_1.SearchAPI(this);
        this.utils = new utils_1.UtilsAPI(this);
        this.dexes = new dexes_1.DexesAPI(this);
    }
    /**
     * Make a GET request to the DexPaprika API.
     *
     * @param endpoint - API endpoint (e.g., "/networks")
     * @param params - Query parameters
     * @returns Response data
     */
    async get(endpoint, params) {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await this.httpClient.get(url, { params });
        return response.data;
    }
    /**
     * Make a POST request to the DexPaprika API.
     *
     * @param endpoint - API endpoint
     * @param data - Request body
     * @param params - Query parameters
     * @returns Response data
     */
    async post(endpoint, data, params) {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await this.httpClient.post(url, data, { params });
        return response.data;
    }
}
exports.DexPaprikaClient = DexPaprikaClient;
