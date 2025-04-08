import { Dex } from './dexes';
import { Pool } from './pools';
export interface PageInfo {
    limit: number;
    page: number;
    total_items?: number;
    total_pages?: number;
    next_cursor?: string;
}
export interface PaginatedResponse<T> {
    items: T[];
    page_info: PageInfo;
}
export interface DexPaginatedResponse {
    dexes: Dex[];
    page_info: PageInfo;
}
export interface PoolPaginatedResponse {
    pools: Pool[];
    page_info: PageInfo;
}
