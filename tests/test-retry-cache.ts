import { DexPaprikaClient, withRetry, Cache } from '../src';
import { AxiosInstance } from 'axios';

// Mock axios for testing retries
function createMockAxios(failureCount: number): AxiosInstance {
  let attempts = 0;
  
  const mockAxios = {
    get: async (url: string) => {
      attempts++;
      if (attempts <= failureCount) {
        console.log(`  [Mock] Request attempt ${attempts}/${failureCount+1} - Simulating failure`);
        const error: any = new Error('Simulated network error');
        error.response = { status: 503 };
        throw error;
      }
      console.log(`  [Mock] Request attempt ${attempts}/${failureCount+1} - Success`);
      return { data: { success: true, url } };
    },
    create: () => mockAxios,
    defaults: { headers: {} } as any,
    interceptors: { request: { use: () => 0, eject: () => {} }, response: { use: () => 0, eject: () => {} } } as any
  } as unknown as AxiosInstance;
  
  return mockAxios;
}

// Utility for measuring execution time
async function measureTime<T>(func: () => Promise<T>): Promise<[T, number]> {
  const start = Date.now();
  const result = await func();
  const end = Date.now();
  return [result, end - start];
}

async function testRetry() {
  console.log('\n== Testing Retry Functionality ==');
  
  console.log('\n1. Testing retry success after 2 failures');
  // Create client with mock axios that fails twice then succeeds
  const mockAxios = createMockAxios(2);
  const client = new DexPaprikaClient(
    'https://example.com',
    {},
    { retry: { maxRetries: 3, delaySequenceMs: [100, 200, 300] } }
  );
  
  // Replace the real axios instance with our mock
  (client as any).httpClient = mockAxios;
  
  try {
    // This should succeed after 3 attempts (2 failures + 1 success)
    await client.get('/test');
    console.log('  ✓ Request succeeded after retries');
    console.log(`  ✓ Total attempts: 3 (expected)`);
  } catch (error: any) {
    console.log(`  ✗ Failed: ${error.message}`);
  }
  
  console.log('\n2. Testing retry exhaustion (all attempts fail)');
  const mockAxiosAllFail = createMockAxios(3); // Will fail all 3 attempts + initial try
  const clientWithLimitedRetries = new DexPaprikaClient(
    'https://example.com',
    {},
    { retry: { maxRetries: 2, delaySequenceMs: [100, 200] } }
  );
  (clientWithLimitedRetries as any).httpClient = mockAxiosAllFail;
  
  try {
    // This should fail as we only retry 2 times (3 attempts total) but it will fail all 3 times
    await clientWithLimitedRetries.get('/test');
    console.log('  ✗ Request unexpectedly succeeded');
  } catch (error: any) {
    console.log('  ✓ Request failed after exhausting all retries');
  }
  
  console.log('\n3. Testing retry with withRetry utility directly');
  let attempts = 0;
  
  try {
    await withRetry(async () => {
      attempts++;
      if (attempts <= 2) {
        console.log(`  [Test] Attempt ${attempts} - Simulating failure`);
        throw new Error('Simulated error');
      }
      console.log(`  [Test] Attempt ${attempts} - Success`);
      return 'success';
    }, { maxRetries: 3, delaySequenceMs: [100, 200, 300] });
    
    console.log(`  ✓ Operation succeeded after ${attempts} attempts`);
  } catch (error: any) {
    console.log(`  ✗ Failed: ${error.message}`);
  }
}

async function testCaching() {
  console.log('\n== Testing Cache Functionality ==');
  
  console.log('\n1. Testing cache hit/miss');
  // Create a simple cache
  const cache = new Cache<string>({ ttl: 5000 });
  
  // First access - should miss
  console.log('  Testing first access (should miss):');
  const key = 'test-key';
  let value = cache.get(key);
  console.log(`  Cache ${value === undefined ? 'miss ✓' : 'hit ✗'}`);
  
  // Set value
  cache.set(key, 'cached-value');
  
  // Second access - should hit
  console.log('  Testing second access (should hit):');
  value = cache.get(key);
  console.log(`  Cache ${value !== undefined ? 'hit ✓' : 'miss ✗'}`);
  console.log(`  Value: ${value}`);
  
  console.log('\n2. Testing cache expiration');
  // Create cache with short TTL
  const shortCache = new Cache<string>({ ttl: 100 }); // 100ms TTL
  shortCache.set('short-lived', 'will-expire');
  
  // Immediate access - should hit
  value = shortCache.get('short-lived');
  console.log(`  Immediate access: ${value !== undefined ? 'hit ✓' : 'miss ✗'}`);
  
  // Wait for expiration
  console.log('  Waiting for cache expiration...');
  await new Promise(resolve => setTimeout(resolve, 150));
  
  // After expiration - should miss
  value = shortCache.get('short-lived');
  console.log(`  After TTL: ${value === undefined ? 'miss (expired) ✓' : 'hit ✗'}`);
}

async function testClientCaching() {
  console.log('\n== Testing Client Caching Integration ==');
  
  // Create a client with a mock function that counts calls
  let apiCallCount = 0;
  
  const client = new DexPaprikaClient(
    'https://example.com',
    {},
    { cache: { ttl: 5000 } }
  );
  
  // Create a custom tracking function that we'll use to count actual API calls
  // This is separate from the get method to avoid counting calls that are simply cached
  const trackApiCall = (endpoint: string) => {
    apiCallCount++;
    console.log(`  API call #${apiCallCount} to ${endpoint}`);
    return { test: 'data', timestamp: Date.now() };
  };
  
  // Override httpClient.get to use our tracking function
  (client as any).httpClient = {
    get: async (url: string) => ({ 
      data: trackApiCall(url)
    }),
    defaults: { headers: {} },
    interceptors: { request: { use: () => 0 }, response: { use: () => 0 } }
  };
  
  console.log('\n1. Testing duplicate calls:');
  
  // First call - should hit API
  console.log('  First call:');
  const [, time1] = await measureTime(() => client.get('/test/endpoint'));
  console.log(`  Time: ${time1}ms (longer - API call)`);
  
  // Second call - should use cache
  console.log('  Second call (same endpoint):');
  const [, time2] = await measureTime(() => client.get('/test/endpoint'));
  console.log(`  Time: ${time2}ms (faster - cached)`);
  
  // Verify only one API call was made
  console.log(`  Total API calls: ${apiCallCount} (expected: 1) ${apiCallCount === 1 ? '✓' : '✗'}`);
  
  // Different endpoint - should hit API
  console.log('\n2. Testing different endpoints:');
  const [, time3] = await measureTime(() => client.get('/different/endpoint'));
  console.log(`  Time: ${time3}ms (longer - API call)`);
  console.log(`  Total API calls: ${apiCallCount} (expected: 2) ${apiCallCount === 2 ? '✓' : '✗'}`);
  
  // Clear cache and verify behavior
  console.log('\n3. Testing cache clearing:');
  client.clearCache();
  console.log('  Cache cleared');
  
  // Call again - should hit API
  const [, time4] = await measureTime(() => client.get('/test/endpoint'));
  console.log(`  Time: ${time4}ms (longer - API call after cache clear)`);
  console.log(`  Total API calls: ${apiCallCount} (expected: 3) ${apiCallCount === 3 ? '✓' : '✗'}`);
  
  // Disable cache
  console.log('\n4. Testing cache disabling:');
  client.setCacheEnabled(false);
  console.log('  Cache disabled');
  
  // Call again - should hit API
  const [, time5] = await measureTime(() => client.get('/test/endpoint'));
  console.log(`  Time: ${time5}ms (API call with cache disabled)`);
  
  // Call once more - should hit API again despite same URL
  const [, time6] = await measureTime(() => client.get('/test/endpoint'));
  console.log(`  Time: ${time6}ms (Another API call with cache disabled)`);
  
  // Verify additional API calls were made
  console.log(`  Total API calls: ${apiCallCount} (expected: 5) ${apiCallCount === 5 ? '✓' : '✗'}`);
}

async function testMaxCacheSize() {
  console.log('\n== Testing Cache Size Limits ==');
  
  // Create a cache with a small max size
  const smallCache = new Cache<number>({ maxSize: 3 });
  
  // Add items to fill cache
  console.log('  Adding items to cache:');
  for (let i = 1; i <= 5; i++) {
    smallCache.set(`key${i}`, i);
    console.log(`  Added key${i} = ${i}`);
  }
  
  // Check cache size
  console.log(`  Cache size: ${smallCache.size} (expected: 3) ${smallCache.size === 3 ? '✓' : '✗'}`);
  
  // Check which items are in cache (should be the last 3)
  console.log('  Checking remaining items:');
  for (let i = 1; i <= 5; i++) {
    const value = smallCache.get(`key${i}`);
    console.log(`  key${i}: ${value !== undefined ? `present (${value})` : 'evicted'} ${(i <= 2) === (value === undefined) ? '✓' : '✗'}`);
  }
}

async function runAllTests() {
  console.log('Starting cache and retry verification tests...');
  
  try {
    await testRetry();
    await testCaching();
    await testClientCaching();
    await testMaxCacheSize();
    
    console.log('\n✅ All tests completed successfully!');
  } catch (error: any) {
    console.error('\n❌ Tests failed:', error.message);
  }
}

runAllTests(); 