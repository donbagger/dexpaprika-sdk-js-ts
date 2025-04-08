import { BaseAPI } from './base';
import { Network } from '../models/networks';
/**
 * API service for network-related endpoints.
 */
export declare class NetworksAPI extends BaseAPI {
    /**
     * Get a list of supported blockchain networks.
     *
     * @returns List of supported networks
     */
    list(): Promise<Network[]>;
}
