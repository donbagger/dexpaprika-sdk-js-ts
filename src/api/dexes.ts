import { BaseAPI } from './base';
import { DexPaginatedResponse } from '../models/base';

/**
 * API service for DEX-related endpoints.
 */
export class DexesAPI extends BaseAPI {
  /**
   * Get a list of DEXes on a specific network.
   * 
   * @param networkId - Network ID (e.g., "ethereum", "solana")
   * @param page - Page number for pagination
   * @param limit - Number of items per page
   * @returns Paginated response containing a list of DEXes on the network
   */
  async listByNetwork(
    networkId: string, 
    page: number = 0, 
    limit: number = 10
  ): Promise<DexPaginatedResponse> {
    const params: Record<string, any> = {
      page,
      limit,
    };
    
    return this._get<DexPaginatedResponse>(`/networks/${networkId}/dexes`, params);
  }
} 