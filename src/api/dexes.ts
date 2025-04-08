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
    page = 0, 
    limit = 10
  ): Promise<DexPaginatedResponse> {
    return this._get(`/networks/${networkId}/dexes`, { page, limit });
  }
} 