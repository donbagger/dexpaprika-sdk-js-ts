import { DexPaprikaClient } from './src';

async function main() {
  // Create a new client
  const client = new DexPaprikaClient();
  
  try {
    console.log("=== Testing Networks API ===");
    const networks = await client.networks.list();
    console.log(`✅ networks.list(): Retrieved ${networks.length} networks`);
    
    if (networks.length > 0) {
      const networkId = networks[0].id;
      
      console.log("\n=== Testing DEXes API ===");
      const dexesResponse = await client.dexes.listByNetwork(networkId, 0, 3);
      console.log(`✅ dexes.listByNetwork(): Retrieved ${dexesResponse.dexes.length} DEXes for ${networkId}`);
      
      console.log("\n=== Testing Pools API ===");
      
      const topPools = await client.pools.list(0, 3);
      console.log(`✅ pools.list(): Retrieved ${topPools.pools.length} top pools`);
      
      const networkPools = await client.pools.listByNetwork(networkId, 0, 3);
      console.log(`✅ pools.listByNetwork(): Retrieved ${networkPools.pools.length} pools for ${networkId}`);
      
      if (dexesResponse.dexes.length > 0) {
        const dexId = dexesResponse.dexes[0].dex_id;
        const dexPools = await client.pools.listByDex(networkId, dexId, 0, 3);
        console.log(`✅ pools.listByDex(): Retrieved ${dexPools.pools.length} pools for ${dexId} on ${networkId}`);
      }
      
      if (topPools.pools.length > 0) {
        const poolId = topPools.pools[0].id;
        const poolNetwork = topPools.pools[0].chain;
        
        try {
          await client.pools.getDetails(poolNetwork, poolId);
          console.log(`✅ pools.getDetails(): Retrieved details for pool ${poolId}`);
          
          // Test OHLCV
          const today = new Date();
          const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          const formattedDate = oneWeekAgo.toISOString().split('T')[0]; // yyyy-mm-dd format
          
          const ohlcv = await client.pools.getOHLCV(poolNetwork, poolId, formattedDate, undefined, 3);
          console.log(`✅ pools.getOHLCV(): Retrieved ${ohlcv.length} OHLCV records`);
          
          // Test transactions
          const transactions = await client.pools.getTransactions(poolNetwork, poolId, 0, 3);
          console.log(`✅ pools.getTransactions(): Retrieved ${transactions.transactions.length} transactions`);
        } catch (error) {
          console.error("❌ Error in pool details/ohlcv/transactions:", (error as Error).message);
        }
      }
      
      console.log("\n=== Testing Tokens API ===");
      // Use a known token address for Ethereum (WETH)
      const tokenAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"; 
      const tokenNetwork = "ethereum";
      
      try {
        const tokenDetails = await client.tokens.getDetails(tokenNetwork, tokenAddress);
        console.log(`✅ tokens.getDetails(): Retrieved details for token ${tokenDetails.name} (${tokenDetails.symbol})`);
        
        const tokenPools = await client.tokens.getPools(tokenNetwork, tokenAddress, 0, 3);
        console.log(`✅ tokens.getPools(): Retrieved ${tokenPools.pools.length} pools for token ${tokenAddress}`);
      } catch (error) {
        console.error("❌ Error in token details/pools:", (error as Error).message);
      }
      
      console.log("\n=== Testing Search API ===");
      const searchResults = await client.search.search("bitcoin");
      console.log(`✅ search.search(): Found ${searchResults.tokens.length} tokens, ${searchResults.pools.length} pools, ${searchResults.dexes.length} DEXes`);
      
      console.log("\n=== Testing Utils API ===");
      const stats = await client.utils.getStats();
      console.log(`✅ utils.getStats(): Retrieved stats with ${stats.chains} chains, ${stats.pools} pools, ${stats.tokens} tokens`);
    }
    
    console.log("\n✅ All tests completed successfully!");
  } catch (error) {
    console.error("\n❌ Test failed:", (error as Error).message);
  }
}

// Run the test
main(); 