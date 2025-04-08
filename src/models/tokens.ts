import { Token } from './pools';

/**
 * Detailed information about a token.
 */
export interface TokenDetails extends Token {
  /**
   * Logo URL.
   */
  logo_url?: string;
  
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
   * Market capitalization.
   */
  market_cap?: number;
  
  /**
   * Current price in USD.
   */
  price_usd?: number;
  
  /**
   * 24-hour price change percentage.
   */
  price_change_24h?: number;
  
  /**
   * 7-day price change percentage.
   */
  price_change_7d?: number;
  
  /**
   * 30-day price change percentage.
   */
  price_change_30d?: number;
  
  /**
   * Circulating supply.
   */
  circulating_supply?: number;
}

/**
 * Time interval metrics for tokens.
 */
export interface TokenTimeIntervalMetrics {
  /**
   * Trading volume in token units.
   */
  volume: number;
  
  /**
   * Trading volume in USD.
   */
  volume_usd: number;
  
  /**
   * Buy volume in USD.
   */
  buy_usd: number;
  
  /**
   * Sell volume in USD.
   */
  sell_usd: number;
  
  /**
   * Number of sell transactions.
   */
  sells: number;
  
  /**
   * Number of buy transactions.
   */
  buys: number;
  
  /**
   * Total number of transactions.
   */
  txns: number;
  
  /**
   * Price change in USD
   */
  last_price_usd_change?: number;
}

/**
 * Token summary metrics.
 */
export interface TokenSummary {
  /**
   * Current price in USD.
   */
  price_usd: number;
  
  /**
   * Fully diluted valuation.
   */
  fdv?: number;
  
  /**
   * Total liquidity in USD.
   */
  liquidity_usd?: number;
  
  /**
   * 24-hour metrics.
   */
  '24h'?: TokenTimeIntervalMetrics;
  
  /**
   * 6-hour metrics.
   */
  '6h'?: TokenTimeIntervalMetrics;
  
  /**
   * 1-hour metrics.
   */
  '1h'?: TokenTimeIntervalMetrics;
  
  /**
   * 30-minute metrics.
   */
  '30m'?: TokenTimeIntervalMetrics;
  
  /**
   * 15-minute metrics.
   */
  '15m'?: TokenTimeIntervalMetrics;
  
  /**
   * 5-minute metrics.
   */
  '5m'?: TokenTimeIntervalMetrics;
  
  /**
   * 1-minute metrics.
   */
  '1m'?: TokenTimeIntervalMetrics;
}

/**
 * Detailed token information including summary metrics.
 */
export interface TokenWithDetails extends Token {
  /**
   * Summary of token metrics and price data.
   */
  summary?: TokenSummary;
  
  /**
   * Last updated timestamp.
   */
  last_updated?: string;
} 