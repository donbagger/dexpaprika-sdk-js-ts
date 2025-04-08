import { AxiosRequestConfig } from 'axios';
import { NetworksAPI } from './api/networks';
import { PoolsAPI } from './api/pools';
import { TokensAPI } from './api/tokens';
import { SearchAPI } from './api/search';
import { UtilsAPI } from './api/utils';
import { DexesAPI } from './api/dexes';
export declare class DexPaprikaClient {
    private baseUrl;
    private httpClient;
    networks: NetworksAPI;
    pools: PoolsAPI;
    tokens: TokensAPI;
    search: SearchAPI;
    utils: UtilsAPI;
    dexes: DexesAPI;
    constructor(baseUrl?: string, options?: AxiosRequestConfig);
    get<T>(endpoint: string, params?: Record<string, any>): Promise<T>;
    post<T>(endpoint: string, data: Record<string, any>, params?: Record<string, any>): Promise<T>;
}
