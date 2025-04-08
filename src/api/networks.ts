import { BaseAPI } from './base';
import { Network } from '../models/networks';

/**
 * API service for network-related endpoints.
 */
export class NetworksAPI extends BaseAPI {
  /**
   * Get a list of supported blockchain networks.
   * 
   * @returns List of supported networks
   */
  async list(): Promise<Network[]> {
    return this._get<Network[]>('/networks');
  }
} 