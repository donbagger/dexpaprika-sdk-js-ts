# DexPaprika SDK

[![npm version](https://img.shields.io/npm/v/dexpaprika-sdk.svg)](https://www.npmjs.com/package/dexpaprika-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official JavaScript client library for the [DexPaprika API](https://api.dexpaprika.com), providing easy access to decentralized exchange data across multiple blockchain networks.

Developed and maintained by [Coinpaprika](https://coinpaprika.com).

## Installation

```bash
npm install dexpaprika-sdk
```

## Usage

```javascript
import { DexPaprikaClient } from 'dexpaprika-sdk';

// Create client
const client = new DexPaprikaClient();

// Get supported networks
const networks = await client.networks.list();
console.log(networks);

// Get top pools on Ethereum
const pools = await client.pools.listByNetwork('ethereum', 0, 10);
console.log(pools.pools);

// Search for tokens
const results = await client.search.search('bitcoin');
console.log(`Found ${results.tokens.length} tokens`);
```

## API Reference

For detailed API documentation, visit [docs.dexpaprika.com](https://docs.dexpaprika.com)

### Networks & DEXes

```js
// Networks
const networks = await client.networks.list();

// DEXes on a network
const dexes = await client.dexes.listByNetwork('ethereum');
```

### Pools & Transactions

```js
// Top pools with pagination
const topPools = await client.pools.list(0, 10, 'desc', 'volume_usd');

// Pool details
const poolDetails = await client.pools.getDetails('ethereum', '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640');

// Transactions
const txs = await client.pools.getTransactions('ethereum', '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640');
```

### OHLCV Data

For price charts:

```js
// Price history (daily candles for a week)
const ohlcv = await client.pools.getOHLCV(
  'ethereum', 
  '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
  '2023-01-01', 
  '2023-01-07',
  7,
  '24h'
);
```

### Tokens

```js
// Token details (WETH)
const token = await client.tokens.getDetails(
  'ethereum', 
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
);

// Find WETH-USDC pools
const pools = await client.tokens.getPools(
  'ethereum', 
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  0, 10, 'desc', 'volume_usd',
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // USDC
);
```

### Search & Stats

```js
// Search
const results = await client.search.search('bitcoin');

// Stats
const stats = await client.utils.getStats();
```

## TypeScript Types

The SDK includes TypeScript types for easier development. See the documentation for response type details.

## Error Handling

Basic error handling:

```javascript
try {
  const pools = await client.pools.list();
  // Process results
} catch (error) {
  console.error('API error:', error.message);
}
```

Using the error helper:

```js
import { parseError } from 'dexpaprika-sdk/dist/utils/helpers';

try {
  // API calls
} catch (err) {
  console.error(parseError(err));
}
```

## Utilities

Helper functions:

```js
import { formatVolume, formatPair } from 'dexpaprika-sdk/dist/utils/helpers';

// Format volume like $1.23M
console.log(formatVolume(1234567));  // $1.23M

// Format token pair
console.log(formatPair('ETH', 'USDC')); // ETH/USDC
```

## Resources

- [Official Documentation](https://docs.dexpaprika.com) - Comprehensive API reference
- [DexPaprika Website](https://dexpaprika.com) - Main product website
- [CoinPaprika](https://coinpaprika.com) - Related cryptocurrency data platform
- [Discord Community](https://discord.gg/DhJge5TUGM) - Get support and connect with other developers

## License

MIT

## Contributing

Contributions are welcome! Please read our [contributing guidelines](https://github.com/coinpaprika/dexpaprika-sdk-js/blob/main/CONTRIBUTING.md) before submitting a Pull Request.

## Support

For issues, questions, or feedback, please:
- Open an issue on our [GitHub repository](https://github.com/coinpaprika/dexpaprika-sdk-js/issues)
- Reach out to the DexPaprika team at [support@coinpaprika.com](mailto:support@coinpaprika.com)

## Disclaimer

This SDK is created and maintained by Coinpaprika. While we strive to provide accurate and up-to-date data, we make no guarantees regarding the accuracy, reliability, or completeness of the data provided through the DexPaprika API.
