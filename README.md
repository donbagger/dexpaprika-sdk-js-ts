# DexPaprika JavaScript SDK

A JavaScript client library for the [DexPaprika API](https://api.dexpaprika.com), providing easy access to decentralized exchange data across multiple blockchain networks.

## Installation

```bash
npm install dexpaprika-sdk
```

## Quick Start

```javascript
import { DexPaprikaClient } from 'dexpaprika-sdk';

// Create a new client
const client = new DexPaprikaClient();

// Example: Get a list of supported networks
async function getNetworks() {
  const networks = await client.networks.list();
  console.log(networks);
}

// Example: Get top pools on Ethereum
async function getTopPools() {
  const topPools = await client.pools.listByNetwork('ethereum', 0, 10);
  console.log(topPools.pools);
}

// Example: Search for Bitcoin-related tokens, pools, and DEXes
async function searchBitcoin() {
  const results = await client.search.search('bitcoin');
  console.log(`Found ${results.tokens.length} tokens, ${results.pools.length} pools, and ${results.dexes.length} DEXes`);
}
```

## API Reference

### Creating a Client

```javascript
// Create a client with default settings
const client = new DexPaprikaClient();

// Create a client with a custom base URL
const client = new DexPaprikaClient('https://custom-api-url.com');

// Create a client with custom Axios options
const client = new DexPaprikaClient('https://api.dexpaprika.com', {
  timeout: 10000,
  headers: {
    'Custom-Header': 'value'
  }
});
```

### Networks API

```javascript
// Get a list of all supported networks
const networks = await client.networks.list();
```

### DEXes API

```javascript
// Get a list of DEXes on a specific network
const dexes = await client.dexes.listByNetwork('ethereum');

// Pagination and limit
const dexes = await client.dexes.listByNetwork('ethereum', 1, 20); // page 1, 20 items per page
```

### Pools API

```javascript
// Get top pools across all networks
const topPools = await client.pools.list();

// Pagination, sorting, and ordering
const topPools = await client.pools.list(
  0, // page
  10, // limit
  'desc', // sort order
  'volume_usd' // order by field
);

// Get top pools on a specific network
const ethereumPools = await client.pools.listByNetwork('ethereum');

// Get pools on a specific DEX
const uniswapPools = await client.pools.listByDex('ethereum', 'uniswap_v3');

// Get details for a specific pool
const poolDetails = await client.pools.getDetails('ethereum', '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640');

// Get OHLCV (candlestick) data for a pool
const ohlcvData = await client.pools.getOHLCV(
  'ethereum', 
  '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
  '2023-01-01', // start date
  '2023-01-07', // end date
  7, // limit
  '24h' // interval
);

// Get transactions for a pool
const transactions = await client.pools.getTransactions('ethereum', '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640');
```

### Tokens API

```javascript
// Get details for a specific token
const wethDetails = await client.tokens.getDetails(
  'ethereum', 
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' // WETH
);

// Get pools that contain a specific token
const wethPools = await client.tokens.getPools(
  'ethereum', 
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
);

// Filter pools that contain both tokens (e.g., WETH-USDC pools)
const wethUsdcPools = await client.tokens.getPools(
  'ethereum', 
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  0, // page
  10, // limit
  'desc', // sort
  'volume_usd', // order by
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // USDC address
);
```

### Search API

```javascript
// Search for tokens, pools, and DEXes
const results = await client.search.search('bitcoin');
console.log(results.tokens); // Bitcoin-related tokens
console.log(results.pools);  // Pools containing Bitcoin-related tokens
console.log(results.dexes);  // DEXes with Bitcoin in the name
```

### Utils API

```javascript
// Get overall statistics
const stats = await client.utils.getStats();
console.log(`DexPaprika tracks ${stats.chains} chains, ${stats.pools} pools, and ${stats.tokens} tokens`);
```

## Response Types

The SDK provides TypeScript type definitions for all API responses. Here are some common types:

- `Network`: Blockchain network information
- `Dex`: Information about a decentralized exchange
- `Pool`: Liquidity pool data
- `Token`: Token information
- `OHLCVRecord`: Candlestick data for price charts
- `Transaction`: On-chain transaction data

## Error Handling

The SDK throws standard errors that can be caught using try/catch:

```javascript
try {
  const pools = await client.pools.list();
  // Process pools...
} catch (error) {
  console.error('API request failed:', error.message);
}
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or feedback, please reach out to the DexPaprika team at [support@coinpaprika.com](mailto:support@coinpaprika.com). 