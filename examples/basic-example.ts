import { DexPaprikaClient } from '../src';
import { formatVolume, formatPair, lastWeek } from '../src/utils/helpers';

// Basic DexPaprika SDK usage example
async function main() {
  const client = new DexPaprikaClient();

  try {
    // Get supported networks
    const networks = await client.networks.list();
    console.log(`Found ${networks.length} networks`);
    
    // Find Ethereum network
    const eth = networks.find(n => n.id === 'ethereum');
    if (!eth) throw new Error('Ethereum network not found');
    
    // Retrieve global stats
    const stats = await client.utils.getStats();
    console.log(`Stats: ${stats.chains} chains, ${stats.pools} pools, ${stats.tokens} tokens`);

    // Get top pools by volume
    const poolsResp = await client.pools.list(0, 5, 'desc', 'volume_usd');
    console.log('Top pools:');
    
    // Display pool information with formatting
    for (const pool of poolsResp.pools) {
      const pair = pool.tokens.length < 2 ? 'Unknown' : 
        formatPair(pool.tokens[0].symbol, pool.tokens[1].symbol);
      console.log(`${pair}: ${formatVolume(pool.volume_usd)} on ${pool.dex_name}`);
    }

    // Historical data for selected pool
    if (poolsResp.pools.length) {
      const pool = poolsResp.pools[0];
      
      // Get data for the past week
      const weekAgo = new Date(lastWeek() * 1000).toISOString().split('T')[0];
      console.log(`Getting price history since ${weekAgo}`);
      
      const history = await client.pools.getOHLCV(
        pool.chain, 
        pool.id, 
        weekAgo, 
        undefined, 
        7
      );
      
      if (history.length) {
        console.log(`Last price: ${history[history.length-1].close}`);
      }
    }

    // Search for tokens
    const results = await client.search.search("bitcoin");
    console.log(`Search results: ${results.tokens.length} tokens, ${results.pools.length} pools`);
    
    // Display top result if available
    if (results.tokens.length) {
      const top = results.tokens[0];
      console.log(`Top match: ${top.name} (${top.symbol}) on ${top.chain}`);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

main(); 