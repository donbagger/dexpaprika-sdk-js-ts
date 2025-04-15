# DexPaprika SDK Update Instructions

This document provides comprehensive instructions for updating the DexPaprika TypeScript SDK based on OpenAPI specification changes. These instructions are designed for weekly SDK updates to keep the codebase synchronized with API changes while maintaining quality, type safety, and backward compatibility.

## 1. Development Environment Setup

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/coinpaprika/dexpaprika-sdk-js.git
cd dexpaprika-sdk-js

# Install dependencies
npm install

# Verify the setup works
npm run build
npm test
```

## 2. SDK File Structure

The DexPaprika SDK follows this file structure:

```
js_sdk/
├── dist/               # Compiled output (generated)
├── examples/           # Example usage
│   └── basic-example.ts
├── node_modules/       # Dependencies (generated)
├── src/                # Source code
│   ├── api/            # API service implementations
│   │   ├── base.ts     # Base API class
│   │   ├── dexes.ts    # DEX-related endpoints
│   │   ├── networks.ts # Network-related endpoints
│   │   ├── pools.ts    # Pool-related endpoints
│   │   ├── search.ts   # Search functionality
│   │   ├── tokens.ts   # Token-related endpoints
│   │   └── utils.ts    # Utility endpoints
│   ├── models/         # TypeScript interfaces/types
│   │   ├── base.ts     # Base model interfaces
│   │   ├── dexes.ts    # DEX interfaces
│   │   ├── networks.ts # Network interfaces
│   │   ├── pools.ts    # Pool interfaces
│   │   ├── search.ts   # Search interfaces
│   │   ├── tokens.ts   # Token interfaces
│   │   └── utils.ts    # Utility interfaces
│   ├── utils/          # Helper utilities
│   │   └── helpers.ts  # Common helper functions
│   ├── client.ts       # Main client class
│   └── index.ts        # Main export file
├── openapi_old.yml     # Previous OpenAPI spec
├── openapi_new.yml     # New OpenAPI spec
├── package.json        # Package config
├── package-lock.json   # Dependency lock
├── tsconfig.json       # TypeScript config
├── test-after-fixes.ts # Basic tests
└── README.md           # Documentation
```

## 3. Comparing OpenAPI Spec Changes

### Preparation
1. Obtain the new OpenAPI spec file and save it as `openapi_new.yml`
2. Keep the previous version as `openapi_old.yml` for comparison

### Comparison Process
```bash
# Option 1: Use an OpenAPI diff tool
npm install -g openapi-diff
openapi-diff openapi_old.yml openapi_new.yml --output markdown

# Option 2: Use a general-purpose diff tool
diff -u openapi_old.yml openapi_new.yml > openapi_changes.diff
```

### Key Elements to Compare
1. **New Endpoints**: Check for completely new paths
2. **Modified Endpoints**: Look for changes to existing paths
3. **New Parameters**: Check for new query parameters or path parameters
4. **Schema Changes**: Review model definitions for new properties or types
5. **Removed Fields/Endpoints**: Identify any removed functionality (important for backward compatibility)

## 4. Schema Transformation Guidelines

### Converting OpenAPI Schema to TypeScript

#### Basic Types Mapping
- `string` → `string`
- `integer`/`number` → `number`
- `boolean` → `boolean`
- `array` → `Array<T>` or `T[]`
- `object` → `interface` or `type`

#### Handling Complex Types
- **Enums**: Convert to TypeScript union types
  ```typescript
  // OpenAPI: 
  // type: string
  // enum: [asc, desc]
  type SortOrder = 'asc' | 'desc';
  ```

- **Nullable Fields**: Use the optional modifier or union with null
  ```typescript
  // OpenAPI: nullable: true
  interface Token {
    website?: string;  // Option 1 (preferred if field can be absent)
    description: string | null;  // Option 2 (preferred if field is always present but can be null)
  }
  ```

- **One Of/Any Of**: Use union types or type intersections
  ```typescript
  // For oneOf
  type Response = SuccessResponse | ErrorResponse;
  
  // For anyOf
  type ComplexResponse = Partial<ResponseA & ResponseB>;
  ```

### Guidelines for Type Definition
1. Place all definitions in appropriate files under `src/models/`
2. Use descriptive names that match API terminology
3. Document each interface and property with JSDoc comments
4. Keep related interfaces in the same file
5. Export all types from `index.ts`

## 5. Updating Data Models

### Process for Updating Models
1. Identify the relevant model file in `src/models/`
2. Compare the OpenAPI schema definition changes
3. Update the TypeScript interface accordingly

### Example: Adding a New Property
```typescript
// Before
export interface Pool {
  id: string;
  dex_id: string;
  chain: string;
  volume_usd: number;
}

// After
export interface Pool {
  id: string;
  dex_id: string;
  chain: string;
  volume_usd: number;
  // New field added
  total_liquidity_usd?: number;
}
```

### Example: Handling Optional Fields
```typescript
export interface Token {
  id: string;
  name: string;
  symbol: string;
  // Optional fields
  description?: string;
  website?: string;
  // Nullable fields
  total_supply: number | null;
}
```

### Example: Discriminated Unions
```typescript
// Base response type
interface BaseResponse {
  status: 'success' | 'error';
}

// Success response
interface SuccessResponse extends BaseResponse {
  status: 'success';
  data: Record<string, any>;
}

// Error response
interface ErrorResponse extends BaseResponse {
  status: 'error';
  error: string;
  code: number;
}

// Union type
type ApiResponse = SuccessResponse | ErrorResponse;

// Usage example
function handleResponse(response: ApiResponse) {
  if (response.status === 'success') {
    // TypeScript knows this is SuccessResponse
    console.log(response.data);
  } else {
    // TypeScript knows this is ErrorResponse
    console.log(response.error, response.code);
  }
}
```

## 6. Parameter Validation

### Implementing Validation
The SDK uses basic runtime type checking for parameters. For complex validation, consider using Zod or implementing custom validators.

#### Basic Parameter Validation
```typescript
// Simple validation in API methods
async getPoolDetails(networkId: string, poolAddress: string): Promise<PoolDetails> {
  if (!networkId) throw new Error('Network ID is required');
  if (!poolAddress) throw new Error('Pool address is required');
  
  return this._get<PoolDetails>(`/networks/${networkId}/pools/${poolAddress}`);
}
```

#### Advanced Validation with Zod (recommended for future updates)
```typescript
// First, add Zod as a dependency
// npm install zod

import { z } from 'zod';

// Define validation schema
const PoolRequestSchema = z.object({
  networkId: z.string().min(1),
  poolAddress: z.string().min(1),
  inversed: z.boolean().optional().default(false),
});

type PoolRequestParams = z.infer<typeof PoolRequestSchema>;

// Validate in API method
async getPoolDetails(params: PoolRequestParams): Promise<PoolDetails> {
  const validated = PoolRequestSchema.parse(params);
  
  return this._get<PoolDetails>(
    `/networks/${validated.networkId}/pools/${validated.poolAddress}`,
    validated.inversed ? { inversed: 'true' } : undefined
  );
}
```

## 7. Error Handling Patterns

### Custom Error Classes
```typescript
// src/utils/errors.ts
export class DexPaprikaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DexPaprikaError';
  }
}

export class NetworkNotFoundError extends DexPaprikaError {
  constructor(networkId: string) {
    super(`Network not found: ${networkId}`);
    this.name = 'NetworkNotFoundError';
  }
}

export class PoolNotFoundError extends DexPaprikaError {
  constructor(poolAddress: string) {
    super(`Pool not found: ${poolAddress}`);
    this.name = 'PoolNotFoundError';
  }
}

export class ApiError extends DexPaprikaError {
  public statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(`API Error (${statusCode}): ${message}`);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}
```

### Implementing Error Handling in API Methods
```typescript
// Update BaseAPI class
protected async _get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
  try {
    return await this.client.get<T>(endpoint, params);
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error || 'Unknown API error';
      
      if (status === 404) {
        if (message.includes('Network not found')) {
          throw new NetworkNotFoundError(params?.network || 'unknown');
        }
        if (message.includes('Pool not found')) {
          throw new PoolNotFoundError(endpoint.split('/').pop() || 'unknown');
        }
      }
      
      throw new ApiError(message, status);
    }
    
    throw new DexPaprikaError(error.message || 'Unknown error');
  }
}
```

## 8. Testing Approach

### Test New and Modified Endpoints
Create or update tests for any changed endpoints to verify functionality.

### Basic Test Example
```typescript
// test-new-endpoint.ts
import { DexPaprikaClient } from './src';

async function testNewEndpoint() {
  const client = new DexPaprikaClient();
  
  try {
    // Test the new endpoint
    const result = await client.pools.getNewMetrics('ethereum', '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640');
    console.log('New endpoint test passed:', result);
    
    // Verify expected properties
    if (!result.newMetric) {
      throw new Error('Expected newMetric property missing');
    }
    
    console.log('All tests passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testNewEndpoint();
```

### Running Tests
```bash
# Run a specific test
npx ts-node test-new-endpoint.ts

# Run the complete test suite
npm test
```

## 9. Documentation Updates

### Update JSDoc Comments
Ensure all new methods and interfaces have proper JSDoc comments:

```typescript
/**
 * Retrieves detailed metrics for a specific pool.
 * 
 * @param networkId - Network identifier (e.g., 'ethereum', 'solana')
 * @param poolAddress - On-chain address of the pool
 * @param options - Additional options for the request
 * @returns Detailed pool metrics including volume and price data
 * @throws {NetworkNotFoundError} If the specified network doesn't exist
 * @throws {PoolNotFoundError} If the pool doesn't exist on the network
 */
async getPoolMetrics(
  networkId: string,
  poolAddress: string,
  options?: PoolMetricsOptions
): Promise<PoolMetrics> {
  // Implementation
}
```

### Generating TypeDoc
```bash
# First, install TypeDoc
npm install --save-dev typedoc

# Add a script to package.json
# "docs": "typedoc --out docs src/index.ts"

# Generate documentation
npm run docs
```

### Update README.md
Add examples of new functionality to the README.md file.

## 10. End-to-End Example: Implementing a New Endpoint

Let's walk through implementing a new endpoint that retrieves advanced analytics for a token:

### 1. Identify the New Endpoint in OpenAPI spec
```yaml
# From openapi_new.yml
"/networks/{network}/tokens/{token_address}/analytics":
  get:
    tags:
      - Tokens
    summary: Get advanced analytics for a token
    parameters:
      - $ref: "#/components/parameters/networkParam"
      - $ref: "#/components/parameters/tokenAddressParam"
    responses:
      "200":
        description: successful operation
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/TokenAnalytics"
```

### 2. Define the New Model
```typescript
// src/models/tokens.ts
export interface TokenAnalytics {
  token_id: string;
  total_pools: number;
  total_volume_usd: number;
  price_volatility_24h: number;
  top_pairs: {
    pair_token: Token;
    volume_usd: number;
    pool_id: string;
  }[];
  price_change: {
    '1h': number;
    '24h': number;
    '7d': number;
    '30d': number;
  };
}
```

### 3. Implement the API Method
```typescript
// src/api/tokens.ts
/**
 * Get advanced analytics for a specific token on a network.
 * 
 * @param networkId - Network identifier
 * @param tokenAddress - Token contract address
 * @returns Advanced token analytics data
 */
async getAnalytics(networkId: string, tokenAddress: string): Promise<TokenAnalytics> {
  if (!networkId) throw new Error('Network ID is required');
  if (!tokenAddress) throw new Error('Token address is required');
  
  return this._get<TokenAnalytics>(`/networks/${networkId}/tokens/${tokenAddress}/analytics`);
}
```

### 4. Update Exports if Needed
```typescript
// src/index.ts
// Add if the new model isn't already exported
export * from './models/tokens';
```

### 5. Test the New Endpoint
```typescript
// test-token-analytics.ts
import { DexPaprikaClient } from './src';

async function testTokenAnalytics() {
  const client = new DexPaprikaClient();
  
  try {
    // WETH on Ethereum
    const tokenAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    const analytics = await client.tokens.getAnalytics('ethereum', tokenAddress);
    
    console.log('Token analytics:', {
      totalPools: analytics.total_pools,
      totalVolume: analytics.total_volume_usd,
      priceChange24h: analytics.price_change['24h'],
      topPairs: analytics.top_pairs.length
    });
    
    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testTokenAnalytics();
```

### 6. Update Documentation
Add an example to the README.md:

```markdown
### Token Analytics

```javascript
// Get advanced analytics for WETH
const analytics = await client.tokens.getAnalytics(
  'ethereum',
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
);

console.log(`Price change (24h): ${analytics.price_change['24h']}%`);
console.log(`Top trading pairs: ${analytics.top_pairs.length}`);
```
```

## 11. Decision Criteria: New Files vs. Updating Existing Ones

### Create New Files When:
- Implementing a completely new resource area (e.g., new `governance.ts` for governance endpoints)
- The existing file would grow too large (>300 lines)
- The new functionality doesn't logically fit with existing files

### Update Existing Files When:
- Adding new endpoints or models to existing resource areas
- Making minor changes to existing interfaces
- Adding related functionality to existing features

### Example Decision Process
1. New endpoint: `/networks/{network}/tokens/{token_address}/analytics`
2. Assessment: This relates to tokens, which already have a model file and API file
3. Decision: Update existing `tokens.ts` files rather than creating new ones

## 12. NPM Package Versioning Guidelines

### Semantic Versioning Rules
Follow [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes (incompatible API updates)
- MINOR: New functionality added in a backward-compatible manner
- PATCH: Backward-compatible bug fixes

### Version Update Examples
- When adding new endpoints: Increment MINOR version
- When fixing bugs: Increment PATCH version
- When changing parameter types: Increment MAJOR version

### Update Process
```bash
# Update version in package.json
npm version minor

# Publish to npm (for maintainers only)
npm publish
```

## 13. Build Process Updates

When adding new features that require changes to the build process:

### Updating tsconfig.json
If you need to support new TypeScript features:

```json
{
  "compilerOptions": {
    "target": "es2019",  // Change based on requirements
    "module": "commonjs",
    "declaration": true,
    "sourceMap": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Adding New Build Scripts
If needed, add new scripts to package.json:

```json
"scripts": {
  "build": "tsc",
  "clean": "rimraf dist",
  "prepublishOnly": "npm run clean && npm run build",
  "test": "ts-node test-after-fixes.ts",
  "example": "ts-node examples/basic-example.ts",
  "docs": "typedoc --out docs src/index.ts"
}
```

## 14. Weekly Update Checklist

### Pre-Update Checks
- [ ] Verify current build is passing (`npm run build`)
- [ ] Run existing tests to ensure baseline functionality (`npm test`)
- [ ] Backup the current OpenAPI spec as `openapi_old.yml`

### Update Process
- [ ] Save new OpenAPI spec as `openapi_new.yml`
- [ ] Compare specs to identify changes
- [ ] Update model interfaces in `src/models/`
- [ ] Update API methods in `src/api/`
- [ ] Update client.ts or index.ts if needed
- [ ] Update helpers or utilities if needed

### Testing
- [ ] Create tests for new functionality
- [ ] Run all tests to verify changes (`npm test`)
- [ ] Test example files with the updated SDK

### Documentation
- [ ] Update JSDoc comments for new/modified methods
- [ ] Update README.md with new examples
- [ ] Generate updated TypeDoc if used

### Release
- [ ] Update version in package.json (using semantic versioning)
- [ ] Create a changelog entry documenting changes
- [ ] Build the package (`npm run build`)
- [ ] Consider publishing to npm (`npm publish`)

## Additional Resources

### Troubleshooting Common Issues
- **TypeScript Compilation Errors**: Check for type mismatches or missing interfaces
- **Runtime Errors**: Verify API endpoint URLs and parameter handling
- **API Response Errors**: Compare actual API responses with TypeScript interfaces

### Best Practices
- Use TypeScript's strict mode for maximum type safety
- Keep backward compatibility whenever possible
- Add detailed JSDoc comments for all public methods
- Follow existing code style and conventions
- Write tests for all new functionality

### Further Documentation
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Semantic Versioning](https://semver.org/) 