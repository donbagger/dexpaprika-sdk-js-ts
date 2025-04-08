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
// Main client class
class DexPaprikaClient {
    constructor(baseUrl = 'https://api.dexpaprika.com', options = {}) {
        this.baseUrl = baseUrl.replace(/\/+$/, '');
        // Initialize HTTP client
        this.httpClient = axios_1.default.create({
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'DexPaprika-SDK-JavaScript/0.1.0',
                ...options.headers,
            },
        });
        // Initialize API instances
        this.networks = new networks_1.NetworksAPI(this);
        this.pools = new pools_1.PoolsAPI(this);
        this.tokens = new tokens_1.TokensAPI(this);
        this.search = new search_1.SearchAPI(this);
        this.utils = new utils_1.UtilsAPI(this);
        this.dexes = new dexes_1.DexesAPI(this);
    }
    // GET request method
    async get(endpoint, params) {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await this.httpClient.get(url, { params });
        return response.data;
    }
    // POST request method
    async post(endpoint, data, params) {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await this.httpClient.post(url, data, { params });
        return response.data;
    }
}
exports.DexPaprikaClient = DexPaprikaClient;
