import { BaseAPI } from './base';
import { Stats } from '../models/utils';
/**
 * API service for utility endpoints.
 */
export declare class UtilsAPI extends BaseAPI {
    /**
     * Get statistics about the DexPaprika ecosystem.
     *
     * @returns Statistics about chains, DEXes, pools, and tokens
     */
    getStats(): Promise<Stats>;
}
