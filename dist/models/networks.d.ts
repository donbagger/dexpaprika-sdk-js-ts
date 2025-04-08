/**
 * Blockchain network information.
 */
export interface Network {
    /**
     * Network identifier (e.g., "ethereum", "solana").
     */
    id: string;
    /**
     * Human-readable name of the network.
     */
    display_name: string;
    /**
     * Network logo URL.
     */
    logo_url?: string;
    /**
     * Number of DEXes on the network.
     */
    dexes_count: number;
}
