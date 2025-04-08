import { BaseAPI } from './base';
import { Stats } from '../models/utils';

/**
 * API service for utility endpoints.
 */
export class UtilsAPI extends BaseAPI {
  /**
   * Get statistics about the DexPaprika ecosystem.
   * 
   * @returns Statistics about chains, DEXes, pools, and tokens
   */
  async getStats(): Promise<Stats> {
    return this._get<Stats>('/stats');
  }
} 