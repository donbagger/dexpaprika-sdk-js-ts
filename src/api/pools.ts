import { BaseAPI } from './base';
import { 
  PoolDetails, 
  OHLCVRecord
} from '../models/pools';
import { PoolPaginatedResponse } from '../models/base';

// Pools API implementation
export class PoolsAPI extends BaseAPI {
  // Get top pools across all networks
  async list(
    page: number = 0, 
    limit: number = 10, 
    sort: 'asc' | 'desc' = 'desc', 
    orderBy: 'volume_usd' | 'price_usd' | 'transactions' | 'last_price_change_usd_24h' | 'created_at' = 'volume_usd'
  ): Promise<PoolPaginatedResponse> {
    return this._get<PoolPaginatedResponse>('/pools', {
      page, limit, sort, order_by: orderBy
    });
  }
  
  // Get pools by network
  async listByNetwork(networkId: string, page = 0, limit = 10, sort = 'desc', orderBy = 'volume_usd') {
    return this._get(`/networks/${networkId}/pools`, {
      page, limit, sort, order_by: orderBy
    });
  }
  
  // Get pools by DEX
  async listByDex(
    networkId: string, 
    dexId: string, 
    page: number = 0, 
    limit: number = 10, 
    sort: 'asc' | 'desc' = 'desc', 
    orderBy: 'volume_usd' | 'price_usd' | 'transactions' | 'last_price_change_usd_24h' | 'created_at' = 'volume_usd'
  ) {
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
  async getDetails(
    networkId: string, 
    poolAddress: string, 
    inversed: boolean = false
  ): Promise<PoolDetails> {
    const params: Record<string, any> = {};
    if (inversed) params.inversed = 'true';
    
    return this._get<PoolDetails>(`/networks/${networkId}/pools/${poolAddress}`, params);
  }
  
  // Get OHLCV data
  async getOHLCV(
    networkId: string, 
    poolAddress: string, 
    start: string, 
    end?: string, 
    limit: number = 1, 
    interval: '1m' | '5m' | '10m' | '15m' | '30m' | '1h' | '6h' | '12h' | '24h' = '24h', 
    inversed: boolean = false
  ): Promise<OHLCVRecord[]> {
    const params: Record<string, any> = { start, limit, interval };
    
    if (end) params.end = end;
    if (inversed) params.inversed = 'true';
    
    return this._get<OHLCVRecord[]>(`/networks/${networkId}/pools/${poolAddress}/ohlcv`, params);
  }
  
  // Get transactions for a pool
  getTxs(networkId: string, poolAddress: string, page = 0, limit = 10, cursor?: string) {
    let p: Record<string, any> = { page, limit };
    if (cursor) p.cursor = cursor;
    
    return this._get(`/networks/${networkId}/pools/${poolAddress}/transactions`, p);
  }
  
  // Alternative method name for getTransactions
  getTransactions(networkId: string, poolAddress: string, page = 0, limit = 10, cursor?: string) {
    return this.getTxs(networkId, poolAddress, page, limit, cursor);
  }
}