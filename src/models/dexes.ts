/**
 * Decentralized exchange information.
 */
export interface Dex {
  /**
   * DEX identifier.
   */
  dex_id: string;
  
  /**
   * DEX name.
   */
  dex_name: string;
  
  /**
   * Network the DEX is on.
   */
  chain: string;
  
  /**
   * Protocol type.
   */
  protocol?: string;
  
  /**
   * DEX website URL.
   */
  website?: string;
  
  /**
   * DEX explorer URL.
   */
  explorer?: string;
  
  /**
   * Twitter URL.
   */
  twitter?: string;
  
  /**
   * Discord URL.
   */
  discord?: string;
  
  /**
   * Telegram URL.
   */
  telegram?: string;
  
  /**
   * Number of pools on the DEX.
   */
  pools_count?: number;
} 