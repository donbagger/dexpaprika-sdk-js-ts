import { BaseAPI } from './base';
import { SearchResult } from '../models/search';
/**
 * API service for search-related endpoints.
 */
export declare class SearchAPI extends BaseAPI {
    /**
     * Search for tokens, pools, and DEXes by name or identifier.
     *
     * @param query - Search term (e.g., "uniswap", "bitcoin", or a token address)
     * @returns Search results across tokens, pools, and DEXes
     */
    search(query: string): Promise<SearchResult>;
}
