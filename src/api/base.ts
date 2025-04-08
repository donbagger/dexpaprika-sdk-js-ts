import { DexPaprikaClient } from '../client';

// base for api classes
export class BaseAPI {
  protected client: DexPaprikaClient;

  /**
   * Initialize a new API service.
   * 
   * @param client - DexPaprika client instance
   */
  constructor(client: DexPaprikaClient) {
    this.client = client;
  }

  /**
   * Make a GET request.
   * 
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @returns Response data
   */
  protected async _get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.client.get<T>(endpoint, params);
  }

  /**
   * Make a POST request.
   * 
   * @param endpoint - API endpoint
   * @param data - Request body
   * @param params - Query parameters
   * @returns Response data
   */
  protected async _post<T>(
    endpoint: string, 
    data: Record<string, any>, 
    params?: Record<string, any>
  ): Promise<T> {
    return this.client.post<T>(endpoint, data, params);
  }
} 