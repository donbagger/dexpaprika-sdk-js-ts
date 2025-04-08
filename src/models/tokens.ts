import { Token } from './pools';

// Detailed token information
export interface TokenDetails extends Token {
  // Basic information
  logo_url?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  contract_address?: string; // Alias for id
  
  // Market data
  market_cap?: number;
  price_usd?: number;
  price_change_24h?: number;
  price_change_7d?: number;
  price_change_30d?: number;
  circulating_supply?: number;
  
  market_data?: {
    price_usd: number;
    volume_usd_24h: number;
    price_change_24h: number;
    ath: number;
    ath_date: string;
    updated_at: string;
  };
  
  // Social links and data
  links?: { 
    twitter?: string; 
    telegram?: string; 
    github?: string;
    coinmarketcap?: string 
  };
  
  social_data?: {
    twitter_followers: number;
    telegram_members: number;
  };
}

// Time interval metrics for tokens
export interface TokenTimeIntervalMetrics {
  volume: number;
  volume_usd: number;
  buy_usd: number;
  sell_usd: number;
  sells: number;
  buys: number;
  txns: number;
  last_price_usd_change?: number;
}

// Token summary metrics
export interface TokenSummary {
  price_usd: number;
  fdv?: number;
  liquidity_usd?: number;
  
  // Time-based metrics
  '24h'?: TokenTimeIntervalMetrics;
  '6h'?: TokenTimeIntervalMetrics;
  '1h'?: TokenTimeIntervalMetrics;
  '30m'?: TokenTimeIntervalMetrics;
  '15m'?: TokenTimeIntervalMetrics;
  '5m'?: TokenTimeIntervalMetrics;
  '1m'?: TokenTimeIntervalMetrics;
}

// Extended token information
export interface TokenWithDetails extends Token {
  summary?: TokenSummary;
  last_updated?: string;
  market_data?: TokenMarketData;
  links?: TokenLinks;
  social_data?: TokenSocialData;
}

// Market data structure
export interface TokenMarketData {
  price_usd: number;
  volume_usd_24h: number;
  price_change_24h: number;
  ath: number;
  ath_date: string;
  updated_at: string;
}

// Social and external links
export interface TokenLinks {
  twitter?: string;
  telegram?: string;
  github?: string;
  coinmarketcap?: string;
}

// Social media statistics
export interface TokenSocialData {
  twitter_followers: number;
  telegram_members: number;
}

// Time period metrics
export interface TokenTimeInterval {
  time_start: string;
  time_end: string;
  price_change: number; 
  volume: number;
  txns: number;
} 