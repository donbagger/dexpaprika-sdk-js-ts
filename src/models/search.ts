import { Token, Pool } from './pools';

/**
 * DEX search result.
 */
export interface DexResult {
  /**
   * DEX identifier.
   */
  id: string;
  
  /**
   * DEX name.
   */
  name: string;
  
  /**
   * Network the DEX is on.
   */
  chain: string;
  
  /**
   * DEX website URL.
   */
  website?: string;
  
  /**
   * Number of pools on the DEX.
   */
  pools_count: number;
}

/**
 * Search results across tokens, pools, and DEXes.
 */
export interface SearchResult {
  /**
   * List of matching tokens.
   */
  tokens: Token[];
  
  /**
   * List of matching pools.
   */
  pools: Pool[];
  
  /**
   * List of matching DEXes.
   */
  dexes: DexResult[];
} 