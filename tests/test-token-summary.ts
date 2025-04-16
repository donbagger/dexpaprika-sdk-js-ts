import { DexPaprikaClient } from '../src';

/**
 * Test to verify the Token model updates with the new summary field
 */
async function testTokenSummary() {
  console.log("Testing Token model updates with summary field");
  const client = new DexPaprikaClient();
  
  try {
    // Get WETH token details (a popular token likely to have the summary data)
    const wethAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    const token = await client.tokens.getDetails('ethereum', wethAddress);
    
    console.log(`Token: ${token.name} (${token.symbol})`);
    
    // Check if the last_updated field exists
    if (token.last_updated) {
      console.log(`Last updated: ${token.last_updated}`);
    } else {
      console.log('last_updated field is not present');
    }
    
    // Check if the summary field exists and has data
    if (token.summary) {
      console.log('Summary data:');
      console.log(`- Price USD: $${token.summary.price_usd.toFixed(2)}`);
      console.log(`- Liquidity USD: $${token.summary.liquidity_usd.toFixed(2)}`);
      console.log(`- Pools count: ${token.summary.pools}`);
      
      // Check time interval metrics
      if (token.summary['24h']) {
        console.log('24h metrics:');
        console.log(`- Volume: $${token.summary['24h'].volume_usd.toFixed(2)}`);
        
        // Add null check for last_price_usd_change
        if (token.summary['24h'].last_price_usd_change !== undefined) {
          console.log(`- Price change: ${token.summary['24h'].last_price_usd_change.toFixed(2)}%`);
        } else {
          console.log('- Price change: N/A');
        }
      }
    } else {
      console.log('summary field is not present');
    }
    
    console.log("\nTest completed successfully!");
  } catch (error: any) {
    console.error(`Test failed: ${error.message || 'Unknown error'}`);
  }
}

// Run the test
testTokenSummary(); 