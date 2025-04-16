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

/**
 * Configuration for retry mechanism
 */
export interface RetryConfig {
  /** Maximum number of retry attempts */
  maxRetries: number;
  /** Specific delay times in milliseconds for each retry attempt */
  delaySequenceMs: number[];
  /** HTTP status codes that should trigger a retry */
  retryableStatuses: number[];
}

/**
 * Default retry configuration
 */
export const defaultRetryConfig: RetryConfig = {
  maxRetries: 4,
  delaySequenceMs: [100, 500, 1000, 5000],  // Explicit sequence as requested
  retryableStatuses: [408, 429, 500, 502, 503, 504]
};

/**
 * Execute an operation with retry and specified delays
 * 
 * @param operation - The async operation to execute
 * @param config - Retry configuration
 * @returns Result of the operation
 * @throws Last error encountered if all retries fail
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const finalConfig = { ...defaultRetryConfig, ...config };
  let lastError: Error;

  // Try initial attempt plus retries
  for (let attempt = 0; attempt <= finalConfig.maxRetries; attempt++) {
    try {
      // For attempts after the first one, wait using the specified delay
      if (attempt > 0) {
        const delayIndex = attempt - 1; // Adjust index to match delaySequence
        const delay = finalConfig.delaySequenceMs[delayIndex] || 
                    finalConfig.delaySequenceMs[finalConfig.delaySequenceMs.length - 1];
        
        await sleep(delay);
      }
      
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // Only retry on specified status codes or network errors
      if (error.response?.status && 
          !finalConfig.retryableStatuses.includes(error.response.status)) {
        throw error;
      }
      
      // Don't continue if this was the last attempt
      if (attempt === finalConfig.maxRetries) {
        throw error;
      }
    }
  }

  throw lastError!;
} 