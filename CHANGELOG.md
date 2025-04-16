# Changelog

All notable changes to the DexPaprika SDK will be documented in this file.

## [1.2.0] - 2025-04-20

### Added
- Automatic retry with exponential backoff for failed requests
- Response caching system to reduce API traffic and improve performance
- New client configuration options for customizing retry and cache behavior
- Cache control methods: clearCache(), setCacheEnabled(), cacheSize property
- New example demonstrating retry and caching features
- Comprehensive documentation for new features

### Changed
- Updated client constructor to accept configuration for retry and cache
- Improved error handling with network failure resilience
- Exported utility types and functions for retry and cache mechanisms

## [1.1.0] - 2025-04-15

### Added
- Support for new Token summary field that includes price, liquidity, and trading metrics
- Support for new last_updated field in Token model
- Added test-token-summary.ts file to verify the new fields
- Created SDK_UPDATE_INSTRUCTIONS.md with comprehensive update guidelines

### Changed
- Updated to OpenAPI spec v3.1.0
- Updated TokenSummary interface to match the latest API schema

## [1.0.0] - 2025-04-01

### Initial Release
- First public version of the DexPaprika SDK
- Support for all core API endpoints
- TypeScript types for all API responses
- Basic examples and documentation 