import { AxiosRequestConfig } from 'axios';
import { NetworksAPI } from './api/networks';
import { PoolsAPI } from './api/pools';
import { TokensAPI } from './api/tokens';
import { SearchAPI } from './api/search';
import { UtilsAPI } from './api/utils';
import { DexesAPI } from './api/dexes';
/**
 * Main client for the DexPaprika API.
 */
export declare class DexPaprikaClient {
    private baseUrl;
    private httpClient;
    networks: NetworksAPI;
    pools: PoolsAPI;
    tokens: TokensAPI;
    search: SearchAPI;
    utils: UtilsAPI;
    dexes: DexesAPI;
    /**
     * Initialize a new DexPaprika API client.
     *
     * @param baseUrl - Base URL for the API
     * @param options - Additional Axios configuration options
     */
    constructor(baseUrl?: string, options?: AxiosRequestConfig);
    /**
     * Make a GET request to the DexPaprika API.
     *
     * @param endpoint - API endpoint (e.g., "/networks")
     * @param params - Query parameters
     * @returns Response data
     */
    get<T>(endpoint: string, params?: Record<string, any>): Promise<T>;
    /**
     * Make a POST request to the DexPaprika API.
     *
     * @param endpoint - API endpoint
     * @param data - Request body
     * @param params - Query parameters
     * @returns Response data
     */
    post<T>(endpoint: string, data: Record<string, any>, params?: Record<string, any>): Promise<T>;
}
