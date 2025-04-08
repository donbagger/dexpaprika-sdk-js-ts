import { PaginatedResponse, PoolPaginatedResponse } from './base';

/**
 * Token information.
 */
export interface Token {
  /**
   * Token identifier or address.
   */
  id: string;
  
  /**
   * Human-readable name of the token.
   */
  name: string;
  
  /**
   * Token symbol.
   */
  symbol: string;
  
  /**
   * Network the token is on.
   */
  chain: string;
  
  /**
   * Decimal precision of the token.
   */
  decimals: number;
  
  /**
   * When the token was added to the system.
   */
  added_at: string;
  
  /**
   * Fully diluted valuation.
   */
  fdv?: number;
  
  /**
   * Total supply of the token.
   */
  total_supply?: number;
  
  /**
   * Token description.
   */
  description?: string;
  
  /**
   * Token website URL.
   */
  website?: string;
  
  /**
   * Token explorer URL.
   */
  explorer?: string;
}

/**
 * Liquidity pool information.
 */
export interface Pool {
  /**
   * Pool identifier or address.
   */
  id: string;
  
  /**
   * DEX identifier.
   */
  dex_id: string;
  
  /**
   * DEX name.
   */
  dex_name: string;
  
  /**
   * Network the pool is on.
   */
  chain: string;
  
  /**
   * Trading volume in USD.
   */
  volume_usd: number;
  
  /**
   * When the pool was created.
   */
  created_at: string;
  
  /**
   * Block number when the pool was created.
   */
  created_at_block_number: number;
  
  /**
   * Number of transactions in the pool.
   */
  transactions: number;
  
  /**
   * Current price in USD.
   */
  price_usd: number;
  
  /**
   * Price change in the last 5 minutes.
   */
  last_price_change_usd_5m: number;
  
  /**
   * Price change in the last hour.
   */
  last_price_change_usd_1h: number;
  
  /**
   * Price change in the last 24 hours.
   */
  last_price_change_usd_24h: number;
  
  /**
   * Trading fee percentage.
   */
  fee?: number;
  
  /**
   * Tokens in the pool.
   */
  tokens: Token[];
}

/**
 * Response containing a list of pools.
 * @deprecated Use PoolPaginatedResponse instead
 */
export type PoolsResponse = PoolPaginatedResponse;

/**
 * Metrics for a specific time interval.
 */
export interface TimeIntervalMetrics {
  /**
   * Price change in USD.
   */
  last_price_usd_change: number;
  
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
}

/**
 * Detailed information about a pool.
 */
export interface PoolDetails {
  /**
   * Pool identifier or address.
   */
  id: string;
  
  /**
   * Block number when the pool was created.
   */
  created_at_block_number: number;
  
  /**
   * Network the pool is on.
   */
  chain: string;
  
  /**
   * When the pool was created.
   */
  created_at: string;
  
  /**
   * Factory identifier.
   */
  factory_id: string;
  
  /**
   * DEX identifier.
   */
  dex_id: string;
  
  /**
   * DEX name.
   */
  dex_name: string;
  
  /**
   * Tokens in the pool.
   */
  tokens: Token[];
  
  /**
   * Current price.
   */
  last_price: number;
  
  /**
   * Current price in USD.
   */
  last_price_usd: number;
  
  /**
   * Trading fee percentage.
   */
  fee?: number;
  
  /**
   * Timestamp of the price data.
   */
  price_time: string;
  
  // Time interval metrics
  /**
   * Metrics for the last 24 hours.
   */
  '24h': TimeIntervalMetrics;
  
  /**
   * Metrics for the last 6 hours.
   */
  '6h'?: TimeIntervalMetrics;
  
  /**
   * Metrics for the last hour.
   */
  '1h'?: TimeIntervalMetrics;
  
  /**
   * Metrics for the last 30 minutes.
   */
  '30m'?: TimeIntervalMetrics;
  
  /**
   * Metrics for the last 15 minutes.
   */
  '15m'?: TimeIntervalMetrics;
  
  /**
   * Metrics for the last 5 minutes.
   */
  '5m'?: TimeIntervalMetrics;
}

/**
 * Open-High-Low-Close-Volume data point.
 */
export interface OHLCVRecord {
  /**
   * Opening timestamp.
   */
  time_open: string;
  
  /**
   * Closing timestamp.
   */
  time_close: string;
  
  /**
   * Opening price.
   */
  open: number;
  
  /**
   * Highest price during the period.
   */
  high: number;
  
  /**
   * Lowest price during the period.
   */
  low: number;
  
  /**
   * Closing price.
   */
  close: number;
  
  /**
   * Trading volume during the period.
   */
  volume: number;
}

/**
 * Pool transaction information.
 */
export interface Transaction {
  /**
   * Transaction identifier.
   */
  id: string;
  
  /**
   * Log index within the block.
   */
  log_index: number;
  
  /**
   * Transaction index within the block.
   */
  transaction_index: number;
  
  /**
   * Pool identifier.
   */
  pool_id: string;
  
  /**
   * Sender address.
   */
  sender: string;
  
  /**
   * Recipient address or ID.
   */
  recipient: string | number;
  
  /**
   * First token address or symbol.
   */
  token_0: string;
  
  /**
   * Second token address or symbol.
   */
  token_1: string;
  
  /**
   * Amount of first token.
   */
  amount_0: string | number;
  
  /**
   * Amount of second token.
   */
  amount_1: string | number;
  
  /**
   * Block number of the transaction.
   */
  created_at_block_number: number;
}

/**
 * Response containing a list of transactions.
 */
export interface TransactionsResponse extends PaginatedResponse<Transaction> {
  /**
   * List of transactions.
   */
  transactions: Transaction[];
} 