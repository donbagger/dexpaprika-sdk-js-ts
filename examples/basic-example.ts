import { DexPaprikaClient } from '../src';

async function main() {
  // Create a new DexPaprika client
  const client = new DexPaprikaClient();

  try {
    // Get a list of networks
    const networks = await client.networks.list();
    console.log('Available networks:');
    networks.forEach(network => {
      console.log(`- ${network.display_name} (${network.id})`);
    });

    console.log('\n--------\n');

    // Get stats
    const stats = await client.utils.getStats();
    console.log('DexPaprika stats:');
    console.log(`- Chains: ${stats.chains}`);
    console.log(`- Factories: ${stats.factories}`);
    console.log(`- Pools: ${stats.pools}`);
    console.log(`- Tokens: ${stats.tokens}`);

    console.log('\n--------\n');

    // Get top pools
    const poolsResp = await client.pools.list(0, 5, 'desc', 'volume_usd');
    console.log('Top 5 pools by volume:');
    poolsResp.pools.forEach(pool => {
      const tokenPair = pool.tokens.length >= 2 ? 
        `${pool.tokens[0].symbol}/${pool.tokens[1].symbol}` : 'Unknown Pair';
      console.log(`- ${tokenPair} on ${pool.dex_name} (${pool.chain}): $${pool.volume_usd.toFixed(2)} volume`);
    });

    console.log('\n--------\n');

    // Search for a token
    const searchResults = await client.search.search('bitcoin');
    console.log('Search results for \'bitcoin\':');
    console.log(`- Found ${searchResults.tokens.length} tokens`);
    console.log(`- Found ${searchResults.pools.length} pools`);
    console.log(`- Found ${searchResults.dexes.length} dexes`);

    if (searchResults.tokens.length > 0) {
      console.log('\nTop token result:');
      console.log(`- ${searchResults.tokens[0].name} (${searchResults.tokens[0].symbol}) on ${searchResults.tokens[0].chain}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 