// Utility functions

/**
 * Format currency with appropriate suffix
 */
export const formatVolume = (vol: number): string => {
  if (vol >= 1_000_000_000) {
    return `$${(vol / 1_000_000_000).toFixed(2)}B`;
  }
  if (vol >= 1_000_000) {
    return `$${(vol / 1_000_000).toFixed(2)}M`;
  }
  if (vol >= 1_000) {
    return `$${(vol / 1_000).toFixed(2)}K`;
  }
  return `$${vol.toFixed(2)}`;
};

// Convert various date formats to Date object
export function parseDate(input: string | number): Date {
  if (typeof input === 'number') {
    return new Date(input * 1000); // unix timestamp
  }
  
  return new Date(input);
}

// Format token pair display
export function formatPair(token0: string, token1: string) {
  return `${token0}/${token1}`;
}

// Extract readable error message
export const parseError = (err: any) => {
  if (err?.response?.data?.message) {
    return err.response.data.message;
  }
  
  if (err?.message) {
    return err.message;
  }
  
  return 'Unknown error occurred';
}

// Timestamp utility functions
export const now = () => Math.floor(Date.now() / 1000);
export const yesterday = () => now() - 86400;
export const lastWeek = () => now() - 86400 * 7;

// Async delay utility
export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms)); 