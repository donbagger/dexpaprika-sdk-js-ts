# Changelog

All notable changes to the DexPaprika SDK will be documented in this file.

## 1.3.0 (2025-04-24)

### Added
- Added new options-based parameter system for all methods
- Added TypeScript interfaces for all API options in `options.ts`
- Improved JSDoc documentation for all methods and parameters
- Exported response and options types from the main package

### Changed
- Methods now accept options objects instead of positional parameters
  - `pools.list(page, limit, sort, orderBy)` → `pools.list(options)`
  - `pools.listByNetwork(networkId, page, limit, sort, orderBy)` → `pools.listByNetwork(networkId, options)`
  - `pools.getOHLCV(...)` → `pools.getOHLCV(networkId, poolAddress, options)`
  - And other similar methods
- Default values are now handled more consistently

### Fixed
- Improved parameter naming consistency across methods
- Better type safety for API parameters

## 1.1.0 (2025-04-10)

### Added
- Added support for new API endpoints
- Improved error handling with specific error types
- Enhanced type definitions for better TypeScript support

### Fixed
- Fixed caching mechanism for better performance
- Resolved issues with pagination in some endpoints

## 1.0.0 (2025-03)

### Added
- Initial release of the DexPaprika SDK
- Support for all core API endpoints
- Built-in caching and retry mechanisms
- TypeScript definitions
- Comprehensive documentation 