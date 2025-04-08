import { BaseAPI } from './base';
import { PoolDetails, OHLCVRecord } from '../models/pools';
import { PoolPaginatedResponse } from '../models/base';
export declare class PoolsAPI extends BaseAPI {
    list(page?: number, limit?: number, sort?: 'asc' | 'desc', orderBy?: 'volume_usd' | 'price_usd' | 'transactions' | 'last_price_change_usd_24h' | 'created_at'): Promise<PoolPaginatedResponse>;
    listByNetwork(networkId: string, page?: number, limit?: number, sort?: string, orderBy?: string): Promise<unknown>;
    listByDex(networkId: string, dexId: string, page?: number, limit?: number, sort?: 'asc' | 'desc', orderBy?: 'volume_usd' | 'price_usd' | 'transactions' | 'last_price_change_usd_24h' | 'created_at'): Promise<unknown>;
    getDetails(networkId: string, poolAddress: string, inversed?: boolean): Promise<PoolDetails>;
    getOHLCV(networkId: string, poolAddress: string, start: string, end?: string, limit?: number, interval?: '1m' | '5m' | '10m' | '15m' | '30m' | '1h' | '6h' | '12h' | '24h', inversed?: boolean): Promise<OHLCVRecord[]>;
    getTxs(networkId: string, poolAddress: string, page?: number, limit?: number, cursor?: string): Promise<unknown>;
    getTransactions(networkId: string, poolAddress: string, page?: number, limit?: number, cursor?: string): Promise<unknown>;
}
