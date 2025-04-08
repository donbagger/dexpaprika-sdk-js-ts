import { BaseAPI } from './base';
import { SearchResult } from '../models/search';

/**
 * API service for search-related endpoints.
 */
export class SearchAPI extends BaseAPI {
  /**
   * Search for tokens, pools, and DEXes by name or identifier.
   * 
   * @param query - Search term (e.g., "uniswap", "bitcoin", or a token address)
   * @returns Search results across tokens, pools, and DEXes
   */
  async search(query: string): Promise<SearchResult> {
    const params: Record<string, any> = { query };
    return this._get<SearchResult>('/search', params);
  }
} 