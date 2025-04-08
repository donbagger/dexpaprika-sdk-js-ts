/**
 * Page information for paginated results.
 */
export interface PageInfo {
  /**
   * Number of items per page.
   */
  limit: number;
  
  /**
   * Current page number.
   */
  page: number;
  
  /**
   * Total number of items. May be omitted for some endpoints.
   */
  total_items?: number;
  
  /**
   * Total number of pages. May be omitted for some endpoints.
   */
  total_pages?: number;
  
  /**
   * Next cursor for cursor-based pagination. May be omitted for some endpoints.
   */
  next_cursor?: string;
}

/**
 * Generic paginated response.
 */
export interface PaginatedResponse<T> {
  /**
   * Array of items in the current page.
   */
  items: T[];
  
  /**
   * Pagination information.
   */
  page_info: PageInfo;
}

/**
 * Specialized paginated response for DEXes.
 */
export interface DexPaginatedResponse {
  /**
   * Array of DEX items.
   */
  dexes: Dex[];
  
  /**
   * Pagination information.
   */
  page_info: PageInfo;
}

/**
 * Specialized paginated response for pools.
 */
export interface PoolPaginatedResponse {
  /**
   * Array of pool items.
   */
  pools: Pool[];
  
  /**
   * Pagination information.
   */
  page_info: PageInfo;
}

// We'll need to import these types to avoid reference errors
import { Dex } from './dexes';
import { Pool } from './pools'; 